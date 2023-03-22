import React from 'react';
import BaseContainer from '#/components/BaseContainer';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCrossing } from '#/services/api/config/crossing';
import { ProCard } from '@ant-design/pro-components';
import CardList from '#/components/CardList';
import { Button } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { renderAreaFormatName } from '#/components/Country/renderHelper';
import { downloadFile } from '#/utils';
import { downloadMapConfig } from '#/services/api/center/site';

const CrossingDetails: React.FC = () => {
  const [data, setData] = useState<Config.CrossingItem>({});
  const params = useParams();
  const navigate = useNavigate();
  const intersectionId = +params.id;
  if (!intersectionId) {
    navigate(-1);
  }

  const getCrossingDetail = async () => {
    const result = await fetchCrossing(intersectionId);
    setData(result);
  };

  useEffect(() => {
    getCrossingDetail();
  }, []);

  const getDownloadFile = async (id: number, name: string) => {
    const map = await downloadMapConfig(id);
    const dataStr = `data:application/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(map),
    )}`;
    downloadFile(dataStr, `${name}.json`);
  };
  const infoMap = [
    {
      key: 'name',
      label: t('Crossing Name'),
    },
    {
      key: 'countryName',
      label: t('Crossing Area'),
      render: renderAreaFormatName,
    },
    {
      key: 'file',
      label: t('MAP Data File'),
      render: ({ id, name }: Config.CrossingItem) => (
        <Button onClick={() => getDownloadFile(id, name)}>
          <FileTextOutlined style={{ marginRight: '6px' }} />
          {name}
        </Button>
      ),
    },
    {
      key: 'preview',
      label: t('MAP Preview'),
      render: ({ id }: { id: number }) => (
        <Button
          type="link"
          size="small"
          onClick={() => navigate(`/maintenance/crossing/preview/${id}`)}
        >
          {t('Preview')}
        </Button>
      ),
    },
    {
      key: 'bitmap preview',
      label: t('Bitmap Preview'),
      render: ({ id }: { id: number }) => (
        <Button
          type="link"
          size="small"
          onClick={() => navigate(`/maintenance/bitmap/preview/${id}`)}
        >
          {t('Preview')}
        </Button>
      ),
    },
  ];
  return (
    <BaseContainer back>
      <ProCard title={t('Basic Information')}>
        <CardList infoMap={infoMap} info={data} />
      </ProCard>
    </BaseContainer>
  );
};

export default CrossingDetails;
