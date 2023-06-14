import { apiService } from '#/services/BaseService';
import { IResponseListData } from '#/types/service/responseData';

export async function fetchServiceTypes(params: API.PageParams) {
  return apiService.get<IResponseListData<Algorithm.ServiceType>>('v1/service_types', { params });
}

export async function fetchDeleteServiceType(id: number) {
  return apiService.delete(`v1/service_types/${id}`);
}

export async function fetchCreateServiceType(data: Algorithm.ServiceType) {
  return apiService.post('v1/service_types', data);
}

export async function fetchServiceList(params: API.PageParams) {
  return apiService.get<IResponseListData<Algorithm.ServiceItem>>('v1/services', { params });
}

export async function fetchDeleteServiceList(id: number) {
  return apiService.delete(`v1/services/${id}`);
}

export async function fetchCreateServiceList(data: Algorithm.ServiceItem) {
  return apiService.post('v1/services', data);
}

export async function fetchUpdateServiceList(id: number, data: Algorithm.ServiceItem) {
  return apiService.put(`v1/services/${id}`, data);
}

export async function fetchDeleteServiceEndpoint(id: number) {
  return apiService.delete(`v1/endpoints/${id}`);
}

export async function fetchEndpointList(params: API.PageParams) {
  return apiService.get('v1/endpoints', { params });
}

export async function fetchUpdateEndpoint(id: number, data: Algorithm.ServiceEndpoint) {
  return apiService.put(`v1/endpoints/${id}`, data);
}

export async function fetchCreateEndpoint(data: Algorithm.ServiceEndpoint) {
  return apiService.post('v1/endpoints', data);
}

export const getServiceTypes = async () => {
  const { data } = await fetchServiceTypes({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, name }: Algorithm.ServiceType) => ({ label: name, value: id }));
};

export const getServiceListWithSelect = async () => {
  const { data } = await fetchServiceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, name }: Algorithm.ServiceItem) => ({ label: name, value: id }));
};
