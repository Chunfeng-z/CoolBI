import { http, HttpResponse } from "msw";
import queryString from "query-string";

import {
  AccountLogin,
  GetUserInfoParams,
  LoginResponseType,
  MobileLogin,
  UserInfoType,
} from "@/types/login";
// vite-config中的base
const baseUrl = import.meta.env.BASE_URL;
export const loginHandlers = [
  // 模拟登录
  http.post(baseUrl + "api/user/login", async ({ request }) => {
    const data = (await request.json()) as AccountLogin | MobileLogin;
    if (
      data.type === "account" &&
      data.account === "admin1" &&
      data.password === "111111"
    ) {
      const respData: LoginResponseType = {
        code: 200,
        message: "Login successful",
        data: {
          success: true,
          token: "mock-jwt-token",
          userId: "1",
        },
      };
      return HttpResponse.json(respData);
    } else if (
      data.type === "mobile" &&
      data.mobile === "11111111111" &&
      data.captcha === "111111"
    ) {
      const respData: LoginResponseType = {
        code: 200,
        message: "Login successful",
        data: {
          success: true,
          token: "mock-jwt-token",
          userId: "1",
        },
      };
      return HttpResponse.json(respData);
    } else {
      return HttpResponse.json({
        code: 200,
        message: "登陆失败",
        data: {
          success: false,
        },
      });
    }
  }),
  // 获取用户的信息和当前用户的权限
  http.get(baseUrl + "api/user/info", async ({ request }) => {
    const parsedQuery = queryString.parseUrl(request.url).query;
    const query: GetUserInfoParams = {
      userId: parsedQuery.userId as string,
    };
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token === "mock-jwt-token" && query.userId === "1") {
      const respData: UserInfoType = {
        code: 200,
        message: "获取用户信息成功",
        data: {
          success: true,
          id: "1",
          username: "admin",
          name: "管理员",
          email: "111",
          role: "admin",
        },
      };
      return HttpResponse.json(respData);
    } else {
      return HttpResponse.json({
        code: 200,
        message: "获取用户信息失败",
        data: {
          success: false,
          id: "",
          username: "",
          name: "",
          email: "",
          role: "",
        },
      });
    }
  }),
];
