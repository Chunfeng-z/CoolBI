import React from 'react'
import { ConfigProvider } from 'antd'
import PageNotAuthorized from './pages/Error/PageNotAuthorized'

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <div>App</div>
      <PageNotAuthorized />
    </ConfigProvider >
  )
}
