import React from "react";
import {Button, Form} from "antd";
import bg from "../../assets/images/bg-horizontal.jpg";
// import logo from "../../assets/images/logo-auth.png";
import logo from "../../assets/images/logo.png";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {showNotification} from "../../redux/reducers/notificationReducer";
import {startLoading, stopLoading} from "../../redux/reducers/loadingReducer";
import AppInput from "../../components/common/AppInput";
import {login} from "../../services/utils/account";

const AuthLayout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const onFinish = async (values: { username: string; password: string }) => {
        dispatch(startLoading());
        try {
            // localStorage.setItem("isLogin", "true");
            // navigate("/dashboard");
            const response = await login(values);
            if (response.status) {
                localStorage.setItem("token", response.result.token);
                localStorage.setItem("isLogin", "true");
                // navigate("/dashboard");
                window.location.href = "/dashboard";
            } else {
                dispatch(
                    showNotification({
                        message: response.message,
                        type: "error",
                    })
                );
            }

        } catch (err: any) {
            dispatch(
                showNotification({
                    message: err.message,
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    };

    return (
        <div className="login-container" style={{backgroundImage: `url(${bg})`}}>
            <div className="login-form">
                <img
                    style={{
                        width: 100,
                        margin: "0  auto",
                        display: "flex",
                        marginBottom: 24,
                        borderRadius: 15,
                    }}
                    src={logo}
                    alt=""
                />
                {location.search && (
                    <div
                        style={{
                            marginBottom: 10,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#006900",
                        }}
                    >
                        Đổi mật khẩu thành công!
                    </div>
                )}
                <Form
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {required: true, message: "Vui lòng nhập tên đăng nhập!"},
                        ]}
                    >
                        <AppInput styleInput={{height: 40}} placeholder="Tên đăng nhập"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "Vui lòng nhập mật khẩu!"}]}
                    >
                        <AppInput
                            type="password"
                            styleInput={{height: 40}}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <div
                        style={{
                            marginBottom: 10,
                            textAlign: "right",
                            fontWeight: "bold",
                            color: "#006900",
                            cursor: "pointer",
                        }}
                        onClick={() => (window.location.href = "/khoi-phuc-tai-khoan")}
                    >
                        Quên mật khẩu?
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="button">
                            <span>Đăng Nhập</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AuthLayout;
