import * as React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import './App.css';
import { FunctionComponent } from 'react';
import DefaultPlayground from './ThreeD/defaultPlayground';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

// Even without middleware, you can dispatch an action:

const App: FunctionComponent = () => (
  <Layout style={{ height: '100vh' }}>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={(
              <span>
                <UserOutlined />
                subnav 1
              </span>
                          )}
          >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={(
              <span>
                <LaptopOutlined />
                subnav 2
              </span>
                          )}
          >
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={(
              <span>
                <NotificationOutlined />
                subnav 3
              </span>
                          )}
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content
          className="site-layout-background"
        >
          <DefaultPlayground />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default App;
