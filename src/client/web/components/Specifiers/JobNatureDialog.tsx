import * as React from 'react'
import { JobGroup, JobGroupId } from '../../../../definitions/auxiliary/JobClassification'
import { text } from '../../../utils/text'

const style: React.CSSProperties = {
    position: 'absolute',
    margin: 'auto',
    width: '90%',
    height: '70%',
    background: 'white',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    boxShadow: '0 0 10px #aaa'
}

interface Props {
    index: number | null
    onSearch(content: string): void
    onConfirm(content: string): void
    onCheckboxClick(index: number, jobGroupId: JobGroupId, checked: boolean): void
    previouslyMatchedGroups: JobGroupId[]
    searchResults: JobGroup[]
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
            searchResults
        } = this.props
        return (
            <div
                role='dialog'
                style={style}
            >
                <h1>
                    Select one that fits
                </h1>
                <input
                    type='text'
                    value={this.state.content}
                    onChange={event => this.setState({
                        content: event.target.value
                    })}
                    style={{
                        border: '1px solid #999'
                    }}
                />
                <button
                    onClick={() => this.props.onSearch(this.state.content)}
                >
                    Search
                </button>
                <button
                    onClick={() => this.props.onConfirm(this.state.content)}
                >
                    Confirm
                </button>
                <div style={{
                    position: 'absolute',
                    bottom: '1em',
                    left: 0,
                    right: 0,
                    margin: 'auto',
                    height: 'calc(100% - 10em)',
                    width: '90%',
                    overflowY: 'scroll',
                }}>
                    {searchResults
                         .sort((group1, group2) =>
                             previouslyMatchedGroups.indexOf(group2.jobGroupId) -
                             previouslyMatchedGroups.indexOf(group1.jobGroupId)
                         )
                         .map(group => (
                            <label
                                key={group.jobGroupId}
                                style={{
                                    display: 'block',
                                    textIndent: '-1em',
                                    marginLeft: '1em',
                                }}
                            >
                                <input
                                    type='checkbox'
                                    value={group.jobGroupId}
                                    checked={previouslyMatchedGroups.indexOf(group.jobGroupId) > -1}
                                    onChange={event => {
                                        const clickId = event.target.value as JobGroupId
                                        const newGroup = searchResults.find(group =>
                                            group.jobGroupId === clickId
                                        )
                                        if (typeof this.props.index === 'number' && newGroup) {
                                            this.props.onCheckboxClick(
                                                this.props.index,
                                                newGroup.jobGroupId,
                                                event.target.checked
                                            )
                                        }
                                    }}
                                />
                                {text(group.title)}
                            </label>
                         ))
                    }
                </div>
            </div>
        )
    }
}

export default JobNatureDialog
