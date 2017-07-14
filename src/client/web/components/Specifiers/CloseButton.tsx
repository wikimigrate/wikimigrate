import * as React from 'react'

const sideLength = '1em'

const closeButtonStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: '20px',
    margin: 'auto',

    height: sideLength,
    width: sideLength,
    lineHeight: sideLength,
    borderRadius: '50%',

    background: 'rgba(0, 0, 0, 0.2)',
    color: 'white',

    fontSize: '3em',
    textAlign: 'center',

    cursor: 'pointer',
}

const crossStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: `calc(${sideLength} / 2)`,
}

const CloseButton = (props: {onClose: (event: any) => void}) => (
    <div
        style={closeButtonStyle}
        onClick={props.onClose}
    >
        <img
            style={crossStyle}
            src={require('../../../assets/cross.svg')}
        />
    </div>
)

export default CloseButton

