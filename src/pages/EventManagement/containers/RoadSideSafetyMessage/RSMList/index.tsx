import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { formatHeading, formatSpeed } from '#/constants/direction';
import { DataSourceOptions, ParticipantTypeOptions } from '#/constants/edge';
import { roadSideMessageList } from '#/services/api/event/rsm';
import { ProColumns } from '#/typings/pro-component';
import { statusOptionFormat } from '#/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RSMList: React.FC = () => {
  const navigate = useNavigate();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Event.RSMListItem>[] = [
    {
      title: t('Message ID'),
      dataIndex: 'id',
    },
    {
      title: t('Target ID'),
      dataIndex: 'ptcId',
    },
    {
      title: t('Participant Type'),
      dataIndex: 'ptcType',
      valueType: 'select',
      valueEnum: statusOptionFormat(ParticipantTypeOptions),
      search: true,
    },
    {
      title: t('Data Sources'),
      dataIndex: 'source',
      valueType: 'select',
      valueEnum: statusOptionFormat(DataSourceOptions),
    },
    {
      title: t('Millisecond Time'),
      dataIndex: 'secMark',
    },
    {
      title: t('Speed'),
      dataIndex: 'speed',
      render: (_, { speed }: Event.RSMListItem) => formatSpeed(speed),
    },
    {
      title: t('Heading'),
      dataIndex: 'heading',
      render: (_, { heading }: Event.RSMListItem) => formatHeading(heading),
    },
    {
      title: t('Longitude'),
      dataIndex: 'lon',
      render: (_, { lon }: Event.RSMListItem) => <LonLatUnit data={lon} />,
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
      render: (_, { lat }: Event.RSMListItem) => <LonLatUnit data={lat} />,
    },
    {
      title: t('Reporting Time'),
      dataIndex: 'createTime',
      sorter: true,
    },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <Button
          type="link"
          size="small"
          key="details"
          onClick={() =>
            navigate(`/event/rsm/details`, {
              state: row,
            })
          }
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={roadSideMessageList}
        columnsState={{
          defaultValue: {
            speed: { show: false },
            heading: { show: false },
            lon: { show: false },
            lat: { show: false },
          },
        }}
      />
    </BaseContainer>
  );
};

export default RSMList;
