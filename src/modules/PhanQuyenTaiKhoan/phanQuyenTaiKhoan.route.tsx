
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const QuanLyVaiTro  = lazy(() => import("./pages/QuanLyVaiTro"));
const QuanLyTaiKhoan  = lazy(() => import("./pages/QuanLyTaiKhoan"));

export const PhanQuyenTaiKhoanRoutes: IRoute[] = [
  {
    key: "SystemManagement",
    path: "",
    label: "システム管理",
    icon: <FaCertificate />,
    children: [
      {
        key: "RoleManagement",
        path: "/role-management",
        label: "役割管理",
        element: <QuanLyVaiTro />,
        icon: <FaCertificate />,
      },
      {
        key: "UserManagement",
        path: "/user-management",
        label: "ユーザー管理",
        element: <QuanLyTaiKhoan />,
        icon: <FaCertificate />,
      },
    ],
  },
];

export default PhanQuyenTaiKhoanRoutes;

