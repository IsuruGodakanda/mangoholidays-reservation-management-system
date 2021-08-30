import CryptoJS from 'crypto-js'
import jwt_decode from 'jwt-decode'
import { isEmpty } from 'lodash-es'
import Validator from 'validator'

const secretKey = process.env.REACT_APP_SECRET || ''

export const isEmail = (value) => {
  if (!isEmpty(value)) {
    return Validator.isEmail(value)
  }
  return false
}

export const encodeData = (value) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString()
}

export const decodeData = (token) => {
  return CryptoJS.AES.decrypt(token, secretKey).toString(CryptoJS.enc.Utf8)
}

export const decodeJWT = (token) => {
  return jwt_decode(token)
}

export const camelCaseToNormalString = (word) => {
  const separatedString = word.replace(/[A-Z]/g, (m) => ` ${m.toLowerCase()}`)
  return separatedString.charAt(0).toUpperCase() + separatedString.slice(1)
}

export const camelCaseToUnderscoreSeperated = (word) => {
  return word.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
}

export const toQueryString = (queryObject) => {
  let queryString = ''
  Object.entries(queryObject).forEach(([key, val]) => {
    if (val || val === 0) {
      queryString += `${camelCaseToUnderscoreSeperated(key)}=${val}&`
    }
  })

  return queryString && `?${queryString.slice(0, -1)}`
}

export const isLength = (value = '', min = 0, max = 30) => {
  return Validator.isLength(value, min, max)
}

export const isAtLeastOneNumber = (value) => {
  let regex = /(?=.*\d)/

  return regex.test(value)
}

export const isAtLeastOneLowerCase = (value) => {
  let regex = /(?=.*[a-z])/

  return regex.test(value)
}

export const isAtLeastOneUpperCase = (value) => {
  let regex = /(?=.*[A-Z])/

  return regex.test(value)
}

export const generateListOptionsByNumner = (number) => {
  return [...Array(number).keys()].map((x) => {
    return { label: `${x + 1}`, value: x + 1 }
  })
}

export const generateListOptionsByJson = (json) => {
  let optionArray = []

  Object.entries(json).forEach(([key]) => {
    optionArray.push({ label: json[key], value: key })
  })

  return optionArray
}

export const generateListOptionsByDataObject = (json, label, value) => {
  let optionArray = []

  json.forEach((item) => {
    optionArray.push({ label: item[label], value: item[value] })
  })

  return optionArray
}

export const setDateString = (date) => {
  const dt = new Date(date)
  const month = dt.getMonth() + 1
  const day = dt.getDate()
  const year = dt.getFullYear()
  return `${Math.trunc(month / 10) === 0 ? `0${month}` : month}/${Math.trunc(day / 10) === 0 ? `0${day}` : day}/${year}`
}
