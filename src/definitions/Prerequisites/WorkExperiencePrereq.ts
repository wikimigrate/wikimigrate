import BasePrereq from './BasePrereq'
import { JobGroupId } from '../auxiliary/JobClassification'
import Duration from '../auxiliary/Duration'
import { Interval } from '../auxiliary/Operator'
import { RegionId } from '../auxiliary/Region'

export interface WorkExperiencePrereq extends BasePrereq {
    prereqId: 'work_experience'
    region: RegionId
    regionExcept?: RegionId // TODO: unify with region + logic operators
    duration?: Interval<Duration>
    withinLast?: Duration
    minimalWeeklyHours?: number
    jobGroups?: JobGroupId[]
}

export default WorkExperiencePrereq
