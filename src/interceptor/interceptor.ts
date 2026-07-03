import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { environment } from "../env/env.dev";
import type { ErrorResponse } from "../shared/interfaces/api-error.interface";



const axiosInstance = axios.create({
    baseURL: environment.url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // const token = localStorage.getItem("token");

        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        console.log(
            `[Request] ${config.method?.toUpperCase()} ${config.url}`
        );

        return config;
    },
    (error: AxiosError<ErrorResponse>) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<ErrorResponse>) => {
        const normalized = {
            statusCode: error.response?.data?.statusCode ?? error.response?.status ?? 500,
            message: error.response?.data?.message ?? error.message ?? "Something went wrong",
            success: false,
        };
        const status = normalized.statusCode;
        switch (status) {
            case 401:
                console.error("Unauthorized");
                window.location.href = "/login";
                break;
            case 403:
                console.error("Forbidden");
                break;
            case 500:
                console.error("Internal Server Error");
                break;
            default:
                console.error(error);
        }
        return Promise.reject(normalized);
    }
);

export default axiosInstance;