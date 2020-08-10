import React from 'react';
import { Layout, Avatar, Card, Space, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './me.css';

const { Header, Content, Sider } = Layout;

function Me() {
    return (
        <div className="me-body-spec">
            <Layout style={{ minHeight: '100vh', marginLeft: '-1rem' }}>
                <Content>
                    <Row>
                        <Card style={{ width: 300 }}>
                                <Avatar size={64} icon={<UserOutlined />} />
                                <h3>User name</h3>
                                <h4>email</h4>
                                <p>user status</p>
                                <p>user location</p>
                        </Card>
                    </Row>


                    <Row>
                        <Card style={{ width: 300 }}>
                                <h3>Company name</h3>
                                <p>Comany domain</p>
                                <p>Company address</p>
                        </Card>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
}

export default Me;
