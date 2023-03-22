import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { deleteModel, modelList } from '#/services/api/device/model';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateModelModal from './components/CreateModelModal';

const RSUModelManagement: FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = (row: Device.ModelListItem) => [
    {
      key: 'delete',
      label: (
        <a
          type="link"
          key="delete"
          style={{ color: '#E74040' }}
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this model?'),
              modalFn: deleteModel,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>
      ),
    },
  ];

  const columns: ProColumns<Device.ModelListItem>[] = [
    {
      title: t('Model Name'),
      dataIndex: 'name',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Manufacturer Name'),
      dataIndex: 'manufacturer',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Describe'),
      dataIndex: 'desc',
      ellipsis: true,
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={modelList}
        toolBarRender={() => [
          <CreateModelModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <CreateModelModal
              key="edit"
              editId={row.id}
              success={() => actionRef.current?.reload()}
            />
          ),
          moreActions: moreActions,
        }}
      />
    </BaseContainer>
  );
};

export default RSUModelManagement;
