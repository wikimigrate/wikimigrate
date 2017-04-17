import {FilterId, OptionId} from "../data"
import {Path} from "../utils/definitions"

export interface MenuClickAction {
    type: "FILTER_OPTION_CLICK"
    payload: {
        filterId: FilterId
        optionId: OptionId
    }
}

export interface FilterSelectAction {
    type: "FILTER_SELECT"
    payload: {
        filterId: FilterId,
        value: string,
    }
}

export interface FilterBarClick {
    type: "FILTER_BAR_CLICK"
}

export interface ShadeClick {
    type: "SHADE_CLICK"
}

export interface PathBoxClick {
    type: "PATH_BOX_CLICK",
    payload: {
        path: Path
    }
}

export interface PathViewCloseButtonClick {
    type: "PATH_VIEW_CLOSE_BUTTON_CLICK"
}

export interface FilterPanelRender {
    type: "FILTER_PANEL_RENDER",
    payload: {
        height: number
    }
}

export interface KeyDown {
    type: "KEY_DOWN",
    payload: {
        keyCode :number
    }
}

export type Action =
    MenuClickAction
    | FilterSelectAction
    | FilterBarClick
    | FilterPanelRender
    | ShadeClick
    | PathBoxClick
    | PathViewCloseButtonClick
    | KeyDown

export function filterOptionClickAction(filterId: FilterId, optionId: OptionId): MenuClickAction {
    return {
        type: "FILTER_OPTION_CLICK",
        payload: {
            filterId,
            optionId,
        }
    }
}

export function filterSelect(filterId: FilterId, value: string): FilterSelectAction {
    return {
        type: "FILTER_SELECT",
        payload: {
            filterId,
            value
        }
    }
}

export function filterPanelRenderAction(height: number): FilterPanelRender {
    return {
        type: "FILTER_PANEL_RENDER",
        payload: {
            height
        }
    }
}

export function filterBarClickAction(): FilterBarClick {
    return {
        type: "FILTER_BAR_CLICK"
    }
}

export function shadeClickAction(): ShadeClick {
    return {
        type: "SHADE_CLICK"
    }
}

export function pathBoxClickAction(path: Path): PathBoxClick {
    return {
        type: "PATH_BOX_CLICK",
        payload: {
            path
        }
    }
}

export function pathViewCloseButtonClickAction(): PathViewCloseButtonClick {
    return {
        type: "PATH_VIEW_CLOSE_BUTTON_CLICK",
    }
}

export function keyDownAction(keyCode: number): KeyDown {
    return {
        type: "KEY_DOWN",
        payload: {
            keyCode
        }
    }
}
