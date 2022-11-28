import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { QueryIntervalOptions, QueryTypeOptions } from '#/constants/edge';
import { deleteInfoQuery, infoQueryList } from '#/services/api/config/query';
import { useRequestStore } from '#/store/request';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Divider } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateQueryModal from './components/CreateQueryModal';

const InfoQueryList: React.FC = () => {
  const navigate = useNavigate();
  const { fetchDeviceListInModal } = useRequestStore();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.QueryListItem>[] = [
    {
      title: t('Query RSU'),
      dataIndex: 'rsus',
      render: (_, { rsus }) => rsus.map(({ rsuName }) => rsuName).join('、'),
    },
    {
      title: t('Query RSU'),
      dataIndex: 'rsuId',
      valueType: 'select',
      request: fetchDeviceListInModal,
      hideInTable: true,
      search: true,
    },
    {
      title: t('Query Information Type'),
      dataIndex: 'queryType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryTypeOptions),
    },
    {
      title: t('Query Information Time Interval'),
      dataIndex: 'timeType',
      valueType: 'select',
      valueEnum: statusOptionFormat(QueryIntervalOptions),
    },
    {
      title: t('Command Issue Time'),
      dataIndex: 'createTime',
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      valueType: 'option',
      render: (_, { id, queryType }) => [
        <a
          key="details"
          onClick={() => {
            navigate(`/maintenance/query/details/${id}?type=${queryType}`);
          }}
        >
          {t('Details')}
        </a>,
        <Divider key="delete-divider" type="vertical" />,
        <a
          key="delete"
          onClick={() =>
            confirmModal({
              id,
              content: t('Are you sure you want to delete this query?'),
              modalFn: deleteInfoQuery,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </a>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={infoQueryList}
        toolBarRender={() => [
          <CreateQueryModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default InfoQueryList;
