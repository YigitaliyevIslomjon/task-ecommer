import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import Spacer from '@/components/Spacer';

import styles from './MainLayout.module.scss';

const { Header, Sider, Content } = Layout;

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let ativeMenuKey = '1';

  if (window.location.pathname == '/') {
    ativeMenuKey = '1';
  } else if (window.location.pathname == '/post') {
    ativeMenuKey = '2';
  } else if (window.location.pathname == '/product') {
    ativeMenuKey = '3';
  } else if (window.location.pathname == '/todo') {
    ativeMenuKey = '4';
  }

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <div className={styles.wrapper}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Spacer size={85} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[ativeMenuKey]}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: (
                  <div
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    User
                  </div>
                )
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: (
                  <div
                    onClick={() => {
                      navigate('/post');
                    }}
                  >
                    Post
                  </div>
                )
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: (
                  <div
                    onClick={() => {
                      navigate('/product');
                    }}
                  >
                    Product
                  </div>
                )
              },
              {
                key: '4',
                icon: <UserAddOutlined />,
                label: (
                  <div
                    onClick={() => {
                      navigate('/todos');
                    }}
                  >
                    Todos
                  </div>
                )
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
