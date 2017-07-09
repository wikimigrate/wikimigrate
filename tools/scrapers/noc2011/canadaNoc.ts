import * as fs from 'fs'
import * as cheerio from 'cheerio'
import * as glob from 'glob'
import { JobGroup } from '../../../src/definitions/auxiliary/JobClassification'
import { MultiLangStringSet } from '../../../src/definitions/auxiliary/MultiLang'

const prefix = 'noc2011'

const errors: Error[] & {pushObject?(error: Error): number} = []
errors.pushObject = error => (errors.push({
    name: error.name,
    message: error.message
}))

const ROOT = 'http://noc.esdc.gc.ca/English/NOC/'

function getListItems(selector: string, $: CheerioStatic): string[] {
    return Array.from($(selector)).map(node => $(node).text()
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ')
        .replace(/(\d\d\d\d)(\d\d\d\d)/g, '\$1')
    )
}

function formJobGroup(
    info: {
        designation: string
        title: string,
        lineage: string[],
        url: string | undefined
        details?: {
            description?: MultiLangStringSet
            exampleTitles?: MultiLangStringSet[]
            duties?: MultiLangStringSet[]
            requirements: MultiLangStringSet[]
            additionalInformation: MultiLangStringSet[]
            exclusions: string[]
        }
    }
): JobGroup {
    return {
        jobGroupId: `${prefix}-${info.designation}`,
        system: prefix,
        designation: info.designation,
        title: {
            en: info.title,
        },
        details: info.details,
        lineage: info.lineage,
        reference: info.url
            ? { url: info.url }
            : undefined,
    }
}

const currentDesignations = {
    1: '',
    2: '',
    3: '',
}

function parseIndex($: CheerioStatic): JobGroup[] {
    let designation = ''
    let title = ''
    let jobGroups: JobGroup[] = []
    let url = ''

    $('#sksrc+p+div > *').each(function(this: CheerioStatic) {
        const $element = $(this)
        if (this.name === 'h2') {
            [designation, title] = $element.text().split('\xa0')
            jobGroups.push(formJobGroup({
                designation,
                title,
                lineage: [],
                url: undefined
            }))
            currentDesignations[1] = `${prefix}-${designation}`
        }
        else if (this.name === 'h3') {
            [designation, title] = $element.text()
                                           .replace('Major Group ', '')
                                           .split('\xa0')
            jobGroups.push(formJobGroup(
                {
                    designation,
                    title,
                    lineage: [currentDesignations[1]],
                    url: undefined
                }
            ))
            currentDesignations[2] = `${prefix}-${designation}`
        }
        else if (this.name === 'h4') {
            [designation, title] = $element.text().split('\xa0')
            jobGroups.push(formJobGroup({
                designation,
                title,
                lineage: [
                    currentDesignations[1],
                    currentDesignations[2],
                ],
                url: undefined
            }))
            currentDesignations[3] = `${prefix}-${designation}`
        }
        else if (this.name === 'ul') {
            $element.find('a').each(function(this: CheerioStatic) {
                const $anchor = $(this)
                url = $anchor.attr('href')
            })
        }
    })

    return jobGroups
}

function parseSubGroups($: CheerioStatic): JobGroup[] {
    const jobGroups: JobGroup[] = []
    const titleText = $('h1').text()
    const designation = titleText.slice(0, 4)
    const title = titleText.slice(5).replace('&ndash;', '–') // sanitization went rogue
    const leadStatement = ($('main').contents()[10] as any).data
    const exampleTitles = getListItems('main ul:nth-child(9) li', $)
    const duties =
        getListItems('.NoBulletList ul[style="list-style-type: disc"] li', $)
    const requirements = getListItems('main ul:nth-child(15) li', $)
    const additionalInformation = getListItems('main ul:nth-child(17) li', $)
    const exclusions = Array.from($('main ul:nth-last-child(4) a'))
                            .map(node => prefix + '-' + $(node).text())

    jobGroups.push(formJobGroup({
        designation,
        title,
        lineage: [
            prefix,
            `${prefix}-${designation.slice(0, 1)}`,
            `${prefix}-${designation.slice(0, 2)}`,
        ],
        url: undefined,
        details: {
            description: leadStatement,
            exampleTitles,
            exclusions,
            duties,
            requirements,
            additionalInformation,
        }
    }))
    return jobGroups
}

function save(filename: string, list: any[]): void {
    fs.writeFileSync(filename, JSON.stringify(list, null, 4))
}

async function main() {
    const ROOT = './download/noc.esdc.gc.ca'
    const pathIndex = `${ROOT}/QuickSearch.aspx?ver=11&val65=*`
    let content = fs.readFileSync(pathIndex).toString()
    let $ = cheerio.load(content)
    const majorJobGroups = parseIndex($)

    const pathSubs = glob.sync(`${ROOT}/Profile*`)
    let subGroups: JobGroup[] = []
    for (const path of pathSubs) {
        const content = fs.readFileSync(path).toString()
        const $ = cheerio.load(content)
        subGroups = subGroups.concat(parseSubGroups($))
    }
    save('download/result.json', [...majorJobGroups, ...subGroups])
}

main()
