import baseAPIService from './baseAPI';

const roomSizeURL = '/roomsizes';

export const listRoomSizes = async () => {
  return baseAPIService('GET', `${roomSizeURL}`);
};
