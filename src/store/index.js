import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

import settingsReducer from './reducers/settingsReducer'
import toastifyReducer from './reducers/toastifyReducer'
import authReducer from './reducers/authReducer'
import gamesReducer from './reducers/gamesReducer'
import betslipReducer from './reducers/betslipReducer'
import scanReducer from './reducers/scanReducer'
import drawReducer from './reducers/drawReducer'

const allReducer = combineReducers({
  settings: settingsReducer,
  toastify: toastifyReducer,
  games: gamesReducer,
  auth: authReducer,
  betslip: betslipReducer,
  scan: scanReducer,
  draw: drawReducer
})

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const middleware = applyMiddleware(thunk)
const store = createStore(allReducer, composeEnhancers(middleware))

export default store
