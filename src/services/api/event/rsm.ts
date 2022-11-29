import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

// 事件信息列表
export async function roadSideMessageList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.RSMListItem>>(`v1/rsms`, {
    params,
  });
}
