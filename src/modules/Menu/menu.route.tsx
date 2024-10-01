
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import { lazy } from "react";
import GlobalMenu from "./pages/GlobalMenu";
import SupMenu from "./pages/SupMenu";



export const menuRoutes: IRoute[] = [
    {
        key: "MM",
        code: "MM",
        parentCode: null,
        isPrivate: true,
        children: [
            {
                key: "GM",
                code: "GM",
                parentCode: "MM",
                element: <GlobalMenu/>,
                isPrivate: true,
            },
            {
                key: "SupM",
                code: "SupM",
                parentCode: "MM",
                element: <SupMenu/>,
                isPrivate: true,
            },


        ],
    },
];

export default menuRoutes;

