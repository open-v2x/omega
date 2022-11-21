import React from 'react';
import { Dropdown, DropDownProps, MenuProps } from 'antd';
import classNames from 'classnames';
import styles from './dropdown.module.less';
export type HeaderDropdownProps = {
  overlayClassName?: string;
  menu: MenuProps;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
