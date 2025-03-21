import {
  LogoutOutlined,
  AppstoreAddOutlined,
  CloudServerOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import logo from "@/assets/icons/logo-dark.svg";
const base = import.meta.env.VITE_BASE;
const { Header, Content } = Layout;
const enum MenuItemKey {
  Workbench = "workbench",
  Datacenter = "datacenter",
}

/** 主页菜单项 */
const headerMenuItems = [
  {
    key: MenuItemKey.Workbench,
    label: "工作台",
    icon: <AppstoreAddOutlined />,
  },
  {
    key: MenuItemKey.Datacenter,
    label: "数据中心",
    icon: <CloudServerOutlined />,
  },
];

/** 主页内容 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  /** 当前选中的菜单项 */
  const [selectedMenuKey, setSelectedMenuKey] = useState<MenuItemKey>(
    MenuItemKey.Workbench
  );

  // 处理菜单项点击事件
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedMenuKey(key as MenuItemKey);
    if (key === "workbench") {
      navigate(`${base}/home/workbench`);
    } else if (key === "datacenter") {
      navigate(`${base}/home/datacenter`);
    }
  };

  // 处理退出登录事件
  const handleLogout = () => {
    // 这里可以添加退出登录的逻辑，如清除本地存储的用户信息、令牌等
    localStorage.removeItem("token"); // 假设使用token存储登录状态

    // 导航到登录页面
    navigate(`${base}/login`);
  };

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
          borderBottom: "1px solid #f0f0f0",
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
          onSelect={handleMenuSelect}
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
            <Button type="text" size="middle" icon={<SettingOutlined />} />
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                    onClick: handleLogout,
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
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Home;
