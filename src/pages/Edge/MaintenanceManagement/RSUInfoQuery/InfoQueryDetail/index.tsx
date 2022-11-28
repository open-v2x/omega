import BaseContainer from '#/components/BaseContainer';
import { infoQueryDetails } from '#/services/api/config/query';
import { RouterMatchTypes } from '#/typings/pro-component';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DataStatistics from './components/DataStatistics';
import DeviceInfo from './components/DeviceInfo';
import OperatingStatus from './components/OperatingStatus';

const InfoQueryDetails: React.FC<RouterMatchTypes> = () => {
  const navigate = useNavigate();
  const params = useParams<{ label: string; [key: string]: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [data, setData] = useState<any>();
  if (!params.id) {
    navigate(-1);
  }

  const fetchInfoQueryDetails = async () => {
    const result = await infoQueryDetails(+params.id);
    setData(result);
  };

  useEffect(() => {
    fetchInfoQueryDetails();
  }, []);

  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')}>
        {type == '0' && <OperatingStatus data={data?.data} />}
        {type == '1' && <DataStatistics data={data?.data} />}
        {type == '2' && <DeviceInfo data={data?.data} />}
      </ProCard>
    </BaseContainer>
  );
};

export default InfoQueryDetails;
