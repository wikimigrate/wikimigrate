import data from '../../data'

import * as React from 'react'
import {connect, Dispatch} from 'react-redux'

import TopBar from './TopBar'
import Title from './Title'
import PathShowcase from './PathShowcase'
import FilterBar from './Filters/FilterBar'
import PathDetailDisplay from './PathDetailDisplay'
import FilterDetailedOptionPanel from './Filters/FilterDetailedOptionPanel'
import Shade from './Shade'
import sys from '../sys'

import {
    Path,
} from '../utils/definitions'

import calcSuitablePaths from "../utils/calcSuitablePaths"

import {VisaPlannerState} from "../reducers"
import {Person} from "../../definitions/Person"
import {filterBarClickAction} from "../actions/index"
import {Region} from "../../definitions/auxillary/Region"

const style = {
    position: "relative",
    margin: 0,
    padding: 0,
    height: sys.ua.ios_safari ? "calc(100vh - 69px)" : "100vh",

    overflow: "hidden",
    display: "flex",
    flexFlow: "column",

    fontSize: 14,
    color: "#212121",
    fontFamily: "sans-serif",
} as React.CSSProperties

interface PropTypes {
    user: Person
    pathOnDisplay: Path | null
    onFilterBarClick: () => void
    filterPanelHeight: number | null
    shouldDetailedFilterPanelExpand: boolean
}

const allTransitions = data.regions.map((region: Region) => region.transitionList).reduce(
    (prev, nextArray) => prev.concat(nextArray),
    []
)

class VisaPlanner extends React.Component<PropTypes, {}> {

    boxClick(path: Path): void {
        this.setState({
            pathOnDisplay: path
        })
    }

    render() {

        const shouldShadeShow = this.props.shouldDetailedFilterPanelExpand

        return (
            <div style={style}>
                <TopBar
                    brandName={data.app.brandName[data.app.lang]}
                    version={data.app.version}
                />
                <Title text={
                    "Popular mobility options"
                } />
                <div style={{
                    overflow: "scroll"
                }}>
                    <PathShowcase
                        paths={calcSuitablePaths(this.props.user, allTransitions)}
                        boxClick={this.boxClick.bind(this)}
                    />
                    <PathDetailDisplay
                        pathOnDisplay={this.props.pathOnDisplay}
                        onClose={
                            () => this.setState({
                                pathOnDisplay: null
                            })
                        }
                    />
                </div>
                <Shade shouldShow={shouldShadeShow} />
                <FilterBar
                    onClick={this.props.onFilterBarClick}
                    offset={
                        this.props.shouldDetailedFilterPanelExpand
                        ? this.props.filterPanelHeight
                        : 0
                    }
                />
                <FilterDetailedOptionPanel />
            </div>
        )
    }
}

function mapStateToProps(state: VisaPlannerState): Partial<PropTypes> {
    return {
        user: state.user,
        pathOnDisplay: state.ui.pathOnDisplay,
        filterPanelHeight: state.ui.filterPanelHeight,
        shouldDetailedFilterPanelExpand: state.ui.shouldDetailedFilterPanelExpand,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): Partial<PropTypes> {
    return {
        onFilterBarClick() {
            dispatch(filterBarClickAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaPlanner)
