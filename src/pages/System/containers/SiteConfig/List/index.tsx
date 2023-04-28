import BaseContainer from '#/components/BaseContainer';
import BaseProTable from '#/components/BaseProTable';
import { renderDeleteBtn, renderNameAndNo } from '#/components/BaseProTable/components/TableHelper';
import { deleteEdgeSite, getEdgeSiteList } from '#/services/api/system/edge';
import { ActionType } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import CreateEdgeSiteModal from '../components/CreateEdgeSiteModal';
import { Space } from 'antd';
import { formatAreaByAreaCode } from '#/components/Country/renderHelper';
import { fetchCountries } from '#/services/api/device/device';

const SiteConfigList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    const country = await fetchCountries({
      cascade: true,
      needIntersection: false,
    });
    setCountries(country);
  };

  useEffect(() => {
    getCountries();
  }, []);

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
    {
      title: t('Installation Area'),
      dataIndex: 'areaCode',
      render: areaCode => (countries.length ? formatAreaByAreaCode(countries, areaCode) : ''),
    },
    {
      title: t('Creation Time'),
      dataIndex: 'createTime',
    },
  ];
  return (
    <BaseContainer>
      <BaseProTable
        actionRef={actionRef}
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
