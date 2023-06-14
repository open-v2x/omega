import BaseContainer from '#/components/BaseContainer';
import React, { FC } from 'react';
import ServiceList from './components/ServiceList';
import ServiceType from './components/ServiceType';
import styles from './index.module.less';
import { Tabs } from 'antd';
import ServiceEndpoint from './components/ServiceEndpoint';

const items = [
  { label: t('Algorithm Service Type'), key: '1', children: <ServiceType /> },
  { label: t('Algorithm Service'), key: '2', children: <ServiceList /> },
  { label: t('Algorithm Service Urls'), key: '3', children: <ServiceEndpoint /> },
];

const AlgorithmService: FC = () => (
  <BaseContainer>
    <Tabs className={styles['rsu-tabs']} destroyInactiveTabPane items={items} />
  </BaseContainer>
);

export default AlgorithmService;
