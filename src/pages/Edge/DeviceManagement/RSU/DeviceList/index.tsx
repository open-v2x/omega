import BaseContainer from '#/components/BaseContainer';
import { Tabs } from 'antd';
import React from 'react';
import NotRegisteredList from './components/NotRegisteredList';
import RegisteredList from './components/RegisteredList';
import styles from './index.module.less';

const items = [
  { label: t('RSU Device'), key: '1', children: <RegisteredList /> },
  { label: t('Unregistered RSU'), key: '2', children: <NotRegisteredList /> },
];

const DeviceList: React.FC = () => (
  <BaseContainer>
    <Tabs className={styles.rsu_tabs} destroyInactiveTabPane items={items} />
  </BaseContainer>
);

export default DeviceList;
