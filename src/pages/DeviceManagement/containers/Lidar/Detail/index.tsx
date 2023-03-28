import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getLidarDetail } from '#/services/api/device/lidar';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const LidarDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) {
    navigate(-1);
  }

  const [data, setData] = useState<Device.LidarItem>();

  const fetchLidarDetail = async () => {
    const result = await getLidarDetail(params.id);
    setData(result);
  };

  useEffect(() => {
    fetchLidarDetail();
  }, []);

  const infoMap = [
    {
      key: 'name',
      label: t('{{type}} Name', { type: t('Lidar') }),
    },
    {
      key: 'sn',
      label: t('{{type}} Serial Number', { type: t('Lidar') }),
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
      key: 'point',
      label: t('Point'),
    },
    {
      key: 'pole',
      label: t('Pole'),
    },
    {
      key: 'lidarIP',
      label: t('Radar IP'),
    },
    {
      key: 'wsUrl',
      label: t('Lidar URL'),
      block: true,
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

export default LidarDetail;
