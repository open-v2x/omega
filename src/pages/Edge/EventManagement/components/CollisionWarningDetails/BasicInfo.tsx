import CardList from '#/components/CardList';
import LonLatUnit from '#/components/LonLatUnit';
import { ICWCollisionTypeOptions } from '#/constants/edge';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';

const BasicInfo: React.FC<{ basicInfo: Event.ICWListItem | undefined }> = ({ basicInfo = {} }) => {
  const infoMap = [
    {
      key: 'id',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Sensor Longitude'),
      render: ({ sensorPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Sensor Latitude'),
      render: ({ sensorPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'collisionType',
      label: t('Collision Type'),
      render: ({ collisionType }: Event.ICWListItem) => ICWCollisionTypeOptions[collisionType],
    },
    { key: 'secMark', label: t('Millisecond Time') },
  ];
  return (
    <ProCard title={t('Basic Information')}>
      <CardList infoMap={infoMap} info={basicInfo} xl={12} />
    </ProCard>
  );
};

export default BasicInfo;
