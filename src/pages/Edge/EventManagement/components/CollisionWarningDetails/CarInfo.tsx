import CardList from '#/components/CardList';
import LonLatUnit from '#/components/LonLatUnit';
import { formatHeading, formatLength, formatSpeed } from '#/constants/direction';
import { dataFormat } from '#/utils';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';

const CarInfo: React.FC<{ info: Event.ICWListItem | undefined }> = ({ info = {} }) => {
  const infoMap = [
    {
      key: 'egoId',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
      render: ({ egoPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ egoPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'egoHeading',
      label: t('Direction Angle'),
      render: ({ egoHeading }: Event.ICWListItem) => formatHeading(egoHeading),
    },
    {
      key: 'egoWidth',
      label: t('Vehicle Width'),
      render: ({ egoWidth }: Event.ICWListItem) => formatLength(egoWidth),
    },
    {
      key: 'egoLength',
      label: t('Vehicle Length'),
      render: ({ egoLength }: Event.ICWListItem) => formatLength(egoLength),
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ egoKinematicsInfo: { speed } }: Event.ICWListItem) => formatSpeed(speed),
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ egoKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {dataFormat(accelerate * 0.02)}
          <span style={{ marginLeft: '6px' }}>
            {t('Meter')}/{t('Second')}
            <sup>2</sup>
          </span>
        </>
      ),
    },
    {
      key: 'angularSpeed',
      label: t('Angular Velocity'),
      render: ({ egoKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        dataFormat(angularSpeed * 0.02, 'rad/s'),
    },
  ];
  return (
    <ProCard title={t('Car Information')}>
      <CardList infoMap={infoMap} info={info} xl={12} />
    </ProCard>
  );
};

export default CarInfo;
