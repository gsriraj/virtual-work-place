import React from 'react';
import { Spin } from 'antd';
import './loading.css'


export default function Loading() {
    return (
        <div className="abs-center">
            <Spin size="large" tip="Loading..." />
        </div>
    )
}