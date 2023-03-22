import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteSpat, spatList, updateSpat } from '#/services/api/device/spat';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import CreateSpatModal from './components/CreateSpatModal';
import { deviceList } from '#/services/api/device/device';
import { renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const SpatManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = row => [
    {
      key: 'disbaled',
      label: (
        <a
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
        </a>
      ),
    },
    {
      key: 'details',
      label: (
        <CreateSpatModal
          key="details"
          isDetails
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />
      ),
    },
    {
      key: 'delete',
      label: (
        <a
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
        </a>
      ),
    },
  ];

  const columns: ProColumns<Device.SpatListItem>[] = [
    {
      title: `${t('SPAT Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      search: true,
      render: (_, row) => renderNameAndNo(row.name, row.intersectionId),
    },
    {
      title: t('SPAT IP'),
      dataIndex: 'spatIP',
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
        rowActions={{
          firstAction: row => (
            <CreateSpatModal
              key="edit"
              editInfo={row}
              success={() => actionRef.current?.reload()}
            />
          ),
          moreActions: moreActions,
        }}
      />
    </BaseContainer>
  );
};

export default SpatManagement;
