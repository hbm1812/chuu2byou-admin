import React, { useEffect, useState } from "react";
import bg from "../../assets/images/bg-horizontal.jpg";
import logo from "../../assets/images/logo.png";
import { Button, Form, message } from "antd";
import AppInput from "../../components/common/AppInput";
import {
  forgotPassword,
  resetPassword,
  verifyToken,
} from "../../services/utils/forgotPassword";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";

const ForgotPassword = () => {
  //! define

  //! state
  const dispatch = useDispatch();
  const location = useLocation();
  const token = location.search.split("=")[1];

  const [statusForgot, setStatusForgot] = useState<string>("form_forgot");

  //! function
  const hanleCheckToken = async () => {
    try {
      dispatch(startLoading());
      const response = await verifyToken(token);
      if (response.status) {
        setStatusForgot("token_success");
      }
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.data.detail,
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      dispatch(startLoading());
      const response = await forgotPassword(email);
      if (response.status) {
        setStatusForgot("forgot_success");
      }
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.data.detail,
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleResetPassword = async ({ email }: { email: string }) => {
    const body = {
      token,
      password: email,
    };
    try {
      dispatch(startLoading());
      const response = await resetPassword(body);
      if (response.status) {
        setStatusForgot("forgot_success");
        message.success("Đặt lại mật khẩu thành công");
        window.location.href = "/dang-nhap?thay-doi-mat-khau-thanh-cong";
      }
    } catch (error: any) {
      dispatch(
        showNotification({
          message: "Có lỗi xảy ra vui lòng thử lại sau",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const renderFormForgot = () => {
    return (
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <div style={{ marginBottom: 10, color: "#006900", fontWeight: "500" }}>
          Nhập địa chỉ email đã được xác minh của tài khoản người dùng của bạn
          và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật khẩu
        </div>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <AppInput styleInput={{ height: 40 }} placeholder="Nhập email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            <span>Gửi email</span>
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const renderFormForgotSuccess = () => {
    return (
      <div>
        <div style={{ marginBottom: 10, color: "#006900", fontWeight: "500" }}>
          Kiểm tra email của bạn để tìm liên kết đặt lại mật khẩu của bạn. Nếu
          nó không xuất hiện trong vòng vài phút, hãy kiểm tra thư mục thư rác
          của bạn.
        </div>
        <Button
          type="primary"
          className="button"
          onClick={() => (window.location.href = "/dang-nhap")}
        >
          <span>Đăng nhập</span>
        </Button>
      </div>
    );
  };

  const renderFormResetPass = () => {
    return (
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={
          statusForgot === "form_forgot" ? handleSubmit : handleResetPassword
        }
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng mật khẩu" },
            {
              min: 6,
              message: "Mật khẩu phải ít nhất có 6 ký tự",
            },
            {
              max: 20,
              message: "Mật khẩu tối đa 20 ký tự",
            },
          ]}
        >
          <AppInput
            placeholder="Nhập mật khẩu"
            maxLength={20}
            type="password"
            styleInput={{ height: 40 }}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["email"]}
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("email") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu nhập lại phải trùng với mật khẩu")
                );
              },
            }),
          ]}
        >
          <AppInput
            placeholder="Nhập mật khẩu"
            maxLength={20}
            type="password"
            styleInput={{ height: 40 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            <span>Đổi mật khẩu</span>
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const renderForm = () => {
    switch (statusForgot) {
      case "form_forgot":
        return renderFormForgot();
      case "forgot_success":
        return renderFormForgotSuccess();
      case "token_success":
        return renderFormResetPass();
      default:
        return null;
    }
  };

  //! useEffect
  useEffect(() => {
    if (token) {
      hanleCheckToken();
    }
  }, [token]);

  //! render
  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
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
        {renderForm()}
      </div>
    </div>
  );
};

export default ForgotPassword;
