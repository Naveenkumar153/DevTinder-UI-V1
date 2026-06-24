import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../../interceptor/interceptor";

export const api = {
    get<T>(url: string, config?: AxiosRequestConfig) {
        return axiosInstance.get<T>(url, config);
    },

    post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        return axiosInstance.post<T>(url, data, config);
    },

    put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        return axiosInstance.put<T>(url, data, config);
    },

    patch<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        return axiosInstance.patch<T>(url, data, config);
    },

    delete<T>(url: string, config?: AxiosRequestConfig) {
        return axiosInstance.delete<T>(url, config);
    },
};