import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { renderDeleteBtn, renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';
import { deleteEdgeSite, getEdgeSiteList } from '#/services/api/system/edge';
import { ActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import CreateEdgeSiteModal from '../components/CreateEdgeSiteModal';
import { Space } from 'antd';

const SiteConfigList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const columns = [
    {
      title: `${t('Edge Site Name')}/ID`,
      dataIndex: 'name',
      ellipsis: true,
      render: (_, row) =>
        renderNameAndNo(row.name, row.id, () =>
          navigate(`/system/edgeSiteConfig/details/${row.id}?hs=1`),
        ),
    },
    {
      title: t('Edge Site Name'),
      dataIndex: 'name',
      search: true,
      hideInTable: true,
    },
    {
      title: t('Edge Site Endpoint'),
      dataIndex: 'edgeSiteDandelionEndpoint',
      ellipsis: true,
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        columns={columns}
        request={getEdgeSiteList}
        toolBarRender={() => [
          <CreateEdgeSiteModal key="create" success={() => actionRef.current?.reload()} />,
        ]}
        rowActions={{
          firstAction: row => (
            <div key="action">
              <Space key="edit-s">
                <CreateEdgeSiteModal
                  key="edit"
                  editInfo={row}
                  success={() => actionRef.current?.reload()}
                />
              </Space>
              <Space key="delete-s">
                {renderDeleteBtn(row.id, deleteEdgeSite, t('delete edge site'), actionRef)}
              </Space>
            </div>
          ),
        }}
      />
    </BaseContainer>
  );
};

export default SiteConfigList;
