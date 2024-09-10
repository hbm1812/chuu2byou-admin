import { ReactNode } from "react";
import DashboardRoutes from "../modules/Dashboard/quanLyDanhMuc.route";
import PhanQuyenTaiKhoanRoutes from "../modules/PhanQuyenTaiKhoan/phanQuyenTaiKhoan.route";
import CoreRoutes from "../modules/Core/core.routes";
import NewsRoutes from "../modules/News/news.route";
import CategoryRoutes from "../modules/Category/category.route";


export interface IAuthoriryRoute {
  authority: string;
}

export interface IRoute {
  // key: string;
  // path?: string;
  // label?: string;
  // code?: string;
  // parentCode?: string | null | undefined,
  // element?: ReactNode ;
  // icon?: ReactNode | string ;
  // children?: IRoute[]  | null;
  // isShowMenu?: boolean;
  // isPrivate?: boolean;
  // authority?: string;
  key: string;
  path: string;
  label: string;
  element?: ReactNode;
  icon?: ReactNode;
  children?: IRoute[];
  isShowMenu?: boolean;
}

export const routes_url: IRoute[] = [
  ...DashboardRoutes,
  ...PhanQuyenTaiKhoanRoutes,
  ...NewsRoutes,
  ...CategoryRoutes,
  ...CoreRoutes,
];

