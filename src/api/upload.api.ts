import { IResult, uploadBody } from "../interfaces/upload.interface";
import { API_CATEGORY, endpoints } from "../services/endpoint";
import { request } from "../services/request";

export const uploadImage= (body: uploadBody) => {
    return request<IResult>(
        "post",
        `${API_CATEGORY}/${endpoints.category.upload.upload}`, body
    );
};



