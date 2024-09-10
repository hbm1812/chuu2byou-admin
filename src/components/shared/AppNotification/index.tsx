import { notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearNotification } from "../../../redux/reducers/notificationReducer";
type Props = {
  message: string;
  description?: string;
  type: "success" | "error" | "info" | "warning" | null;
};

const AppNotification: React.FC<Props> = (props) => {
  const { message, description, type } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    switch (type) {
      case "success":
        notification.success({ message, description });
        break;
      case "error":
        notification.error({ message, description });
        break;
      case "warning":
        notification.warning({ message, description });
        break;
      case "info":
        notification.info({ message, description });
        break;
    }
    dispatch(clearNotification());
  }, [type, message, description, dispatch]);

  return null;
};

export default AppNotification;
