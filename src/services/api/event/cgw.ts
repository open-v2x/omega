import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
export async function getCGWList(params: { cgwLevel: number & API.PageParams }) {
  return apiService.get<IResponseListData<Event.CGWListItem>>(`v1/cgw`, { params });
}
