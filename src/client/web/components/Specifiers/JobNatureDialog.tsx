import * as React from 'react'

interface Props {
    index: number | null
    onClick(content: string): void
}

interface States {
    content: string
}

class JobNatureDialog extends React.PureComponent<Props, States> {

    constructor(props: Props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    render() {
        return (
            <div
                role='dialog'
                style={{
                    position: 'absolute',
                    margin: 'auto',
                    width: '90%',
                    height: '50%',
                    background: 'white',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    boxShadow: '0 0 10px #aaa'
                }}
            >
                <input
                    type='text'
                    value={this.state.content}
                    onChange={event => this.setState({
                        content: event.target.value
                    })}
                />
                <button
                    onClick={() => this.props.onClick(this.state.content)}
                >
                    Search
                </button>
            </div>
        )
    }
}

export default JobNatureDialog
