import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { deviceList } from '#/services/api/device/device';
import { deleteRadar, radarList } from '#/services/api/device/radar';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateRadarModal from './components/CreateRadarModal';
import { renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const Radar: FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = row => [
    {
      key: 'details',
      label: (
        <CreateRadarModal
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
              content: t('Are you sure you want to delete this radar?'),
              modalFn: deleteRadar,
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
      title: `${t('Radar Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      search: true,
      render: (_, row) => renderNameAndNo(row.name, row.sn),
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
      hideInTable: true,
    },
    {
      title: t('Radar IP'),
      dataIndex: 'radarIP',
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
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={radarList}
        toolBarRender={() => [
          <CreateRadarModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <CreateRadarModal
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

export default Radar;
