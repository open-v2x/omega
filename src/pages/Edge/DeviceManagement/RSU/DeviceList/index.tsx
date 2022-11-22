import BaseContainer from '#/components/BaseContainer';
import { Tabs } from 'antd';
import React from 'react';
import RegisteredList from './components/RegisteredList';
import styles from './index.module.less';

const DeviceList: React.FC = () => (
  <BaseContainer>
    <Tabs className={styles.rsu_tabs} destroyInactiveTabPane>
      <Tabs.TabPane tab={t('RSU Device')} key="1">
        <RegisteredList />
      </Tabs.TabPane>
      {/* <Tabs.TabPane tab={t('Unregistered RSU')} key="2">
        <NotRegisteredList />
      </Tabs.TabPane> */}
    </Tabs>
  </BaseContainer>
);

export default DeviceList;
