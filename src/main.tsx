import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
// 引入图标
import "./assets/iconfont/iconfont";

createRoot(document.getElementById("root")!).render(<App />);
