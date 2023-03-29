import React from 'react';
import styles from './index.module.less';
import Question from '#/assets/images/question.svg';
import { useRootStore } from '#/store/root';
const GlobalSetting: React.FC = () => {
  const { reverseShowHint } = useRootStore();

  return (
    <div className={styles['global-setting']}>
      <img
        src={Question}
        alt={'question'}
        className={styles['global-setting-icon']}
        onClick={reverseShowHint}
      />
    </div>
  );
};

export default GlobalSetting;
