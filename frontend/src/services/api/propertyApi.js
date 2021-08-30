import baseAPIService from './baseAPI';
import { toQueryString } from 'utils/commonUtil';

const propertyURL = '/properties';

export const listProperties = async (searchQuery = {}) => {
  return baseAPIService('GET', `${propertyURL}${toQueryString(searchQuery)}`);
};

export const getProperty = async (id) => {
  return baseAPIService('GET', `${propertyURL}/${id}`);
};

export const getPropertyAvailability = async (id, filterQuery = {}) => {
  return baseAPIService('GET', `${propertyURL}/${id}/availability${toQueryString(filterQuery)}`);
};
