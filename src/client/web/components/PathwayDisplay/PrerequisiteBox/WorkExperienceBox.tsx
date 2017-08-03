import * as React from 'react'
import CombinationBox from '../CombinationBox'
import { WorkExperiencePrereq } from '../../../../../definitions/Prerequisites/WorkExperiencePrereq'
import inflect from '../../../../utils/inflect'
import { text } from '../../../../utils/text'
import { units } from '../../../../../data/common/units'
import { LangId } from '../../../../../definitions/auxiliary/MultiLang'
import australiaJobClassification from '../../../../../data/australia/jobClass'
import { JobGroup, JobGroupId } from '../../../../../definitions/auxiliary/JobClassification'
import { oneOf } from '../../../../../definitions/auxiliary/Combination'

function getJobGroup(jobGroupId: JobGroupId): JobGroup | null {
    if (jobGroupId === 'sol') {
        return australiaJobClassification.jobGroups['sol']
    }
    else {
        return null
    }
}

const WorkExperienceBox = (props: { prereq: WorkExperiencePrereq, lang: LangId }) => {
    const prereq = props.prereq
    const texts = {
        withinLast: text({
            en: 'With in the last',
            zh_hans: '过去',
        }),
    }
    return (
        <div>
            <div style={{marginBottom: '0.5em'}}>
                {
                    prereq.withinLast &&
                    `${texts.withinLast}
                     ${prereq.withinLast.value}
                     ${inflect(text(units[prereq.withinLast.unit].name), {number: prereq.withinLast.value})}, `
                }
                {
                    prereq.duration
                        ? `You have worked ${prereq.duration[1].value} ${inflect(
                            text(prereq.duration[1].unit),
                            {number: prereq.duration[1].value})} in:`
                        : text({
                            en: 'You have worked in',
                            zh_hans: '你在以下职业有工作经验'
                        })
                }
            </div>
            {
                prereq.jobGroups
                ? <CombinationBox
                      combo={oneOf(
                          prereq.jobGroups
                              .map(getJobGroup)
                              .filter(x => !!x)
                      )}
                      level={1}
                      lang={props.lang}
                  />
                : text({
                    en: 'any industries',
                    zh_hans: '任何行业'
                })
            }
        </div>
    )
}

export default WorkExperienceBox
