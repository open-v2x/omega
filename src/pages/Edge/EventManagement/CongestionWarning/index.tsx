import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { CongestionLevel } from '#/constants/edge';
import { getCGWList } from '#/services/api/event/cgw';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

const CongestionWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const columns: ProColumns<Event.CGWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Congestion Level'),
      dataIndex: 'cgwLevel',
      search: true,
      valueType: 'select',
      valueEnum: statusOptionFormat(CongestionLevel),
      // render: (item: string | number) => <div>{CongestionLevel[item]}</div>,
    },
    { title: t('Lane Number'), dataIndex: 'laneID' },
    { title: t('Average Speed'), dataIndex: 'avgSpeed', render: item => <div>{item} km/h</div> },
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
