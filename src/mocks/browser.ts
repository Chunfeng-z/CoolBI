import { setupWorker } from "msw/browser";

import { handlers } from "./handlers.ts";

// 创建一个模拟的工作线程，用于拦截浏览器中的请求，启动浏览器端的请求拦截。
export const worker = setupWorker(...handlers);
