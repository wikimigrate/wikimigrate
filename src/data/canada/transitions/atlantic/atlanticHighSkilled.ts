import Transition from '../../../../definitions/Transition'
import { allOf, oneOf } from '../../../../definitions/auxiliary/Combination'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'
import { OfferPrereq } from '../../../../definitions/Prerequisites/OfferPrereq'

import { atlanticJobOfferCommon, atlanticWorkersJob } from './atlanticCommon'

import { alien, pr } from '../../status'

import jobClass from '../../jobClass'

const atlanticHighSkilled: Transition = {
    id: 'atlantic_high_skilled',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Atlantic High-Skilled Program',
    },
    from: alien,
    to: pr,
    prerequisiteList: allOf([
        atlanticJobOfferCommon,
        atlanticWorkersJob,
        {
            prereqId: 'work_experience',
            jobGroups: oneOf([
                'noc2011-0',
                'noc2011-A',
                'noc2011-B',
            ]),
        } as WorkExperiencePrereq,
        {
            prereqId: 'offer',
            employer: {
                regionId: 'canada',
            },
            // FIXME: Complete missing words
        } as OfferPrereq,
    ]),
    paperwork: {
        procedureList: [
            {
                id: 'application',
                name: {
                    en: 'Application',
                },
            },
        ],
    }
}

export default atlanticHighSkilled
