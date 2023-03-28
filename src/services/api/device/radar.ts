import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 雷达列表
export async function radarList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.CameraListItem>>(`v1/radars`, {
    params,
  });
}

// 创建雷达
export async function createRadar(data: Device.RadarItem) {
  return apiService.post<Device.RadarItem>(`v1/radars`, data);
}

// 编辑雷达
export async function updateRadar(id: number, data: Device.RadarItem) {
  return apiService.patch<Device.RadarItem>(`v1/radars/${id}`, data);
}

// 删除雷达
export async function deleteRadar(id: number) {
  return apiService.delete(`v1/radars/${id}`);
}

// 获取雷达详情
export async function getRadarDetail(id: number | string) {
  return apiService.get<Device.RadarItem>(`v1/radars/${id}`);
}
