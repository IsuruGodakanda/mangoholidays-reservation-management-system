import baseAPIService from './baseAPI';

const roomBoardURL = '/roomboards';

export const listRoomBoards = async () => {
  return baseAPIService('GET', `${roomBoardURL}`);
};
