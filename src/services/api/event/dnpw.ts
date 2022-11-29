import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

export async function overtakingWarningList(params: API.PageParams) {
  return apiService.get<IResponseListData<Event.RSMListItem>>(`v1/rsi_dnps`, {
    params,
  });
}
