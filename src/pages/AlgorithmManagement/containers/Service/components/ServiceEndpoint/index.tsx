import BaseProTable from '#/components/BaseProTable';
import { renderDeleteBtn, renderEnableBtn } from '#/components/BaseProTable/components/TableHelper';
import {
  fetchDeleteServiceEndpoint,
  fetchEndpointList,
  fetchUpdateEndpoint,
  getServiceListWithSelect,
} from '#/services/api/algorithm/service';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateServiceEndpoint from './Create';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { DeviceStatusOptions } from '#/constants/edge';

const ServiceEndpoint: FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = (row: Device.DeviceListItem) => [
    {
      key: 'disabled',
      label: renderEnableBtn(row.id, row.enabled, fetchUpdateEndpoint, actionRef),
    },
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        fetchDeleteServiceEndpoint,
        t('delete {{type}}', { type: t('Algorithm Service Endpoints') }),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Algorithm.ServiceEndpoint>[] = [
    {
      title: `${t('{{value}} Name', { value: t('Algorithm Service') })}`,
      dataIndex: 'service_id',
      request: getServiceListWithSelect,
      valueType: 'select',
    },
    {
      title: `${t('Algorithm Service Endpoints')}`,
      dataIndex: 'url',
      search: true,
    },
    {
      title: t('Status'),
      dataIndex: 'enabled',
      valueType: 'select',
      valueEnum: statusOptionFormat(DeviceStatusOptions),
    },
  ];

  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      request={fetchEndpointList}
      rowActions={{
        firstAction: (row: Algorithm.ServiceEndpoint) => (
          <CreateServiceEndpoint
            key="edit"
            editId={row.id}
            editInfo={row}
            success={() => actionRef.current?.reload()}
          />
        ),
        moreActions,
      }}
      toolBarRender={() => [
        <CreateServiceEndpoint key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default ServiceEndpoint;
