import { ProLayoutProps } from '@ant-design/pro-components';
const proLayoutSetting: ProLayoutProps = {
  title: 'Omega',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  iconfontUrl: '//at.alicdn.com/t/c/font_3784786_5kwqyezio25.js',
  token: {
    colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
    colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
    colorTextAppListIcon: 'rgba(255,255,255,0.85)',
    sider: {
      // 伸缩开关
      colorBgCollapsedButton: '#fff', // 背景色
      colorTextCollapsedButtonHover: '#40e3ef', // 指向背景颜色
      colorTextCollapsedButton: '#40a9ff', // 内容颜色
      // 菜单
      colorMenuBackground: '#fff', // 整体背景色
      colorMenuItemDivider: 'rgba(255,255,255,0.15)',
      colorBgMenuItemSelected: '#dcf4ff', // 选中颜色
      colorTextMenuSelected: '#40a9ff', // 选中文字的颜色
      colorTextMenuItemHover: '#40a9ff', // 菜单指向颜色
    },
    pageContainer: {
      paddingInlinePageContainerContent: 20,
    },
  },
};

export default proLayoutSetting;
