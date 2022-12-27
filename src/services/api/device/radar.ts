import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 雷达列表
export async function radarList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; intersectionCode?: string }) {
  if (countryName?.length) {
    params.intersectionCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Device.CameraListItem>>(`v1/radars`, {
    params,
  });
}

// 创建雷达
export async function createRadar(data: Device.CreateCameraParams) {
  return apiService.post<Device.CameraListItem>(`v1/radars`, data);
}

// 编辑雷达
export async function updateRadar(id: number, data: Device.CreateCameraParams) {
  return apiService.put<Device.CameraListItem>(`v1/radars/${id}`, data);
}

// 删除雷达
export async function deleteRadar(id: number) {
  return apiService.delete(`v1/radars/${id}`);
}
