import { API_SECURITY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";
import { IAddMenu, IResultMenu, ISearchMenu, ITableMenu, IUpdateMenu } from "../interfaces/typeMenu";


export const getListMenu= (body: ISearchMenu) => {
    return request<IResultMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.menu.getList}`, body
    );
};


export const addMenu= (body: IAddMenu) => {
    return request<IResultMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.menu.add}`, body
    );
};

export const detailMenu= (id:any) => {
    return request<ITableMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.menu.detail}/${id}`
    );
};

export const updateMenu= (body: IUpdateMenu,id:any) => {
    return request<IResultMenu>(
        "put",
        `${API_SECURITY}/${endpoints.security.menu.update}/${id}`, body
    );
};


export const deleteMenu = (id?: any) => {
    return request<IResultMenu>(
        "delete",
        `${API_SECURITY}/${endpoints.security.menu.delete}/${id}`
    );
};
