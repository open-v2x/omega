import CardList from '#/components/CardList';
import { renderAreaFormatName } from '#/components/Country/renderHelper';
import { downloadMapConfig } from '#/services/api/config/map';
import { downloadFile } from '#/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Config.MapListItem | undefined }> = ({ basicInfo = {} }) => {
  const navigate = useNavigate();

  const getDownloadFile = async (id: number, name: string) => {
    const data = await downloadMapConfig(id);
    const dataStr = `data:application/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data),
    )}`;
    downloadFile(dataStr, `${name}.json`);
  };
  const infoMap = [
    {
      key: 'name',
      label: t('MAP Name'),
    },
    {
      key: 'countryName',
      label: t('MAP Area'),
      render: renderAreaFormatName,
    },
    {
      key: 'address',
      label: t('MAP Location'),
    },
    {
      key: 'file',
      label: t('MAP Data File'),
      render: ({ id, name }: Config.MapListItem) => (
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
        <Button type="link" size="small" onClick={() => navigate(`/maintenance/map/preview/${id}`)}>
          {t('Preview')}
        </Button>
      ),
    },
    {
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} />
    </ProCard>
  );
};

export default BasicInfo;
