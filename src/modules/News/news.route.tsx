
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const News  = lazy(() => import("./pages/News"));
const NewsCategory  = lazy(() => import("./pages/NewsCategory"));

export const NewsRoutes: IRoute[] = [
  {
    key: "News",
    path: "",
    label: "ニュース",
    icon: <FaCertificate />,
    children: [
      {
        key: "NewsManagement",
        path: "/news-management",
        label: "ニュース",
        element: <News />,
        icon: <FaCertificate />,
      },
      {
        key: "NewsCategory",
        path: "/news-category-management",
        label: "ニュースの種類",
        element: <NewsCategory />,
        icon: <FaCertificate />,
      },
    ],
  },
];

export default NewsRoutes;

