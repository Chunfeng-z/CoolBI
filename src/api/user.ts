import { AccountLogin, GetUserInfoParams, MobileLogin } from "@/types/login";
import { get, post } from "@/utils/request";

export interface MobileLoginParams {
  mobile: string;
  captcha: string;
}

export interface SendCaptchaParams {
  mobile: string;
}

export interface ResetPasswordParams {
  mobile: string;
  captcha: string;
  password: string;
}

/**
 * 用户登陆
 */
export function userLogin(params: AccountLogin | MobileLogin) {
  return post("/api/user/login", params);
}

/**
 * 获取用户信息和权限
 */
export function getUserInfo(params: GetUserInfoParams) {
  return get("/api/user/info", params);
}

/**
 * 发送手机验证码
 * @param params 手机号参数
 * @param type 验证码类型 login-登录 reset-重置密码
 */
export function sendCaptcha(
  params: SendCaptchaParams,
  type: "login" | "reset" = "login"
) {
  return post("/api/user/captcha", { ...params, type });
}

/**
 * 重置密码
 * @param params 重置密码参数
 */
export function resetPassword(params: ResetPasswordParams) {
  return post("/api/user/reset-password", params);
}

/**
 * 用户注册
 * @param params 注册参数
 */
export function register(params: {
  account: string;
  password: string;
  mobile: string;
  captcha: string;
}) {
  return post("/api/user/register", params);
}
