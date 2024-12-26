import React from 'react'
import { ConfigProvider } from 'antd'
import Login from './pages/Login'
export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Login />
    </ConfigProvider >
  )
}
