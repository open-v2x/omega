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
  };

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'mqtts:' : 'mqtt:';
    const host = window.location.host;
    console.log('当前协议', protocol);
    const mqtt = new MQTT(`${protocol}//${host}`);

    mqtt.connect({
      path: `/mqtt-proxy${process.env.MQTT_PATH}`,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: `v2x_mqtt_${new Date().getTime()}_nodeId_${nodeId}`,
      keepalive: 10,
      clean: true,
    });

    // 订阅主题-参与者信息
    mqtt.subscribe(MQTT_TOPIC.PARTICIPANT, 0);
    const messageCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setTrackData(data || []);
      clearTrackData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.PARTICIPANT, messageCallback);

    // 订阅主题-碰撞预警
    mqtt.subscribe(MQTT_TOPIC.CW, 0);
    const CWCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setCWData(data || []);
      clearCWData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.CW, CWCallback);

    // 订阅主题-协同换道
    mqtt.subscribe(MQTT_TOPIC.CLC, 0);
    const CLCCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setCLCData(data || []);
      clearCLCData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.CLC, CLCCallback);

    // 订阅主题-逆向超车
    mqtt.subscribe(MQTT_TOPIC.DNP, 0);
    const DNPCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setDNPData(data || []);
      clearDNPData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.DNP, DNPCallback);

    // 订阅主题-数据共享
    mqtt.subscribe(MQTT_TOPIC.SDS, 0);
    const SDSCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setSDSData(data || []);
      clearSDSData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.SDS, SDSCallback);

    // 订阅主题-逆向数据
    mqtt.subscribe(MQTT_TOPIC.RDW, 0);
    const RWCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setRWData(data || []);
      clearRWData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.RDW, RWCallback);

    // 订阅主题-拥堵数据
    mqtt.subscribe(MQTT_TOPIC.CONGESTION, 0);
    const CongestionCallback = (topic: string, payload: unknown) => {
      const data = JSON.parse(payload as string);
      setCongestionData(data || []);
      clearCongestionData();
    };
    mqtt.set_message_callback(MQTT_TOPIC.CONGESTION, CongestionCallback);

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
        {CongestionData.map(d => {
          console.log(d);
        })}
      </Layer>
    </Stage>
  );
};

export default RoadImage;
