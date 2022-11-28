import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import { cameraList, deleteCamera } from '#/services/api/device/camera';
import { deviceList } from '#/services/api/device/device';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';
import React, { useRef, FC } from 'react';
import CreateCameraModal from './components/CreateCameraModal';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const CameraManagement: FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: t('Camera Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
    },
    {
      title: t('Video Stream URL'),
      dataIndex: 'streamUrl',
    },
    {
      title: t('Installation Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
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
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      render: (_, row) => [
        <CreateCameraModal
          key="edit"
          type="camera"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <CreateCameraModal
          key="details"
          type="camera"
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
              content: t('Are you sure you want to delete this camera?'),
              modalFn: deleteCamera,
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
        request={cameraList}
        toolBarRender={() => [
          <CreateCameraModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default CameraManagement;
