import { MQTT } from '#/utils/mqtt';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import RetrogradeWarning from '../Events/RetrogradeWarning';
import DataSharing from '../Events/DataSharing';
import ReverseOvertaking from '../Events/ReverseOvertaking';
import ChangeLanes from '../Events/ChangeLanes';
import EventWarnLine from '../Events/EventWarnLine';
import Track from '../Events/Track';
import CongestionWarning from '../Events/CongestionWarning';
import OverSpeedWarning from '../Events/OverSpeedWarning';
import SlowerSpeedWarning from '../Events/SlowerSpeedWarning';

const RoadImage: React.FC<{ nodeId: string; intersectionCode: string }> = ({
  nodeId,
  intersectionCode,
}) => {
  // 参与者信息
  const [trackData, setTrackData] = useState<any[]>([]);
  const clearTrackData = debounce(() => setTrackData([]), 1000);
  // 碰撞预警
  const [CWData, setCWData] = useState<any[]>([]);
  const clearCWData = debounce(() => {
    setCWData([]);
  }, 500);

  // 协同换道
  const [CLCData, setCLCData] = useState<any[]>([]);
  const clearCLCData = debounce(() => {
    setCLCData([]);
  }, 500);

  // 逆向超车
  const [DNPData, setDNPData] = useState<any[]>([]);
  const clearDNPData = debounce(() => {
    setDNPData([]);
  }, 500);

  // 数据共享
  const [SDSData, setSDSData] = useState<any[]>([]);
  const clearSDSData = debounce(() => {
    setSDSData([]);
  }, 500);

  // 逆行车辆
  const [RWData, setRWData] = useState<any[]>([]);
  const clearRWData = debounce(() => {
    setRWData([]);
  }, 500);

  const [CongestionData, setCongestionData] = useState<any[]>([]);
  const clearCongestionData = debounce(() => {
    setCongestionData([]);
  }, 500);

  const [OSWData, setOSWData] = useState<any[]>([]);
  const clearOSWData = debounce(() => {
    setOSWData([]);
  }, 500);

  const [SSWData, setSSWData] = useState<any[]>([]);
  const clearSSWData = debounce(() => {
    setSSWData([]);
  }, 500);

  const MQTT_TOPIC = {
    // 参与者
    PARTICIPANT: `V2X/DEVICE/${intersectionCode}/PARTICIPANT/NODE${nodeId}`,
    // 碰撞
    CW: `V2X/DEVICE/${intersectionCode}/APPLICATION/CW/NODE${nodeId}`,
    // 协同换道
    CLC: `V2X/DEVICE/${intersectionCode}/APPLICATION/CLC/NODE${nodeId}`,
    // 逆行超车
    DNP: `V2X/DEVICE/${intersectionCode}/APPLICATION/DNP/NODE${nodeId}`,
    // 数据共享
    SDS: `V2X/DEVICE/${intersectionCode}/APPLICATION/SDS/NODE${nodeId}`,
    // 逆向数据
    RDW: `V2X/DEVICE/${intersectionCode}/APPLICATION/RDW/NODE${nodeId}`,
    // 拥堵数据
    CONGESTION: `V2X/DEVICE/${intersectionCode}/APPLICATION/CGW/NODE${nodeId}`,
    // 超速
    OSW: `V2X/DEVICE/${intersectionCode}/APPLICATION/OSW/NODE${nodeId}`,
    // 慢行
    SSW: `V2X/DEVICE/${intersectionCode}/APPLICATION/SSW/NODE${nodeId}`,
  };

  const subscribeMQTT = (mqtt, mqttTopic, setData, clearData) => {
    mqtt.subscribe(mqttTopic, 0);
    const messageCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      console.log(`mqtt_message ${topic}:`, data);
      setData(data || []);
      clearData();
    };
    mqtt.set_message_callback(mqttTopic, messageCallback);
  };

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'mqtts:' : 'mqtt:';
    const host = window.location.host;
    const mqtt = new MQTT(
      process.env.NODE_ENV === 'development' ? process.env.MQTT_URL : `${protocol}//${host}`,
    );

    mqtt.connect({
      path:
        process.env.NODE_ENV === 'development' ? '/mqtt' : `/mqtt-proxy${process.env.MQTT_PATH}`,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: `v2x_mqtt_${new Date().getTime()}_nodeId_${nodeId}`,
      keepalive: 10,
      clean: true,
    });

    // 订阅主题-参与者信息
    subscribeMQTT(mqtt, MQTT_TOPIC.PARTICIPANT, setTrackData, clearTrackData);

    // 订阅主题-碰撞预警
    subscribeMQTT(mqtt, MQTT_TOPIC.CW, setCWData, clearCWData);

    // 订阅主题-协同换道
    subscribeMQTT(mqtt, MQTT_TOPIC.CLC, setCLCData, clearCLCData);

    // 订阅主题-逆向超车
    subscribeMQTT(mqtt, MQTT_TOPIC.DNP, setDNPData, clearDNPData);

    // 订阅主题-数据共享
    subscribeMQTT(mqtt, MQTT_TOPIC.SDS, setSDSData, clearSDSData);

    // 订阅主题-逆向数据
    subscribeMQTT(mqtt, MQTT_TOPIC.RDW, setRWData, clearRWData);

    // 订阅主题-拥堵数据
    subscribeMQTT(mqtt, MQTT_TOPIC.CONGESTION, setCongestionData, clearCongestionData);

    // 订阅主题-超速数据
    subscribeMQTT(mqtt, MQTT_TOPIC.OSW, setOSWData, clearOSWData);

    // 订阅主题-慢行数据
    subscribeMQTT(mqtt, MQTT_TOPIC.SSW, setSSWData, clearSSWData);
    return () => mqtt.disconnect();
  }, []);

  return (
    <Stage width={1777} height={999}>
      <Layer>
        {CWData.map(({ ego, other, ego_current_point, other_current_point }) => (
          <EventWarnLine
            key={ego + other}
            firstPoint={ego_current_point}
            secondPoint={other_current_point}
          />
        ))}
        {CLCData.map(({ type, ego_point, traj_list_for_show: points }, index) => (
          <ChangeLanes key={`${type}${index}`} egoPoint={ego_point} trajPoints={points} />
        ))}
        {DNPData.map(({ type, ego_point, if_accept }, index) => (
          <ReverseOvertaking key={`${type}${index}`} egoPoint={ego_point} accept={if_accept} />
        ))}
        {SDSData.map(({ type, ego_point, other_cars }, index) => (
          <DataSharing key={`${type}${index}`} egoPoint={ego_point} points={other_cars} />
        ))}
        {trackData.map(({ ptcId, ptcType, x, y, heading }) => (
          <Track key={ptcId} type={ptcType} x={x} y={y} rotation={heading} />
        ))}
        {RWData.map(({ ego, ego_current_point }) => (
          <RetrogradeWarning key={ego} point={ego_current_point} />
        ))}
        {CongestionData.map(({ level, startPoint, endPoint, type }, index) => (
          <CongestionWarning
            key={`${type}_${index}`}
            level={level}
            start={startPoint}
            end={endPoint}
          />
        ))}
        {OSWData.map(({ ego, ego_current_point }) => (
          <OverSpeedWarning key={ego} point={ego_current_point} />
        ))}
        {SSWData.map(({ ego, ego_current_point }) => (
          <SlowerSpeedWarning key={ego} point={ego_current_point} />
        ))}
      </Layer>
    </Stage>
  );
};

export default RoadImage;
