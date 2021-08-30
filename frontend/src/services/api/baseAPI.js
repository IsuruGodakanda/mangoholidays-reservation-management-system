import axios from 'axios'
import { getSession, removeSession, SessionKey } from '../securityService'

const baseAPI = async (method, url, payload, otherHeaders) => {
  let result = null

  const headers = getSession(SessionKey.AUTH_TOKEN)
    ? {
        Authorization: `Bearer ${getSession(SessionKey.AUTH_TOKEN)}`,
        ...otherHeaders
      }
    : { ...otherHeaders }

  const dataOrParams = ['POST', 'PUT'].includes(method) ? 'data' : 'params'

  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

  await axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: payload
    })
    .then((response) => {
      result = response.data
    })
    .catch((error) => {
      result = error.response
      if (
        error.response &&
        (error.response.status === 403 || (error.response.status === 401 && getSession(SessionKey.AUTH_TOKEN)))
      ) {
        removeSession([SessionKey.AUTH_TOKEN])
        window.location.replace('/')
      } else if (error.response && error.response.status === 500) {
        throw new Error(`{"code": "${error.response.status}","message": "Something went wrong! Try again" }`)
      } else {
        throw new Error(`{"code": "${error.response.status}","message": "${error.response.data.message}" }`)
      }
    })

  return result
}

export default baseAPI
