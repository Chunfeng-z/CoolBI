import { ConfigProvider } from "antd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageNotFound from "./pages/Error/PageNotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotAuthorized from "./pages/Error/PageNotAuthorized";
import ServerError from "./pages/Error/ServerError";
import DashBoardPage from "./pages/DashBoard/DashBoardPage";
import AIChat from "./pages/AIChat/AIChat";

const base = import.meta.env.VITE_BASE;
export default function App() {
  return (
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
      <BrowserRouter>
        <Routes>
          <Route
            path={`${base}/`}
            element={<Navigate to={`${base}/home`}></Navigate>}
          />
          <Route path={`${base}/home`} element={<Home />} />
          <Route path={`${base}/ai`} element={<AIChat />} />
          <Route path={`${base}/dashboard`} element={<DashBoardPage />} />
          <Route path={`${base}/login`} element={<Login />} />
          <Route path={`${base}/register`} element={<Register />} />
          <Route path={`${base}/404`} element={<PageNotFound />} />
          <Route path={`${base}/403`} element={<PageNotAuthorized />} />
          <Route path={`${base}/500`} element={<ServerError />} />
          <Route path="*" element={<Navigate to={`${base}/404`}></Navigate>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
