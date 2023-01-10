import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { deleteAlgorithm, fetchAlgorithmVersionList } from '#/services/api/algorithm';
import { ActionType } from '@ant-design/pro-components';
import React, { FC, useRef } from 'react';
import CreateAlgoVersionModal from './components/CreateAlgoVersionModal';
import { ProColumns } from '#/typings/pro-component';
import { Button } from 'antd';
import { confirmModal } from '#/components/ConfirmModal';

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
    {
      title: t('Operate'),
      render: (_, row) => [
        <Button
          type="link"
          size="small"
          key="delete"
          disabled={!row.id}
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete this algorithm version'),
              modalFn: deleteAlgorithm,
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
