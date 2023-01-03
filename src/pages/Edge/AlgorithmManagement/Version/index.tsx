import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { fetchAlgorithmVersionList } from '#/services/api/algorithm';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateAlgoVersionModal from './components/CreateAlgoVersionModal';
import { ProColumns } from '#/typings/pro-component';

const AlgorithmVersion: FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Config.AlgorithmListItem>[] = [
    {
      title: t('Algorithm Module'),
      dataIndex: 'module',
    },
    {
      title: t('Algorithm Name'),
      dataIndex: 'algo',
    },
    {
      title: t('Version Name'),
      dataIndex: 'version',
      search: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        rowKey="rowKey"
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          const result = await fetchAlgorithmVersionList(params);
          result.data = result.data.map(d => ({
            ...d,
            rowKey: `${d.algo}_${d.module}_${d.version}`,
          }));
          return result;
        }}
        toolBarRender={() => [
          <CreateAlgoVersionModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};
export default AlgorithmVersion;
