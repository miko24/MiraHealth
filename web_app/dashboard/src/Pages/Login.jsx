import {Button, Checkbox, Form, Input, message} from 'antd';
import {useContext, useEffect} from "react";
import {UserContext} from "../Contexts/UserContext";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const {currentUser,updateUser} = useContext(UserContext);

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    const onFinish = async(values) => {
        try {
            const response = await fetch(`http://34.159.120.168:9009/authentication?email=${values.email}&password=${values.password}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                let data = await response.json();
                if (data.status_code && data.status_code === 401) {
                    error();
                }else{
                    updateUser(data);
                }
            } else {
                error();
            }
        } catch (err) {
            error();
        }
    };
    const onFinishFailed = (errorInfo) => {
        error();
        console.log('Failed:', errorInfo);
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'A login error occurred, please try again!',
        });
    };

    return (
        <div>
            {contextHolder}
            <img src={"/ant_design.svg"} alt={"Ant Design"} style={{
                width: "50px",
                margin: "80px auto 0",
                display: "block"
            }}/>
            <Form
                name="basic"
                style={{
                    maxWidth: 500,
                    margin: "80px auto",
                }}
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
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
                    <Input size={"large"}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size={"large"}/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};