import {request} from '../../../services/request';
import {API_CATEGORY, endpoints} from '../../../services/endpoint';
import { IResultNewsType, ISearchNewsType } from '../interfaces/TypeNewsType';

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
