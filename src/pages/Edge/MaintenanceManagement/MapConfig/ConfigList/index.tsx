import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import { deleteMapConfig, mapConfigList } from '#/services/api/config/map';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMapConfigModal from './components/CreateMapConfigModal';

const ConfigList: React.FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.MapListItem>[] = [
    {
      title: t('MAP Name'),
      dataIndex: 'name',
      ellipsis: true,
      search: true,
    },
    {
      title: t('MAP Area'),
      dataIndex: 'countryName',
      ellipsis: true,
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
    },
    {
      title: t('MAP Location'),
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: t('Number Of Releases'),
      dataIndex: 'amount',
    },
    {
      title: t('Operate'),
      width: 180,
      fixed: 'right',
      render: (_, row) => [
        <CreateMapConfigModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="details"
          onClick={() => navigate(`/maintenance/map/details/${row.id}`)}
        >
          {t('Details')}
        </Button>,
        <Divider key="details-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this configuration?'),
              modalFn: deleteMapConfig,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={mapConfigList}
        toolBarRender={() => [
          <CreateMapConfigModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default ConfigList;
