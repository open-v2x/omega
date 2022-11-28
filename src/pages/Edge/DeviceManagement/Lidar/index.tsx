import React, { useRef } from 'react';
import { deviceList } from '#/services/api/device/device';
import { ActionType } from '@ant-design/pro-components';
import { ProColumns } from '#/typings/pro-component';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import { statusOptionFormat } from '#/utils';
import { DeviceStatusOptions } from '#/constants/edge';
import CreateLidarModal from './components/CreateLidarModal';
import { Button, Divider } from 'antd';
import { confirmModal } from '#/components/ConfirmModal';
import { deleteLidar, enabledLidar, lidarList } from '#/services/api/device/lidar';
import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const Lidar: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: t('Lidar Name'),
      dataIndex: 'name',
      search: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: t('Lidar IP'),
      dataIndex: 'lidarIP',
      width: 100,
      ellipsis: true,
    },
    {
      title: t('Lidar Connection URL'),
      dataIndex: 'wsUrl',
      width: 200,
      ellipsis: true,
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
      width: 150,
      ellipsis: true,
    },
    {
      title: t('Longitude'),
      dataIndex: 'lng',
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
    },
    {
      title: t('Altitude (m)'),
      dataIndex: 'elevation',
    },
    {
      title: t('Orientation (°)'),
      dataIndex: 'towards',
    },
    {
      title: t('Point'),
      dataIndex: 'point',
    },
    {
      title: t('Pole'),
      dataIndex: 'pole',
    },
    {
      title: t('Device Status'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
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
      width: 150,
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      render: (_, row) => [
        <CreateLidarModal key="edit" editInfo={row} success={() => actionRef.current?.reload()} />,
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
              modalFn: enabledLidar,
              actionRef,
            })
          }
        >
          {row.enabled ? t('Disable') : t('Enable')}
        </Button>,
        <Divider key="disabled-divider" type="vertical" />,
        <CreateLidarModal
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
              content: t('Are you sure you want to delete this lidar?'),
              modalFn: deleteLidar,
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
        request={lidarList}
        scroll={{ x: 1400 }}
        toolBarRender={() => [
          <CreateLidarModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default Lidar;
