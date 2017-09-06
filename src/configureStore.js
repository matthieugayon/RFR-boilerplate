import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { connectRoutes } from 'redux-first-router'
import ReduxThunk from 'redux-thunk'
import { combineForms } from 'react-redux-form'

import routesMap from './routesMap'
import options from './options'
import * as reducers from './reducers'
import * as actionCreators from './actions'
import * as forms from './forms'

import api from './middlewares/api'

// exported reference to the redux store
export let store = null

export default (history, preLoadedState) => {
  const {
    reducer,
    middleware,
    enhancer,
    thunk } = connectRoutes(
      history,
      routesMap,
      options
    )

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer,
    forms: combineForms({
      ...forms
    }, 'forms')
  })

  const middlewares = applyMiddleware(middleware, ReduxThunk, api)
  const enhancers = composeEnhancers(enhancer, middlewares)
  store = createStore(rootReducer, preLoadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers/index')
      const rootReducer = combineReducers({ ...reducers, location: reducer })
      store.replaceReducer(rootReducer)
    })
  }

  return { store, thunk }
}

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args)
