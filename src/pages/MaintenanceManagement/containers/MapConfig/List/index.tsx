import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { getMapList } from '#/services/api/config/map';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import EditMapModal from '../components/EditMapModal';
import { Divider } from 'antd';

const MapConfigList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Config.MapItem>[] = [
    {
      title: t('MAP Name'),
      dataIndex: 'name',
    },
    {
      title: t('Describe'),
      dataIndex: 'desc',
    },
    {
      title: t('Operate'),
      width: 100,
      render: (_, row) => [
        <EditMapModal key="edit" editId={row.id} success={() => actionRef.current?.reload()} />,
        <Divider type="vertical" />,
        <a href={`/maintenance/map/details/${row.id}`}>{t('Details')}</a>,
      ],
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={getMapList} search={false} />
    </BaseContainer>
  );
};

export default MapConfigList;
