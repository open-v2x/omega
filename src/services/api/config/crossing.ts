import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// 获取路口列表
export async function fetchCrossingList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Config.CrossingItem>>(`v1/intersections`, {
    params,
  });
}

// 创建路口
export async function createCrossing(data: Config.CreateCrossingParams) {
  return apiService.post<Config.CrossingItem>(`v1/intersections`, data);
}

// 编辑路口
export async function updateCrossing(id: number, data: Config.CreateCrossingParams) {
  return apiService.put<Config.CrossingItem>(`v1/intersections/${id}`, data);
}

// 删除路口
export async function deleteCrossing(id: number) {
  return apiService.delete(`v1/intersections/${id}`);
}

// 路口详情
export async function fetchCrossing(id: number) {
  return apiService.get<Config.CrossingItem>(`v1/intersections/${id}`);
}
