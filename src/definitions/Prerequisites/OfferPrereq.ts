import BasePrereq from './BasePrereq'
import { MultiLangStringSet } from '../auxiliary/MultiLang'
import { RegionId } from '../auxiliary/Region'
import { JobGroupId } from '../auxiliary/JobClassification'

export interface OfferPrereq extends BasePrereq {
    prereqId: 'offer'
    employer: {
        region?: RegionId
        status?: 'approved'
    }
    jobGroup?: JobGroupId
    fulltime?: boolean
    seasonal?: boolean
    description?: MultiLangStringSet
}

export default OfferPrereq
