/**
import Transition from '../../../definitions/Transition'
import { allOf } from '../../../definitions/auxiliary/Combination'

import { alien, pr } from '../status'

const quebecSkilled: Transition = {
    id: 'quebec_selected_skilled_workers',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Quebec-selected Skilled Workers',
    },
    prerequisiteList: allOf([]),
    from: alien,
    to: pr,
    paperwork: {
        procedureList: [
            {
                'name': {
                    'en': 'Apply to Quebec government',
                },
            },
            {
                'name': {
                    'en': 'Apply to CIC',
                },
            },
        ],
    },
    referenceList: [
        {
            url: 'http://www.cic.gc.ca/english/immigrate/quebec/index.asp',
            title: {
                en: 'Official Website',
            },
        },
    ],
}

export default quebecSkilled
 */
