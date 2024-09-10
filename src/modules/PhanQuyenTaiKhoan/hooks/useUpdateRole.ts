import { message } from "antd";
import { updateRole as update } from "../api/role.api";
import { IBodyCreateRole } from "../interfaces";

const useUpdateRole = () => {
  //! define

  //! state

  //! function
  const updateRole = async ({
    body,
    onSuccess,
    code,
  }: {
    body: IBodyCreateRole;
    onSuccess: () => void;
    code?: any;
  }) => {
    try {
      const response = await update(body, code);
      if (response.status) {
        onSuccess();
        message.success("Cập nhật thành công!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại sau");
    }
  };

  //! useEffect

  //! render
  return { updateRole };
};

export default useUpdateRole;
