import React, { useRef } from 'react';
import { deviceList } from '#/services/api/device/device';
import { ActionType } from '@ant-design/pro-components';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { DeviceStatusOptions } from '#/constants/edge';
import CreateLidarModal from './components/CreateLidarModal';
import { confirmModal } from '#/components/ConfirmModal';
import { deleteLidar, lidarList, updateLidar } from '#/services/api/device/lidar';
import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';
const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const Lidar: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = row => [
    {
      key: 'disabled',
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
              modalFn: updateLidar,
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
        <CreateLidarModal
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
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this lidar?'),
              modalFn: deleteLidar,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>
      ),
    },
  ];

  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: `${t('Lidar Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      search: true,
      ellipsis: true,
      render: (_, row) => renderNameAndNo(row.name, row.sn),
    },
    {
      title: t('Lidar IP'),
      dataIndex: 'lidarIP',
      ellipsis: true,
    },
    {
      title: t('Lidar Connection URL'),
      dataIndex: 'wsUrl',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('Longitude'),
      dataIndex: 'lng',
      width: 60,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      width: 60,
    },
    {
      title: t('Device Status'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
      width: 80,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
      width: 80,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuId',
      valueType: 'select',
      request: fetchDeviceList,
      hideInTable: true,
      search: true,
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
        request={lidarList}
        toolBarRender={() => [
          <CreateLidarModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <CreateLidarModal
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

export default Lidar;
