import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import CreateSendModal from '#/components/CreateSendModal';
import OnlineStatus from '#/components/OnlineStatus';
import { DeviceOnlineStatusOptions, RSUStatusOptions, SendStatusOptions } from '#/constants/edge';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType, ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import styles from './send.module.less';
import { deleteMapRSU, mapRSUList } from '#/services/api/config/map';
// 下发 RSU
const SendList: React.FC<{ mapId: number }> = ({ mapId }) => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.MapRSUListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      ellipsis: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuSn',
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
      dataIndex: 'rsuStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(RSUStatusOptions),
    },
    {
      title: t('Send Status'),
      dataIndex: 'deliveryStatus',
      render: (statusName, row) => (
        <OnlineStatus status={row.deliveryStatus === 1} statusName={statusName} />
      ),
      valueEnum: statusOptionFormat(SendStatusOptions),
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 140,
      fixed: 'right',
      valueType: 'option',
      render: (_, row) => [
        <Button
          size="small"
          type="link"
          key="delete"
          onClick={() =>
            confirmModal({
              id: mapId,
              params: row.id,
              content: t('Are you sure you want to delete this device?'),
              modalFn: deleteMapRSU,
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
    <ProCard title={t('Issue RSU')} className={styles.send}>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        params={{ mapId }}
        request={mapRSUList}
        search={false}
        toolBarRender={() => [
          <CreateSendModal key="create" id={mapId} success={() => actionRef.current?.reload()} />,
        ]}
      />
    </ProCard>
  );
};

export default SendList;
