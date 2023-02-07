import { cameraList } from '#/services/api/device/camera';
import { deviceList } from '#/services/api/device/device';
import { lidarList } from '#/services/api/device/lidar';
import create from 'zustand';

interface ICenterStore {
  // 大屏路口
  intersectionCode: string;
  setIntersectionCode: (code: string) => void;
  // 路口下所有 rsu
  rsus: any[];
  // 获取路口下所有 rsu
  fetchRsus: () => void;
  // 当前选择的rsu
  currentRSU: any;
  setCurrentRsuByRsuId: (id: string | number | undefined) => void;
  // 路口下所有摄像头
  cameras: any[];
  showCamera: boolean;
  cameraUrl: string;
  fetchCameras: () => void;
  setShowCamera: (url: string) => void;

  //   路口下所有激光雷达
  lidars: any[];
  cloudPointUrl: string;
  showCloudPoint: boolean;
  fetchLidars: () => void;
  setShowCloudPoint: (url: string) => void;
}

const useCenterStore = create<ICenterStore>((set, get) => ({
  intersectionCode: '',
  setIntersectionCode: code => set({ intersectionCode: code }),
  rsus: [],
  currentRSU: undefined,
  fetchRsus: async () => {
    const { data } = await deviceList({
      pageNum: 1,
      pageSize: -1,
      intersectionCode: get().intersectionCode,
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
  fetchCameras: async () => {
    const intersectionCode = get().intersectionCode;
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await cameraList({ intersectionCode, rsuId });
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
  fetchLidars: async () => {
    const intersectionCode = get().intersectionCode;
    const rsuId = get().currentRSU?.rsuId || undefined;
    const { data } = await lidarList({ intersectionCode, rsuId });
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
