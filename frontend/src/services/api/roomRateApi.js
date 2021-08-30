import baseAPIService from './baseAPI';

const roomeRateURL = '/roomrates';

export const getRoomRate = async (boardId, sizeId) => {
  return baseAPIService('GET', `${roomeRateURL}/${boardId}/${sizeId}`);
};
