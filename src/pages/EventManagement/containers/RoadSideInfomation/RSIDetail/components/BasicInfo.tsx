import React from 'react';
import { EventClassOptions, EventSourceOptions, EventTypeOptions } from '#/constants/edge';
import { dataFormat } from '#/utils';
import { ProCard } from '@ant-design/pro-components';
import CardList from '#/components/CardList';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Event.RSIDetails | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'eventClass',
      label: t('Event Classification'),
      render: ({ eventClass }: Event.RSIDetails) => EventClassOptions[eventClass],
    },
    {
      key: 'eventType',
      label: t('Event Type'),
      render: ({ eventType }: Event.RSIDetails) => EventTypeOptions[eventType],
    },
    {
      key: 'duration',
      label: t('Event Duration'),
    },
    {
      key: 'eventSource',
      label: t('Event Source'),
      render: ({ eventSource }: Event.RSIDetails) => EventSourceOptions[eventSource],
    },
    {
      key: 'eventConfidence',
      label: t('Event Confidence'),
      render: ({ eventConfidence }: Event.RSIDetails) => eventConfidence || '-',
    },
    {
      key: 'eventRadius',
      label: t('Occurrence Area Radius'),
      render: ({ eventRadius }: Event.RSIDetails) => dataFormat(eventRadius / 10, 'm'),
    },
    {
      key: 'eventDescription',
      label: t('Event Description'),
    },
    {
      key: 'eventPriority',
      label: t('Event Priority'),
    },
    {
      key: 'createTime',
      label: t('Reporting Time'),
    },
    {
      key: 'rsuName',
      label: t('Issued RSU'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

export default BasicInfo;
