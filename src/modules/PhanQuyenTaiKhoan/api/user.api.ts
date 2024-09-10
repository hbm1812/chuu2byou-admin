import { API_SECURITY, endpoints } from "../../../services/endpoint";
import { request } from "../../../services/request";
import {
  ISearchQlTaiKhoan,
  IResultQlTaiKhoan,
  IFormTaiKhoan,
  ITableQlTaiKhoan,
  IFromChangePassword,
} from "../interfaces/qlTaiKhoan.interface";

export const getListUser = (body: ISearchQlTaiKhoan) =>
  request<IResultQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.getList}`,
    body
  );

export const createUser = (body: IFormTaiKhoan) =>
  request<IResultQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.create}`,
    body
  );

export const updateUser = (body: IFormTaiKhoan, id: number | null) =>
  request<IResultQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.update}/${id}`,
    body
  );

export const detailUser = (id: number | null) =>
  request<ITableQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.detail}/${id}?role`
  );

export const deletelUser = (id: number) =>
  request<IResultQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.delete}/${id}`
  );

export const changePassword = (body: IFromChangePassword) =>
  request<IResultQlTaiKhoan>(
    "post",
    `${API_SECURITY}/${endpoints.security.user.changePassword}`,
    body
  );
