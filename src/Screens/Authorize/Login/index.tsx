import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col } from 'antd';
import { loginUser } from '../../../core/services/api/login.api'
import {setItem} from '../../../core/services/common/storage/storage.service'
export interface LoginProps { }

const Login: React.SFC<LoginProps> = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const Submit = async () => {
        const UserInf = {
            username: username,
            password: password,
            rememberMe: remember
        }
        const res = await loginUser(UserInf);
        setItem("Token",res.data.accessToken);
        setItem("RefreshToken",res.data.refreshToken);

    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item

                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox onChange={(e) => setRemember(e.target.checked)}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button onClick={Submit} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>

    );
};
export default Login;
