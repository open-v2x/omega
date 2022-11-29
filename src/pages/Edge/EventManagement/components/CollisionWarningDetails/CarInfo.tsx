import CardList from '#/components/CardList';
import LonLatUnit from '#/components/LonLatUnit';
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
      render: ({ egoHeading }: Event.ICWListItem) => dataFormat(egoHeading * 0.0125, '°'),
    },
    {
      key: 'egoWidth',
      label: t('Vehicle Width'),
      render: ({ egoWidth }: Event.ICWListItem) => dataFormat(egoWidth * 0.01, 'm'),
    },
    {
      key: 'egoLength',
      label: t('Vehicle Length'),
      render: ({ egoLength }: Event.ICWListItem) => dataFormat(egoLength * 0.01, 'm'),
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ egoKinematicsInfo: { speed } }: Event.ICWListItem) =>
        dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ egoKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
        <>
          {dataFormat(accelerate * 0.02)}
          <span style={{ marginLeft: '6px' }}>
            m/s<sup>2</sup>
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
