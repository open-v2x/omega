import BaseContainer from '#/components/BaseContainer';
import { SiteModeTypeOptions } from '#/constants/edge';
import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import { useEffect, useState } from 'react';
import UpdateSiteConfigModal from './components/UpdateSiteConfigModal';
import UpdateSiteNameModal from './components/UpdateSiteNameModal';
import styles from './index.module.less';

import imgSiteConfig from '#/assets/images/site_config.png';
import imgSiteName from '#/assets/images/site_name.png';
import imgSiteMode from '#/assets/images/site_mode.svg';
import { systemConfig } from '#/services/api/system/edge';

const EdgeSiteConfig: React.FC = () => {
  const [config, setConfig] = useState({
    name: '',
    mode: '',
    mqtt_config: {
      host: '',
      port: 1883,
      username: '',
      password: '',
    },
  });

  const fetchSystemConfig = async () => {
    const res = await systemConfig(1);
    setConfig(res);
  };

  useEffect(() => {
    fetchSystemConfig();
  }, []);

  return (
    <BaseContainer>
      <ProCard className={styles.edge_site}>
        <div className={styles.site}>
          <img className={styles.site_icon} src={imgSiteMode} style={{ padding: '8px' }} alt="" />
          <div className={styles.site_info}>
            <div className={styles.site_info_name}>{t('Site mode')}</div>
            <div className={styles.site_info_desc}>
              {t('Current mode')}：{SiteModeTypeOptions[config.mode]}
              {config.mode === 'center' && (
                <span style={{ marginLeft: '10px' }}>({t('SITE_MODE_TIPS')})</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.site}>
          <img className={styles.site_icon} src={imgSiteName} alt="" />
          <div className={styles.site_info}>
            <div className={styles.site_info_name}>{t('Edge site name')}</div>
            <div className={styles.site_info_desc}>
              {t('Current name')}：{config.name ? <span>{config.name}</span> : t('Unnamed')}
            </div>
          </div>
          {config.mode !== 'center' && (
            <UpdateSiteNameModal name={config.name} success={fetchSystemConfig} />
          )}
        </div>
        <div className={styles.site}>
          <img className={styles.site_icon} src={imgSiteConfig} alt="" />
          <div className={styles.site_info}>
            <div className={styles.site_info_name}>
              {t('Cloud control center connection configuration')}
            </div>
            <div className={styles.site_info_desc}>
              {config.mqtt_config?.host ? (
                <span>Host：{config.mqtt_config.host}</span>
              ) : (
                t('Connection configuration tips')
              )}
            </div>
          </div>
          {config.mode !== 'center' && (
            <UpdateSiteConfigModal info={config.mqtt_config} success={fetchSystemConfig} />
          )}
        </div>
      </ProCard>
    </BaseContainer>
  );
};

export default EdgeSiteConfig;
