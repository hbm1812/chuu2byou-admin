
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const News  = lazy(() => import("./pages/News"));

export const CategoryRoutes: IRoute[] = [
  {
    key: "Category",
    path: "",
    label: "Category",
    icon: <FaCertificate />,
    children: [
      {
        key: "News",
        path: "/news",
        label: "news",
        element: <News />,
        icon: <FaCertificate />,
      },
     
    ],
  },
];

export default CategoryRoutes;

