import { MultiLangStringSet } from './MultiLang'
import URLDatum from './URLDatum'

type ClassificationSystemId = 'noc2011' | 'aus-job-class'

type JobGroupDesignation = string

export type JobGroupId = string

export interface JobGroup {
    jobGroupId: JobGroupId
    system: ClassificationSystemId
    designation: JobGroupDesignation
    title?: MultiLangStringSet
    description?: MultiLangStringSet
    details?: {
        description?: MultiLangStringSet
        exampleTitles?: MultiLangStringSet[]
        duties?: MultiLangStringSet[]
        requirements: MultiLangStringSet[]
        additionalInformation: MultiLangStringSet[]
        exclusions: JobGroupId[]
    }
    lineage: JobGroupDesignation[]
    reference?: URLDatum
}

export function isJobGroup(input: any): boolean {
    return !!(input && input.jobGroupId)
}

export interface JobType {
    jobGroup: Array<JobGroup>
    description: MultiLangStringSet
}

export interface JobClassification {
    classificationSystemId: ClassificationSystemId
    regionId: string
    title: MultiLangStringSet
    titleShort: MultiLangStringSet
    jobTypes?: Array<JobType>
    jobGroups: {
        [groupName: string]: JobGroup
    }
    reference: URLDatum
}

export default JobClassification
