import { API_SECURITY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";
import { IBodyCreateRole } from "../interfaces";
import {
    IFormQlVaiTro,
    IResultPrivilegeRole,
    IResultQlVaiTro,
    ISearchQlVaiTro,
} from "../interfaces/qlVaiTro.interface";


export const createRole = (body: IBodyCreateRole) =>
    request<IBodyCreateRole>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.addRole}`,
        body
    );


export const getListRole = (body: ISearchQlVaiTro) =>
  request<IResultQlVaiTro>(
    "post",
    `${API_SECURITY}/${endpoints.security.role.getListRole}`,
    body
  );

export const detailRole = (code: string) =>
    request<IFormQlVaiTro>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.detailRole}/${code}?privilege`
    );
export const deleteRole = (code: string) =>
    request<IFormQlVaiTro>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.deleteRole}/${code}?privilege`
    );
export const updateRole = (body: IFormQlVaiTro, code: string) =>
    request<IResultQlVaiTro>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.updateRole}/${code}`,
        body
    );

export const getListPrivilegeRole = async () => {
    const response = await request<IResultPrivilegeRole>(
        "post",
        `${API_SECURITY}/${endpoints.security.role.getListPrivilegeRole}`
    );
    // Kiểm tra nếu request thất bại (status khác false)
    if (!response.status) return [];

    // Kiểm tra nếu result là một mảng và xử lý
    if (Array.isArray(response.result)) {
        const p1 = response.result.map((item) => {
            // Xử lý item ở đây, ví dụ:
            return {
                value: item.code,
                label: item.name,
            };
        });
        return p1; // Trả về mảng đã được map
    }

    // Trả về mảng rỗng nếu không có dữ liệu hoặc không phải là mảng
    return [];
};
