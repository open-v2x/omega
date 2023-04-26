import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { fetchDeviceList } from '#/services/api/device/device';
import { deleteRadar, radarList } from '#/services/api/device/radar';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateRadarModal from './components/CreateRadarModal';
import { renderDeleteBtn, renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';
import { useNavigate } from 'react-router';

const Radar: FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const moreActions = row => [
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        deleteRadar,
        t('Are you sure you want to delete this radar?'),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Device.CameraListItem>[] = [
    {
      title: `${t('Radar Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      render: (_, row) =>
        renderNameAndNo(row.name, row.sn, () => navigate(`/device/radar/details/${row.id}`)),
    },
    {
      title: t('Radar Name'),
      dataIndex: 'name',
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
