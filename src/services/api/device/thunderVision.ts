import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';
export async function getThunderVisionList(params?: API.PageParams & { rsuID: string | number }) {
  return apiService.get<IResponseListData<Device.ThunderVisionItem>>(`v1/radar_cameras`, {
    params,
  });
}

export async function createThunderVision(data) {
  return apiService.post(`v1/radar_cameras`, data);
}

export async function updateThunderVision(id: string | number, data) {
  return apiService.patch(`v1/radar_cameras/${id}`, data);
}

export async function deleteThunderVision(id: string | number) {
  return apiService.delete(`v1/radar_cameras/${id}`);
}

export async function getThunderVisionDetailById(id: string | number) {
  return apiService.get<Device.ThunderVisionItem>(`v1/radar_cameras/${id}`);
}
