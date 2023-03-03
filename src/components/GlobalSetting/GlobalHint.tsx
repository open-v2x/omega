import React from 'react';
import styles from './index.module.less';
import { useRootStore } from '#/store/root';
import classNames from 'classnames';
import { ProCard } from '@ant-design/pro-components';
import { Button, Steps } from 'antd';
import imgRsu from '#/assets/images/platform_rsu.svg';
import imgCamera from '#/assets/images/platform_camera.svg';
import imgLidar from '#/assets/images/platform_radar.svg';
import { useNavigate } from 'react-router';

const GlobalHint: React.FC = () => {
  const { reverseShowHint } = useRootStore();
  const showHint = useRootStore(state => state.showHint);
  const navigate = useNavigate();

  const HintCard = ({ title, number, content, bottom }) => (
    <div className={styles['global-hint-card']}>
      <div className={styles['global-hint-card-number-container']}>
        <div className={styles['global-hint-card-number']}>{number}</div>
      </div>
      <ProCard title={title} className={styles['global-hint-card-content']}>
        <Steps
          progressDot
          direction="vertical"
          items={[
            {
              title: content,
            },
          ]}
          className={styles['global-hint-card-content']}
        />
        <div className={styles['global-hint-card-btn']}>{bottom}</div>
      </ProCard>
    </div>
  );

  const handleGo = (url: string) => {
    reverseShowHint();
    navigate(url);
  };

  const hints = [
    {
      title: t('Creating Intersection'),
      content: t('Creating Intersection Hint'),
      bottom: (
        <Button onClick={() => handleGo('maintenance/crossing')}>
          {t('Creating Intersection Button')}
        </Button>
      ),
    },
    {
      title: t('Deploy and register devices'),
      content: t('Deploy and register devices Hint'),
      bottom: (
        <div className={styles['global-hint-card-btn-f']}>
          <div
            className={styles['global-hint-card-btn-f-item']}
            onClick={() => handleGo('device/rsu')}
          >
            <img src={imgRsu} alt="rsu" />
            {t('RSU')}
          </div>
          <div
            className={styles['global-hint-card-btn-f-item']}
            onClick={() => handleGo('device/camera')}
          >
            <img src={imgCamera} alt="camera" />
            {t('Camera')}
          </div>
          <div
            className={styles['global-hint-card-btn-f-item']}
            onClick={() => handleGo('device/lidar')}
          >
            <img src={imgLidar} alt="lidar" />
            {t('Lidar')}
          </div>
          <div
            className={styles['global-hint-card-btn-f-item']}
            onClick={() => handleGo('device/radar')}
          >
            <img src={imgLidar} alt="radar" />
            {t('Radar')}
          </div>
        </div>
      ),
    },
    {
      title: t('Configuring Site'),
      content: t('Configuring Site Hint'),
      bottom: (
        <Button onClick={() => handleGo('system/site')}>
          {t('Deploy and register devices Button')}
        </Button>
      ),
    },
    {
      title: t('Monitoring Overview'),
      content: t('Huge Screen Hint'),
      bottom: <Button onClick={() => handleGo('center/site')}>{t('Huge Screen Button')}</Button>,
    },
  ];

  return (
    <div className={classNames(styles['global-hint'], showHint ? styles.show : styles.hidden)}>
      {showHint && (
        <div className={styles['global-hint-container']}>
          <div className={styles['global-hint-title']}>服务指引</div>
          <div className={styles['global-hint-cards']}>
            {hints.map((hint, index) => (
              <HintCard
                title={hint.title}
                number={index + 1}
                content={hint.content}
                bottom={hint.bottom}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalHint;
