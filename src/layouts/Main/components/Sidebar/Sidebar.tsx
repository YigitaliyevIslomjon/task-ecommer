import React, { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, MenuProps, theme } from 'antd';
import cx from 'clsx';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useTranslation } from 'react-i18next';

import config from '@/config';

import { stringMask } from '@/common/utils';

import * as AccessManager from '@/modules/accessManager';
import { useAuth, useLogout } from '@/modules/auth/hooks';

import { useLayoutContext } from '@/layouts/Main/context';

import { IconHOC } from '@/components/Icon';
import * as Logo from '@/components/Logo';

import classes from './Sidebar.module.scss';

function menuKeyFromLocation(location: Location): string {
  return location.pathname;
}

interface IProps {}

const rootSubmenuKeys = ['project'];

const Sidebar: React.FC<IProps> = ({}) => {
  const location = useLocation();
  const { Sider } = Layout;
  const { profile } = useAuth();

  const { i18n } = useTranslation();

  const { state, methods } = useLayoutContext();

  const menuItems = AccessManager.Hooks.useMenuItems();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    methods.setSidebarMobileCollapsed(false);
  }, [location.pathname]);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const { token } = theme.useToken();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([menuKeyFromLocation(location)]);

  const { logout } = useLogout();
  return (
    <Sider
      className={cx(classes.wrapper, state.sidebarCollapsed && classes.wrapperCollapsed)}
      collapsed={state.sidebarCollapsed}
      theme="light"
      trigger={null}
      width={324}
      collapsedWidth={88}
    >
      <div onClick={() => methods.setSidebarCollapsed(!state.sidebarCollapsed)} className={classes.collapseButton}>
        <IconHOC size={18} name={'DirectionLeft'} />
      </div>
      <button
        onClick={() => methods.setSidebarMobileCollapsed(!state.sidebarMobileCollapsed)}
        className={classes.collapseMobileButton}
      >
        <IconHOC size={32} name={'RemoveThin'} />
      </button>
      <div className={classes.logo}>
        <Logo.Main size={state.sidebarCollapsed ? 'xs' : 'lg'} showTitle={!state.sidebarCollapsed} />
      </div>
      <div className={classes.header}>
        <div className={classes.gerb} />
        <div className={classes.flag} />
        <div className={classes.title}>{profile.organization.name[i18n.language]}</div>
      </div>
      <div className={classes.divider} />
      <div className={classes.menu}>
        <ConfigProvider
          theme={{
            token,
            components: {
              Menu: {
                itemHeight: 56,
                fontSize: 16,
                iconSize: 24,
                itemColor: 'rgb(255, 255, 255)',
                itemBg: 'rgb(18, 109, 218)',
                itemHoverColor: 'rgb(255, 255, 255)',
                itemSelectedColor: 'rgb(255, 255, 255)',
                itemSelectedBg: 'rgb(68, 150, 249)',
                itemActiveBg: 'rgb(68, 150, 249)',
                colorBgContainer: 'rgb(18, 109, 218)',
                activeBarBorderWidth: 0,
                activeBarHeight: 0,
                collapsedIconSize: 24,
                groupTitleFontSize: 16,
                iconMarginInlineEnd: 8,
                itemMarginBlock: 4,
                itemPaddingInline: 24,
                itemBorderRadius: 6,
                subMenuItemBg: 'rgb(68, 150, 249)',
                popupBg: 'rgb(68, 150, 249)'
              }
            }
          }}
        >
          <Menu
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            defaultSelectedKeys={['settings']}
            items={menuItems}
            mode="inline"
            onSelect={(opts: SelectInfo) => setSelectedKeys([opts.key])}
            selectedKeys={selectedKeys}
          />
        </ConfigProvider>
      </div>
      <div className={classes.footer}>
        <a href={`tel:${config.support.phone}`} className={classes.support}>
          <IconHOC name="Call" size={24} />
          <span>{stringMask(config.support.phone, '#### ## ### ## ##')}</span>
        </a>
        <div className={classes.divider} />
        <div className={classes.logout} onClick={logout}>
          <IconHOC variant="solid" name="Login" size={24} />
          <span>Chiqish</span>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
