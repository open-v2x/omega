// @ts-ignore
/* eslint-disable */

declare namespace Device {
  type DeviceItem = {
    rsuName: string; // RSU 名称
    rsuEsn: string; // 序列号
    // areaCode: string; // 安装位置-区
    intersectionCode: string; // 安装路口
    address: string; // 具体位置
  };
  type DeviceListItem = DeviceItem & {
    id: number;
    number: string; // 设备编码
    countryName: string; // 安装位置-国
    provinceName: string; // 安装位置-省
    cityName: string; // 安装位置-市
    areaName: string; // 安装位置-区
    onlineStatus: boolean; // 设备在线状态
    rsuStatus: boolean; // RSU 状态
    enabled?: boolean; // RSU 启禁用状态
    deliveryStatus?: number;
    createTime: string; // 创建时间
    countryCode: string; // 安装位置-国
    provinceCode: string; // 安装位置-省
    cityCode: string; // 安装位置-市
    areaCode: string; // 安装位置-区
    desc: string; // 描述
    rsuModelId: number; // RSU 型号
    rsuModelName: string; // RSU 型号
    rsuIP: string; // RSU IP
    imei: string; // IMEI
    iccID: string; // 集成电路卡识别码
    communicationType: string; // 支持的通信方式
    runningCommunicationType: string; // 当前通信方式
    transprotocal: string; // 服务器类型
    softwareVersion: string; // 版本号
    hardwareVersion: string; // 硬件版本号
    depart: string; // 所属组织
    runningInfo: Config.QueryStatusDetails; // 运行信息
    config: Config.ParameterInfo[]; // 配置参数
    location: { lat: number; lon: number };
  };

  type ModelListItem = {
    id?: number;
    name: string; // RSU 型号名称
    manufacturer: string; // 厂商名称
    desc: string; // 描述
  };

  type CreateDeviceParams = DeviceItem & {
    rsuId?: number;
    tmpId?: number; // 未注册 RSU 的临时 RSU id
    rsuModelId?: number; // RSU 型号
    desc?: string; // 描述
    rsuIP?: string; // RSU IP
    enabled?: boolean; // RSU 状态
    lon: string;
    lat: string;
  };

  type CPURunningInfo = {
    load: number;
    uti: number;
    time: string;
  };
  type DiskRunningInfo = {
    rxByte: number;
    wxByte: number;
    time: string;
  };
  type MemRunningInfo = {
    total: number;
    used: number;
    time: string;
  };
  type NetRunningInfo = {
    read: number;
    write: number;
    time: string;
  };

  type DeviceRunningInfo = {
    cpu: CPURunningInfo[];
    disk: DiskRunningInfo[];
    mem: MemRunningInfo[];
    net: NetRunningInfo[];
  };

  type CameraItem = {
    name: string; // 摄像头、雷达名称
    sn: string; // 摄像头序列号、雷达序列号
    streamUrl?: string; // 摄像头视频流
    lng: number; // 经度
    lat: number; // 纬度
    elevation: number; // 海拔
    towards: number; // 朝向
    desc: string; // 描述
    rsuName: string;
  };
  type CreateCameraParams = CameraItem & {
    rsuId: number; // 关联 RSU
  };
  type CameraListItem = CameraItem & {
    id: number;
    countryName: string;
    provinceName: string;
    cityName: string;
    areaName: string;
    rsuName: string; // RSU 名称
    createTime: string; // 创建时间
  };

  type Radar = {
    id: number;
    sn: string;
    name: string;
    lng: number;
    lat: number;
    elevation: string;
    towards: string;
    enable: boolean;
    rsuId: number;
    rsuName: string;
    desc: string;
    createTime: string;
  };

  type LidarItem = Radar & {
    lidarIP: string;
    onlineStatus: boolean;
    point: string;
    pole: string;
    wsUrl: string;
  };

  type RadarItem = Radar & {
    radarIP: string;
    status: boolean;
  };

  type CreateSpatItem = {
    intersectionId: string; // 序列号
    name: string;
    spatIP: string;
    point: string;
    phaseId: string;
    light: string;
    rsuId: number;
    desc: string;
  };

  type SpatItem = CreateSpatItem & {
    id: string;
    onlineStatus: boolean;
    enabled: boolean;
    createTime: string;
    timing: string;
    rsuName: string;
  };
}
