import { RegionId } from '../auxiliary/Region'
import { JobGroupId } from '../auxiliary/JobClassification'

export interface OfferQuality {
    qualityId: 'offer'
    employer: {
        region: RegionId
        status: 'approved'
    }
    jobGroup: JobGroupId
    fulltime: boolean
    seasonal: boolean
}
