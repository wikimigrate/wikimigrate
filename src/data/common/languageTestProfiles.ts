import { LanguageTestProfile } from '../../definitions/auxiliary/LanguageTest'

const languageTestProfiles: LanguageTestProfile[] = [
    {
        id: 'clb',
        abbreviation: 'CLB',
        title: {
            en: 'Canadian Language Benchmark',
            fr: 'Niveaux de compétence linguistique canadiens',
            zh_hans: '加拿大语言标准',
        },
        itemScoreFormat: [4, 12, 1],
        languages: ['en', 'fr'],
        equivalency: {
            /** @see http://www.cic.gc.ca/english/resources/tools/language/charts.asp */
            ielts: {
                reading: [
                    [8.0, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.0, 6],
                    [4.0, 5],
                    [3.5, 4],
                ],
                writing: [
                    [7.5, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.0, 4],
                ],
                listening: [
                    [8.5, 10],
                    [8.0, 9],
                    [7.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.5, 4],
                ],
                speaking: [
                    [7.5, 10],
                    [7.0, 9],
                    [6.5, 8],
                    [6.0, 7],
                    [5.5, 6],
                    [5.0, 5],
                    [4.0, 4],
                ]
            },
            celpip: {
                reading: [
                    [10, 10],
                    [9, 9],
                    [8, 8],
                    [7, 7],
                    [6, 6],
                    [5, 5],
                    [4, 4],
                ],
                writing: [
                    [10, 10],
                    [9, 9],
                    [8, 8],
                    [7, 7],
                    [6, 6],
                    [5, 5],
                    [4, 4],
                ],
                listening: [
                    [10, 10],
                    [9, 9],
                    [8, 8],
                    [7, 7],
                    [6, 6],
                    [5, 5],
                    [4, 4],
                ],
                speaking: [
                    [10, 10],
                    [9, 9],
                    [8, 8],
                    [7, 7],
                    [6, 6],
                    [5, 5],
                    [4, 4],
                ],
            },
            tef: {
                reading: [
                    [263, 10],
                    [248, 9],
                    [233, 8],
                    [207, 7],
                    [181, 6],
                    [151, 5],
                    [121, 4],
                ],
                writing: [
                    [393, 10],
                    [371, 9],
                    [349, 8],
                    [310, 7],
                    [271, 6],
                    [226, 5],
                    [181, 4],
                ],
                listening: [
                    [316, 10],
                    [298, 9],
                    [280, 8],
                    [249, 7],
                    [217, 6],
                    [181, 5],
                    [145, 4],
                ],
                speaking: [
                    [393, 10],
                    [371, 9],
                    [349, 8],
                    [310, 7],
                    [271, 6],
                    [226, 5],
                    [181, 4],
                ]
            }
        },
        reference: {
            url: 'http://www.language.ca/index.cfm?Repertoire_No=2137991327',
        },
    },
    {
        id: 'celpip',
        abbreviation: 'CELPIP',
        title: {
            en: 'Canadian English Language Proficiency Index Program',
        },
        languages: ['en'],
        itemScoreFormat: [4, 12, 1],
        reference: {
            url: 'https://www.celpip.ca/',
        }
    },
    {
        id: 'tef',
        abbreviation: 'TEF',
        title: {
            fr: `Test d'évaluation de français`,
        },
        itemScoreFormat: [0, 450, 1],
        languages: ['fr'],
        reference: {
            url: 'http://www.fiaf.org/frenchclasses/frenchexam-tef.shtml',
        }
    },
    {
        id: 'ielts',
        abbreviation: 'IELTS',
        title: {
            en: 'International English Language Testing System',
        },
        itemScoreFormat: [4, 9, 0.5],
        languages: ['en'],
        reference: {
            url: 'https://www.ielts.org/',
        },
    },
    {
        id: 'toefl',
        abbreviation: 'TOEFL',
        title: {
            en: 'Test of English as a Foreign Language',
        },
        itemScoreFormat: [0, 30, 1],
        languages: ['en'],
        reference: {
            url: 'https://www.ets.org/toefl',
        },
    },
    {
        id: 'pte-academic',
        abbreviation: 'PTE',
        title: {
            en: 'Pearson Test of English',
        },
        itemScoreFormat: [10, 90, 1],
        languages: ['en'],
        reference: {
            url: 'http://pearsonpte.com/',
        },
    },
    {
        id: 'cae',
        abbreviation: 'CAE',
        title: {
            en: 'Cambridge English: Advanced',
        },
        /**
            Score range is complex.
            @see http://www.cambridgeenglish.org/images/210434-converting-practice-test-scores-to-cambridge-english-scale-scores.pdf
        */
        itemScoreFormat: [0, 100, 1],
        languages: ['en'],
        reference: {
            url: 'http://www.cambridgeenglish.org/exams/advanced/',
        },
    },
    /* disabled due to letter-based scoring not implemented
    {
        id: 'oet',
        title: {
            en: ' Occupational English Test',
        },
        languages: ['en'],
        reference: {
            url: 'https://www.occupationalenglishtest.org/',
        },
    },
    */
]

export default languageTestProfiles
