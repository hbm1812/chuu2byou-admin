import {IPrivilegeNotMap} from "../interfaces/qlVaiTro.interface";
import {request} from "../../../services/request";
import {API_SECURITY, endpoints} from "../../../services/endpoint";

export const getListPrivilegeTree = () => {
    return request<IPrivilegeNotMap[]>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.getListPrivilegeTree}`
    );
};