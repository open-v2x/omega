import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

// 创建摄像头
export async function createCamera(data: Device.CreateCameraParams) {
  return apiService.post<Device.CameraListItem>(`v1/cameras`, data);
}

// 编辑摄像头
export async function updateCamera(id: number, data: Device.CreateCameraParams) {
  return apiService.patch<Device.CameraListItem>(`v1/cameras/${id}`, data);
}

// 删除摄像头
export async function deleteCamera(id: number) {
  return apiService.delete(`v1/cameras/${id}`);
}

// 获取摄像头详情
export async function getCameraDetail(id: number | string) {
  return apiService.get<Device.CameraItem>(`v1/cameras/${id}`);
}

// 摄像头列表
export async function cameraList({
  countryName,
  ...params
}: API.PageParams & { countryName?: string[]; intersectionCode?: string; rsuId?: number }) {
  if (countryName?.length) {
    params.intersectionCode = countryName[countryName.length - 1];
  }
  return apiService.get<IResponseListData<Device.CameraListItem>>(`v1/cameras`, {
    params,
  });
}
