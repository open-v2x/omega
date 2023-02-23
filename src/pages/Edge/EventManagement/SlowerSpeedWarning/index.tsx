import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { getSSWList } from '#/services/api/event/ssw';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';

const SlowerSpeedWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const columns: ProColumns<Event.SpeedWarningListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Slower Speed Lat'),
      dataIndex: 'egoPos',
      render: item => <div>{item.lat}</div>,
    },
    {
      title: t('Slower Speed Lon'),
      dataIndex: 'egoPos',
      render: item => <div>{item.lon}</div>,
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
          onClick={() => navigator(`/event/slowerspeed/details/${row.id}`, { state: row })}
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];

  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={getSSWList} />
    </BaseContainer>
  );
};

export default SlowerSpeedWarning;
