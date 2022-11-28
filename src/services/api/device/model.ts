import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData.d';
// RSU 型号列表
export async function modelList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.ModelListItem>>(`v1/rsu_models`, {
    params,
  });
}

// 添加 RSU 型号
export async function createModel(body: Device.ModelListItem) {
  return apiService.post<Device.ModelListItem>(`v1/rsu_models`, body);
}

// 编辑 RSU 型号
export async function updateModel(id: number, body: Device.ModelListItem) {
  return apiService.put<Device.ModelListItem>(`v1/rsu_models/${id}`, body);
}

// RSU 型号详情
export async function modelInfo(id: number) {
  return apiService.get<Device.ModelListItem>(`v1/rsu_models/${id}`);
}

// 删除 RSU 型号
export async function deleteModel(id: number) {
  return apiService.delete(`v1/rsu_models/${id}`);
}
