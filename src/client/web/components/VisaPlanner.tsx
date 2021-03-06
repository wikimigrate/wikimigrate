import data from '../../../data'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import TopBar from './TopBar'
import PathwayListDisplay from './PathwayListDisplay'
import PathwayDisplay from './PathwayDisplay'
import SpecifierPanel from './Specifiers/SpecifierPanel'
import Shade from './Shade'
import sys from '../sys'

import { Pathway, PathwayDescriptor } from '../../utils/definitions'

import { calcSuitablePaths } from '../../../calculators/calcSuitablePaths'

import { VisaPlannerState } from '../../reducers'

import { Person } from '../../../definitions/Person'
import {
    filterBarClickAction,
    keyDownAction,
    pathBoxClickAction,
    pathViewCloseButtonClickAction,
    shadeClickAction,
    urlpathChangeAction,
    titleFilterTextClickAction,
} from '../../actions'
import { setTextLang, text } from '../../utils/text'
import { LangId } from '../../../definitions/auxiliary/MultiLang'
import { formPath } from '../../utils/urlpath'
import { getDocumentTitle } from '../../utils/getDocumentTitle'

const style = {
    position: 'relative',
    margin: 0,
    padding: 0,
    height: sys.ua.iosSafari
        ? `calc(100vh - ${sys.dimensions.iosSafariBottomBarHeight}px)`
        : '100vh',

    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column',

    fontSize: 14,
    color: '#212121',
    fontFamily: 'sans-serif',
} as React.CSSProperties

interface PropTypes {
    user: Person
    lang: LangId
    pathwayOnDisplay: PathwayDescriptor | null
    onShadeClick: () => void
    onPathwayBoxClick: (path: Pathway) => void
    onPathViewCloseButtonClick: () => void
    onKeyDown: (keyCode: number) => void
    shouldDetailedFilterPanelExpand: boolean
    onUrlpathChange: (path: string) => void
    onTitleFilterTextClick(): void
}

const allTransitions = data.allTransitions

export class VisaPlanner extends React.Component<PropTypes, {}> {

    componentWillMount() {
        setTextLang(this.getCurrentLang())

        if (window.location.pathname !== '[ssr-fake-path]') {
            this.props.onUrlpathChange(window.location.pathname)
        }
        window.addEventListener('popstate', () =>
            this.props.onUrlpathChange(window.location.pathname),
        )
        window.onkeydown = (event: KeyboardEvent) =>
            this.props.onKeyDown(event.keyCode)
    }

    componentDidUpdate() {
        document.title = getDocumentTitle(this.props.pathwayOnDisplay, this.props.lang)
    }

    getPaths(pathwayDes: PathwayDescriptor | null): Pathway | null {
        if (!pathwayDes) {
            return null
        }
        return {
            transitions: pathwayDes.transitionIds.map(
                id => allTransitions.filter(transition => transition.id === id)[0],
            ),
        }
    }

    getCurrentLang(): LangId {
        if (this.props.lang) {
            return this.props.lang
        }
        else {
            // TODO: (1)Implement proper detection via Accept-Language
            // TODO: (2)Proper handling of Chinese tags
            const lang = window.navigator.language
            if (lang.indexOf('zh-cn') > -1) {
                return 'zh_hans'
            }
            else {
                return 'en'
            }
        }
    }

    componentWillReceiveProps(newProps: PropTypes) {
        if (newProps.pathwayOnDisplay) {
            const oldPath = window.location.pathname
            const path = formPath(newProps.pathwayOnDisplay)
            if (path !== oldPath) {
                window.history.pushState(null, document.title, path)
            }
        }
        if (!newProps.pathwayOnDisplay && this.props.pathwayOnDisplay) {
            if (window.location.pathname !== '/') {
                window.history.pushState(null, document.title, '/')
            }
        }
    }

    render() {
        setTextLang(this.getCurrentLang())
        const {
            user,
            lang,
            shouldDetailedFilterPanelExpand,
            pathwayOnDisplay,
            onPathViewCloseButtonClick,
            onShadeClick,
            onPathwayBoxClick,
        } = this.props

        return (
            <div style={style} id={'react-entry'}>
                <TopBar
                    brandName={text(data.app.brandName)}
                    version={data.app.version}
                />
                <PathwayListDisplay
                    paths={calcSuitablePaths(user, allTransitions)}
                    onClick={onPathwayBoxClick}
                    lang={lang}
                    onFilterTextClick={this.props.onTitleFilterTextClick}
                />
                <PathwayDisplay
                    user={user}
                    pathOnDisplay={this.getPaths(pathwayOnDisplay)}
                    onClose={onPathViewCloseButtonClick}
                    lang={lang}
                />
                <Shade
                    shouldShow={shouldDetailedFilterPanelExpand}
                    onClick={onShadeClick}
                />
                <SpecifierPanel />
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<PropTypes> {
    return {
        user: state.user,
        lang: state.ui.lang,
        pathwayOnDisplay: state.ui.pathwayOnDisplay,
        shouldDetailedFilterPanelExpand: state.ui.shouldSpecifierPanelExpand,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<PropTypes> {
    return {
        onShadeClick() {
            dispatch(shadeClickAction())
        },
        onPathwayBoxClick(path: Pathway) {
            dispatch(pathBoxClickAction(path))
        },
        onPathViewCloseButtonClick() {
            dispatch(pathViewCloseButtonClickAction())
        },
        onKeyDown(keyCode: number) {
            dispatch(keyDownAction(keyCode))
        },
        onUrlpathChange(path: string) {
            dispatch(urlpathChangeAction(path))
        },
        onTitleFilterTextClick() {
            dispatch(titleFilterTextClickAction())
        }
    }
}

export const ConnectedVisaPlanner = connect(mapStateToProps, mapDispatchToProps)(VisaPlanner)

export default ConnectedVisaPlanner
