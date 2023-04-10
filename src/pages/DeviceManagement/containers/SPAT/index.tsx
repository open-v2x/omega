import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, DeviceStatusOptions } from '#/constants/edge';
import { deleteSpat, spatList, updateSpat } from '#/services/api/device/spat';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import CreateSpatModal from './components/CreateSpatModal';
import { deviceList } from '#/services/api/device/device';
import {
  renderDeleteBtn,
  renderEnableBtn,
  renderNameAndNo,
} from '#/components/BaseProTable/components/TableHelper';
import { useNavigate } from 'react-router';

const fetchDeviceList = async () => {
  const { data } = await deviceList({ pageNum: 1, pageSize: -1 });
  return data.map(({ id, rsuName }: Device.DeviceListItem) => ({ label: rsuName, value: id }));
};

const SpatManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const moreActions = row => [
    {
      key: 'disbaled',
      label: renderEnableBtn(row.id, row.enabled, updateSpat, actionRef),
    },
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        deleteSpat,
        t('Are you sure you want to delete this SPAT?'),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Device.SpatItem>[] = [
    {
      title: `${t('SPAT Name')}/${t('Serial Number')}`,
      dataIndex: 'name',
      render: (_, row) =>
        renderNameAndNo(row.name, row.intersectionId, () =>
          navigate(`/device/spat/details/${row.id}`),
        ),
    },
    {
      title: t('SPAT Name'),
      dataIndex: 'name',
      search: true,
      hiddenInTable: true,
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
