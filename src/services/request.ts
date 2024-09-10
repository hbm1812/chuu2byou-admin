// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios, { AxiosRequestConfig, Method } from "axios";

const axiosInstance = axios.create({
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    let status: boolean = false;
    if (response?.status === 200 || response?.status === 201) {
      status = true;
    }

    return {
      status: status,
      message: response?.data?.message || "success",
      result: response.data,
    };
  },
  (error) => {
    let errorMessage = "Lỗi hệ thống";

    if (error?.message?.includes("Lỗi hệ thống")) {
      errorMessage = "Lỗi hệ thống";
    } else if (error.response) {
      const { status, data } = error.response;


      if (status === 401) {
        errorMessage = data?.error;
        window.localStorage.clear();
        // window.location.href = "/dang-nhap";
        return Promise.reject({
          status: false,
          message: errorMessage,
          result: null,
        });
      } else if (status === 400) {
        errorMessage = data?.error;

        return Promise.reject({
          status: false,
          message: errorMessage,
          result: null,
          data: data
        });
      } else if (status === 404 || status === 502) {
        errorMessage = data?.error || "Lỗi hệ thống";
        return Promise.reject({
          status: false,
          message: errorMessage,
          result: null,
        });
      }
    }
    return Promise.reject(error);
  }
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method
 * @param url
 * @param data
 */

export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  const prefix = "";

  url = prefix + url;

  if (method === "post") {
    return axiosInstance.post(url, data, config);
  } else if (method === "delete") {
    return axiosInstance.delete(url, config);
  } else if (method === "put") {
    return axiosInstance.put(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
