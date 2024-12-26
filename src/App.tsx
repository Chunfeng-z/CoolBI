import React from 'react'
import { ConfigProvider } from 'antd'

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
    </ConfigProvider >
  )
}
