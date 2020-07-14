import React from 'react';
import { Layout, Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './me.css';

const { Header, Content, Sider } = Layout;

function Me() {
    return (
        <div className="me-body-spec">
            <Layout style={{ minHeight: '100vh', marginLeft: '-1rem' }}>
                <Content>
                    <Card style={{ width: 300 }}>
                        <Space size="middle" direction="vertical">
                            <Avatar size={64} icon={<UserOutlined />} />
                            <h3>Dummy User</h3>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, laborum perferendis delectus necessitatibus, nesciunt, nam enim in odit quisquam facilis dolore ipsa! Sed quasi dolore eius? Aut minima consequuntur sint.</p>
                        </Space>
                    </Card>
                </Content>
            </Layout>
        </div>
    );
}

export default Me;
