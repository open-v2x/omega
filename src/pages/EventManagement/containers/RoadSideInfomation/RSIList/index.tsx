import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { EventClassOptions, EventSourceOptions, EventTypeOptions } from '#/constants/edge';
import { eventInfoList } from '#/services/api/event/rsi';
import { ProColumns } from '#/typings/pro-component';
import { dataFormat, statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RSIList: React.FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.RSIListItem>[] = [
    {
      title: t('Alert ID'),
      dataIndex: 'id',
    },
    {
      title: t('Event Duration'),
      dataIndex: 'duration',
    },
    {
      title: t('Event Classification'),
      dataIndex: 'eventClass',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventClassOptions),
    },
    {
      title: t('Event Type'),
      dataIndex: 'eventType',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventTypeOptions),
      search: true,
    },
    {
      title: t('Event Source'),
      dataIndex: 'eventSource',
      valueType: 'select',
      valueEnum: statusOptionFormat(EventSourceOptions),
    },
    {
      title: t('Event Confidence'),
      dataIndex: 'eventConfidence',
    },
    {
      title: t('Occurrence Area Radius'),
      dataIndex: 'eventRadius',
      render: (_, { eventRadius }: Event.RSIListItem) => dataFormat(eventRadius / 10, 'm'),
    },
    {
      title: t('Event Description'),
      dataIndex: 'eventDescription',
    },
    {
      title: t('Event Priority'),
      dataIndex: 'eventPriority',
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <Button
          type="link"
          size="small"
          key="details"
          onClick={() => navigate(`/event/rsi/details/${row.id}`)}
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={eventInfoList} />
    </BaseContainer>
  );
};

export default RSIList;
