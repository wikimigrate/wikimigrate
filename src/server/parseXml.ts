import { parseString } from 'xml2js'

function deArray(obj: any): void {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key].length === 1) {
            obj[key] = obj[key][0]
        }
    }
}


export function parseXml<T>(s: string, shouldDearray: boolean): Promise<T> {
    return new Promise((resolve, reject) => {
        parseString(s, (error, result) => {
            if (error) {
                reject(error)
            }
            else {
                if (shouldDearray) {
                    deArray(result.xml)
                }
                resolve(result.xml)
            }
        })
    })
}
