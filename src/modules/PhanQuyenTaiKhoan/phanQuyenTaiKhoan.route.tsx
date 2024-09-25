
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const QuanLyVaiTro  = lazy(() => import("./pages/QuanLyVaiTro"));
const QuanLyTaiKhoan  = lazy(() => import("./pages/QuanLyTaiKhoan"));

export const PhanQuyenTaiKhoanRoutes: IRoute[] = [
  {
    key: "SM",
    code:"SM",
    parentCode: null,
    isPrivate: true,
    children: [
      {
        key: "RM",
        code: "RM",
        parentCode: "SM",
        element: <QuanLyVaiTro />,
        isPrivate: true,
      },
      {
        key: "UM",
        code: "UM",
        parentCode: "SM",
        element: <QuanLyTaiKhoan />,
        isPrivate: true,
      },
    ],
  },
];

export default PhanQuyenTaiKhoanRoutes;

