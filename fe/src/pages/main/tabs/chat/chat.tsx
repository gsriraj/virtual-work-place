import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './chat.css';
import ChatHeader from '../../../../components/chat-tab/chat-header/chat-header';
import ChatArea from '../../../../components/chat-tab/chat-area/chat-area';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Chat() {
    return (
        <div>
            <Layout style={{ minHeight: '100vh', marginLeft: '-1rem' }}>
                <Sider style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                }} width={250}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="1">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user one</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user two</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user three</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user four</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user five</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user six</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user seven</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Avatar size="small" icon={<UserOutlined />} /> <span style={{ marginLeft: '0.5rem' }}>Dummy user eight</span>
                        </Menu.Item>


                    </Menu>
                </Sider>

                <Content style={{ marginLeft: '250px', minHeight: '100vh' }}>
                    <ChatHeader />
                    <ChatArea />
                </Content>
            </Layout>
        </div>
    );
}

export default Chat;
