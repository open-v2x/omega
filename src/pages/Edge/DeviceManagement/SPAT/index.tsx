import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteSpat, spatList, updateSpat } from '#/services/api/device/spat';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';
import React, { useRef } from 'react';
import CreateSpatModal from './components/CreateSpatModal';
import { deviceList } from '#/services/api/device/device';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const SpatManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Device.SpatListItem>[] = [
    {
      title: t('SPAT Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'intersectionId',
      search: true,
    },
    {
      title: t('SPAT IP'),
      dataIndex: 'spatIP',
    },

    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
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
    },
    {
      title: t('Point'),
      dataIndex: 'point',
    },
    {
      title: t('Operate'),
      width: 280,
      fixed: 'right',
      render: (_, row) => [
        <CreateSpatModal key="edit" editInfo={row} success={() => actionRef.current?.reload()} />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
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
              modalFn: updateSpat,
              actionRef,
            })
          }
        >
          {row.enabled ? t('Disable') : t('Enable')}
        </Button>,
        <Divider key="disabled-divider" type="vertical" />,
        <CreateSpatModal
          key="details"
          isDetails
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="details-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this SPAT?'),
              modalFn: deleteSpat,
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
        request={spatList}
        toolBarRender={() => [
          <CreateSpatModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default SpatManagement;
