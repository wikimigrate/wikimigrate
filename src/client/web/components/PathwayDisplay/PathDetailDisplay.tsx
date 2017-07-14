import * as React from 'react'
import TransitionDisplay from './TransitionDisplay'

import { Pathway } from '../../../utils/definitions'
import { Person } from '../../../../definitions/Person'
import { LangId } from '../../../../definitions/auxiliary/MultiLang'
import CloseButton from '../Specifiers/CloseButton'

const style = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    padding: '0.5em',
    overflow: 'scroll',

    background: '#ebebeb',
    zIndex: 1,
} as React.CSSProperties

interface Props {
    user: Person
    pathOnDisplay: Pathway | null
    onClose: (event: any) => void
    lang: LangId
}

class PathwayDisplay extends React.PureComponent<Props, {}> {

    render() {
        if (this.props.pathOnDisplay) {
            return (
                <article style={style}>
                    {
                        this.props.pathOnDisplay.transitions.map(
                            transition =>
                                <TransitionDisplay
                                    user={this.props.user}
                                    transition={transition}
                                    key={transition.id}
                                    lang={this.props.lang}
                                />,
                        )
                    }
                    <CloseButton onClose={this.props.onClose}/>
                </article>
            )
        }
        else {
            return null
        }
    }

}

export default PathwayDisplay
