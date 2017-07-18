import { getInitialStatus, Person } from '../../src/definitions/Person'
import { EducationQuality } from '../../src/definitions/Qualities/EducationExperience'
import { duration } from '../../src/definitions/auxiliary/Duration'
import { WorkExperienceQuality } from '../../src/definitions/Qualities/WorkExperience'
export const alice: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 25,
        },
    },
    status: getInitialStatus('usa'),
    spouse: null,
    education: [
        {
            qualityId: 'education',
            stage: 'diploma',
            duration: duration(3, 'year'),
            region: 'canada',
        } as EducationQuality,
        {
            qualityId: 'education',
            stage: 'diploma',
            duration: duration(2, 'year'),
            region: 'canada',
        } as EducationQuality
    ],
    languageTests: [
        {
            testId: 'ielts',
            scores: {
                speaking: 9,
                listening: 5.5,
                reading: 8.5,
                writing: 7.0,
            },
        },
    ],
    workExperiences: [
        {
            qualityId: 'work_experience',
            region: 'canada',
            duration: duration(2, 'year')
        } as WorkExperienceQuality
    ]
}

export const bob: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 32,
        },
    },
    status: getInitialStatus('uk'),
    spouse: alice,
    education: [
        {
            qualityId: 'education',
            stage: 'bachelor',
            duration: duration(4, 'year'),
            region: 'australia',
        } as EducationQuality,
        {
            qualityId: 'education',
            stage: 'phd',
            duration: duration(5, 'year'),
            region: 'australia',
        } as EducationQuality,
    ],
    languageTests: [
        {
            testId: 'tef',
            scores: {
                speaking: 256,
                listening: 300,
                reading: 280,
                writing: 400,
            },
        },
        {
            testId: 'celpip',
            scores: {
                speaking: 10,
                listening: 10,
                reading: 0,
                writing: 0,
            },
        },
    ],
    workExperiences: []
}

export const ulysses: Person = {
    birth: {
        date: {
            year: (new Date()).getFullYear() - 30,
        },
    },
    status: getInitialStatus('utopia'),
    spouse: null,
    education: [
        {
            qualityId: 'education',
            stage: 'bachelor',
            duration: duration(4, 'year'),
            region: 'uk',
        } as EducationQuality
    ],
    languageTests: [
        {
            testId: 'ielts',
            scores: {
                speaking: 7,
                listening: 7,
                reading: 7,
                writing: 7,
            },
        },
    ],
    workExperiences: [
        {
            qualityId: 'work_experience',
            region: 'usa',
            duration: duration(1, 'year')
        } as WorkExperienceQuality
    ]
}
