declare namespace Event {
  type RSIListItem = {
    id: number;
    duration: number;
    eventClass: string;
    eventType: number;
    eventSource: string;
    eventConfidence: number;
    eventRadius: number;
    eventDescription: string;
    eventPriority: string;
    createTime: string;
  };
  type RSIDetails = RSIListItem & {
    rsuName: string; // 下发 RSU
    eventPosition: { lon: number; lat: number }; // 经纬度
  };

  type RSMListItem = {
    id: number;
    ptcId: number; // 目标 ID
    ptcType: string; // 参与者类型
    source: number; // 数据来源
    secMark: number; // 1分钟中的毫秒级时刻
    speed: number; // 速度
    heading: number; // 航向角
    lon: number; // 经度
    lat: number; // 纬度
    createTime: string; // 上报时间
  };

  type LonLat = {
    lon: number; // 经度
    lat: number; // 纬度
  };
  type KinematicsInfo = {
    speed: number; // 速度
    accelerate: number; // 加速度
    angularSpeed: number; // 角速度
  };
  type ICWListItem = {
    id: number;
    sensorPos: LonLat; // 传感器位置
    collisionType: number; // 碰撞类型
    secMark: number; // 1分钟中的毫秒级时刻
    egoId: string; // 自车 ID
    egoPos: LonLat; // 自车位置
    egoHeading: number; // 自车方向角
    egoWidth: number; // 自车车宽
    egoLength: number; // 自车车长
    egoRadius?: number; // 自车半径
    egoKinematicsInfo: KinematicsInfo;
    otherId: string; // 他车 ID
    otherPos: LonLat; // 他车位置
    otherHeading: number; // 他车方向角
    otherWidth: number; // 他车车宽
    otherLength: number; // 他车车长
    otherRadius?: number; // 他车半径
    otherKinematicsInfo: KinematicsInfo;
  };

  type DNPWListItem = {
    id: number;
    msgID: string;
    secMark: number;
    refPos: LonLat;
    vehID: string;
    driveSuggestion: {
      suggestion: number;
      lifeTime: number;
    };
    info: number;
  };

  type SDSListItem = {
    id: number;
    msgID: string;
    equipmentType: number;
    sensorPos: LonLat;
    secMark: number;
    egoId: string;
    egoPos: LonLat;
  };

  type CGWListItem = {
    id: number;
    cgwLevel: number;
    laneID: number;
    avgSpeed: number;
    sensorPos: LonLat;
    startPoint: LonLat;
    endPoint: LonLat;
    secMark: number;
    createTime: string;
  };

  type SpeedWarningListItem = {
    id: number;
    egoID: string;
    egoPos: LonLat;
    sensorPos: LonLat;
    speed: number;
    heading: number;
    width: number;
    height: number;
    length: number;
    secMark: number;
    createTime: string;
  };
}
