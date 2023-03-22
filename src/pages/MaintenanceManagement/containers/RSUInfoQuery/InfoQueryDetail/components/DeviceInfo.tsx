import BaseProTable from '#/components/BaseProTable';
import { NetworkStatusOptions, PowerStatusOptions, RunStatusOptions } from '#/constants/edge';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import React from 'react';

const DeviceInfo: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
  const deviceId = [
    {
      title: t('Device ID'),
      dataIndex: 'rsuId',
    },
    {
      title: t('Device Name'),
      dataIndex: 'rsuName',
    },
    {
      title: t('Serial Number'),
      dataIndex: 'rsuEsn',
    },
  ];
  const columns: ProColumns<Config.QueryInfoDetails>[] = [
    {
      title: t('Power State'),
      dataIndex: 'powerStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(PowerStatusOptions),
    },
    {
      title: t('Operating Status'),
      dataIndex: 'runStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(RunStatusOptions),
    },
    {
      title: t('Connection Status'),
      dataIndex: 'networkStatus',
      valueType: 'select',
      valueEnum: statusOptionFormat(NetworkStatusOptions),
    },
  ];
  const SubDeviceTable: React.FC<{ data: Config.QueryDeviceDetails[] }> = ({ data: list = [] }) => {
    const dataSource = list.map(({ Status: d, ...item }) => ({ ...item, ...d[0] }));
    const deviceType = [
      {
        title: t('Device ID'),
        dataIndex: 'deviceId',
      },
      {
        title: t('Device type'),
        dataIndex: 'deviceType',
      },
    ];
    return (
      <BaseProTable
        columns={[...deviceType, ...columns]}
        dataSource={dataSource}
        rowKey="deviceId"
        search={false}
        options={false}
        pagination={false}
      />
    );
  };
  return (
    <BaseProTable
      columns={[...deviceId, ...columns]}
      dataSource={data}
      search={false}
      toolBarRender={false}
      rowKey="rsuId"
      expandable={{ expandedRowRender: SubDeviceTable }}
    />
  );
};

export default DeviceInfo;
