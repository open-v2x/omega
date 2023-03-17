import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { cameraList, deleteCamera } from '#/services/api/device/camera';
import { deviceList } from '#/services/api/device/device';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef, FC } from 'react';
import CreateCameraModal from './components/CreateCameraModal';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const CameraManagement: FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = row => [
    {
      key: 'detail',
      label: (
        <CreateCameraModal
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
              content: t('Are you sure you want to delete this camera?'),
              modalFn: deleteCamera,
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
      title: `${t('Camera Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      search: true,
      width: 100,
      render: (_, row) => (
        <span>
          <div>{row.name}</div>
          <div>{row.sn}</div>
        </span>
      ),
    },
    {
      dataIndex: 'sn',
      search: true,
      hidden: true,
    },
    {
      title: t('Video Stream URL'),
      dataIndex: 'streamUrl',
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
      title: t('Altitude (m)'),
      dataIndex: 'elevation',
      width: 80,
    },
    {
      title: t('Orientation (°)'),
      dataIndex: 'towards',
      width: 80,
    },
    {
      title: t('Associate RSU'),
      dataIndex: 'rsuName',
      valueType: 'select',
      request: fetchDeviceList,
      width: 100,
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
      width: 200,
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={cameraList}
        toolBarRender={() => [
          <CreateCameraModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <CreateCameraModal
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

export default CameraManagement;
