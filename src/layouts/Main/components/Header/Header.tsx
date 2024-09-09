import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/modules/auth/hooks';
import { useStatusCount } from '@/modules/project/incoming/hooks';

import Done from '@/layouts/Main/components/Done';
import { useLayoutContext } from '@/layouts/Main/context';

import { IconHOC } from '@/components/Icon';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProfileWidget from '@/components/ProfileWidget';

import classes from './Header.module.scss';

const { Header: HeaderBase } = Layout;

interface IProps {}
const Header: React.FC<IProps> = () => {
  const { state, methods } = useLayoutContext();
  const { profile } = useAuth();
  const { item, isFetched } = useStatusCount();

  const { i18n } = useTranslation();
  return (
    <>
      <HeaderBase className={classes.wrapper}>
        <div className={classes.content}>
          <button
            className={classes.menu}
            onClick={() => {
              methods.setSidebarMobileCollapsed(!state.sidebarMobileCollapsed);
              methods.setSidebarCollapsed(false);
            }}
          >
            <IconHOC size={32} name="MenuLineHorizontal" />
          </button>
          <div className={classes.logo}>
            <div className={classes.gerb} />
            <div className={classes.flag} />
            <div className={classes.title}>{profile.organization.name[i18n.language]}</div>
          </div>
        </div>
        <div className={classes.doneButton}>
          <Done
            done
            isLoading={isFetched}
            title={'Bajarilgan'}
            count={item.finished}
            container={<Link to={`incoming?incomingOrganizationId=${profile.organization.id}&finished=true`} />}
          />
          <Done
            isLoading={isFetched}
            title={'Bajarilmagan'}
            count={item.notFinished}
            container={<Link to={`incoming?incomingOrganizationId=${profile.organization.id}&finished=false`} />}
          />
        </div>
        <div className={classes.action}>
          <LanguageSwitcher />
          <ProfileWidget />
        </div>
      </HeaderBase>
    </>
  );
};

export default Header;
