import BaseContainer from '#/components/BaseContainer';
import { getCameraDetail } from '#/services/api/device/camera';
import { useRequestStore } from '#/store/request';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardList from '#/components/CardList';

const CameraDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchDeviceListInModal } = useRequestStore();

  const [data, setData] = useState<Device.CameraItem>();

  if (!params.id) {
    navigate(-1);
  }

  const fetchCameraDetail = async () => {
    const result = await getCameraDetail(params.id);
    setData(result);
  };

  const infoMap = [
    {
      key: 'name',
      label: t('Camera Name'),
    },
    {
      key: 'sn',
      label: t('{{type}} Serial Number', { type: t('Camera') }),
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
      key: 'streamUrl',
      label: t('Video Stream URL'),
      block: true,
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];

  useEffect(() => {
    fetchCameraDetail();
    fetchDeviceListInModal();
  }, []);

  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')}>
        {data && <CardList infoMap={infoMap} info={data} xl={8} />}
      </ProCard>
    </BaseContainer>
  );
};

export default CameraDetail;
