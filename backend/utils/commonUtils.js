import Validator from 'validator';

export const isEmail = (value) => {
  return Validator.isEmail(value);
};
