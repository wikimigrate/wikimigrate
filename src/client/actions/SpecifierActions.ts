import { SpecifierId } from '../data'
import { Duration } from '../../definitions/auxiliary/Duration'
import { RegionId } from '../../definitions/auxiliary/Region'
import { LanguageTestId, LanguageTestItem, LanguageTestResult } from '../../definitions/auxiliary/LanguageTest'
import { EducationStage } from '../../definitions/Qualities/EducationExperience'
import { Dispatch } from 'redux'
import { JobGroup } from '../../definitions/auxiliary/JobClassification'

export interface LanguageTestAddAction {
    type: 'LANGUAGE_TEST_ADD'
}

export interface LanguageTestRemoveAction {
    type: 'LANGUAGE_TEST_REMOVE',
    payload: {
        index: number
    }
}

export interface LanguageTestChangeAction {
    type: 'LANGUAGE_TEST_CHANGE'
    payload: {
        index: number
        test: LanguageTestId
    }
}

export interface LanguageTestScoreChangeAction {
    type: 'Language_Test_Score_Change'
    payload: {
        index: number
        item: LanguageTestItem
        score: number
    }
}


export interface EducationAddAction {
    type: 'EDUCATION_ADD'
}

export interface EducationRemoveAction {
    type: 'EDUCATION_REMOVE'
    payload: {
        index: number
    }
}

export interface EducationStageChangeAction {
    type: 'EDUCATION_STAGE_CHANGE'
    payload: {
        index: number
        stage: EducationStage
    }
}

export interface EducationRegionChangeAction {
    type: 'EDUCATION_REGION_CHANGE'
    payload: {
        index: number
        region: RegionId
    }
}

export interface EducationDurationChangeAction {
    type: 'EDUCATION_DURATION_CHANGE',
    payload: {
        index: number
        duration: Duration
    }
}

export interface EducationChangeGraduationDateAction {
    type: 'EDUCATION_CHANGE_GRADUATION_DATE',
    payload: {
        index: number,
        graduateYear: number
    }
}

export interface BirthYearChangeAction {
    type: 'BIRTH_YEAR_CHANGE',
    payload: {
        year: number
    }
}

export interface WorkAddAction {
    type: 'WORK_ADD'
}

export interface WorkRemoveAction {
    type: 'WORK_REMOVE'
    payload: {
        index: number
    }
}


export interface WorkDurationChangeAction {
    type: 'WORK_DURATION_CHANGE'
    payload: {
        index: number
        duration: Duration
    }
}

export interface WorkRegionChangeAction {
    type: 'WORK_REGION_CHANGE',
    payload: {
        index: number,
        region: RegionId,
    }
}

export interface SpouseExistenceChange {
    type: 'SPOUSE_EXISTENCE_CHANGE',
    payload: {
        hasSpouse: boolean
    }
}

export interface WorkNatureButtonClick {
    type: 'WORK_NATURE_BUTTON_CLICK',
    payload: {
        index: number
    }
}

export interface MatchJobGroupRequest {
    type: 'MATCH_JOB_GROUP_REQUEST'
    payload: {
        keyword: string
    }
}

export interface ReceiveJobGroupsAction {
    type: 'RECEIVE_JOB_GROUPS'
    payload: {
        jobGroups: JobGroup[]
    }
}

export type SpecifierAction =
    | LanguageTestAddAction
    | LanguageTestRemoveAction
    | LanguageTestChangeAction
    | LanguageTestScoreChangeAction

    | EducationAddAction
    | EducationRemoveAction
    | EducationStageChangeAction
    | EducationRegionChangeAction
    | EducationDurationChangeAction
    | EducationChangeGraduationDateAction

    | BirthYearChangeAction

    | WorkAddAction
    | WorkRemoveAction
    | WorkDurationChangeAction
    | WorkRegionChangeAction
    | WorkNatureButtonClick
    | MatchJobGroupRequest
    | ReceiveJobGroupsAction

    | SpouseExistenceChange

