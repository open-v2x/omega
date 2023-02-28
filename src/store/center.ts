import { cameraList } from '#/services/api/device/camera';
import { deviceList } from '#/services/api/device/device';
import { lidarList } from '#/services/api/device/lidar';
import create from 'zustand';

interface ICenterStore {
  setState: (params: any) => void;
  // 路口下所有 rsu
  rsus: any[];
  // 获取路口下所有 rsu
  fetchRsus: (code: string) => void;
  // 当前选择的rsu
  currentRSU: any;
  setCurrentRsuByRsuId: (id: string | number | undefined) => void;
  // 路口下所有摄像头
  cameras: any[];
  showCamera: boolean;
  cameraUrl: string;
  fetchCameras: (code: string) => void;
  setShowCamera: (url: string) => void;

  //   路口下所有激光雷达
  lidars: any[];
  cloudPointUrl: string;
  showCloudPoint: boolean;
  fetchLidars: (code) => void;
  setShowCloudPoint: (url: string) => void;
}

const useCenterStore = create<ICenterStore>((set, get) => ({
  setState: params => {
    set({
      ...params,
    });
  },
  rsus: [],
  currentRSU: undefined,
  fetchRsus: async code => {
    const { data } = await deviceList({
      pageNum: 1,
      pageSize: -1,
      intersectionCode: code,
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
  showCamera: false,
  cameraUrl: undefined,
  fetchCameras: async code => {
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await cameraList({ intersectionCode: code, rsuId });
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
  setShowCamera: url => {
    set({
      showCamera: url ? true : false,
      cameraUrl: url,
    });
  },

  lidars: [],
  cloudPointUrl: undefined,
  showCloudPoint: false,
  fetchLidars: async code => {
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await lidarList({ intersectionCode: code, rsuId });
    set({
      lidars: data,
    });
  },
  setShowCloudPoint: url => {
    set({
      showCloudPoint: url ? true : false,
      cloudPointUrl: url,
    });
  },
}));

export { useCenterStore };
