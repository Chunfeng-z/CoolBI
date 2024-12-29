import React from 'react'
import { ConfigProvider } from 'antd'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const base = import.meta.env.VITE_BASE
export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={`${base}/login`} element={<Login />} />
          <Route path={`${base}/register`} element={<Register />} />
          <Route path={`${base}/`} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider >
  )
}
