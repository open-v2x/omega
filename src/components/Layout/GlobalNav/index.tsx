import React, { FC, useState } from 'react';
import styles from './index.less';
import { Drawer } from 'antd';
import Left from './Left';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import Right from './Right';
import { GlobalHeaderProps } from '../GlobalHeader';
import { useMenuStore } from '#/store/menu';

interface GlobalProps extends GlobalHeaderProps {
  logo?: React.ReactNode;
}

const GlobalNav: FC<GlobalProps> = props => {
  const { logo = undefined, isAdminPage = false } = props;

  const [open, setOpen] = useState(false);
  const { handleChangeMenu, favoriteMenu, rightMenus } = useMenuStore();

  const onClose = menu => {
    handleChangeMenu(menu);
    setOpen(false);
  };

  const onToggleOpen = () => {
    setOpen(!open);
  };

  const drawerStyle = {
    top: '56px',
    height: 'calc(100% - 40px)',
  };

  return (
    <>
      <div className={styles['global-nav-icon']} onClick={onToggleOpen}>
        {logo ? logo : <MenuOutlined className={styles['global-nav-menu-icon']} />}
      </div>
      <Drawer
        title={'服务列表'}
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        style={drawerStyle}
        bodyStyle={{ padding: 0 }}
        width={240}
        mask={false}
        destroyOnClose
      >
        <Left onClose={onClose} isAdminPage={isAdminPage} navItems={favoriteMenu} />
      </Drawer>
      <Drawer
        title={null}
        placement="left"
        closable
        onClose={onClose}
        open={open}
        style={{
          ...drawerStyle,
          left: open ? '240px' : 0,
        }}
        bodyStyle={{ padding: 0 }}
        mask
        width={1020}
        maskStyle={{ backgroundColor: 'transparent' }}
        closeIcon={<CloseOutlined style={{ fontSize: '20px' }} />}
      >
        <div className={styles.main}>
          <Right items={rightMenus} onClose={onClose} isAdminPage={isAdminPage} />
        </div>
      </Drawer>
    </>
  );
};

export default GlobalNav;
