import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { confirmModal } from '#/components/ConfirmModal';
import { renderAreaFormatName, renderAreaFormItem } from '#/components/Country/renderHelper';
import { deleteCrossing, fetchCrossingList } from '#/services/api/config/crossing';
import { ProColumns } from '#/typings/pro-component';
import { ActionType } from '@ant-design/pro-components';
import { Button, Divider } from 'antd';
import React, { FC, useRef } from 'react';
import CreateCrossingModal from '../component/CreateCrossingModal';

const Crossing: FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<Config.CrossingItem>[] = [
    {
      title: t('Crossing Name'),
      dataIndex: 'name',
      search: true,
    },
    {
      title: t('Crossing Area'),
      dataIndex: 'countryName',
      render: (_, row) => renderAreaFormatName(row),
      renderFormItem: renderAreaFormItem,
      search: true,
    },
    {
      title: t('Crossing Code'),
      dataIndex: 'code',
    },
    {
      title: t('Longitude'),
      dataIndex: 'lng',
    },
    {
      title: t('Latitude'),
      dataIndex: 'lat',
    },
    {
      title: t('Operate'),
      width: 220,
      fixed: 'right',
      render: (_, row) => [
        <CreateCrossingModal
          key="edit"
          editInfo={row}
          success={() => actionRef.current?.reload()}
        />,
        <Divider key="edit-divider" type="vertical" />,
        <Button
          type="link"
          size="small"
          key="delete"
          onClick={() =>
            confirmModal({
              id: row.id,
              content: t('Are you sure you want to delete the crossing?'),
              modalFn: deleteCrossing,
              actionRef,
            })
          }
        >
          {t('Delete')}
        </Button>,
      ],
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        actionRef={actionRef}
        request={fetchCrossingList}
        toolBarRender={() => [
          <CreateCrossingModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
      />
    </BaseContainer>
  );
};

export default Crossing;
