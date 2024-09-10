import { Checkbox, Form, message } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppInput from "../../../components/common/AppInput";
import AppModal from "../../../components/common/AppModal";
import AppSelected from "../../../components/common/AppSelected";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { getListDMPhongBanPrivilege } from "../../QuanLyDanhMuc/api/dmPhongBan.api";
import { ITableDMPhongBan } from "../../QuanLyDanhMuc/interfaces/TypeDanhMucPhongBan";
import { getListRole } from "../api/role.api";
import { createUser, detailUser, updateUser } from "../api/user.api";
import { IFormTaiKhoan } from "../interfaces/qlTaiKhoan.interface";
import { ITableQlVaiTro } from "../interfaces/qlVaiTro.interface";

interface IProps {
  open: string;
  setOpenModal: Dispatch<SetStateAction<string>>;
  setItemTarget: Dispatch<SetStateAction<number | null>>;
  refreshList: () => void;
  itemTarget: number | null;
}

const ModalCreateUser = (props: IProps) => {
  //! define

  //! state
  const dispatch = useDispatch();
  const [form] = Form.useForm<IFormTaiKhoan>();

  const { open, setOpenModal, refreshList, itemTarget, setItemTarget } = props;

  const [department, setDepartment] = useState<ITableDMPhongBan[]>([]);
  const [roles, setRoles] = useState<ITableQlVaiTro[]>([]);
  const [checkedAdmin, setCheckedAdmin] = useState<boolean>(false);

  //! function
  const handleOk = async () => {
    const values = await form.validateFields();
    if (open === "create") {
      try {
        dispatch(startLoading());
        const response = await createUser({ ...values, admin: checkedAdmin });
        if (response.status) {
          message.success("Thêm mới thành công!");
          setOpenModal("");
          setItemTarget(null);
          refreshList();
        }
      } catch (error: any) {
        dispatch(
          showNotification({
            message: error.data.detail.username || "Thêm mới thất bại",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    } else {
      try {
        dispatch(startLoading());
        const response = await updateUser(
          { ...values, admin: checkedAdmin },
          itemTarget
        );
        if (response.status) {
          message.success("Cập nhật thành công!");
          setOpenModal("");
          refreshList();
          setItemTarget(null)
        }
      } catch (error: any) {
        dispatch(
          showNotification({
            message: error?.data?.detail || "Cập nhật thất bại",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    }
  };

  const handleCancel = () => {
    setOpenModal("");
    setItemTarget(null);
  };

  const getDsPhongBan = async () => {
    dispatch(startLoading());
    try {
      const response = await getListDMPhongBanPrivilege();
      if (response.status) {
        setDepartment(response.result);
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "Lấy dữ liệu phòng ban thất bại!",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const getDsVaiTro = async () => {
    const body = {
      page: 0,
      size: 50,
    };
    dispatch(startLoading());
    try {
      const response = await getListRole(body);
      if (response.status) {
        setRoles(response.result.data);
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Lấy dữ liệu thất bại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const getDetail = async () => {
    dispatch(startLoading());
    try {
      const response = await detailUser(itemTarget);
      if (response.status) {
        const {
          admin,
          fullName,
          username,
          phoneNumber,
          email,
          departmentId,
          roles,
          active,
          departmentManagementIds
        } = response.result;
        const values = {
          admin,
          fullName,
          username,
          active,
          phoneNumber,
          email,
          departmentId,
          roles: roles.map((role) => role.roleCode),
          departmentManagementIds
        };
        form.setFieldsValue(values);
        setCheckedAdmin(admin);
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Lấy dữ liệu thất bại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const renderTitle = (open: string) => {
    switch (open) {
      case "detail":
        return "Chi tiết tài khoản";
      case "update":
        return "Cập nhật tài khoản";
      case "create":
        return "Tạo mới tài khoản";
      default:
        return "";
    }
  };

  //! useEffect
  useEffect(() => {
    getDsPhongBan();
    getDsVaiTro();
  }, []);

  useEffect(() => {
    if (itemTarget) {
      getDetail();
    }
  }, [itemTarget]);

  //! render
  return (
    <AppModal
      width={"80%"}
      isOpen={!!open}
      onSubmit={handleOk}
      onClose={handleCancel}
      title={renderTitle(open)}
      typeOpenModal={open}
    >
      <div className="form_qlvt">
        <Form form={form} layout="vertical" name="taiKhoan" autoComplete="off">
          <div className="modal_form_container_3_row">
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên" },
              ]}
            >
              <AppInput
                placeholder="Nhập họ và tên"
                maxLength={255}
                disabled={open === "detail"}
              />
            </Form.Item>
            <Form.Item
              label="Tên tài khoản"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản" },
                {
                  pattern: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Tên đăng nhập chỉ được chứa chữ không dấu, số, dấu gạch dưới (_) và dấu gạch ngang (-)",
                },
              ]}
            >
              <AppInput
                placeholder="Nhập tên tài khoản"
                maxLength={50}
                disabled={open !== "create"}
              />
            </Form.Item>
            <Form.Item
              label="Phòng ban"
              name="departmentId"
              rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
            >
              <AppSelected
                options={department.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                showSearch
                filterByLabel
                placeholder="Chọn phòng ban"
                disabled={open === "detail"}
              />
            </Form.Item>
            {open === "create" ? (
              <>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
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
                  />
                </Form.Item>
                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Vui lòng nhập lại mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
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
                  />
                </Form.Item>
              </>
            ) : (
              <Form.Item label="Trạng thái" name="active">
                <AppSelected
                  placeholder="Chọn trạng thái"
                  options={[
                    { value: 0, label: "Không hoạt động" },
                    { value: 1, label: "Đang hoạt động" },
                  ]}
                  disabled={open === "detail"}
                />
              </Form.Item>
            )}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng email",
                },
              ]}
            >
              <AppInput
                placeholder={open === "detail" ? "" : "Nhập email"}
                // placeholder="Nhập email"
                maxLength={50}
                disabled={open === "detail"}
              />
            </Form.Item>
          </div>
          <div style={{ marginTop: 15 }}>
            <Form.Item label="Vai trò" name="roles">
              <AppSelected
                options={roles.map((item) => ({
                  value: item.code,
                  label: item.name,
                }))}
                showSearch
                filterByLabel
                placeholder={open === "detail" ? "" : "Chọn vai trò"}
                mode="multiple"
                disabled={open === "detail"}
              />
            </Form.Item>
          </div>
          <div style={{ marginTop: 0 }}>
            <Form.Item label="Phòng ban quản lý" name="departmentManagementIds">
              <AppSelected
                options={department.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                showSearch
                filterByLabel
                placeholder={open === "detail" ? "" : "Chọn phòng ban quản lý"}
                mode="multiple"
                disabled={open === "detail"}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="admin">
              <Checkbox
                onChange={(value) => setCheckedAdmin(value.target.checked)}
                checked={checkedAdmin}
                disabled={open === "detail"}
              >
                Phân quyền admin cho tài khoản
              </Checkbox>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AppModal>
  );
};

export default ModalCreateUser;
