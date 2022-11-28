import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// spat 列表
export async function spatList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; areaCode?: string }) {
  if (countryName?.length) {
    params.areaCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Device.SpatListItem>>(`v1/spats`, {
    params,
  });
}

// 创建 spat
export async function createSpat(data: Device.CreateSpatItem) {
  return apiService.post<Device.SpatListItem>(`v1/spats`, data);
}

// 编辑 spat
export async function updateSpat(id: number, data: Device.CreateSpatItem) {
  return apiService.put<Device.SpatListItem>(`v1/spats/${id}`, data);
}

// 删除 spat
export async function deleteSpat(id: number) {
  return apiService.delete(`v1/spats/${id}`);
}

// 启用激光雷达
export async function enabledSpat(id: number, data: Device.CreateSpatItem) {
  return apiService.post(`v1/spats/${id}`, data);
}
