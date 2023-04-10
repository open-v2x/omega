import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 激光雷达列表
export async function lidarList(params: API.PageParams & { rsuId?: number }) {
  return apiService.get<IResponseListData<Device.LidarItem>>(`v1/lidars`, {
    params,
  });
}

// 创建激光雷达
export async function createLidar(data: Device.LidarItem) {
  return apiService.post<Device.LidarItem>(`v1/lidars`, data);
}

// 编辑激光雷达
export async function updateLidar(id: number, data: Device.LidarItem) {
  return apiService.patch<Device.LidarItem>(`v1/lidars/${id}`, data);
}

// 删除雷达
export async function deleteLidar(id: number) {
  return apiService.delete(`v1/lidars/${id}`);
}

// 获取激光雷达详情
export async function getLidarDetail(id: number | string) {
  return apiService.get<Device.LidarItem>(`v1/lidars/${id}`);
}
