import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

export async function intersectionCollisionWarningList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.ICWListItem>>(`v1/rsi_cwms`, {
    params,
  });
}
