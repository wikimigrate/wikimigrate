import * as Koa from 'koa'
import { data } from '../data'
import { readFile } from 'fs-extra'
import { JobClassification, JobGroup } from '../definitions/auxiliary/JobClassification'
import { text } from '../client/utils/text'

const PORT = 12000

const job = new Koa()

interface JobSearchContext extends Koa.Context {
}

const region = data.regions.find(region => region.id === 'canada')
const noc2011 = region ? region.jobClassification : data.regions[0].jobClassification

let jsonLoaded = false
async function getNoc(): Promise<JobClassification | undefined> {
    if (jsonLoaded) {
        return noc2011
    }

    else if (noc2011) {
        noc2011.jobGroups = JSON.parse(String(await readFile('data/noc2011.download.json')))
        jsonLoaded = true
        return noc2011
    }
}


export interface TitleSearchServerQuery {
    keyword: string
}

function search(keyword: string, jobGroups: JobGroup[]): JobGroup[] {
    return jobGroups.filter(group =>
        text(group.title).includes(keyword) ||
        (group.details
         && group.details.exampleTitles
         && group.details.exampleTitles
                 .map(s => text(s))
                 .join('')
                 .includes(keyword)
        )
    )
}

async function jobSearch(context: JobSearchContext, next: () => Promise<any>) {
    context.body = process.cwd()
    const noc = await getNoc()
    if (!noc) {
        return next()
    }
    const query = context.query as TitleSearchServerQuery
    context.body = JSON.stringify(search(query.keyword, Object.values(noc.jobGroups)), null, 4)
    next()
}

job.use(jobSearch)

job.listen(PORT, () =>
    console.info('Job search server listening on', PORT)
)
