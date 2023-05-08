import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import {
  renderDeleteBtn,
  renderEnableBtn,
  renderNameAndNo,
} from '#/components/BaseProTable/components/TableHelper';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions } from '#/constants/edge';
import { fetchDeviceList } from '#/services/api/device/device';
import {
  deleteThunderVision,
  getThunderVisionList,
  updateThunderVision,
} from '#/services/api/device/thunderVision';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import CreateThunderVisionModal from '../components/CreateThunderVisionModal';

const ThunderVisionList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const columns: ProColumns<Device.ThunderVisionItem>[] = [
    {
      title: `${t('Thunder Vision Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      ellipsis: true,
      render: (_, row) =>
        renderNameAndNo(row.name, row.sn, () =>
          navigate(`/device/thunder-vision/details/${row.id}`),
        ),
    },
    {
      title: t('Thunder Vision Name'),
      dataIndex: 'name',
      search: true,
      hideInTable: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'sn',
      search: true,
      hideInTable: true,
    },
    {
      title: t('Thunder Vision IP'),
      dataIndex: 'radarCameraIP',
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
      title: t('Online Status'),
      dataIndex: 'status',
      render: (statusName, row) => (
        <OnlineStatus status={row.onlineStatus} statusName={statusName} />
      ),
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceOnlineStatusOptions),
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
    },
  ];

  const moreActions = row => [
    {
      key: 'disabled',
      label: renderEnableBtn(row.id, row.enabled, updateThunderVision, actionRef),
    },
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        deleteThunderVision,
        t('Are you sure you want to delete this device?'),
        actionRef,
      ),
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={getThunderVisionList}
        toolBarRender={() => [
          <CreateThunderVisionModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <CreateThunderVisionModal
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

export default ThunderVisionList;
