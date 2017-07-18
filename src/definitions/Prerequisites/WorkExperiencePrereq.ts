import { MultiLangStringSet } from '../auxiliary/MultiLang'
import BasePrereq from './BasePrereq'
import { JobGroupId } from '../auxiliary/JobClassification'
import Duration from '../auxiliary/Duration'
import { Combination } from '../auxiliary/Combination'
import { Interval } from '../auxiliary/Operator'
import { RegionId } from '../auxiliary/Region'

export interface WorkExperiencePrereq extends BasePrereq {
    prereqId: 'work_experience'
    duration?: Interval<Duration>
    withinLast?: Duration
    workHoursPerWeek?: Duration
    region: RegionId
    regionExcept?: RegionId // TODO: unify with region + logic operators
    jobNature?: Combination<JobGroupId | MultiLangStringSet>
}

export default WorkExperiencePrereq
