import React, { useRef } from 'react';
import { deviceList } from '#/services/api/device/device';
import { ActionType } from '@ant-design/pro-components';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { DeviceStatusOptions } from '#/constants/edge';
import CreateLidarModal from './components/CreateLidarModal';
import { deleteLidar, lidarList, updateLidar } from '#/services/api/device/lidar';
import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import {
  renderDeleteBtn,
  renderEnableBtn,
  renderNameAndNo,
} from '#/components/BaseProTable/components/TableHelper';
import { useNavigate } from 'react-router-dom';
const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const Lidar: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const moreActions = row => [
    {
      key: 'disabled',
      label: renderEnableBtn(row.id, row.enabled, updateLidar, actionRef),
    },
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        deleteLidar,
        t('Are you sure you want to delete this lidar?'),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: `${t('Lidar Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      ellipsis: true,
      render: (_, row) =>
        renderNameAndNo(row.name, row.sn, () => navigate(`/device/lidar/details/${row.id}`)),
    },
    {
      title: t('Lidar Name'),
      dataIndex: 'name',
      search: true,
      hiddenInTable: true,
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
        columnsState={{
          defaultValue: {
            wsUrl: { show: false },
          },
        }}
      />
    </BaseContainer>
  );
};

export default Lidar;
