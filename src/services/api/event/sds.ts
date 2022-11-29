import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

export async function sensorDataSharingList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.ICWListItem>>(`v1/rsi_sdss`, {
    params,
  });
}
