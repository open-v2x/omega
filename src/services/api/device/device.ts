import { apiService } from '#/services/BaseService';
import { MyAxiosRequestConfig } from '#/types/service/axios';
import { IResponseListData } from '#/types/service/responseData';

// RSU 设备列表
export async function deviceList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.DeviceListItem>>(`v1/rsus`, {
    params,
  });
}

export const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

// 未注册 RSU 设备列表
export async function notRegisterDeviceList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.DeviceListItem>>(`v1/rsu_tmps`, {
    params,
  });
}

export async function fetchCountries(params: API.CountryParams, config?: MyAxiosRequestConfig) {
  return apiService.get<any>(`v1/countries`, {
    params,
    ...config,
  });
}

// RSU 型号列表
export async function getModelList(params: API.PageParams) {
  return apiService.get<IResponseListData<Device.ModelListItem>>(`v1/rsu_models`, {
    params,
  });
}

// 添加 RSU 设备
export async function createDevice(data: Device.CreateDeviceParams) {
  return apiService.post<Device.DeviceListItem>(`v1/rsus`, data);
}

// RSU 设备详情-运行信息
export async function runningInfo(id: number) {
  return apiService.get<Device.DeviceRunningInfo>(`v1/rsus/${id}/running`);
}

// 编辑 RSU 设备
export async function updateDevice(id: number, data: Device.CreateDeviceParams) {
  return apiService.patch<Device.DeviceListItem>(`v1/rsus/${id}`, data);
}

// RSU 设备详情
export async function deviceInfo(id: number) {
  return apiService.get<Device.DeviceListItem>(`v1/rsus/${id}`);
}

// 删除 RSU 设备
export async function deleteDevice(id: number) {
  return apiService.delete(`v1/rsus/${id}`);
}

// 删除未注册 RSU 设备
export async function deleteTemporaryDevice(id: number) {
  return apiService.delete(`v1/rsu_tmps/${id}`);
}
