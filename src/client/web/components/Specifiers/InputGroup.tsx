import * as React from 'react'

const inputStyle: React.CSSProperties = {
    display: 'inline-block',
    border: '1px solid black',
    width: '100%',
    height: '2em',
    background: 'white',
    borderRadius: '5px'
}

const InputGroup: React.StatelessComponent<{
    title: string,
    value: any,
    standAlone?: boolean
    type?: 'button'
    onAction(event: React.ChangeEvent<any>): void
}> = props => {
    let input
    if (props.type === 'button') {
        input = (
            <button
                style={inputStyle}
                onClick={props.onAction}
            >
                {props.children}
            </button>
        )
    }
    else {
        input = (
            <select
                value={props.value}
                onChange={props.onAction}
                style={inputStyle}
            >
                {props.children}
            </select>
        )
    }
    return (
        <label style={{
            display: props.standAlone ? 'block' : 'inline-block',
            margin: '0.2em',
            width: '40%',
            maxWidth: '8em',
        }}>
            {props.title &&
                <span style={{
                    lineHeight: '1.5',
                    fontWeight: 'lighter',
                }}>
                    {props.title}
                    <br />
                </span>
            }
            {input}
        </label>
    )
}

export default InputGroup
