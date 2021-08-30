import moment from 'moment'
import { toast } from 'react-toastify'
import { getSession, removeSession, SessionKey } from 'services/securityService'
import { decodeJWT } from 'utils/commonUtil'

import { SET_AUTH_FAIL, SET_AUTH_USER } from '../types/AuthActionTypes'

// Validate JWT
export const validateJWT = () => (dispatch) => {
  let validate = false

  try {
    const token = getSession(SessionKey.AUTH_TOKEN)
    if (!token) {
      dispatch({
        type: SET_AUTH_USER,
        payload: null
      })
    } else {
      if (!moment.unix(decodeJWT(token).exp).isAfter(moment())) {
        removeSession([SessionKey.AUTH_TOKEN])

        dispatch({
          type: SET_AUTH_USER,
          payload: null
        })

        toast.error('The session has expired.')
      } else {
        dispatch({
          type: SET_AUTH_USER,
          payload: decodeJWT(token)
        })
        validate = true
      }
    }
  } catch (err) {
    dispatch({
      type: SET_AUTH_FAIL
    })
  }

  return validate
}

// Login user action
export const setAuthUser = () => (dispatch) => {
  try {
    const authToken = getSession(SessionKey.AUTH_TOKEN)
    dispatch({
      type: SET_AUTH_USER,
      payload: authToken ? decodeJWT(authToken) : null
    })
  } catch (err) {
    dispatch({
      type: SET_AUTH_FAIL
    })
  }
}
