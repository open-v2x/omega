import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteDevice, deviceList, updateDevice } from '#/services/api/device/device';
import { statusOptionFormat } from '#/utils';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Divider } from 'antd';
import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDeviceModal from '../CreateDeviceModal';
import { ProColumns } from '#/typings/pro-component';

const RegisteredList: FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.DeviceListItem>[] = [
    {
      title: t('RSU ID'),
      dataIndex: 'rsuId',
    },
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
      title: t('RSU IP'),
      dataIndex: 'rsuIP',
      width: 120,
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
      width: 200,
    },
    {
      title: t('Online Status'),
      dataIndex: 'onlineStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.onlineStatus} statusName={statusName} />
      ),
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceOnlineStatusOptions),
      width: 140,
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
      width: 200,
    },
    {
      title: t('Operate'),
      width: 260,
      fixed: 'right',
      render: (_, row) => [
        <CreateDeviceModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          id="detailButton"
          key="details"
          size="small"
          onClick={() => navigate(`/device/rsu/details/${row.id}`)}
        >
          {t('Details')}
        </Button>,
        <Divider key="details-divider" type="vertical" />,
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
        </Button>,
        <Divider key="disabled-divider" type="vertical" />,
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
        </Button>,
      ],
    },
  ];

  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      request={deviceList}
      toolBarRender={() => [
        <CreateDeviceModal key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default RegisteredList;
