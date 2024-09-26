
import { FaCertificate } from "react-icons/fa6";
import { IRoute } from "../../routes/routes";
import { lazy } from "react";


const Works = lazy(() => import("./pages/works"));
const Staff = lazy(() => import("./pages/staff"));

export const staffCastRoutes: IRoute[] = [
    {
        key: "PSCM",
        code: "PSCM",
        parentCode: null,
        isPrivate: true,
        children: [
            {
                key: "WM",
                code: "WM",
                parentCode: "PSCM",
                element: <Works />,
                isPrivate: true,
            },
            {
                key: "StM",
                code: "StM",
                parentCode: "PSCM",
                element: <Staff />,
                isPrivate: true,
            },



        ],
    },
];

export default staffCastRoutes;

