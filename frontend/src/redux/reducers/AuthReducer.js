import { isEmpty } from 'lodash-es'
import { SET_AUTH_FAIL, SET_AUTH_USER } from '../types/AuthActionTypes'

const defaultState = {
  isAuthenticated: false,
  authUser: null
}

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        authUser: action.payload
      }
    case SET_AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authReducer
