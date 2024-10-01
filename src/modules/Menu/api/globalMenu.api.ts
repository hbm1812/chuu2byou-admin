import { API_SECURITY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";
import { IAddGlobalMenu, IResultGlobalMenu, ISearchGlobalMenu, ITableGlobalMenu, IUpdateGlobalMenu } from "../interfaces/typeGlobalMenu";

export const getListGlobalMenu= (body: ISearchGlobalMenu) => {
    return request<IResultGlobalMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.globalMenu.getList}`, body
    );
};


export const addGlobalMenu= (body: IAddGlobalMenu) => {
    return request<IResultGlobalMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.globalMenu.add}`, body
    );
};

export const detailGlobalMenu= (id:any) => {
    return request<ITableGlobalMenu>(
        "post",
        `${API_SECURITY}/${endpoints.security.globalMenu.detail}/${id}`
    );
};

export const updateGlobalMenu= (body: IUpdateGlobalMenu,id:any) => {
    return request<IResultGlobalMenu>(
        "put",
        `${API_SECURITY}/${endpoints.security.globalMenu.update}/${id}`, body
    );
};


export const deleteGlobalMenu = (id?: any) => {
    return request<IResultGlobalMenu>(
        "delete",
        `${API_SECURITY}/${endpoints.security.globalMenu.delete}/${id}`
    );
};
