import { message } from "antd";
import { createRole as create } from "../api/role.api";
import { IBodyCreateRole } from "../interfaces";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../redux/reducers/notificationReducer";

const useCreateRole = () => {
  //! define

  //! state
  const dispatch = useDispatch();

  //! function
  const createRole = async ({
    body,
    onSuccess,
  }: {
    body: IBodyCreateRole;
    onSuccess: () => void;
  }) => {
    try {
      const response = await create(body);
      if (response.status) {
        onSuccess();
        message.success("Thêm mới thành công!");
      }
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.data.detail.code || "Có lỗi xảy ra. Vui lòng thử lại sau",
          type: "error",
        })
      );
    }
  };

  //! useEffect

  //! render
  return { createRole };
};

export default useCreateRole;
