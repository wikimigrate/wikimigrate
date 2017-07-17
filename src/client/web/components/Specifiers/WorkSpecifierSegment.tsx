import * as React from 'react'

import { WorkExperienceQuality } from '../../../../definitions/Qualities/WorkExperience'
import { WorkSpecifiersCallbacks } from './SpecifierPanel'
import { RegionId } from '../../../../definitions/auxiliary/Region'

import IconButton from './IconButton'

import { text } from '../../../utils/text'
import range from '../../../utils/range'
import inflect from '../../../utils/inflect'
import { duration } from '../../../../definitions/auxiliary/Duration'

import { activeRegionOptions } from '../../../data'
import { data } from '../../../../data'
import { specifierSharedStyles } from './specifierSharedStyles'
import InputGroup from './InputGroup'

interface WorkExperienceSpecifierBodyProps extends WorkSpecifiersCallbacks {
    work: WorkExperienceQuality
    index: number
    workRemove(index: number): void
}

const texts = {
    duration: {
        en: 'Duration',
        zh_hans: '时长'
    },
    region: {
        en: 'Region',
        zh_hans: '地区'
    },
    nature: {
        en: 'Nature',
        zh_hans: '性质'
    }
}

const WorkSpecifierSegment = (props: WorkExperienceSpecifierBodyProps) => (
    <div style={specifierSharedStyles.containerStyles}>
        <IconButton
            icon='–'
            onClick={() => props.workRemove(props.index)}
            additionalStyle={specifierSharedStyles.deleteButtonStyle}
        />

        <InputGroup
            title={text(texts.duration)}
            value={props.work.duration.value}
            onAction={event => props.workDurationChange(
                props.index,
                duration(Number(event.target.value), 'year')
            )}
        >
            {
                range(1, 30).map(year =>
                    <option value={year} key={year}>
                        {year + ' ' + inflect(text({
                            en: 'year'
                        }), { number: year })}
                    </option>
                )
            }
        </InputGroup>

        <InputGroup
            title={text(texts.region)}
            value={props.work.region}
            onAction={event => props.workRegionChange(
                props.index,
                event.target.value as RegionId
            )}
        >
            {activeRegionOptions.map((region: RegionId) => {
                const regionObj = data.getRegionById(region)
                if (regionObj) {
                    return (
                        <option value={region} key={region}>
                            {text(regionObj.name)}
                        </option>
                    )
                }
                return null
            })}
            <option value={'world'}>
                {text({
                    en: 'Elsewhere',
                    zh_hans: '其他地区'
                })}
            </option>
        </InputGroup>

        <InputGroup
            title={text(texts.nature)}
            value={props.work.region}
            onAction={() => props.workNatureButtonClick(props.index)}
            type='button'
        >
            {props.work.matchedJobGroups
                ? text({
                    en: 'Modify',
                    zh_hans: '修改',
                })
                : text({
                    en: 'Set',
                    zh_hans: '设定'
                })
            }
        </InputGroup>
    </div>
)

export default WorkSpecifierSegment
