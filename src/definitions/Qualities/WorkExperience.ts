import { MultiLangStringSet } from '../auxiliary/MultiLang'
import { Duration } from '../auxiliary/Duration'
import { RegionId } from '../auxiliary/Region'
import { JobGroupId } from '../auxiliary/JobClassification'

export interface WorkExperienceQuality {
    qualityId: 'work_experience'
    region: RegionId
    duration: Duration
    description?: MultiLangStringSet
    matchedJobGroups?: JobGroupId[]
}

export default WorkExperienceQuality
