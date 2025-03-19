import {
  LogoutOutlined,
  AppstoreAddOutlined,
  CloudServerOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import logo from "@/assets/icons/logo-dark.svg";
import WorkBenchPage from "./WorkBench/workBenchPage.tsx";
const { Header, Content } = Layout;

/** 主页菜单项 */
const headerMenuItems = [
  {
    key: "workbench",
    label: "工作台",
    icon: <AppstoreAddOutlined />,
  },
  {
    key: "datacenter",
    label: "数据中心",
    icon: <CloudServerOutlined />,
  },
];

/** 主页内容 */
const Home: React.FC = () => {
  /** 当前选中的菜单项 */
  const [selectedMenuKey, setSelectedMenuKey] = useState("workbench");
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "self-start",
        }}
      >
        <Button
          type="link"
          style={{
            height: "fit-content",
            fontSize: "1.2rem",
            color: "black",
            padding: 0,
            fontWeight: "500",
          }}
          icon={<img src={logo} alt="Cool BI logo" width={32} />}
        >
          Cool BI
        </Button>
        <Menu
          className="center-menu"
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]}
          onSelect={({ key }) => setSelectedMenuKey(key)}
          defaultSelectedKeys={["workbench"]}
          items={headerMenuItems.map((item) => ({
            ...item,
            style: {
              color: "black",
              fontWeight: item.key === selectedMenuKey ? "bold" : "normal",
            },
          }))}
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <div className="right-menu">
          <Space size="middle">
            <Button type="text" size="small" icon={<SettingOutlined />} />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                  },
                ],
              }}
            >
              <div
                className="avatar-wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <Avatar
                  size={28}
                  icon={<UserOutlined />}
                  src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                />
                <span>User</span>
              </div>
            </Dropdown>
          </Space>
        </div>
      </Header>
      <Content
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <WorkBenchPage />
      </Content>
    </Layout>
  );
};

export default Home;
