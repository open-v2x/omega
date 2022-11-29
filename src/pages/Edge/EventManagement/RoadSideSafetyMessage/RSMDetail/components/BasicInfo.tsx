import CardList from '#/components/CardList';
import LonLatUnit from '#/components/LonLatUnit';
import { ParticipantTypeOptions, DataSourceOptions } from '#/constants/edge';
import { dataFormat } from '#/utils';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';

// 基本信息
const BasicInfo: React.FC<{ basicInfo: Event.RSMListItem | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'id',
      label: t('Message ID'),
    },
    {
      key: 'ptcId',
      label: t('Target ID'),
    },
    {
      key: 'ptcType',
      label: t('Participant Type'),
      render: ({ ptcType }: Event.RSMListItem) => ParticipantTypeOptions[ptcType],
    },
    {
      key: 'source',
      label: t('Data Sources'),
      render: ({ source }: Event.RSMListItem) => DataSourceOptions[source],
    },
    {
      key: 'secMark',
      label: t('Millisecond Time'),
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ speed }: Event.RSMListItem) => dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      key: 'heading',
      label: t('Heading'),
      render: ({ heading }: Event.RSMListItem) => dataFormat(heading * 0.0125, '°'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
      render: ({ lon }: Event.RSMListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ lat }: Event.RSMListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'createTime',
      label: t('Reporting Time'),
    },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

export default BasicInfo;
