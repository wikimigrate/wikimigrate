import Status from '../Qualities/Status'
import Transition from '../Transition'
import URLDatum from './URLDatum'
import { MultiLangStringSet } from './MultiLang'
import { JobClassification } from './JobClassification'
import { FundSourceGroup } from './Money'
import { ScoreSystem } from '../ScoreSystem'

export type RegionId =
    'world'
    | 'canada'
    | 'australia'
    | 'new_zealand'
    | 'canada_atlantic_provinces'
    | 'uk'
    | 'ireland'
    | 'usa'
    | 'utopia' // for testing

export interface Region {
    id: RegionId
    name: MultiLangStringSet
    statusList: Status[]
    transitionList: Transition[]
    referenceList: URLDatum[]
    jobClassification?: JobClassification
    fundSourceGroupList?: FundSourceGroup[]
    scoreSystems?: ScoreSystem[]
}

export default Region
