import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deviceList, updateDevice } from '#/services/api/device/device';
import { statusOptionFormat } from '#/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Divider } from 'antd';
import React, { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDeviceModal from '../CreateDeviceModal';

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
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
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
    {
      title: t('Operate'),
      width: 260,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <CreateDeviceModal
          key="edit"
          editId={row.id}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <a
          id="detailButton"
          key="details"
          onClick={() => navigate(`/device/rsu/details/${row.id}`)}
        >
          {t('Details')}
        </a>,
        <Divider key="details-divider" type="vertical" />,
        <a
          id="enableDisableButton"
          key="disabled"
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
        </a>,
        <Divider key="disabled-divider" type="vertical" />,
        <a
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
        </a>,
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
