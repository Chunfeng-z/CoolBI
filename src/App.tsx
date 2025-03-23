import { ConfigProvider, App as AntApp, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AIChat from "./pages/AIChat/AIChat";
import DashBoardPage from "./pages/DashBoard/DashBoardPage";
import DataCenterPage from "./pages/DataCenter/DataCenterPage";
import { PageNotAuthorized, PageNotFound, ServerError } from "./pages/Error";
import Home from "./pages/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import WorkBenchPage from "./pages/WorkBench/workBenchPage";
import { useThemeStore } from "./stores/useThemeStore";

const base = import.meta.env.VITE_BASE;

export default function App() {
  const CustomColorPrimary = useThemeStore((state) => state.colorPrimary);
  const CustomBorderRadius = useThemeStore((state) => state.borderRadius);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <>
      <ConfigProvider
        theme={{
          // antd主题算法
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: CustomColorPrimary,
            borderRadius: CustomBorderRadius,
            // 可以添加更多配置项
          },
          components: {
            Layout: {
              headerBg: isDarkMode ? "#141414" : "#ffffff",
              // header的高度只能通过token设置
              headerHeight: "56px",
            },
          },
        }}
      >
        <AntApp>
          <BrowserRouter>
            <Routes>
              <Route
                path={`${base}/`}
                element={<Navigate to={`${base}/home`}></Navigate>}
              />
              <Route path={`${base}/home`} element={<Home />}>
                {/* 默认加载工作台 */}
                <Route index element={<Navigate to="workbench" />} />
                <Route path="workbench" element={<WorkBenchPage />} />
                <Route path="datacenter" element={<DataCenterPage />} />
              </Route>
              <Route path={`${base}/ai`} element={<AIChat />} />
              <Route path={`${base}/dashboard`} element={<DashBoardPage />} />
              <Route path={`${base}/login`} element={<LoginPage />} />
              <Route path={`${base}/register`} element={<RegisterPage />} />
              <Route path={`${base}/404`} element={<PageNotFound />} />
              <Route path={`${base}/403`} element={<PageNotAuthorized />} />
              <Route path={`${base}/500`} element={<ServerError />} />
              <Route
                path="*"
                element={<Navigate to={`${base}/404`}></Navigate>}
              />
            </Routes>
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </>
  );
}
