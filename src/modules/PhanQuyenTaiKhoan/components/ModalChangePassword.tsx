import { Form, message } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import AppInput from "../../../components/common/AppInput";
import AppModal from "../../../components/common/AppModal";
import { IFromChangePassword } from "../interfaces/qlTaiKhoan.interface";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { changePassword } from "../api/user.api";
import { showNotification } from "../../../redux/reducers/notificationReducer";

interface IProps {
  open: boolean;
  setOpenModalPassword: Dispatch<SetStateAction<boolean>>;
}

const ModalChangePassword = (props: IProps) => {
  //! define

  //! state
  const dispatch = useDispatch();
  const [form] = Form.useForm<IFromChangePassword>();

  const { open, setOpenModalPassword } = props;

  //! function
  const handleOk = async () => {
    dispatch(startLoading());
    const { oldPassword, newPassword } = await form.validateFields();
    const body = {
      oldPassword,
      newPassword,
    };
    try {
      const response = await changePassword(body);
      if (response.status) {
        message.success("Đổi mật khẩu thành công!");
        setOpenModalPassword(false);
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "Đổi mật khẩu thất bại",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleCancel = () => {
    setOpenModalPassword(false);
  };

  //! useEffect

  //! render
  return (
    <AppModal
      width={"40%"}
      isOpen={!!open}
      onSubmit={handleOk}
      onClose={handleCancel}
      title="Đổi mật khẩu"
    >
      <div className="form_qlvt">
        <Form
          form={form}
          layout="vertical"
          name="doiMatKhau"
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              { required: true, message: "Vui lòng mật khẩu cũ" },
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
              placeholder="Nhập mật khẩu cũ"
              maxLength={20}
              type="password"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng mật khẩu mới" },
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
              placeholder="Nhập mật khẩu mới"
              maxLength={20}
              type="password"
            />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
              placeholder="Nhập lại mật khẩu mới"
              maxLength={20}
              type="password"
            />
          </Form.Item>
        </Form>
      </div>
    </AppModal>
  );
};

export default ModalChangePassword;
