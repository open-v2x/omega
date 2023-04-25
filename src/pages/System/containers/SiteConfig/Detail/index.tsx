import BaseContainer from '#/components/BaseContainer';
import CardList from '#/components/CardList';
import { getEdgeSiteById } from '#/services/api/system/edge';
import { ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './index.module.less';
import { fetchCountries } from '#/services/api/device/device';

const SiteConfigDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<System.EdgeSite>();
  const [countries, setCountries] = useState([]);

  if (!params.id) {
    navigate(-1);
  }

  const formatArea = code => {
    let result = '';
    const countryList = countries[0].children.filter(
      country => country.code[0] === code[0] && country.code[1] === code[1],
    );
    result += countryList[0].name;
    console.log(countryList);
    const provinceList = countryList[0].children.filter(
      province => province.code[2] === code[2] && province.code[3] === code[3],
    );
    result += provinceList[0].name;
    const area = provinceList[0].children.find(p => p.code === code);
    result += area.name;
    return result;
  };

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
      render: () => <span className={styles['detail-text']}>{formatArea(data.areaCode)}</span>,
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
    const country = await fetchCountries({
      cascade: true,
      needIntersection: false,
    });
    setCountries(country);
    const result = await getEdgeSiteById(params.id);
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseContainer>
      <ProCard title={t('Edge Site')}>
        {data && <CardList infoMap={infoMap} info={data} xl={8} />}
      </ProCard>
    </BaseContainer>
  );
};

export default SiteConfigDetail;
