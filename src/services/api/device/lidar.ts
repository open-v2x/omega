import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
// 激光雷达列表
export async function lidarList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; intersectionCode?: string }) {
  if (countryName?.length) {
    params.intersectionCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Device.LidarListItem>>(`v1/lidars`, {
    params,
  });
}

// 创建激光雷达
export async function createLidar(data: Device.CreateLidarItem) {
  return apiService.post<Device.LidarListItem>(`v1/lidars`, data);
}

// 编辑激光雷达
export async function updateLidar(id: number, data: Device.CreateLidarItem) {
  return apiService.patch<Device.LidarListItem>(`v1/lidars/${id}`, data);
}

// 删除雷达
export async function deleteLidar(id: number) {
  return apiService.delete(`v1/lidars/${id}`);
}
