import React from "react";
import { ConfigProvider } from "antd";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";
import PageNotFound from "./pages/Error/PageNotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const base = import.meta.env.VITE_BASE;
export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
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
          <Route path={`${base}/login`} element={<Login />} />
          <Route path={`${base}/register`} element={<Register />} />
          <Route path={`${base}/404`} element={<PageNotFound />} />
          <Route path="*" element={<Navigate to={`${base}/404`}></Navigate>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
