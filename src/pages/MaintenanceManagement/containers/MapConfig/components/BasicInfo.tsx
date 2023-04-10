import CardList from '#/components/CardList';
import { getBitData, getMapDetail } from '#/services/api/config/crossing';
import { downloadFile } from '#/utils';
import { FileTextOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 基本信息
const BasicInfo: React.FC<{ mapId: number }> = ({ mapId }) => {
  const [info, setInfo] = useState<Config.MapItem | undefined>({});

  const navigate = useNavigate();
  const getMapData = async () => {
    const result = await getMapDetail(mapId);
    setInfo(result);
  };

  useEffect(() => {
    getMapData();
  }, []);

  const getDownloadFile = async (id: number | string, name: string) => {
    const data = await getBitData(id);
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
      key: 'desc',
      label: t('Describe'),
      block: true,
    },
    {
      key: 'file',
      label: t('MAP Data File'),
      render: ({ id, name }: Config.MapItem) => (
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
          onClick={() => navigate(`/maintenance/bitmap/preview/${id}`)}
        >
          {t('Preview')}
        </Button>
      ),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={info} />
    </ProCard>
  );
};

export default BasicInfo;
