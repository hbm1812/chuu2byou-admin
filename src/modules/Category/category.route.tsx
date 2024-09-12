
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const News  = lazy(() => import("./pages/News"));
const NewsType  = lazy(() => import("./pages/NewsType"));

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
      {
        key: "NewsType",
        path: "/news-type",
        label: "News type",
        element: <NewsType />,
        icon: <FaCertificate />,
      },
     
    ],
  },
];

export default CategoryRoutes;

