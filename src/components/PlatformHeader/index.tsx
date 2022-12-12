import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import imgHead from '#/assets/images/platform_head.png';
type PlatformHeaderProps = {
  back?: boolean;
  position?: 'absolute' | 'relative';
  children?: React.ReactNode;
};

const BackButton = () => (
  <div
    className={classNames(styles['right-back'], styles['f-middle'])}
    onClick={() => history.back()}
  >
    {t('Back')}
  </div>
);

const PlatformHeader: React.FC<PlatformHeaderProps> = ({
  back = false,
  position = 'absolute',
  children,
}) => (
  <div className={classNames(styles.header, styles[`header-${position}`])}>
    <img className={styles['header-image']} src={imgHead} alt="" />
    <div className={classNames(styles['f-middle'], styles['header-title'])}>
      {t('OpenV2X Central Portal')}
    </div>
    <div className={styles['header-left']}>{children}</div>
    <div className={styles['header-right']}>{back && <BackButton />}</div>
  </div>
);

export default PlatformHeader;
