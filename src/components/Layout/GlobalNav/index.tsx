import React, { FC, useState } from 'react';
import styles from './index.less';
import { Drawer } from 'antd';
import Left from './Left';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import Right from './Right';
import { GlobalHeaderProps } from '../GlobalHeader';
import { useMenuStore } from '#/store/menu';
import { menuList } from '#/router/menus/index';

interface GlobalProps extends GlobalHeaderProps {
  logo?: React.ReactNode;
}

const GlobalNav: FC<GlobalProps> = props => {
  const { logo = undefined, isAdminPage = false } = props;

  const [open, setOpen] = useState(false);
  const { setMenus, favoriteMenu, rightMenus, setRelatedMenus } = useMenuStore();

  const onClose = menu => {
    if (menu?.path) {
      const parentPath = menu.path.split('/');
      const pPath = `/${parentPath[1]}`;
      const currentMenu = menuList.find(m => m.path === pPath);
      if (currentMenu) {
        setMenus(currentMenu?.children);
        setRelatedMenus(currentMenu?.related || []);
      } else {
        setMenus([menu]);
        setRelatedMenus([]);
      }
    }
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
