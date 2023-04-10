import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getRadarDetail } from '#/services/api/device/radar';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const RadarDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Device.RadarItem>();

  if (!params.id) {
    navigate(-1);
  }

  const fetchRadarDetail = async () => {
    const result = await getRadarDetail(params.id);
    setData(result);
  };

  useEffect(() => {
    fetchRadarDetail();
  }, []);

  const infoMap = [
    {
      key: 'name',
      label: t('{{type}} Name', { type: t('Radar') }),
    },
    {
      key: 'sn',
      label: t('{{type}} Serial Number', { type: t('Radar') }),
    },
    {
      key: 'lng',
      label: t('Longitude'),
    },
    {
      key: 'lat',
      label: t('Latitude'),
    },
    {
      key: 'elevation',
      label: t('Altitude (m)'),
    },
    {
      key: 'towards',
      label: t('Orientation (°)'),
    },
    {
      key: 'rsuName',
      label: t('Associate RSU'),
    },
    {
      key: 'radarIP',
      label: t('Radar IP'),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];

  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')}>
        {data && <CardList infoMap={infoMap} info={data} xl={8} />}
      </ProCard>
    </BaseContainer>
  );
};

export default RadarDetail;
