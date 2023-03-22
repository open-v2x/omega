import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { CoordinationInfoTypeOptions, DriveBehaviorTypeOptions } from '#/constants/edge';
import { overtakingWarningList } from '#/services/api/event/dnpw';
import { ProColumns } from '#/typings/pro-component';
import { dataFormat, statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';

const DnNotPassWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.DNPWListItem>[] = [
    {
      title: t('ID'),
      dataIndex: 'id',
    },
    {
      title: t('Message Number'),
      dataIndex: 'msgID',
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
    },
    {
      title: t('Vehicle Longitude'),
      dataIndex: ['refPos', 'lon'],
      render: (_, { refPos: { lon } }) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Vehicle Latitude'),
      dataIndex: ['refPos', 'lat'],
      render: (_, { refPos: { lat } }) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Target ID'),
      dataIndex: 'vehID',
    },
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
      <BaseProTable columns={columns} actionRef={actionRef} request={overtakingWarningList} />
    </BaseContainer>
  );
};

export default DnNotPassWarning;
