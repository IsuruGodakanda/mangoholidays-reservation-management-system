import baseAPIService from './baseAPI';

const authURL = '/auth';

export const signUp = async (payload) => {
  return baseAPIService('POST', `${authURL}/register`, payload);
};

export const login = async (payload) => {
  return baseAPIService('POST', authURL, payload);
};
