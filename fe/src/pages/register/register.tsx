import React, { useState } from 'react';
import './register.css';
import {
    Steps,
    message,
    Form,
    Input,
    Tooltip,
    Tabs,
    Select,
    Button,
    AutoComplete,
    Result
} from 'antd';
import { QuestionCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import UserSvc from '../../services/user-svc';
import CompanySvc from '../../services/company-svc'
import { UserRegisterForm, CompanyRegisterForm } from '../../models/models'

const { Step } = Steps;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function Register() {

    const [form] = Form.useForm();

    const [currentStep, setCurrentStep] = useState<number>(0);

    const [userForm, setUserForm] = useState<UserRegisterForm>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        designation: '',
        phone: '',
        state: '',
        city: '',
        country: ''
    });
    const [companyForm, setCompanyForm] = useState<CompanyRegisterForm>({
        name: '',
        domain: '',
        phone: '',
        state: '',
        city: '',
        country: '',
        zipcode: '',
        ownerID: ''
    });

    const registerUser = (userRegForm: UserRegisterForm) => {
        console.log("user resgister form data", userForm)
        UserSvc.register(userRegForm, (response: any) => {
            setUserForm({ ...userForm, ["_id"]: response._id })
            console.log("user resgister resp", response)
            message.success("User registered successfully!")
            next()
            console.log("user resgister resp", userForm)
        })
    }

    const registerCompany = (companyRegForm: CompanyRegisterForm) => {
        console.log("company register form", companyRegForm)
        CompanySvc.createCompany(companyRegForm, (response: any) => {
            setCompanyForm({ ...companyForm, ["_id"]: response._id })
        })
    }


    const onFinish = async (values: Store) => {
        console.log('Received values of form: ', values);
        if (currentStep == 0) {
            let userRegForm: UserRegisterForm = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                designation: values.designation,
                phone: values.phone,
                state: values.state,
                city: values.city,
                country: values.country
            }
            setUserForm(userRegForm)
            await registerUser(userRegForm)
        } else {
            let companyRegForm: CompanyRegisterForm = {
                name: values.name,
                domain: values.domain,
                phone: values.phone,
                state: values.state,
                city: values.city,
                country: values.country,
                zipcode: values.zipcode,
                ownerID: userForm._id
            }
            setCompanyForm(companyForm)
            await registerCompany(companyRegForm)
        }
    };

    const next = () => {
        setCurrentStep(currentStep + 1)
    }


    const userRegister = () => {
        return (
            <Form
                style={{ marginRight: '15%' }}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="firstname"
                    label="First name"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid First name',
                        },
                        {
                            required: true,
                            message: 'Please input your First name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Last name"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid Last name',
                        },
                        {
                            required: true,
                            message: 'Please input your Last name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="designation"
                    label={
                        <span>
                            Designation&nbsp;
                                    <Tooltip title="What is your designation in your current company?">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: 'Please input city!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="state"
                    label="State"
                    rules={[{ required: true, message: 'Please input city!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: 'Please input city!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register user
                            </Button>
                </Form.Item>
            </Form>
        )
    }

    const buisnessRegister = () => {
        return (
            <Form
                style={{ marginRight: '15%' }}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="companyName"
                    label="Company name"
                    rules={[
                        {
                            type: 'string',
                            message: 'The input is not valid company name',
                        },
                        {
                            required: true,
                            message: 'Please input your company name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyAddress"
                    label="Company address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company name!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyCity"
                    label="Company city"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company city!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyState"
                    label="Company state"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company state!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyCountry"
                    label="Company country"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company country',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyZipcode"
                    label="Company zipcode"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company Zipcode',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="domain"
                    label="Domain"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your company domain',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="companyPhone"
                    label="Company Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register business
                            </Button>
                </Form.Item>
            </Form>
        )
    }

    const steps = [
        {
            title: 'User',
            content: userRegister(),
        },
        {
            title: 'Business',
            content: buisnessRegister(),
        }
    ];

    return (

        <div className="spec-register">
            <Result
                icon={<SmileOutlined />}
                title="Welcome to Virtual work place, please register to continue"
            />
            <Steps className="steps-spec" current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[currentStep].content}</div>
        </div>

    );

}

export default Register;
