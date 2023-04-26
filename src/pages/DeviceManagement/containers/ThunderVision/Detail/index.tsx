import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getThunderVisionDetailById } from '#/services/api/device/thunderVision';
import { PageLoading, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const ThunderVisionDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) {
    navigate(-1);
  }

  const [data, setData] = useState<Device.ThunderVisionItem>();

  const fetchLidarDetail = async () => {
    const result = await getThunderVisionDetailById(params.id);
    setData(result);
  };

  useEffect(() => {
    fetchLidarDetail();
  }, []);

  const title = t('Thunder Vision');

  const infoMap = [
    {
      key: 'name',
      label: t('{{type}} Name', { type: title }),
    },
    {
      key: 'sn',
      label: t('{{type}} Serial Number', { type: title }),
    },
    {
      key: 'rsuName',
      label: t('Associate RSU'),
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
      key: 'point',
      label: t('Point'),
    },
    {
      key: 'pole',
      label: t('Pole'),
    },
    {
      key: 'radarCameraIP',
      label: t('Thunder Vision IP'),
    },
    {
      key: 'videoStreamAddress',
      label: t('Video Stream Address'),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];

  return (
    <BaseContainer back>
      <ProCard>
        {data ? <CardList infoMap={infoMap} info={data} xl={8} /> : <PageLoading />}
      </ProCard>
    </BaseContainer>
  );
};

export default ThunderVisionDetail;
