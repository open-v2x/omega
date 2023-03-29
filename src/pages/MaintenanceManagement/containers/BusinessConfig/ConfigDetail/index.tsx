import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import ParameterDeviceList from '#/components/ParameterDeviceList';
import ParameterInfo from '#/components/ParameterInfo';
import { parameterConfigInfo } from '#/services/api/config/business';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 基本信息
type BasicInfoType = {
  name: string;
};
const BasicInfo: React.FC<{ basicInfo: BasicInfoType | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'name',
      label: t('Configuration Name'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} />
    </ProCard>
  );
};

const ConfigDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<Config.ParameterListItem>();
  if (!+params.id) {
    navigate(-1);
  }

  const fetchConfigInfo = async () => {
    const result = await parameterConfigInfo(+params.id);
    setData(result);
  };

  useEffect(() => {
    fetchConfigInfo();
  }, []);

  return (
    <BaseContainer back>
      <BasicInfo basicInfo={data} />
      <ParameterInfo parameterInfo={data} />
      <ProCard title={t('Parameter Configuration Applicable RSU')}>
        <ParameterDeviceList showDeliveryStatus dataSource={data?.rsus || []} />
      </ProCard>
    </BaseContainer>
  );
};

export default ConfigDetails;
