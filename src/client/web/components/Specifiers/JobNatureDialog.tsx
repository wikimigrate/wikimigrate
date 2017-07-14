import * as React from 'react'
import { JobGroup, JobGroupId } from '../../../../definitions/auxiliary/JobClassification'
import { text } from '../../../utils/text'

const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '70%',

    margin: 'auto',
    width: '90%',
    padding: '0.5em',

    background: 'white',
    boxShadow: '0 0 10px #aaa'
}

const buttonStyle: React.CSSProperties = {
    border: '1px solid black',
    marginRight: '2px',
}

interface Props {
    index: number | null
    onSearch(content: string): void
    onConfirm(content: string): void
    onCheckboxClick(index: number, jobGroup: JobGroup, checked: boolean): void
    previouslyMatchedGroups: JobGroupId[]
    searchResults: JobGroup[]
    jobGroupsCache: JobGroup[]
}

interface States {
    content: string
}

class JobNatureDialog extends React.PureComponent<Props, States> {

    constructor(props: Props) {
        super(props)
        this.state = {
            content: '',
        }
    }

    render() {
        if (this.props.index === null) {
            return null
        }

        let {
            previouslyMatchedGroups,
            searchResults,
            jobGroupsCache,
        } = this.props

        const jobGroupsData = searchResults.concat(jobGroupsCache)

        const JobGroupChecklistItem = (props: {jobGroup: JobGroup}) => (
            <label
                key={props.jobGroup.jobGroupId}
                style={{
                    display: 'block',
                    textIndent: '-1em',
                    marginLeft: '1em',
                }}
            >
                <input
                    type='checkbox'
                    value={props.jobGroup.jobGroupId}
                    checked={previouslyMatchedGroups.indexOf(props.jobGroup.jobGroupId) > -1}
                    onChange={event => {
                        const clickId = event.target.value as JobGroupId
                        const newGroup = jobGroupsData.find(jobGroup =>
                            jobGroup.jobGroupId === clickId
                        )
                        if (typeof this.props.index === 'number' && newGroup) {
                            this.props.onCheckboxClick(
                                this.props.index,
                                newGroup,
                                event.target.checked
                            )
                        }
                    }}
                />
                {text(props.jobGroup.title)}
            </label>
        )

        return (
            <div
                role='dialog'
                style={style}
            >
                <div style={{
                    textAlign: 'center'
                }}>
                    <input
                        type='text'
                        value={this.state.content}
                        onChange={event => this.setState({
                            content: event.target.value
                        })}
                        placeholder={text({
                            en: 'Describe your work',
                            zh_hans: '工作性质关键字'
                        })}
                        style={{
                            border: '1px solid #999',
                            padding: '3px',
                            marginRight: '2px'
                        }}
                    />
                    <button
                        onClick={() => this.props.onSearch(this.state.content)}
                        style={buttonStyle}
                    >
                        {text({
                            en: 'Search',
                            zh_hans: '搜索'
                        })}
                    </button>
                    <button
                        onClick={() => this.props.onConfirm(this.state.content)}
                        style={buttonStyle}
                    >
                        {text({
                            en: 'Close',
                            zh_hans: '关闭'
                        })}
                    </button>
                </div>
                <div style={{
                    margin: '1em',
                    height: 'calc(100% - 7em)',
                    width: '90%',
                    overflowY: 'scroll',
                }}>
                    {previouslyMatchedGroups
                        .map(id => jobGroupsData.find(group => group.jobGroupId === id))
                        .map(group => {
                            if (group) {
                                return <JobGroupChecklistItem key={group.jobGroupId} jobGroup={group} />
                            }
                            else {
                                console.warn('JobGroup not found:',
                                    'ids', previouslyMatchedGroups,
                                    'data', jobGroupsData,
                                )
                            }
                        })
                    }
                    {searchResults
                         .filter(group =>
                             previouslyMatchedGroups.indexOf(group.jobGroupId) === -1
                         )
                         .map(group =>
                             <JobGroupChecklistItem key={group.jobGroupId} jobGroup={group} />
                         )
                    }
                </div>
            </div>
        )
    }
}

export default JobNatureDialog
