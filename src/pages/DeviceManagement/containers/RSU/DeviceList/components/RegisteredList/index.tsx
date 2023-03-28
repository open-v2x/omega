import BaseProTable from '#/components/BaseProTable';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteDevice, deviceList, updateDevice } from '#/services/api/device/device';
import { statusOptionFormat } from '#/utils';
import type { ActionType } from '@ant-design/pro-table';
import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDeviceModal from '../CreateDeviceModal';
import { ProColumns } from '#/typings/pro-component';
import {
  renderDeleteBtn,
  renderEnableBtn,
  renderNameAndNo,
} from '#/components/BaseProTable/components/TableHelper';

const RegisteredList: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();

  const moreActions = (row: Device.DeviceListItem) => [
    {
      key: 'disabled',
      label: renderEnableBtn(row.id, row.enabled, updateDevice, actionRef),
    },
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        deleteDevice,
        t('Are you sure you want to delete this device?'),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: `${t('RSU Name')}/${t('RSU ID')}`,
      dataIndex: 'rsuName',
      render: (_, row) =>
        renderNameAndNo(row.rsuName, row.rsuId, () => navigate(`/device/rsu/details/${row.id}`)),
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
