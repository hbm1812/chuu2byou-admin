import {
  IResultLogin,
  IThongTinTaiKhoan,
} from "../../interfaces/account.interface";
import { API_SECURITY, endpoints } from "../endpoint";
import { request } from "../request";

export const login = (body: { username: string; password: string }) =>
  request<IResultLogin>(
    "post",
    `${API_SECURITY}/${endpoints.security.authenticate}`,
    body
  );

export const getThongTinTaiKhoan = () =>
    request<IThongTinTaiKhoan>(
        "post",
        `${API_SECURITY}/${endpoints.security.profile}`
    );

