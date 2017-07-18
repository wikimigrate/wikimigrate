import Transition from '../../../../definitions/Transition'
import { allOf, identity, oneOf } from '../../../../definitions/auxiliary/Combination'
import { languagePrereqMinScore } from '../../../../definitions/Prerequisites/LanguagePrereq'
import { duration } from '../../../../definitions/auxiliary/Duration'
import { WorkExperiencePrereq } from '../../../../definitions/Prerequisites/WorkExperiencePrereq'
import { OfferPrereq } from '../../../../definitions/Prerequisites/OfferPrereq'
import { CertificationPrereq } from '../../../../definitions/Prerequisites/CertificationPrereq'
import { prereqTitleDict } from '../../../common/prereqTitleDict'

import { alien, expressEntryCandidate } from '../../status'

import jobClass from '../../jobClass'
import { expressProcedures } from './expressProcedures'
import crs from '../../crs'

const federalSkilledTrade: Transition = {
    id: 'federal_skilled_trade',
    regionId: 'canada',
    acquireBy: 'application',
    name: {
        en: 'Federal Skilled Trade Program',
        zh_hans: '联邦技工移民(Federal Skilled Trade Program, FSTP)',
    },
    from: alien,
    to: expressEntryCandidate,
    scoreSystem: crs,
    prerequisiteList: allOf([

        // Language Requirements
        identity(
            [
                languagePrereqMinScore('clb', {
                    speaking: 5,
                    listening: 5,
                    reading: 4,
                    writing: 4,
                }),
            ],
            {
                title: prereqTitleDict.language_test,
            }),

        // Work experience
        allOf([
            {
                prereqId: 'work_experience',
                length: ['>=', duration(2, 'year')],
                withinLast: duration(5, 'year'),
                workHoursPerWeek: duration(30, 'hour'),
                region: 'world',
                jobNature: oneOf([
                    'noc2011-72',
                    'noc2011-73',
                    'noc2011-82',
                    'noc2011-92',
                    'noc2011-632',
                    'noc2011-633',
                ]),
            } as WorkExperiencePrereq,
        ], {
            title: prereqTitleDict.work_experience,
        }),

        oneOf([
            {
                prereqId: 'offer',
                employer: {
                    region: 'canada',
                },
            } as OfferPrereq,
            {
                prereqId: 'certification',
                description: {
                    en: 'a certificate of qualification in that skilled trade issued by a Canadian provincial or territorial authority',
                    zh_hans: '由加拿大省级政府发出的确认专业技能的证明',
                },
            } as CertificationPrereq,
        ], {
            title: prereqTitleDict.offer,
        }),

    ]),

    paperwork: {
        procedureList: expressProcedures,
    },

    referenceList: [
        {
            title: {
                en: 'Official page',
                zh_hans: '官方网页',
            },
            url: 'http://www.cic.gc.ca/english/immigrate/trades/apply-who.asp',
        },
    ],
}

export default federalSkilledTrade
