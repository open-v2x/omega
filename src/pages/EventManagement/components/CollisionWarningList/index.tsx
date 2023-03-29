import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { ICWCollisionTypeOptions } from '#/constants/edge';
import { intersectionCollisionWarningList } from '#/services/api/event/icw';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { useRef } from 'react';

type CollisionWarningProps = {
  type: 'ICW' | 'VRUCW';
  navigator: (data: Event.ICWListItem) => void;
};

const CollisionWarningList: React.FC<CollisionWarningProps> = ({ type = 'ICW', navigator }) => {
  console.log('type', type);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.ICWListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
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
    {
      title: t('Collision Type'),
      dataIndex: 'collisionType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ICWCollisionTypeOptions),
      search: true,
    },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <Button type="link" size="small" key="details" onClick={() => navigator(row)}>
          {t('Details')}
        </Button>,
      ],
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
  ];
  return (
    <BaseProTable
      columns={columns}
      actionRef={actionRef}
      params={{ eventType: { ICW: 0, VRUCW: 1 }[type] }}
      request={intersectionCollisionWarningList}
    />
  );
};

export default CollisionWarningList;
