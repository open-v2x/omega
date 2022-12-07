import BaseContainer from '#/components/BaseContainer';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import BasicInfo from './components/BasicInfo';
import {
  APILoader,
  Map,
  ControlBarControl,
  ScaleControl,
  ToolBarControl,
  Marker,
} from '@uiw/react-amap';
import { useNavigate, useParams } from 'react-router-dom';
import { eventInfoDetail } from '#/services/api/event/rsi';
const RSIDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Event.RSIDetails>();
  if (!params.id) {
    navigate(-1);
  }

  const fetchEventInfoDetail = async () => {
    const result = await eventInfoDetail(+params.id);
    setData(result);
  };

  useEffect(() => {
    fetchEventInfoDetail();
  }, []);

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <ProCard style={{ height: '500px' }}>
        <APILoader akay={process.env.AMAP_KEY}>
          <Map
            center={
              data?.eventPosition ? [data.eventPosition.lon, data.eventPosition.lat] : undefined
            }
          >
            <ControlBarControl offset={[20, 20]} position="RT" />
            <ScaleControl offset={[20, 30]} position="LB" />
            <ToolBarControl offset={[30, 30]} position="RB" />
            {data?.eventPosition && (
              <Marker position={[data.eventPosition.lon, data.eventPosition.lat]} />
            )}
          </Map>
        </APILoader>
      </ProCard>
    </BaseContainer>
  );
};

export default RSIDetails;
