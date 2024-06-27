import './App.css';

import React from 'react';

import {
  Layout,
  Menu,
} from 'antd';
import {
  HashRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import SchedulePage from './SchedulePage';
import UsersPage from './UsersPage';

const { Header, Content, Sider } = Layout;



function App() {
  return (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/schedule">排班管理</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <Routes>
                        <Route path="/" element={<UsersPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Router>
);
}

export default App;
