import React from 'react';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './chat-header.css';


function ChatHeader() {
    return (
        <div>
            <Row className="header-spec">
                <Col offset={1} span={1}>
                    <Avatar size="default" icon={<UserOutlined />} />
                </Col>
                <Col>
                    <h2>Dummy User</h2>
                </Col>
            </Row>
        </div>
    );
}

export default ChatHeader;
