import { dashboardHandlers } from "./handlers/dashboardHandlers";
import { loginHandlers } from "./handlers/loginHandlers";
import { workbenchHandlers } from "./handlers/workbenchHandlers";

// 模拟 API 请求
export const handlers = [
  ...loginHandlers,
  ...workbenchHandlers,
  ...dashboardHandlers,
];
