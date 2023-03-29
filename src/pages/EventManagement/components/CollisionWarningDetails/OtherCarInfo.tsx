import CardList from '#/components/CardList';
import LonLatUnit from '#/components/LonLatUnit';
import { dataFormat } from '#/utils';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';

const OtherCarInfo: React.FC<{ type: 'ICW' | 'VRUCW'; info: Event.ICWListItem | undefined }> = ({
  type,
  info = {},
}) => {
  const infoMap = [
    {
      key: 'otherId',
      label: t('ID'),
    },
    {
      key: 'lon',
      label: t('Longitude'),
      render: ({ otherPos: { lon } }: Event.ICWListItem) => <LonLatUnit data={lon} />,
    },
    {
      key: 'lat',
      label: t('Latitude'),
      render: ({ otherPos: { lat } }: Event.ICWListItem) => <LonLatUnit data={lat} />,
    },
    {
      key: 'otherHeading',
      label: t('Direction Angle'),
      render: ({ otherHeading }: Event.ICWListItem) => dataFormat(otherHeading * 0.0125, '°'),
    },
    {
      key: 'otherWidth',
      label: t('Vehicle Width'),
      disabled: type === 'VRUCW',
      render: ({ otherWidth }: Event.ICWListItem) => dataFormat(otherWidth * 0.01, 'm'),
    },
    {
      key: 'otherLength',
      label: t('Vehicle Length'),
      disabled: type === 'VRUCW',
      render: ({ otherLength }: Event.ICWListItem) => dataFormat(otherLength * 0.01, 'm'),
    },
    {
      key: 'otherRadius',
      label: t('Radius'),
      disabled: type !== 'VRUCW',
      render: ({ otherRadius }: Event.ICWListItem) =>
        otherRadius ? dataFormat(otherRadius / 10, 'm') : '-',
    },
    {
      key: 'speed',
      label: t('Speed'),
      render: ({ otherKinematicsInfo: { speed } }: Event.ICWListItem) =>
        dataFormat(speed * 0.02 * 3.6, 'km/h'),
    },
    {
      key: 'accelerate',
      label: t('Acceleration'),
      render: ({ otherKinematicsInfo: { accelerate } }: Event.ICWListItem) => (
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
      render: ({ otherKinematicsInfo: { angularSpeed } }: Event.ICWListItem) =>
        dataFormat(angularSpeed * 0.02, 'rad/s'),
    },
  ];
  return (
    <ProCard title={type === 'ICW' ? t('Other Car Information') : t('Participant Information')}>
      <CardList infoMap={infoMap.filter(item => !item.disabled)} info={info} xl={12} />
    </ProCard>
  );
};

export default OtherCarInfo;
