
import { API_SECURITY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";
import { IAddMenuType, IResultMenuType, ISearchMenuType,  ITableMenuType, IUpdateMenuType } from "../interfaces/typeMenuType";


export const getAllMenuTypeNoParam=() => {
    return request<IResultMenuType>(
        "get",
        `${API_SECURITY}/${endpoints.security.menuType.getNoParams}`
    );
};


export const getListMenuType= (body: ISearchMenuType) => {
    return request<IResultMenuType>(
        "post",
        `${API_SECURITY}/${endpoints.security.menuType.getList}`, body
    );
};


export const addMenuType= (body: IAddMenuType) => {
    return request<IResultMenuType>(
        "post",
        `${API_SECURITY}/${endpoints.security.menuType.add}`, body
    );
};

export const detailMenuType= (id:any) => {
    return request<ITableMenuType>(
        "post",
        `${API_SECURITY}/${endpoints.security.menuType.detail}/${id}`
    );
};

export const updateMenuType= (body: IUpdateMenuType,id:any) => {
    return request<IResultMenuType>(
        "put",
        `${API_SECURITY}/${endpoints.security.menuType.update}/${id}`, body
    );
};


export const deleteMenuType = (id?: any) => {
    return request<IResultMenuType>(
        "delete",
        `${API_SECURITY}/${endpoints.security.menuType.delete}/${id}`
    );
};
