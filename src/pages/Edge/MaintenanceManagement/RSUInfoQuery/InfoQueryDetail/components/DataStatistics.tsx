import BaseProTable from '#/components/BaseProTable';
import { ProColumns } from '#/typings/pro-component';
import React from 'react';

const DataStatistics: React.FC<{ data?: Config.QueryInfoDetails[] }> = ({ data = [] }) => {
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
      title: t('The Total Amount Of RSI Messages Reported'),
      dataIndex: 'RSI',
    },
    {
      title: t('The Total Amount Of MAP Messages Reported'),
      dataIndex: 'MAP',
    },
    {
      title: t('The Total Amount Of RSM Messages Reported'),
      dataIndex: 'RSM',
    },
    {
      title: t('The Total Amount Of SPAT Messages Reported'),
      dataIndex: 'SPAT',
    },
    {
      title: t('The Total Amount Of BSM Messages Reported'),
      dataIndex: 'BSM',
    },
  ];
  return (
    <BaseProTable
      columns={columns}
      dataSource={dataSource}
      rowKey="rsuId"
      search={false}
      toolBarRender={false}
    />
  );
};

export default DataStatistics;
