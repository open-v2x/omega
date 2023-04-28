import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getEdgeSiteById } from '#/services/api/system/edge';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './index.module.less';

const SiteConfigDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<System.EdgeSite>();

  if (!params.id) {
    navigate(-1);
  }

  const infoMap = [
    {
      key: 'name',
      label: t('Edge Site Name'),
      block: true,
      render: () => <span className={styles['detail-text']}>{data.name}</span>,
    },
    {
      key: 'areaCode',
      label: t('Installation Area'),
      block: true,
      render: () => (
        <span className={styles['detail-text']}>
          {/* {formatAreaByAreaCode(countries, data.areaCode)} */}
        </span>
      ),
    },
    {
      key: 'edgeSiteDandelionEndpoint',
      label: t('Edge Site Endpoint'),
      block: true,
      render: () => <span className={styles['detail-text']}>{data.edgeSiteDandelionEndpoint}</span>,
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
      render: () => <span className={styles['detail-text']}>{data.desc || '-'}</span>,
    },
  ];

  const getData = async () => {
    const result = await getEdgeSiteById(params.id);
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseContainer back>
      <ProCard title={t('Edge Site')}>
        {data && <CardList infoMap={infoMap} info={data} xl={8} />}
      </ProCard>
    </BaseContainer>
  );
};

export default SiteConfigDetail;
