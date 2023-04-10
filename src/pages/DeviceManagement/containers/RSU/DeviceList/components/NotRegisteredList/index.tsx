import React, { FC, useRef } from 'react';
import { ActionType } from '@ant-design/pro-table';
import BaseProTable from '#/components/BaseProTable';
import { ProColumns } from '#/typings/pro-component';
import CreateDeviceModal from '../CreateDeviceModal';
import { Button, Divider } from 'antd';
import { confirmModal } from '#/components/ConfirmModal';
import { deleteTemporaryDevice, notRegisterDeviceList } from '#/services/api/device/device';

const NotRegisteredList: FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
      search: true,
    },
    {
      title: t('Protocol Version'),
      dataIndex: 'version',
    },
    {
      title: t('Operate'),
      fixed: 'right',
      render: (_, row) => [
        <CreateDeviceModal
          key="edit"
          isRegister
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteTemporaryDevice,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </Button>,
      ],
    },
  ];
  return <BaseProTable columns={columns} actionRef={actionRef} request={notRegisterDeviceList} />;
};

export default NotRegisteredList;
