import baseAPIService from './baseAPI';
import { toQueryString } from 'utils/commonUtil';

const reservationURL = '/reservations';

export const addReservation = async (payload) => {
  return baseAPIService('POST', `${reservationURL}`, payload);
};

export const getAuthReservations = async (searchQuery = {}) => {
  return baseAPIService('GET', `${reservationURL}/auth${toQueryString(searchQuery)}`);
};

export const setPaymentMethod = async (id, payload) => {
  return baseAPIService('PUT', `${reservationURL}/${id}/setpaymentmethod`, payload);
};

export const cancelReservation = async (id) => {
  return baseAPIService('PUT', `${reservationURL}/${id}/cancel`);
};
