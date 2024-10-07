
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import { lazy } from "react";


const Menu = lazy(() => import("./pages/Menu"));
const MenuType = lazy(() => import("./pages/MenuType"));


export const menuRoutes: IRoute[] = [
    {
        key: "MM",
        code: "MM",
        parentCode: null,
        isPrivate: true,
        children: [
            
            {
                key: "MT",
                code: "MT",
                parentCode: "MM",
                element: <MenuType/>,
                isPrivate: true,
            },
            {
                key: "Menu",
                code: "Menu",
                parentCode: "MM",
                element: <Menu/>,
                isPrivate: true,
            },


        ],
    },
];

export default menuRoutes;

