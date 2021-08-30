import { isEmpty } from 'lodash-es';
import { isEmail, isLength, isAtLeastOneLowerCase, isAtLeastOneNumber, isAtLeastOneUpperCase } from 'utils/commonUtil';

const validateForm = (signUpData) => {
  const errors = {};

  if (isEmpty(signUpData.name)) {
    errors.name = 'Name is required';
  }

  if (!isEmail(signUpData.email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(signUpData.email)) {
    errors.email = 'Email is required';
  }

  if (isEmpty(signUpData.password)) {
    errors.password = 'Password is required';
  }

  if (isEmpty(signUpData.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required';
  }

  if (!isAtLeastOneNumber(signUpData.password)) {
    errors.numberValidation = 'Have at least one number';
  }

  if (!isAtLeastOneLowerCase(signUpData.password)) {
    errors.lowerAlphaValidation = 'Have at least one lower case letter';
  }

  if (!isAtLeastOneUpperCase(signUpData.password)) {
    errors.upperAlphaValidation = 'Have at least one capital letter';
  }

  if (!isLength(signUpData.password, 8, 40)) {
    errors.lengthValidation = 'Be at least 8 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateForm;
