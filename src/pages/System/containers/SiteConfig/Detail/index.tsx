import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';

const SiteConfigDetail: React.FC = () => {
  const [data, setData] = useState<System.EdgeSite>();

  const infoMap = [
    {
      key: 'name',
      label: t('Edge Site Name'),
    },
    {
      key: 'areaCode',
      label: t('Installation Area'),
    },
    {
      key: 'edgeSiteDandelionEndpoint',
      label: t('Edge Site Endpoint'),
    },
    {
      key: 'desc',
      label: t('Describe'),
    },
  ];

  return (
    <BaseContainer>
      <ProCard title={t('Edge Site')}>
        {data && <CardList infoMap={infoMap} info={data} xl={8} />}
      </ProCard>
    </BaseContainer>
  );
};

export default SiteConfigDetail;
