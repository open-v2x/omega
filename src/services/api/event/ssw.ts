import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
export async function getSSWList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.SpeedWarningListItem>>(`v1/ssw`, { params });
}
