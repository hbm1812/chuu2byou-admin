import { lazy } from "react";
import { BiCategory } from "react-icons/bi";
import { IRoute } from "../../routes/routes";
const Dashboard  = lazy(() => import("./pages/Dashboard"));

export const DashboardRoutes: IRoute[] = [
  {
    key: "Dashboard",
    path: "/dashboard",
    label: "Dashboard",
    parentCode: null,
    icon: <BiCategory />,
    element: <Dashboard />,
    isShowMenu: true,
    isPrivate: true,
  },
];

export default DashboardRoutes;
