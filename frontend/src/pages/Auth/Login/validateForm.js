import { isEmpty } from 'lodash-es'
import { isEmail } from 'utils/commonUtil'

const validateForm = (loginData) => {
  const errors = {}

  if (!isEmail(loginData.email)) {
    errors.email = 'Email is invalid'
  }

  if (isEmpty(loginData.email)) {
    errors.email = 'Email is required'
  }

  if (isEmpty(loginData.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateForm
