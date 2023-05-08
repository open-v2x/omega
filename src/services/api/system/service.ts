import { apiService } from '#/services/BaseService';

export async function getEndpoints() {
  return apiService.get('v1/endpoints');
}
