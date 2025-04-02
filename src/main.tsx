import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
// 引入图标
import "./assets/iconfont/iconfont";

// 只在开发环境中启动msw
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // 'worker.start（）' 返回一个 Promise，该 Promise 解析
  //  一旦 Service Worker 启动并准备好拦截请求。
  return worker.start({
    serviceWorker: {
      url: "/CoolBI/mockServiceWorker.js",
    },
  });
}

// 确保在 mock 服务启动后再渲染应用
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
