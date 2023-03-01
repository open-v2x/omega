import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import LonLatUnit from '#/components/LonLatUnit';
import { getOSWList } from '#/services/api/event/osw';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OverspeedWarning: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigator = useNavigate();

  const columns: ProColumns<Event.SpeedWarningListItem>[] = [
    { title: t('ID'), dataIndex: 'id' },
    {
      title: t('Overspeed Lat'),
      dataIndex: 'egoPos',
      render: item => <LonLatUnit data={item.lat} />,
    },
    {
      title: t('Overspeed Lon'),
      dataIndex: 'egoPos',
      render: item => <LonLatUnit data={item.lon} />,
    },
    { title: t('Idea ID'), dataIndex: 'egoID' },
    { title: t('Millisecond Time'), dataIndex: 'secMark' },
    { title: t('Creation Time'), dataIndex: 'createTime' },
    {
      title: t('Operate'),
      width: 160,
      fixed: 'right',
      render: (_, row) => [
        <Button
          type="link"
          size="small"
          key="details"
          onClick={() => navigator(`/event/overspeed/details/${row.id}`, { state: row })}
        >
          {t('Details')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable columns={columns} actionRef={actionRef} request={getOSWList} search={false} />
    </BaseContainer>
  );
};

export default OverspeedWarning;
