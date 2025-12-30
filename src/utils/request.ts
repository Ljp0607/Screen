import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd"; // 假设使用antd的message组件显示错误信息

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api-gateway",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加时间戳防止缓存
    if (config.method?.toLowerCase() === "get" && config.params) {
      config.params._t = Date.now();
    }

    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const { data, config } = response;

    // 如果是下载文件，直接返回
    if (config.responseType === "blob") {
      return response;
    }

    // 根据实际业务调整，这里假设后端返回格式为 { code: 0, data: T, message: string }
    if (data.code === 0) {
      return data.data;
    } else {
      // 业务错误
      message.error(data.message || "请求失败");
      return Promise.reject(new Error(data.message || "请求失败"));
    }
  },
  (error: AxiosError) => {
    // 对响应错误做点什么
    const { response, message: errorMessage } = error;

    if (response) {
      const { status, data } = response;

      switch (status) {
        case 400:
          message.error("请求参数错误");
          break;
        case 401:
          message.error("未授权，请重新登录");
          // 清除token并跳转到登录页
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          message.error("没有权限访问该资源");
          break;
        case 404:
          message.error("请求的资源不存在");
          break;
        case 500:
          message.error("服务器内部错误");
          break;
        case 503:
          message.error("服务暂时不可用");
          break;
        default:
          message.error(data?.message || errorMessage || "网络错误");
      }
    } else if (error.code === "ECONNABORTED") {
      message.error("请求超时，请检查网络连接");
    } else if (!window.navigator.onLine) {
      message.error("网络连接失败，请检查网络设置");
    } else {
      message.error("网络错误，请稍后重试");
    }

    return Promise.reject(error);
  }
);

// 封装常用请求方法
export const http = {
  get: <T>(
    url: string,
    params?: Record<string, T>,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request.get(url, { params, ...config });
  },

  post: <T = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request.post(url, data, config);
  },

  put: <T = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request.put(url, data, config);
  },

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request.delete(url, config);
  },

  upload: <T = unknown>(
    url: string,
    file: File,
    data?: Record<string, unknown>
  ): Promise<T> => {
    const formData = new FormData();
    formData.append("file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key] as string);
      });
    }

    return request.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  download: (
    url: string,
    params?: Record<string, unknown>,
    filename?: string
  ): Promise<void> => {
    return request
      .get(url, {
        params,
        responseType: "blob",
      })
      .then((response: AxiosResponse<Blob>) => {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      });
  },
};

export default request;
