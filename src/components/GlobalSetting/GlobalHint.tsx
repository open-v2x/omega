import React from 'react';
import styles from './index.module.less';
import { useRootStore } from '#/store/root';
import classNames from 'classnames';
import { ProCard } from '@ant-design/pro-components';
import { Button, Steps } from 'antd';
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
      title: t('Device deployment'),
      content: t('Device deployment Hint'),
    },
    {
      title: t('Register devices'),
      content: t('Register devices Hint'),
      bottom: (
        <Button danger onClick={() => handleGo('device/rsu')}>
          {t('Register Now')}
        </Button>
      ),
    },
    {
      title: t('Config the map'),
      content: t('Config the map Hint'),
      bottom: (
        <Button danger onClick={() => handleGo('system/site')}>
          {t('Config Now')}
        </Button>
      ),
    },
    {
      title: t('Traffic screen'),
      content: t('Traffic screen Hint'),
      bottom: (
        <Button danger onClick={() => handleGo('center/site')}>
          {t('Have Try')}
        </Button>
      ),
    },
  ];

  return (
    <div
      className={classNames(styles['global-hint'], showHint ? styles.show : styles.hidden)}
      onClick={() => {
        reverseShowHint();
      }}
    >
      {showHint && (
        <div className={styles['global-hint-container']} onClick={e => e.stopPropagation()}>
          <div className={styles['global-hint-title']}>{t('Service guidance')}</div>
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
