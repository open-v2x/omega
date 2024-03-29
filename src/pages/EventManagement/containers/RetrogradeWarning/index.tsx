import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { getRDWList } from '#/services/api/event/rdw';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

const RetrogradeWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const columns: ProColumns<Event.SpeedWarningListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Retrograde Lat'),
      dataIndex: 'egoPos',
      render: item => <LonLatUnit data={item.lat} />,
    },
    {
      title: t('Retrograde Lon'),
      dataIndex: 'egoPos',
      render: item => <LonLatUnit data={item.lat} />,
    },
    { title: t('Idea ID'), dataIndex: 'egoID' },
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
          onClick={() => navigator(`/event/retrograde/details/${row.id}`, { state: row })}
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable actionRef={actionRef} columns={columns} request={getRDWList} search={false} />
    </BaseContainer>
  );
};

export default RetrogradeWarning;
