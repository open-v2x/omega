import { SelectLang } from '#/components/SelectLang';
import React, { useEffect, useState } from 'react';
import AvatarDropdown from './AvatarDropDown';
import styles from './index.module.less';

import { edgeSiteList } from '#/services/api/center/site';
import { Select } from 'antd';
import { useRootStore } from '#/store/root';

export default function RightContent() {
  const [siteList, setSiteList] = useState([]);
  const ip = useRootStore(state => state.edgeSite.ip);
  const rootStore = useRootStore();

  const handleChange = (selectIP: string) => {
    const edge = siteList.find(e => e.ip === selectIP);
    rootStore.setState({
      edgeSite: edge,
      reload: true,
    });
    rootStore.setNodeId(edge.nodeId);
  };

  const renderRegion = () => (
    <div className={styles.region}>
      <span className={styles['region-area']}>{t('Edge Site')}</span>
      <Select
        value={ip}
        style={{
          width: '200px',
        }}
        fieldNames={{
          label: 'name',
          value: 'ip',
        }}
        options={siteList}
        onChange={handleChange}
        key={'edge-site'}
      />
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
      rootStore.setState({
        edgeSite: data[0],
      });
      rootStore.setNodeId(`${data[0].id}`);
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
      {renderRegion()}
      <div className={styles['header-right']}>
        <AvatarDropdown />
        <div className={styles.action}>
          <SelectLang />
        </div>
      </div>
    </div>
  );
}
