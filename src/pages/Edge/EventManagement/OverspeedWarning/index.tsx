import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { getCGWList } from '#/services/api/event/cgw';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OverspeedWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const columns: ProColumns<Event.CGWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Congestion Level'),
      dataIndex: 'cgwLevel',
      search: true,
    },
    { title: t('Lane Number'), dataIndex: 'laneID' },
    { title: t('Average Speed'), dataIndex: 'avgSpeed' },
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
          onClick={() => navigator(`/event/overspeed/details`, { state: row })}
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

export default OverspeedWarning;
