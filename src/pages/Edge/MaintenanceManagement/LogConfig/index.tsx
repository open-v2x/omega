import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { deleteLogConfig, logConfigList } from '#/services/api/config/log';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React from 'react';
import { useRef } from 'react';
import CreateLogConfigModal from './components/CreateLogConfigModal';

const LogConfig: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Config.LogListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
    },
    {
      title: t('Log Upload Address'),
      dataIndex: 'uploadUrl',
    },
    {
      title: t('Log Server Username'),
      dataIndex: 'userId',
    },
    {
      title: t('Server Type'),
      dataIndex: 'transprotocal',
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <CreateLogConfigModal
          key="edit"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this configuration?'),
              modalFn: deleteLogConfig,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={logConfigList}
        search={false}
        toolBarRender={() => [
          <CreateLogConfigModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default LogConfig;
