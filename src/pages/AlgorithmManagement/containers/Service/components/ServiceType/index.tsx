import BaseProTable from '#/components/BaseProTable';
import { renderDeleteBtn } from '#/components/BaseProTable/components/TableHelper';
import { fetchDeleteServiceType, fetchServiceTypes } from '#/services/api/algorithm/service';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateServiceType from './Create';

const ServiceType: FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Algorithm.ServiceType>[] = [
    {
      title: `${t('{{value}} Name', { value: t('Algorithm Service Type') })}`,
      dataIndex: 'name',
      search: true,
    },
    {
      title: `${t('{{value}} ID', { value: t('Algorithm Service Type') })}`,
      dataIndex: 'id',
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
      request={fetchServiceTypes}
      rowActions={{
        firstAction: (row: Device.DeviceListItem) =>
          renderDeleteBtn(
            row.id,
            fetchDeleteServiceType,
            t('delete {{type}}', { type: t('Algorithm Service Type') }),
            actionRef,
          ),
      }}
      toolBarRender={() => [
        <CreateServiceType key="create" success={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default ServiceType;
