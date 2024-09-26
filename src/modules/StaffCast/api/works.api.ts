import {  endpoints, VITE_API_STAFF_CAST } from "../../../services/endpoint";
import { request } from "../../../services/request";
import { IResultWorks, ISearchWorks, ITableWorks, IUpdateWorks } from "../interfaces/TypeWorks";

export const getListWorks= (body: ISearchWorks) => {
    return request<IResultWorks>(
        "post",
        `${VITE_API_STAFF_CAST}/${endpoints.staffCast.works.search}`, body
    );
};

export const addWorks= (body: ISearchWorks) => {
    return request<IResultWorks>(
        "post",
        `${VITE_API_STAFF_CAST}/${endpoints.staffCast.works.add}`, body
    );
};

export const detailWorks= (id:any) => {
    return request<ITableWorks>(
        "post",
        `${VITE_API_STAFF_CAST}/${endpoints.staffCast.works.detail}/${id}`
    );
};

export const updateWorks= (body: IUpdateWorks,id:any) => { 
    return request<IResultWorks>(
        "put",
        `${VITE_API_STAFF_CAST}/${endpoints.staffCast.works.update}/${id}`, body
    );
};

export const deleteWorks = (id?: any) => {
    return request<IResultWorks>(
        "delete",
        `${VITE_API_STAFF_CAST}/${endpoints.staffCast.works.delete}/${id}`
    );
};
