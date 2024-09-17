
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const News  = lazy(() => import("./pages/News"));
const NewsType  = lazy(() => import("./pages/NewsType"));
const TV  = lazy(() => import("./pages/TV"));

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
      {
        key: "TVBroadcast",
        path: "/tv-broadcast",
        label: "Tv broadcast",
        element: <TV />,
        icon: <FaCertificate />,
      },
     
    ],
  },
];

export default CategoryRoutes;

