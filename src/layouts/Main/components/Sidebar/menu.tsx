import { Link } from 'react-router-dom';
import { MenuProps } from 'antd';

import { IconHOC } from '@/components/Icon';

export type MenuItem = Required<MenuProps>['items'][number];

export const allMenuItems: MenuItem[] = [
  {
    key: '/',
    label: <Link to="/">Bosh sahifa</Link>,
    icon: <IconHOC variant="solid" name="Home" />
  },
  {
    key: '/project',
    label: <Link to="/project">Yangi loyiha qo’shish</Link>,
    icon: <IconHOC variant="solid" name="BookOpenWritten" />
  },
  {
    key: '/justice',
    label: <Link to="/justice">Adliya vazirligi</Link>,
    icon: <IconHOC variant="solid" name="Bank" />
  },
  {
    key: '/incoming',
    label: <Link to="/incoming">Kiruvchi loyihalar</Link>,
    icon: <IconHOC variant="solid" name="Login" />
  },
  {
    key: '/outgoing',
    label: <Link to="/outgoing">Chiquvchi loyihalar</Link>,
    icon: <IconHOC variant="solid" name="Logout" />
  },
  {
    key: '/archivarius/get-state-registration',
    label: <Link to="/archivarius/get-state-registration">Davlat ro'yhatiga olish</Link>,
    icon: <IconHOC variant="solid" name="PostAdd" />
  },
  {
    key: '/archivarius/state-registration',
    label: <Link to="/archivarius/state-registration">Davlat reyesteri</Link>,
    icon: <IconHOC variant="solid" name="DocumentText" />
  },
  {
    key: '/Chiquvchi',
    label: 'Monitoring',
    icon: <IconHOC variant="solid" name="Presentation" />,
    popupClassName: 'sidebar-menu-popup',
    popupOffset: [12, 0],
    children: [
      {
        key: '/Statistika',
        label: <Link to="/monitoring/statistics">Statistika</Link>
      },
      {
        key: '/Loyihalar',
        label: <Link to="/">Loyihalar</Link>
      },
      {
        key: '/expertise',
        label: <Link to="/monitoring/expertise">Ekpertiza xulosalar reyestri</Link>
      }
    ]
  },
  {
    key: '/TSTB',
    label: <Link to="/">TSTB’dan o‘tkazish rejasi</Link>,
    icon: <IconHOC variant="solid" name="TripodBoard" />
  },
  {
    key: '/kalendar',
    label: <Link to="/">TSTB kalendar rejasi</Link>,
    icon: <IconHOC variant="solid" name="TripodBoard" />
  },
  {
    key: '/settings',
    label: 'Sozlamalar / Kontent',
    icon: <IconHOC variant="solid" name="Setting" />,
    popupClassName: 'sidebar-menu-popup',
    popupOffset: [12, 0],
    children: [
      {
        key: '/settings/user',
        label: <Link to="/settings/user">Tashkilot hodimlari</Link>
      },
      {
        key: '/settings/department',
        label: <Link to="/settings/department">Bo’linmalar</Link>
      },
      {
        key: '/Atamalar',
        label: <Link to="/">Atamalar</Link>
      },
      {
        key: '/llanma',
        label: <Link to="/">E-qo‘llanma</Link>
      },
      {
        key: '/settings/rejection-template',
        label: <Link to="/settings/rejection-template">E’tirozlar shabloni</Link>
      }
    ]
  }
];
