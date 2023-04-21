import { apiService } from '#/services/BaseService';

export async function getMqttConfig() {
  return apiService.get<System.MqttConfig>(`v1/system_configs/edge/mqtt_config`);
}