export function languageTestChangeAction(
    index: number,
    test: LanguageTestId
): LanguageTestChangeAction {
    return {
        type: 'LANGUAGE_TEST_CHANGE',
        payload: {
            index,
            test,
        }
    }
}

export function languageTestScoreChangeAction(
    index: number,
    item: LanguageTestItem,
    score: number,
): LanguageTestScoreChangeAction {
    return {
        type: 'Language_Test_Score_Change',
        payload: {
            index,
            item,
            score,
        }
    }
}

export function languageTestAddAction(): LanguageTestAddAction {
    return {
        type: 'LANGUAGE_TEST_ADD',
    }
}

export function languageTestRemoveAction(index: number): LanguageTestRemoveAction {
    return {
        type: 'LANGUAGE_TEST_REMOVE',
        payload: {
            index
        }
    }
}

export function educationAddAction(): EducationAddAction {
    return {
        type: 'EDUCATION_ADD'
    }
}

export function educationRemoveAction(index: number): EducationRemoveAction {
    return {
        type: 'EDUCATION_REMOVE',
        payload: {
            index
        }
    }
}


export function educationStageChangeAction(
    index: number, stage: EducationStage
): EducationStageChangeAction {
    return {
        type: 'EDUCATION_STAGE_CHANGE',
        payload: {
            stage,
            index
        }
    }
}

export function educationRegionChangeAction(
    index: number, region: RegionId
): EducationRegionChangeAction {
    return {
        type: 'EDUCATION_REGION_CHANGE',
        payload: {
            index,
            region,
        }
    }
}

export function educationDurationChangeAction(
    index: number, duration: Duration
): EducationDurationChangeAction {
    return {
        type: 'EDUCATION_DURATION_CHANGE',
        payload: {
            index,
            duration,
        }
    }
}

export function educationGraduationDateChangeAction(
    index: number, graduateYear: number
): EducationChangeGraduationDateAction {
    return {
        type: 'EDUCATION_CHANGE_GRADUATION_DATE',
        payload: {
            index,
            graduateYear,
        }
    }
}

export function birthYearChangeAction(year: number): BirthYearChangeAction {
    return {
        type: 'BIRTH_YEAR_CHANGE',
        payload: {
            year
        }
    }
}

export function workAdd(): WorkAddAction {
    return {
        type: 'WORK_ADD'
    }
}

export function workRemove(index: number): WorkRemoveAction {
    return {
        type: 'WORK_REMOVE',
        payload: {
            index
        }
    }
}

export function workDurationChangeAction(
    index: number,
    duration: Duration,
): WorkDurationChangeAction {
    return {
        type: 'WORK_DURATION_CHANGE',
        payload: {
            index,
            duration
        }
    }
}

export function workRegionChangeAction(
    index: number, region: RegionId
): WorkRegionChangeAction {
    return {
        type: 'WORK_REGION_CHANGE',
        payload: {
            index,
            region,
        }
    }
}

export function workNatureButtonClickAction(index: number): WorkNatureButtonClick {
    return {
        type: 'WORK_NATURE_BUTTON_CLICK',
        payload: {
            index
        }
    }
}

export function matchJobGroupRequestAction(keyword: string): MatchJobGroupRequest {
    return {
        type: 'MATCH_JOB_GROUP_REQUEST',
        payload: {
            keyword
        }
    }
}

export function receiveJobGroups(jobGroups: JobGroup[]): ReceiveJobGroupsAction {
    return {
        type: 'RECEIVE_JOB_GROUPS',
        payload: {
            jobGroups
        }
    }
}

export function fetchJobGroups(keyword: string) {
    keyword = keyword.toLowerCase()
    return function(dispatch: Dispatch<any>) {
        dispatch(matchJobGroupRequestAction(keyword))

        return fetch(`/job/?keyword=${keyword}`)
            .then(response => response.json())
            .then(json => dispatch(receiveJobGroups(json)))
    }
}

export function spouseExistenceChange(
    hasSpouse: boolean
): SpouseExistenceChange {
    return {
        type: 'SPOUSE_EXISTENCE_CHANGE',
        payload: {
            hasSpouse
        }
    }
}

