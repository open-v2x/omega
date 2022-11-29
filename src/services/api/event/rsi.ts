import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

// 事件信息列表
export async function eventInfoList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.RSIListItem>>(`v1/events`, {
    params,
  });
}

// 事件信息详情
export async function eventInfoDetail(id: number) {
  return apiService.get<Event.RSIDetails>(`v1/events/${id}`);
}
