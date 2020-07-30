import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Result, Form, Input, Button, Checkbox } from 'antd';
import { SmileOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';
import { Store } from 'antd/lib/form/interface';
import UserSvc from '../../services/user-svc';
import { LoginFormSubmit } from '../../models/models'

function Login(props: any) {

    const { history } = props;

    const onFinish = (values: Store) => {
        const loginDetails: LoginFormSubmit = {
            email: values.email,
            password: values.password
        }
        UserSvc.logIn(loginDetails, (response: any) => {
            history.push("/")
        });
    };
    if (localStorage.getItem("access_token")) { return (<Redirect to='/' />) }
    else {
        return (
            <div className="abs-center-login"
            >
                <Result
                    icon={<SmileOutlined />}
                    title="Welcome to Virtual work place, please login or register to continue"
                />
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                    </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit" className="login-form-button">
                            Log in
                    </Button>
                     Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;
