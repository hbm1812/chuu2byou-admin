import { API_SECURITY, endpoints } from "../endpoint";
import { request } from "../request";

interface IBodyReset {
  token: string;
  password: string;
}

interface IResult {
  status: boolean;
  result: string;
  message: string;
}

export const forgotPassword = (email: string) =>
  request<IResult>(
    "post",
    `${API_SECURITY}/${endpoints.security.forgotPassword.forgot}?email=${email}`
  );

export const verifyToken = (token: string) =>
  request<IResult>(
    "post",
    `${API_SECURITY}/${endpoints.security.forgotPassword.verify}?token=${token}`
  );

export const resetPassword = (body: IBodyReset) =>
  request<IResult>(
    "post",
    `${API_SECURITY}/${endpoints.security.forgotPassword.reset}`,
    body
  );
