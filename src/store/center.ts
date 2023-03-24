import { cameraList } from '#/services/api/device/camera';
import { deviceList } from '#/services/api/device/device';
import { lidarList } from '#/services/api/device/lidar';
import create from 'zustand';

interface ICenterStore {
  setState: (params: any) => void;
  // 路口下所有 rsu
  rsus: any[];
  // 获取路口下所有 rsu
  fetchRsus: () => void;
  // 当前选择的rsu
  currentRSU: any;
  setCurrentRsuByRsuId: (id: string | number | undefined) => void;
  // 路口下所有摄像头
  cameras: any[];
  liveStreamUrl: string;
  isLiveStreamFullscreen: boolean;
  fetchCameras: () => void;
  //   路口下所有激光雷达
  lidars: any[];
  cloudPointUrl: string;
  isCloudPointFullscreen: boolean;
  fetchLidars: () => void;
}

const useCenterStore = create<ICenterStore>((set, get) => ({
  setState: params => {
    set({
      ...params,
    });
  },
  rsus: [],
  currentRSU: undefined,
  fetchRsus: async () => {
    const { data } = await deviceList({
      pageNum: 1,
      pageSize: -1,
    });
    if (data.length !== get().rsus.length) {
      set({
        rsus: data,
      });
    }
  },
  setCurrentRsuByRsuId: id => {
    if (id) {
      const findOne = get().rsus.find(rsu => rsu.rsuId === id);
      set({
        currentRSU: findOne || undefined,
      });
    } else {
      set({ currentRSU: undefined });
    }
  },

  cameras: [],
  isLiveStreamFullscreen: false,
  liveStreamUrl: undefined,
  fetchCameras: async () => {
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await cameraList({ rsuId });
    const result = data.map(d => ({
      id: d.id,
      sn: d.sn,
      name: d.name,
      streamUrl: d.streamUrl,
    }));
    set({
      cameras: result,
    });
  },

  lidars: [],
  cloudPointUrl: undefined,
  isCloudPointFullscreen: false,
  fetchLidars: async () => {
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await lidarList({ rsuId });
    set({
      lidars: data,
    });
  },
}));

export { useCenterStore };
