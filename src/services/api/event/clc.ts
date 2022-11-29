import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

export async function cooperativeLaneChangeList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.ICWListItem>>(`v1/rsi_clcs`, {
    params,
  });
}
