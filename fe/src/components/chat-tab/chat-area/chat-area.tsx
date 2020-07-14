import React from 'react';
import { Row, Col, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './chat-area.css';


function ChatArea() {
    return (
        <div >
            <div className="chat-area-spec">
            </div>
            <div className="chat-input-spec">
                <Row>
                    <Col span={24}>
                        <Input size="large" style={{ width: '100%' }} addonAfter={<SendOutlined style={{
                            fontSize: 16,
                            color: '#1890ff',
                        }} />} placeholder="Input new message" />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ChatArea;
