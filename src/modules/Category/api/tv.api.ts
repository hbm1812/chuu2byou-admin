import { API_CATEGORY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";

export const getListNewsType= (body: ISearchTV) => {
    return request<IResultTV>(
        "post",
        `${API_CATEGORY}/${endpoints.category.tv.getList}`, body
    );
};

export const addTV= (body: ISearchTV) => {
    return request<IResultTV>(
        "post",
        `${API_CATEGORY}/${endpoints.category.tv.add}`, body
    );
};

export const detailTV= (id:any) => {
    return request<ITableTV>(
        "post",
        `${API_CATEGORY}/${endpoints.category.tv.detail}/${id}`
    );
};

export const updateTV= (body: IUpdateTV,id:any) => { 
    return request<IResultTV>(
        "put",
        `${API_CATEGORY}/${endpoints.category.tv.update}/${id}`, body
    );
};

export const deleteTV = (id?: any) => {
    return request<IResultTV>(
        "delete",
        `${API_CATEGORY}/${endpoints.category.tv.delete}/${id}`
    );
};
