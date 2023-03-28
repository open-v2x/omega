import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getSpatDetail } from '#/services/api/device/spat';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const SpatDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<Device.SpatItem>();

  if (!params.id) {
    navigate(-1);
  }

  const fetchSpatDetail = async () => {
    const result = await getSpatDetail(params.id);
    setData(result);
  };

  useEffect(() => {
    fetchSpatDetail();
  }, []);

  const infoMap = [
    {
      key: 'name',
      label: t('{{type}} Name', { type: t('SPAT') }),
    },
    {
      key: 'intersectionId',
      label: t('{{type}} Serial Number', { type: t('SPAT') }),
    },
    {
      key: 'phaseId',
      label: t('PhaseId'),
    },
    {
      key: 'light',
      label: t('Light State'),
    },
    {
      key: 'rsuName',
      label: t('Associate RSU'),
    },
    {
      key: 'spatIP',
      label: t('SPAT IP'),
    },
    {
      key: 'point',
      label: t('Point'),
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

export default SpatDetail;
