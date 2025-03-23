import {
  LogoutOutlined,
  AppstoreAddOutlined,
  CloudServerOutlined,
  SettingOutlined,
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  ApiOutlined,
  SunFilled,
  MoonFilled,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  Form,
  Input,
  message,
  Row,
  Col,
  Image,
  Tooltip,
  theme,
} from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";

import logo from "@/assets/icons/logo-dark.svg";
import { useThemeStore } from "@/stores/useThemeStore";

const prefixCls = "home-page";
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

type AccountMenuType = "account_info" | "account_bind";
/** 账号管理菜单项 */
const accountMenuItems: {
  key: AccountMenuType;
  icon: JSX.Element;
  label: string;
}[] = [
  { key: "account_info", icon: <FileTextOutlined />, label: "账号信息" },
  { key: "account_bind", icon: <ApiOutlined />, label: "账号绑定" },
];

/** 主页内容 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  /** 系统颜色主题 */
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  /** 系统主题切换 */
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
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
  /** 账号管理与配置抽屉 */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  /** 当前选中的账号管理与配置的菜单项 */
  const [selectedAccountMenuKey, setSelectedAccountMenuKey] =
    useState<AccountMenuType>("account_info");
  /** 处理账号管理菜单的点击事件 */
  const handleAccountMenuSelect = ({ key }: { key: string }) => {
    setSelectedAccountMenuKey(key as AccountMenuType);
  };
  /** 账号绑定-修改和绑定手机号 */
  const [isPhoneVerifyShow, setIsPhoneVerifyShow] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(0);
  const [form] = Form.useForm();

  // 模拟用户信息 - 实际项目中应该从API获取
  const [userInfo, setUserInfo] = useState<{
    username: string;
    account: string;
    phone: string;
    avatar: string;
  }>({
    username: "张三",
    account: "zhangsan@example.com",
    phone: "138****1234",
    avatar:
      "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
  });

  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState<"username" | "phone" | null>(null);
  const [phoneVerifyVisible, setPhoneVerifyVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [uploadVisible, setUploadVisible] = useState(false);

  // 处理开始编辑
  const handleStartEdit = (field: "username" | "phone") => {
    setIsEditing(true);
    setEditField(field);
    setPhoneVerifyVisible(field === "phone");
    editForm.setFieldsValue({
      [field]: userInfo[field],
    });
  };

  // 处理取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditField(null);
    setPhoneVerifyVisible(false);
    editForm.resetFields();
  };

  // 处理确认编辑
  const handleConfirmEdit = async () => {
    try {
      const values = await editForm.validateFields();
      console.log("编辑信息:", values, editField);

      if (editField) {
        // 模拟API调用
        setUserInfo({
          ...userInfo,
          [editField]: values[editField],
        });
        message.success(
          `${editField === "username" ? "用户名" : "手机号"}修改成功`
        );
      }

      setIsEditing(false);
      setEditField(null);
      setPhoneVerifyVisible(false);
    } catch (error) {
      console.error("表单验证失败:", error);
    }
  };

  // 处理头像上传
  const handleAvatarChange = () => {
    setUploadVisible(true);
    // 这里应该打开文件上传组件
    setTimeout(() => {
      // 模拟上传成功
      setUploadVisible(false);
      message.success("头像更新成功");
    }, 2000);
  };

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  // 处理发送验证码
  const handleSendCode = () => {
    const phone = userInfo.phone;
    if (!phone) {
      message.error("未绑定手机号");
      return;
    }

    // 模拟发送验证码API调用
    message.success(`验证码已发送至 ${phone}`);
    setCountdown(60);

    // 倒计时
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  /** 主题配置的抽屉展开状态 */
  const [isThemeConfigDrawerOpen, setIsThemeConfigDrawerOpen] =
    useState<boolean>(false);

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${token.colorBorder}`,
            padding: "0 20px",
          }}
        >
          <Button
            type="link"
            style={{
              height: "fit-content",
              fontSize: "1.2rem",
              color: `${token.colorTextHeading}`,
              padding: 0,
              fontWeight: "500",
            }}
            icon={<img src={logo} alt="Cool BI logo" width={32} />}
          >
            Cool BI
          </Button>
          <Menu
            className="center-menu"
            mode="horizontal"
            selectedKeys={[selectedMenuKey]}
            onSelect={handleMenuSelect}
            defaultSelectedKeys={["workbench"]}
            items={headerMenuItems.map((item) => ({
              ...item,
              style: {
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
              <Tooltip
                title={isDarkMode ? "点击切换为亮色模式" : "点击切换为暗色模式"}
                placement="bottom"
              >
                <Button
                  type="text"
                  size="middle"
                  shape="circle"
                  onClick={toggleTheme}
                  icon={isDarkMode ? <MoonFilled /> : <SunFilled />}
                />
              </Tooltip>
              <Tooltip title="主题配置" placement="bottom">
                <Button
                  type="text"
                  size="middle"
                  shape="circle"
                  icon={<SettingOutlined />}
                  onClick={() => setIsThemeConfigDrawerOpen(true)}
                />
              </Tooltip>
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      key: "account",
                      label: "账号管理",
                      icon: <UserOutlined />,
                      onClick: showDrawer,
                    },
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
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        title="主题配置"
        open={isThemeConfigDrawerOpen}
        onClose={() => setIsThemeConfigDrawerOpen(false)}
        className={`${prefixCls}-theme-config-drawer`}
      >
        <div className="theme-config-drawer-wrapper">
          <Row>
            <Col span={24}>
              <span>外观配置</span>
            </Col>
          </Row>
        </div>
      </Drawer>
      <Drawer
        title="账号管理与设置"
        onClose={() => {
          onClose();
          setIsEditing(false);
          form.resetFields();
          editForm.resetFields();
        }}
        open={isDrawerOpen}
        width={600}
        className={`${prefixCls}-drawer`}
      >
        <div className="account-manage-setting-wrapper">
          <Menu
            className="account-menu"
            mode="vertical"
            theme="light"
            selectedKeys={[selectedAccountMenuKey]}
            defaultSelectedKeys={["account_info"]}
            style={{ width: 180, height: "100%" }}
            items={accountMenuItems}
            onSelect={handleAccountMenuSelect}
          />
          <div className="account-content">
            {selectedAccountMenuKey === "account_info" && (
              <div>
                <h4>账号信息</h4>
                {isEditing ? (
                  <Form form={editForm} layout="vertical">
                    {editField === "username" && (
                      <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: "请输入用户名" }]}
                      >
                        <Input placeholder="请输入用户名" />
                      </Form.Item>
                    )}

                    {editField === "phone" && (
                      <>
                        <Form.Item
                          name="phone"
                          label="手机号"
                          rules={[
                            { required: true, message: "请输入手机号" },
                            {
                              pattern: /^1[3-9]\d{9}$/,
                              message: "请输入正确的手机号",
                            },
                          ]}
                        >
                          <Input placeholder="请输入手机号" />
                        </Form.Item>

                        {phoneVerifyVisible && (
                          <Form.Item
                            name="verifyCode"
                            label="验证码"
                            rules={[
                              { required: true, message: "请输入验证码" },
                            ]}
                          >
                            <div style={{ display: "flex" }}>
                              <Input
                                style={{ flex: 1 }}
                                placeholder="请输入验证码"
                              />
                              <Button
                                style={{ marginLeft: 8 }}
                                disabled={countdown > 0}
                                onClick={handleSendCode}
                              >
                                {countdown > 0
                                  ? `${countdown}秒后重发`
                                  : "获取验证码"}
                              </Button>
                            </div>
                          </Form.Item>
                        )}
                      </>
                    )}

                    <Form.Item style={{ marginTop: 24 }}>
                      <Space>
                        <Button onClick={handleCancelEdit}>取消</Button>
                        <Button type="primary" onClick={handleConfirmEdit}>
                          确认
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                ) : (
                  <>
                    <Row className="account-info-row">
                      <Col span={24} className="account-info-label">
                        <span>头像</span>
                      </Col>
                      <Col className="account-info-content">
                        <Image
                          width={100}
                          height={100}
                          src={userInfo.avatar}
                          style={{ borderRadius: 10 }}
                        />
                        <Button
                          type="link"
                          onClick={handleAvatarChange}
                          loading={uploadVisible}
                        >
                          更换头像
                        </Button>
                      </Col>
                    </Row>
                    <Row className="account-info-row">
                      <Col span={24} className="account-info-label">
                        <span>用户名</span>
                      </Col>
                      <Col className="account-info-content">
                        <span>{userInfo.username}</span>
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleStartEdit("username")}
                        >
                          编辑
                        </Button>
                      </Col>
                    </Row>
                    <Row className="account-info-row">
                      <Col span={24} className="account-info-label">
                        <span>账号</span>
                      </Col>
                      <Col className="account-info-content">
                        <span>{userInfo.account}</span>
                      </Col>
                    </Row>
                    <Row className="account-info-row">
                      <Col span={24} className="account-info-label">
                        <span>手机号</span>
                      </Col>
                      <Col className="account-info-content">
                        <span>{userInfo.phone}</span>
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleStartEdit("phone")}
                        >
                          编辑
                        </Button>
                      </Col>
                    </Row>
                    <Space>
                      <Button
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        取消编辑
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          message.success("已保存所有更改");
                        }}
                      >
                        保存修改
                      </Button>
                    </Space>
                  </>
                )}
              </div>
            )}
            {selectedAccountMenuKey === "account_bind" && (
              <div className="account-bind-wrapper">
                <h4>手机号绑定</h4>
                {!isPhoneVerifyShow ? (
                  <Row align="middle">
                    <span className="account-bind-label">
                      {userInfo.phone ? "已绑定" : "未绑定"}
                    </span>
                    <span>{userInfo.phone}</span>
                    <div className="account-bind-btn-wrapper">
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                          setIsPhoneVerifyShow(true);
                        }}
                      >
                        {userInfo.phone ? "修改" : "绑定手机号"}
                      </Button>
                    </div>
                  </Row>
                ) : (
                  <div className="phone-verify-wrapper">
                    <Form
                      name="phone-verify-form"
                      colon={false}
                      labelAlign="left"
                      size="middle"
                      variant="filled"
                    >
                      <Form.Item
                        label="手机号"
                        name="phone"
                        hasFeedback
                        validateTrigger="onBlur"
                        rules={[
                          { required: true, message: "请输入手机号" },
                          {
                            pattern: /^1\d{10}$/,
                            message: "手机号格式不正确",
                          },
                        ]}
                      >
                        <Space.Compact style={{ alignItems: "center" }}>
                          <Input
                            style={{ width: 200 }}
                            placeholder="请输入手机号"
                          />
                          <Button
                            onClick={handleSendCode}
                            type="link"
                            size="small"
                          >
                            发送验证码
                          </Button>
                        </Space.Compact>
                      </Form.Item>

                      <Form.Item
                        label="验证码"
                        name="verifyCode"
                        hasFeedback
                        validateTrigger="onBlur"
                        rules={[{ required: true, message: "请输入验证码" }]}
                      >
                        <Input
                          style={{ width: 200 }}
                          placeholder="请输入验证码"
                        />
                      </Form.Item>

                      <Form.Item name="phone-verify-actions">
                        <Button
                          style={{
                            marginLeft: 70,
                            marginRight: 10,
                            width: 80,
                          }}
                          type="default"
                          onClick={() => setIsPhoneVerifyShow(false)}
                        >
                          取消
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ width: 80 }}
                        >
                          确认
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Home;
