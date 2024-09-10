import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IMenu } from "../interfaces/menu.interface";
import { getMenu } from "../services/utils/menu";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/reducers/loadingReducer";
import {IRoute, routes_url} from "../routes/routes";
import {useAccount} from "./ContextAccount";

interface MenuContextType {
    menuByUser: IRoute[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("Lỗi provider");
    }
    return context;
};

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const [menuByUser, setMenuByUser] = useState<IRoute[]>([]);

    const { userInfo } = useAccount();
    const updateRoutes = (routes: IRoute[], responseResult: IMenu[]) => {
        const updateRouteItem = (routeItem: IRoute, responseItem: IMenu) => {
            if (routeItem.code === responseItem.code && routeItem.key === responseItem.key) {
                routeItem.path = responseItem.path;
                routeItem.icon = responseItem.icon;
                routeItem.label = responseItem.name;

                // Kiểm tra xem có đối tượng nào trong authorities có code trùng với routeItem.code không


                // @ts-ignore
                const matchingAuthority = userInfo?.authorities.find(auth => auth.code === routeItem.code);
                if (matchingAuthority) {
                    routeItem.authority = matchingAuthority.privileges;
                }
            }
        };

        const updateRoutesRecursively = (routes: IRoute[], responseResult: IMenu[]) => {
            return routes.map((route) => {
                // Cập nhật thông tin cho route hiện tại nếu có sự trùng khớp
                responseResult.forEach((responseItem) => {
                    updateRouteItem(route, responseItem);
                    if (route.children && responseItem.children) {
                        updateRoutesRecursively(route.children, responseItem.children);
                    }
                });
                return route;
            });
        };

        return updateRoutesRecursively(routes, responseResult);
    };
    const loadMenu = async () => {
        try {
            dispatch(startLoading());
            const response = await getMenu();
            const updatedRoutes = updateRoutes(routes_url, response.result);
            setMenuByUser(updatedRoutes); // Cập nhật menuByUser với giá trị mới
        } catch (error) {
            console.error("Failed to load menu", error);
        } finally {
            dispatch(stopLoading());
        }
    };

    // useEffect(() => {
    //         loadMenu();
    // }, []);
    useEffect(() => {
        if (userInfo) {
            loadMenu();
        }
    }, [userInfo]);

    return (
        <MenuContext.Provider value={{ menuByUser }}>
            {children}
        </MenuContext.Provider>
    );
};
