import { IResponseListData } from '#/types/service/responseData';
import { apiService } from '#/services/BaseService';

// 创建 RSU 参数配置
export async function fetchAlgorithmList() {
  return apiService.get<IResponseListData<Config.AlgorithmListItem>>(`v1/algos`);
}
