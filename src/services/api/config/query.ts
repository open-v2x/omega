import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// RSU 信息查询列表
export async function infoQueryList(params: API.PageParams) {
  return apiService.get<IResponseListData<Config.QueryListItem>>(`v1/rsu_queries`, {
    params,
  });
}

// 下发 RSU 信息查询指令
export async function createQueryInstruction(data: Config.CreateQueryParams) {
  return apiService.post<Config.QueryListItem>(`v1/rsu_queries`, data);
}

// RSU 信息查询详情
export async function infoQueryDetails(id: number) {
  return apiService.get<IResponseListData<Config.QueryInfoDetails>>(`v1/rsu_queries/${id}`);
}

// 删除信息查询
export async function deleteInfoQuery(id: number) {
  return apiService.delete(`v1/rsu_queries/${id}`);
}
