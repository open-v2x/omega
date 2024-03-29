import { SelectLang } from '#/components/SelectLang';
import React, { useEffect, useState } from 'react';
import AvatarDropdown from './AvatarDropDown';
import styles from './index.module.less';

import { edgeSiteList } from '#/services/api/center/site';
import { Select, Space } from 'antd';
import { useRootStore } from '#/store/root';
import { IconFont } from '#/core/App';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export default function RightContent() {
  const [siteList, setSiteList] = useState([]);
  const ip = useRootStore().getNodeIp();
  const rootStore = useRootStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hideSelect = searchParams.get('hs');
  const globalConfig = useRootStore(state => state.globalConfig);

  const handleChange = (selectIP: string) => {
    const edge = siteList.find(e => e.edgeSiteDandelionEndpoint === selectIP);
    rootStore.setState({
      reload: true,
    });
    rootStore.setNode(edge || undefined);
  };

  const renderRegion = () => (
    <div className={styles.region}>
      <span className={styles['region-area']}>{t('Edge Site')}</span>
      <Select
        value={ip || ''}
        style={{
          width: '200px',
        }}
        fieldNames={{
          label: 'name',
          value: 'edgeSiteDandelionEndpoint',
        }}
        options={siteList}
        onChange={handleChange}
        key={'edge-site'}
      />
    </div>
  );

  const renderEdgeSite = () => (
    <div className={styles['edge-site']} onClick={() => navigate('/system/edgeSiteConfig?hs=1')}>
      <Space>
        <IconFont type={'icon-location'} />
      </Space>
      <div className={styles['edge-site-text']}>{t('Site Config')}</div>
    </div>
  );

  const fetchSites = async () => {
    const { total, data } = await edgeSiteList(
      {
        name: '',
        pageNum: 1,
        pageSize: -1,
      },
      true,
    );
    if (total > 0) {
      const curNodeIp = rootStore.getNodeIp();
      const findOut = data.find(node => node.edgeSiteDandelionEndpoint === curNodeIp);
      rootStore.setNode(findOut || data[0] || undefined);
    } else {
      rootStore.setNode(undefined);
    }
    rootStore.setState({
      inited: true,
    });
    setSiteList(data);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div className={styles['header-content']}>
      {globalConfig?.v2x_position_center && !hideSelect && renderRegion()}
      <div className={styles['header-right']}>
        {globalConfig?.v2x_position_center && renderEdgeSite()}
        <AvatarDropdown />
        <div className={styles.action}>
          <SelectLang />
        </div>
      </div>
    </div>
  );
}
