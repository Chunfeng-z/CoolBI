/**
 * 登录方式
 * - account 账号密码登录
 * - mobile 手机号验证码登录
 */
export type LoginMethodType = AccountLogin["type"] | MobileLogin["type"];

/** 账号密码登录 */
export type AccountLogin = {
  type: "account";
  account: string;
  password: string;
};

/** 手机验证码登录 */
export type MobileLogin = {
  type: "mobile";
  mobile: string;
  captcha: string;
};

/** 登录参数 */
export type LoginParams = AccountLogin | MobileLogin;

/** 获取用户信息参数 */
export type GetUserInfoParams = {
  userId: string;
};

/** 通用API响应类型 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

/** 登录数据 */
export type LoginData = {
  success: boolean;
  token?: string;
  userId?: string;
};

/** 用户数据 */
export type UserData = {
  success: boolean;
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
};

/** 登录响应 */
export type LoginResponseType = ApiResponse<LoginData>;

/** 获取的用户信息 */
export type UserInfoType = ApiResponse<UserData>;
