import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import CreateSendModal from '#/components/CreateSendModal';
import { RebootOptions } from '#/constants/edge';
import { maintenanceConfigList, sendMaintenanceConfig } from '#/services/api/config/maintenance';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import React, { useRef } from 'react';
import CreateMaintenanceModal from './components/CreateMaintenanceModal';

const RSUMaintenance: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.MaintenanceListItem>[] = [
    {
      title: t('RSU Name'),
      dataIndex: 'rsuName',
      ellipsis: true,
      search: true,
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
      search: true,
    },
    {
      title: t('Heartbeat Frequency'),
      dataIndex: 'hbRate',
      render: (heartbeat: string | number) => `${heartbeat}s`,
    },
    {
      title: t('Operating Frequency'),
      dataIndex: 'runningInfoRate',
      render: (heartbeat: string | number) => `${heartbeat}s`,
    },
    {
      title: t('Log Level'),
      dataIndex: 'logLevel',
    },
    {
      title: t('Whether To Reboot'),
      dataIndex: 'reboot',
      valueType: 'select',
      valueEnum: statusOptionFormat(RebootOptions),
    },
    {
      title: t('Address'),
      dataIndex: ['addressChg', 'cssUrl'],
    },
    {
      title: t('Timestamp'),
      dataIndex: ['addressChg', 'time'],
    },
    {
      title: t('Custom Configuration'),
      dataIndex: 'extendConfig',
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      render: (_, row) => [
        <CreateMaintenanceModal
          key="edit"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="down"
          onClick={async () => {
            await sendMaintenanceConfig(row.id);
            message.success(t('{{value}} successfully', { value: t('Delivered') }));
            actionRef.current?.reload();
          }}
        >
          {t('Down')}
        </Button>,
        <Divider key="down-divider" type="vertical" />,
        <CreateSendModal
          key="copy"
          type="rsu"
          id={row.id}
          success={() => actionRef.current?.reload()}
        />,
      ],
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={maintenanceConfigList} />
    </BaseContainer>
  );
};

export default RSUMaintenance;
