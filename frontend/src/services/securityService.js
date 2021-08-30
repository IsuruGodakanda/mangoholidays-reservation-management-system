import { decodeData, encodeData } from '../utils/commonUtil';

const isVerifySession = () => {
  try {
    const decoded = JSON.parse(decodeData(localStorage.session));
    if (decoded.userAgent === navigator.userAgent) {
      return decoded;
    }
    localStorage.clear();
    window.location.replace('/');
    return null;
  } catch (error) {
    localStorage.clear();
    window.location.replace('/');
    return null;
  }
};

// Set Single key value
export const setSession = (json) => {
  if (localStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      const mergeResult = { ...existingSession, ...json };

      localStorage.setItem('session', encodeData(JSON.stringify(mergeResult)));
    }
  } else {
    const agent = { userAgent: navigator.userAgent };
    const mergeResult = { ...json, ...agent };

    localStorage.setItem('session', encodeData(JSON.stringify(mergeResult)));
  }
};

// Retrieve session data
export const getSession = (key) => {
  if (localStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      return existingSession[key];
    }
  }
  return null;
};

// Remove session data
export const removeSession = (keyArray) => {
  if (localStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      keyArray.forEach((key) => {
        delete existingSession[key];
      });

      localStorage.setItem('session', encodeData(JSON.stringify(existingSession)));
    }
  }
};

// Set session keys
export const SessionKey = {
  AUTH_TOKEN: 'authToken',
  REDIRECT_PATH: 'redirectPath'
};
