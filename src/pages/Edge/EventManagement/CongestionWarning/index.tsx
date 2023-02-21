import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { getCGWList } from '#/services/api/event/cgw';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

const CongestionWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const levelMap = {
    0: '通畅',
    1: 'I级拥堵',
    2: 'II级拥堵',
    3: 'III级拥堵',
  };

  const columns: ProColumns<Event.CGWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Congestion Level'),
      dataIndex: 'cgwLevel',
      search: true,
      render: (item: string | number) => <div>{levelMap[item]}</div>,
    },
    { title: t('Lane Number'), dataIndex: 'laneID' },
    { title: t('Average Speed'), dataIndex: 'avgSpeed', render: (item) => <div>{item} km/h</div> },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    { title: t('Creation Time'), dataIndex: 'createTime' },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <Button
          type="link"
          size="small"
          key="details"
          onClick={() => navigator(`/event/congestion/details/${row.id}`, { state: row })}
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={getCGWList} />
    </BaseContainer>
  );
};

export default CongestionWarning;
