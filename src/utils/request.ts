import { message } from "antd";
import axios from "axios";

/** axios 实例 */
const service = axios.create({
  // api base_url - VITE_API_BASE_URL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 请求超时时间
  timeout: 20000,
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
});

const TokenName = "cool_bi_token";

/* 全局请求拦截器 */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TokenName);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("请求错误", error);
    return Promise.reject(error);
  }
);

/* 全局响应拦截器 */
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这里可以根据后端的数据结构定制
    // 假设后端返回的数据结构为 { code: number, data: any, message: string }
    if (res.code === 200) {
      return res.data;
    }
    // 未登录或登录过期
    if (res.code === 401) {
      // token 过期或未登录
      localStorage.removeItem(TokenName);
      // 显示提示信息
      message.warning("请先登录");
      // 可以在这里添加重定向到登录页的逻辑
      window.location.href = "/login";
      return Promise.reject(new Error("未登录或登录过期"));
    }

    // 其他错误情况
    return Promise.reject(new Error(res.message || "请求失败"));
  },
  (error) => {
    console.log("响应错误：", error);
    return Promise.reject(error);
  }
);

// 封装get请求
export const get = (url: string, params = {}) => {
  return service({
    url,
    method: "get",
    params,
  });
};

// 请求取消功能
export function cancelableRequest(url: string, params = {}) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const promise = get(url, {
    ...params,
    cancelToken: source.token,
  });

  return {
    promise,
    cancel: () => source.cancel("请求被取消"),
  };
}

// 封装post请求
export const post = (url: string, data = {}) => {
  return service({
    url,
    method: "post",
    data,
  });
};

// 封装put请求
export const put = (url: string, data = {}) => {
  return service({
    url,
    method: "put",
    data,
  });
};

// 封装delete请求
export const del = (url: string, data = {}) => {
  return service({
    url,
    method: "delete",
    data,
  });
};

// 导出
export default service;
