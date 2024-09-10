import { lazy } from "react";
import { FaCertificate } from "react-icons/fa";
import { IRoute } from "../../routes/routes";

const Chidren1 = lazy(() => import("./children/Chidren1"));
const Chidren2 = lazy(() => import("./children/Chidren2"));

export const CoreRoutes: IRoute[] = [
  {
    key: "Core",
    path: "",
    label: "Core",
    icon: <FaCertificate />,
    children: [
      {
        key: "Core1",
        path: "/code-1",
        label: "Core 1",
        element: <Chidren1 />,
        icon: <FaCertificate />,
      },
      {
        key: "Core2",
        path: "/code-2",
        label: "Core 2",
        element: <Chidren2 />,
        icon: <FaCertificate />,
      },
    ],
  },
];

export default CoreRoutes;
