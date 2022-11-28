import { deviceList } from '#/services/api/device/device';
import create from 'zustand';

interface IRequestStore {
  fetchDeviceListInModal: () => Promise<{ label: string; value: number }[]>;
}

const useRequestStore = create<IRequestStore>(() => ({
  fetchDeviceListInModal: async () => {
    const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
    return data.map(({ id, rsuName, rsuEsn }: Device.DeviceListItem) => ({
      label: `${rsuName}（Esn: ${rsuEsn}）`,
      value: id,
    }));
  },
}));

export { useRequestStore };
