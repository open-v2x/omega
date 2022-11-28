import BaseProTable from '#/components/BaseProTable';
import { ProColumns } from '#/typings/pro-component';
import React from 'react';

const OperatingStatus: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
  const dataSource = data.map(({ data: d, ...item }) => ({ ...item, ...d }));
  const columns: ProColumns<Config.QueryInfoDetails>[] = [
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
    {
      title: t('CPU Running Information'),
      children: [
        {
          title: t('CPU Load'),
          dataIndex: ['cpu', 'load'],
        },
        {
          title: t('CPU Utilization'),
          dataIndex: ['cpu', 'uti'],
        },
      ],
    },
    {
      title: t('Memory Operation Information'),
      children: [
        {
          title: t('Total Memory (M)'),
          dataIndex: ['mem', 'total'],
        },
        {
          title: t('Stored Memory (M)'),
          dataIndex: ['mem', 'used'],
        },
        {
          title: t('Available Memory (M)'),
          dataIndex: ['mem', 'free'],
        },
      ],
    },
    {
      title: t('Disk Operation Information'),
      children: [
        {
          title: t('Total Disk (M)'),
          dataIndex: ['disk', 'total'],
        },
        {
          title: t('Used Disk (M)'),
          dataIndex: ['disk', 'used'],
        },
        {
          title: t('Free Disk (M)'),
          dataIndex: ['disk', 'free'],
        },
        {
          title: t('IO Requests Per Second'),
          dataIndex: ['disk', 'tps'],
        },
        {
          title: t('Disk Data Written Per Second (K)'),
          dataIndex: ['disk', 'write'],
        },
        {
          title: t('Disk Data Read Per Second (K)'),
          dataIndex: ['disk', 'read'],
        },
      ],
    },
    {
      title: t('Network Operation Information'),
      children: [
        {
          title: t('Received Packets Per Second'),
          dataIndex: ['net', 'rx'],
        },
        {
          title: t('Send Packets Per Second'),
          dataIndex: ['net', 'tx'],
        },
        {
          title: t('Bytes Received Per Second'),
          dataIndex: ['net', 'rxByte'],
        },
        {
          title: t('Bytes Sent Per Second'),
          dataIndex: ['net', 'txByte'],
        },
      ],
    },
  ];
  return (
    <BaseProTable
      bordered
      columns={columns}
      dataSource={dataSource}
      rowKey="rsuId"
      search={false}
      scroll={{ x: 800 }}
      toolBarRender={false}
    />
  );
};

export default OperatingStatus;
