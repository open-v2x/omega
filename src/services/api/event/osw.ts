import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
export async function getOSWList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.SpeedWarningListItem>>(`v1/osw`, { params });
}
