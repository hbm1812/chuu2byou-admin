
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import {lazy} from "react";

const News  = lazy(() => import("./pages/News"));
const NewsType  = lazy(() => import("./pages/NewsType"));
const TV  = lazy(() => import("./pages/TV"));

export const CategoryRoutes: IRoute[] = [
  {
    key: "CM",
    code:"CM",
    parentCode: null,
    isPrivate: true,
    children: [
      {
        key: "News",
        code: "News",
        parentCode: "CM",
        element: <News />,
        isPrivate: true,
      },
      {
        key: "NT",
        code: "NT",
        parentCode: "CM",
        element: <NewsType />,
        isPrivate: true,
      },
      {
        key: "TvB",
        code: "TvB",
        parentCode: "CM",
        element: <TV />,
        isPrivate: true,
      },
     
    ],
  },
];

export default CategoryRoutes;

