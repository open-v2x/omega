import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { DSDEquipmentTypeOptions } from '#/constants/edge';
import { sensorDataSharingList } from '#/services/api/event/sds';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React from 'react';
import { useRef } from 'react';

const SensorDataSharing: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.SDSListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    { title: t('Message Number'), dataIndex: 'msgID' },
    {
      title: t('Equipment Type'),
      dataIndex: 'equipmentType',
      valueType: 'select',
      valueEnum: statusOptionFormat(DSDEquipmentTypeOptions),
      search: true,
    },
    {
      title: t('Sensor Longitude'),
      dataIndex: ['sensorPos', 'lon'],
      render: (_, { sensorPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Sensor Latitude'),
      dataIndex: ['sensorPos', 'lat'],
      render: (_, { sensorPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    { title: t('Vehicle ID'), dataIndex: 'egoID' },
    {
      title: t('Vehicle Longitude'),
      dataIndex: ['egoPos', 'lon'],
      render: (_, { egoPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Vehicle Latitude'),
      dataIndex: ['egoPos', 'lat'],
      render: (_, { egoPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={sensorDataSharingList}
        columnsState={{
          defaultValue: {
            'sensorPos,lon': { show: false },
            'sensorPos,lat': { show: false },
          },
        }}
      />
    </BaseContainer>
  );
};

export default SensorDataSharing;
