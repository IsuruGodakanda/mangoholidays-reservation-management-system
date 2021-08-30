import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import RootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
  RootReducer,
  initialState,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
)

export default store
