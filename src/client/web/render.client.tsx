import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import VisaPlanner from './components/VisaPlanner'
import '../utils/assign-polyfill'
import { INITIAL_STATE, VisaPlannerState } from '../reducers'

import '../utils/normalize.css'
import '../utils/global.css'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const REDUX_STATE_KEY = 'redux_state'

let state: VisaPlannerState
const preloadedState = (window as any)['__WKM_PRELOADED_STATE__']
if (preloadedState) {
    state = preloadedState
}
else {
    const persistedStateString = localStorage.getItem(REDUX_STATE_KEY)
    const shouldForceResetReduxState = location.href.indexOf('reset') > -1
    if (persistedStateString && !shouldForceResetReduxState) {
        state = JSON.parse(persistedStateString)
        state.ui.jobGroupMatchingSearchResults = []
    }
    else {
        state = INITIAL_STATE
    }
}

delete (window as any).__WKM_PRELOADED_STATE__

export const store = createStore<VisaPlannerState>(
    reducer,
    state,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
)

store.subscribe(() => {
    localStorage.setItem(REDUX_STATE_KEY, JSON.stringify(store.getState()))
})

ReactDom.render(
    <Provider store={store}>
        <VisaPlanner />
    </Provider>,
    document.getElementById('react-entry'),
)
