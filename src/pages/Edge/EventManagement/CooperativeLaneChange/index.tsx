import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { DriveBehaviorTypeOptions, CoordinationInfoTypeOptions } from '#/constants/edge';
import { cooperativeLaneChangeList } from '#/services/api/event/clc';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat, dataFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const CooperativeLaneChange: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.DNPWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    { title: t('Message Number'), dataIndex: 'msgID' },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    {
      title: t('Longitude'),
      dataIndex: ['refPos', 'lon'],
      render: (_, { refPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: ['refPos', 'lat'],
      render: (_, { refPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    { title: t('Vehicle ID'), dataIndex: 'vehID' },
    {
      title: t('Driving Behavior'),
      dataIndex: ['driveSuggestion', 'suggestion'],
      valueType: 'select',
      valueEnum: statusOptionFormat(DriveBehaviorTypeOptions),
    },
    {
      title: t('Request Valid Time'),
      dataIndex: ['driveSuggestion', 'lifeTime'],
      render: (_, { driveSuggestion: { lifeTime } }) => dataFormat(lifeTime * 10, 'ms'),
    },
    {
      title: t('Coordination Information'),
      dataIndex: 'info',
      valueType: 'select',
      valueEnum: statusOptionFormat(CoordinationInfoTypeOptions),
      search: true,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={cooperativeLaneChangeList} />
    </BaseContainer>
  );
};

export default CooperativeLaneChange;
