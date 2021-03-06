import { Procedure } from '../../../../definitions/auxiliary/Paperwork'

// @see http://www.cic.gc.ca/english/immigrate/skilled/candidate.asp
export const candidacy: Procedure[] = [
    {
        id: 'check_eligibility',
        name: {
            en: 'Check eligibility',
            zh_hans: '确认符合申请资格',
        },
        instruction: {
            link: {
                url: 'http://www.cic.gc.ca/ctc-vac/ee-start.asp'
            }
        }
    },
    {
        id: 'create_profile',
        name: {
            en: 'Create Express Entry Profile',
            zh_hans: '设立Express Entry档案',
        },
    },
]

// @see http://www.cic.gc.ca/english/immigrate/skilled/apply-how.asp
export const application: Procedure[] = [
    {
        id: 'fill_form',
        name: {
            en: 'Fill out the online form',
            zh_hans: '填写申请表',
        },
    },
    {
        id: 'prepare_documents',
        name: {
            en: 'Get all the documents you need',
            zh_hans: '准备申请材料'
        }
    },
    {
        id: 'pay',
        name: {
            en: 'Pay your fees',
            zh_hans: '支付费用',
        }
    },
    {
        id: 'submit',
        name: {
            en: 'Submit your complete application',
            zh_hans: '提交申请',
        }
    }
]

export const expressProcedures: Procedure[] = [
    ...candidacy,
    {
        id: 'wait',
        name: {
            en: 'Wait for invitation',
            zh_hans: '等待邀请',
        },
    },
    ...application,
]
