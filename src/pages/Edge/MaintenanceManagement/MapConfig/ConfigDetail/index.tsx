import React from 'react';
import BaseContainer from '#/components/BaseContainer';
import { mapConfigInfo } from '#/services/api/config/map';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BasicInfo from './components/BasicInfo';
import SendList from './components/SendList';

const ConfigDetails: React.FC = () => {
  const [data, setData] = useState<Config.MapListItem>();
  const params = useParams();
  const navigate = useNavigate();
  const mapId = +params.id;
  if (!mapId) {
    navigate(-1);
  }

  const fetchMapConfigInfo = async () => {
    const result = await mapConfigInfo(mapId);
    setData(result);
  };

  useEffect(() => {
    fetchMapConfigInfo();
  }, []);

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <SendList mapId={mapId} />
    </BaseContainer>
  );
};

export default ConfigDetails;
