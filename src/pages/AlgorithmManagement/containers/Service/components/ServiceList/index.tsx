import BaseProTable from '#/components/BaseProTable';
import { renderDeleteBtn } from '#/components/BaseProTable/components/TableHelper';
import {
  fetchDeleteServiceList,
  fetchServiceList,
  getServiceTypes,
} from '#/services/api/algorithm/service';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateServiceList from './Create';

const ServiceList: FC = () => {
  const actionRef = useRef<ActionType>();

  const moreActions = (row: Device.DeviceListItem) => [
    {
      key: 'delete',
      label: renderDeleteBtn(
        row.id,
        fetchDeleteServiceList,
        t('delete {{type}}', { type: t('Algorithm Service') }),
        actionRef,
      ),
    },
  ];

  const columns: ProColumns<Algorithm.ServiceItem>[] = [
    {
      title: `${t('{{value}} Name', { value: t('Algorithm Service') })}`,
      dataIndex: 'name',
      search: true,
    },
    {
      title: `${t('{{value}} ID', { value: t('Algorithm Service') })}`,
      dataIndex: 'type_id',
    },
    {
      title: `${t('{{value}} Name', { value: t('Algorithm Service Type') })}`,
      dataIndex: 'type_id',
      valueType: 'select',
      request: getServiceTypes,
    },
    {
      title: `${t('Algorithm Service Support')}`,
      dataIndex: 'vendor',
    },
    {
      title: `${t('Describe')}`,
      dataIndex: 'description',
      ellipsis: true,
      width: 400,
    },
  ];

  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      request={fetchServiceList}
      rowActions={{
        firstAction: (row: Algorithm.ServiceItem) => (
          <CreateServiceList
            key="edit"
            editId={row.id}
            editInfo={row}
            success={() => actionRef.current?.reload()}
          />
        ),
        moreActions,
      }}
      toolBarRender={() => [
        <CreateServiceList key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default ServiceList;
