import { ConfigProvider, App as AntApp } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AIChat from "./pages/AIChat/AIChat";
import DashBoardPage from "./pages/DashBoard/DashBoardPage";
import DataCenterPage from "./pages/DataCenter/DataCenterPage";
import PageNotAuthorized from "./pages/Error/PageNotAuthorized";
import PageNotFound from "./pages/Error/PageNotFound";
import ServerError from "./pages/Error/ServerError";
import Home from "./pages/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import WorkBenchPage from "./pages/WorkBench/workBenchPage";

const base = import.meta.env.VITE_BASE;

export default function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
          },
          components: {
            Layout: {
              headerBg: "#FFFFFF",
              headerPadding: "0 20px",
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
