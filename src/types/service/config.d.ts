declare namespace Config {
  type MapItem = {
    name: string; // MAP 名称
    areaCode: string; // MAP 区域
    address: string; // MAP 位置
    desc: string; // MAP 信息描述
  };
  type CreateMapConfigParams = MapItem & {
    data: Record<string, any>; // MAP 数据文件
    province?: string[]; // 安装位置
    countryCode?: string; // 安装位置-国
    provinceCode?: string; // 安装位置-省
    cityCode?: string; // 安装位置-市
  };

  type RSM<T> = {
    upLimit: number; // 上行转发上限
    upFilters: T; // 条件
  };
  type ParameterInfo<T = { [key: string]: string }[]> = {
    bsmConfig: {
      sampleMode: string; // 采样方式
      sampleRate: number; // 采样率
    } & RSM<T>;
    rsiConfig: {
      upFilters: T; // 条件
    };
    rsmConfig: RSM;
    mapConfig: RSM;
    spatConfig: RSM;
  };
  type ParameterListItem<T = { [key: string]: string }[]> = {
    id: number;
    name: string; // 配置项名称
    rsus?: [];
  } & ParameterInfo<T>;

  type MaintenanceItem = {
    hbRate: number; // 心跳上报频率
    runningInfoRate: number; // 运行状态上报频率
    logLevel: number; // 日志上报频率
    reboot: number; // 是否重启
    cssUrl: string; // 云控中心地址
    time: number; // 时间戳
    extendConfig: string; // 自定义配置
    addressChg?: {
      cssUrl: string; // 云控中心地址
      time: number; // 时间戳
    };
  };
  type MaintenanceListItem = MaintenanceItem & {
    id: number;
    rsuName: string; // RSU 名称
    rsuEsn: string; // 序列号
  };

  type CreateLogConfigParams = {
    uploadUrl: string;
    userId: string;
    password: string;
    transprotocal: string;
    rsus: number[];
  };
  type LogListItem = {
    id: number;
    uploadUrl: string;
    userId: string;
    createTime: string;
  };

  type QueryItem = {
    queryType: number;
    timeType: number;
  };
  type CreateQueryParams = QueryItem & {
    rsus: number[];
  };
  type QueryListItem = QueryItem & {
    id: number;
    rsus: { rsuName: string; rsuId: number; rsuEsn: string }[];
    createTime: string;
  };
  type QueryStatusDetails = {
    cpu: {
      load?: number; // CPU 负载
      uti?: number; // CPU 利用率
    };
    mem: {
      total?: number; // 内存总量(M)
      used?: number; // 已用内存(M)
      free?: number; // 可用内存(M)
    };
    disk: {
      total?: number; // 磁盘总量(M)
      used?: number; // 已用磁盘(M)
      free?: number; // 可用磁盘(M)
      tps?: number; // 每秒 IO 请求数
      write?: number; // 每秒写入磁盘数据量(K)
      read?: number; // 每秒读取磁盘数据量(K)
    };
    net: {
      rx?: number; // 每秒接受数据包数量
      tx?: number; // 每秒发送数据包数量
      rxByte?: number; // 每秒接受数据字节数
      txByte?: number; // 每秒发送数据字节数
    };
  };
  type QueryStatisticsDetails = {
    RSI: number; // RSI 消息上报总量
    MAP: number; // MAP 消息上报总量
    RSM: number; // RSM 消息上报总量
    SPAT: number; // SPAT 消息上报总
    BSM: number; // BSM 消息上报总量
  };
  type QueryDeviceDetails = {
    deviceId: number; // 设备 ID
    deviceType: string; // 设备类型
    deviceName: string; // 设备名称
    Status: {
      powerStatus: number; // 电源状态
      runStatus: number; // 运行状态
      networkStatus: number; // 连接状态
    }[];
  };
  type QueryInfoDetails = QueryItem & {
    rsuId: number;
    rsuName: string;
    rsuEsn: string;
    powerStatus?: string;
    runStatus?: string;
    networkStatus?: string;
    data: QueryStatusDetails | QueryStatisticsDetails | QueryDeviceDetails[];
  };

  type CreateCrossingParams = {
    code: string;
    name: string;
    lat: string;
    lng: string;
    areaCode: string;
    province?: string[];
    mapData: any;
    bitmapFilename: string;
  };

  type CrossingItem = CreateCrossingParams & {
    id: number;
    countryCode: string;
    countryName: string;
    provinceCode: string;
    provinceName: string;
    cityCode: string;
    cityName: string;
    areaName: string;
  };

  type AlgorithmVersion = {
    id: string | number | null;
    version: string;
  };

  type AlgorithmListItem = {
    id: number;
    module: string;
    algo: string;
    enable: boolean;
    inUse: string;
    modulePath: string;
    updateTime: string;
    version: AlgorithmVersion[];
  };

  type CreateAlgorithmVersion = {
    algo: string;
    module: string;
    version: string;
  };
}
