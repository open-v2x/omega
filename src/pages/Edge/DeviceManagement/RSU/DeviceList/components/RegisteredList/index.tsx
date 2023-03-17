import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteDevice, deviceList, updateDevice } from '#/services/api/device/device';
import { statusOptionFormat } from '#/utils';
import type { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDeviceModal from '../CreateDeviceModal';
import { ProColumns } from '#/typings/pro-component';

const RegisteredList: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  const moreActions = (row: Device.DeviceListItem) => [
    {
      key: '1',
      label: (
        <Button
          type="link"
          id="detailButton"
          key="details"
          size="small"
          onClick={() => navigate(`/device/rsu/details/${row.id}`)}
        >
          {t('Details')}
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          id="enableDisableButton"
          key="disabled"
          type="link"
          size="small"
          style={{ color: row.enabled ? '#E74040' : '' }}
          onClick={() =>
            confirmModal({
              id: row.id,
              params: { enabled: !row.enabled },
              title: row.enabled ? t('Disable') : t('Enable'),
              content: row.enabled
                ? t('Are you sure you want to disable this device?')
                : t('Are you sure you want to enable this device?'),
              successMsg: t('{{value}} successfully', { value: t('Status updated') }),
              modalFn: updateDevice,
              actionRef,
            })
          }
        >
          {row.enabled ? t('Disable') : t('Enable')}
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button
          type="link"
          size="small"
          id="deleteButton"
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteDevice,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </Button>
      ),
    },
  ];

  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: `${t('RSU ID')}/${t('RSU Name')}`,
      dataIndex: 'rsuId',
      render: (_, row) => (
        <span>
          <div>{row.rsuId}</div>
          <div>{row.rsuName}</div>
        </span>
      ),
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
      search: true,
    },
    {
      title: t('RSU IP'),
      dataIndex: 'rsuIP',
    },
    {
      title: t('Online Status'),
      dataIndex: 'onlineStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.onlineStatus} statusName={statusName} />
      ),
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceOnlineStatusOptions),
    },
    {
      title: t('Device Status'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
      search: true,
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
  ];

  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      request={deviceList}
      rowActions={{
        firstAction: (row: Device.DeviceListItem) => (
          <CreateDeviceModal
            key="edit"
            editId={row.id}
            success={() => actionRef.current?.reload()}
          />
        ),
        moreActions: moreActions,
      }}
      toolBarRender={() => [
        <CreateDeviceModal key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default RegisteredList;
