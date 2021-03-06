import { MultiLangStringSet } from './auxiliary/MultiLang'
import { Combination } from './auxiliary/Combination'
import { Paperwork } from './auxiliary/Paperwork'
import Exception from './auxiliary/Exception'
import URLDatum from './auxiliary/URLDatum'

import { RegionId } from './auxiliary/Region'
import Status from './Qualities/Status'
import Prerequisite from './Prerequisites/index'
import { ScoreSystem } from './ScoreSystem'

export type TransitionId = string // TODO: Implement proper enumeration

interface Transition {
    id: TransitionId
    name: MultiLangStringSet
    regionId: RegionId,
    acquireBy: 'application' | 'invitation' | 'automatic'
    from: Status | Status[] | null
    to: Status
    stage?: {
        description: MultiLangStringSet
        date?: Date
    }
    prerequisiteList: Combination<Prerequisite>
    paperwork: Paperwork
    scoreSystem?: ScoreSystem
    exceptionList?: Array<Exception>
    referenceList?: URLDatum[]
}

export default Transition
