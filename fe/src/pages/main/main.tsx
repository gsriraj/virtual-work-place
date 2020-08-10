import React, { useState } from 'react';
import { Route, Switch, NavLink, Link, useLocation, BrowserRouter } from 'react-router-dom';
import {
    Layout,
    Menu,
} from 'antd';
import {
    MessageOutlined,
    CoffeeOutlined,
    FileOutlined,
    TeamOutlined,
    SettingOutlined,
    PhoneOutlined,
    UserOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import Teams from './tabs/teams/teams';
import Settings from './tabs/settings/settings';
import Chat from './tabs/chat/chat';
import BreakOut from './tabs/break-out/break-out';
import MeetingRooms from './tabs/meeting-rooms/meeting-rooms';
import Files from './tabs/files/files';
import Me from './tabs/me/me';
import Calendar from './tabs/calendar/calendar';
import './main.css';

const { Header, Content, Footer, Sider } = Layout;



function Main(props: any) {


    const [collapsed, setCollapsed] = useState<boolean>(false)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    };


    const location = useLocation();
    console.log("value", props.isAuthenticated)

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo">
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                        <Menu.Item key="/" icon={<UserOutlined />}>
                            <NavLink to="/">
                                Me
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/chat" icon={<MessageOutlined />}>
                            <NavLink to="/chat">
                                Chat
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/teams" icon={<TeamOutlined />}>
                            <NavLink to="/teams">
                                Teams
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/meeting-rooms" icon={<PhoneOutlined />}>
                            <NavLink to="/meeting-rooms">
                                Meeting Rooms
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
                            <NavLink to="/calendar">
                                Calendar
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/files" icon={<FileOutlined />} >
                            <NavLink to="/files">
                                Files
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/break-out" icon={<CoffeeOutlined />}>
                            <NavLink to="/break-out">
                                Break out
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/settings" icon={<SettingOutlined />}>
                            <Link to="/settings">
                                Settings
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            <Route exact path="/" component={Me} />
                            <Route path="/chat" component={Chat} />
                            <Route path="/teams" component={Teams} />
                            <Route path="/meeting-rooms" component={MeetingRooms} />
                            <Route path="/files" component={Files} />
                            <Route path="/break-out" component={BreakOut} />
                            <Route path="/calendar" component={Calendar} />
                            <Route path="/settings" component={Settings} />
                        </Switch>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}></Footer> */}
                </Layout>
            </Layout>
        </BrowserRouter>
    );
}

export default Main;
