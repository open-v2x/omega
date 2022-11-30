import { ProList } from '@ant-design/pro-list';
import { Button } from 'antd';
import React from 'react';
import styles from './index.module.less';
import imgNavigate from '#/assets/images/navigate.png';
import { useNavigate } from 'react-router-dom';
import PlatformHeader from '#/components/PlatformHeader';
import { edgeSiteList } from '#/services/api/center/site';

const EdgeSite: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="cloud-platform f-column">
      <PlatformHeader position="relative" />
      <div className={styles['edge-site']}>
        <div className={styles.wrapper}>
          <div className={styles['wrapper-desc']}>
            <p>{t('Please select an edge location')}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: t('EDGE_SITE_TIPS', {
                  value: `<span>${t('Go to [Regional Edge Portal]')}</span>`,
                }),
              }}
            />
          </div>
          <ProList
            size="large"
            search={{ labelWidth: 114, span: 12 }}
            form={{
              size: 'large',
              submitter: {
                submitButtonProps: { style: { width: '88px' } },
                resetButtonProps: { style: { display: 'none' } },
              },
            }}
            request={async ({ name = '', current = 1, pageSize = 10 }) => {
              const res = await edgeSiteList({ name, pageNum: current, pageSize });
              return {
                data: res.data,
                page: 1,
                total: res.total,
                success: true,
              };
            }}
            pagination={{ pageSize: 10, hideOnSinglePage: true }}
            metas={{
              title: {
                dataIndex: 'name',
                title: t('Edge Site Name'),
              },
              actions: {
                render: (...[, { id }]) => [
                  <Button
                    type="link"
                    size="small"
                    key="cloud"
                    onClick={() => navigate(`/center/cloud?id=${id}`)}
                  >
                    {t('Go to [Regional Edge Portal]')}
                    <img src={imgNavigate} alt="" />
                  </Button>,
                ],
                search: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EdgeSite;
