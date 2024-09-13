import {request} from '../../../services/request';
import {API_CATEGORY, endpoints} from '../../../services/endpoint';
import { IResultNewsType, ISearchNewsType, IUpdateNewsType, ITable } from '../interfaces/TypeNewsType';
import { IInsertNews, INewsTable, IResultNews, ISearchNews,  } from '../interfaces/TypeNews';

export const getListNewsType= (body: ISearchNewsType) => {
    return request<IResultNewsType>(
        "post",
        `${API_CATEGORY}/${endpoints.category.newsType.getList}`, body
    );
};

export const addNewsType= (body: ISearchNewsType) => {
    return request<IResultNewsType>(
        "post",
        `${API_CATEGORY}/${endpoints.category.newsType.add}`, body
    );
};

export const detailNewsType= (id:any) => {
    return request<ITable>(
        "post",
        `${API_CATEGORY}/${endpoints.category.newsType.detail}/${id}`
    );
};

export const updateNewsType= (body: IUpdateNewsType,id:any) => {
    return request<IResultNewsType>(
        "put",
        `${API_CATEGORY}/${endpoints.category.newsType.update}/${id}`, body
    );
};

export const deleteNewsType = (id?: any) => {
    return request<IResultNewsType>(
        "delete",
        `${API_CATEGORY}/${endpoints.category.newsType.delete}/${id}`
    );
};


//Tin tức
export const getListNews= (body: ISearchNews) => {
    return request<IResultNews>(
        "post",
        `${API_CATEGORY}/${endpoints.category.news.getList}`, body
    );
};

export const addNews= (body: IInsertNews) => {
    return request<IResultNews>(
        "post",
        `${API_CATEGORY}/${endpoints.category.news.add}`, body
    );
};

export const detailNews= (id:any) => {
    return request<INewsTable>(
        "post",
        `${API_CATEGORY}/${endpoints.category.news.detail}/${id}`
    );
};

export const updateNews= (body: INewsTable,id:any) => {
    return request<IResultNews>(
        "put",
        `${API_CATEGORY}/${endpoints.category.news.update}/${id}`, body
    );
};

export const deleteNews = (id?: any) => {
    return request<IResultNews>(
        "delete",
        `${API_CATEGORY}/${endpoints.category.news.delete}/${id}`
    );
};
