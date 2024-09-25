import { ReactNode } from "react";
import DashboardRoutes from "../modules/Dashboard/quanLyDanhMuc.route";
import PhanQuyenTaiKhoanRoutes from "../modules/PhanQuyenTaiKhoan/phanQuyenTaiKhoan.route";
import CoreRoutes from "../modules/Core/core.routes";
import CategoryRoutes from "../modules/Category/category.route";


export interface IAuthoriryRoute {
  authority: string;
}

export interface IRoute {
  key: string;
  path?: string;
  label?: string;
  code?: string;
  parentCode?: string | null | undefined,
  element?: ReactNode ;
  icon?: ReactNode | string ;
  children?: IRoute[]  | null;
  isShowMenu?: boolean;
  isPrivate?: boolean;
  authority?: string;

}

export const routes_url: IRoute[] = [
  ...DashboardRoutes,
  ...PhanQuyenTaiKhoanRoutes,
  ...CategoryRoutes,
  ...CoreRoutes,
];

