import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import StarrySky from "@comp/common/StarrySky";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  FormProps,
  message,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import RegisterBg from "@/assets/background/register.png";
import "./index.scss";
const base = import.meta.env.VITE_BASE;
const { Title, Paragraph } = Typography;
const prefixCls = "register-page";

type RegisterFieldType = {
  username: string;
  account: string;
  password: string;
  confirmPassword: string;
};
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleFinish: FormProps<RegisterFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    // 处理注册逻辑
  };
  /** 数据校验失败，给出提示 */
  const handleFinishFailed: FormProps<RegisterFieldType>["onFinishFailed"] = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _errorInfo
  ) => {
    messageApi.error("请检查输入是否正确");
  };

  /** 注册成功跳转到登陆界面 */
  const handleLoginBtnClick = () => {
    messageApi.success("正在跳转到登录界面");
    setTimeout(() => {
      navigate(`${base}/login`);
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      {/* 气泡背景 */}
      <StarrySky />
      <Row
        className={`${prefixCls}-wrapper`}
        align={"middle"}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Col
          md={12}
          sm={0}
          xs={0}
          className={`${prefixCls}-left`}
          style={{ height: "100%" }}
        >
          <div className={`${prefixCls}-left-content`}>
            <img
              src={RegisterBg}
              alt="register background"
              className="bg-image"
            />
            <div className="content-text">
              <div className="header-text">
                <Title level={2}>欢迎使用 CoolBI</Title>
                <p>智能数据分析平台，让您的决策更明智</p>
              </div>
              <div className="tail-text">
                <p>数据可视化</p>
                <p>数据分析</p>
                <p>数据挖掘</p>
              </div>
            </div>
          </div>
        </Col>
        <Col
          md={12}
          sm={24}
          xs={24}
          className={`${prefixCls}-right`}
          style={{ height: "100%" }}
        >
          <div className={`${prefixCls}-right-content`}>
            <div className={`${prefixCls}-form-header`}>
              <Title level={3} style={{ textAlign: "center" }}>
                创建账号
              </Title>
            </div>
            <div className={`${prefixCls}-form-container`}>
              <Form
                name="register"
                variant="filled"
                layout="vertical"
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                scrollToFirstError
                size="large"
              >
                <Form.Item
                  name="username"
                  hasFeedback
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名!",
                    },
                    {
                      min: 2,
                      message: "用户名长度不能少于2位!",
                    },
                    {
                      max: 16,
                      message: "用户名长度不能超过16位!",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                  name="account"
                  hasFeedback
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: "请输入账号!",
                    },
                    {
                      min: 6,
                      message: "账号长度不能少于6位!",
                    },
                    {
                      max: 16,
                      message: "账号长度不能超过16位!",
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                  name="password"
                  hasFeedback
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: "请输入密码!",
                    },
                    {
                      min: 6,
                      message: "密码长度不能少于6位!",
                    },
                    {
                      max: 16,
                      message: "密码长度不能超过16位!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请输入密码"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  hasFeedback
                  validateTrigger="onBlur"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "请确认密码!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("两次输入的密码不一致!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请确认密码"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    立即注册
                  </Button>
                </Form.Item>
              </Form>
              <Paragraph style={{ textAlign: "center" }}>
                已有账号?{" "}
                <Button type="link" size="small" onClick={handleLoginBtnClick}>
                  立即登录
                </Button>
              </Paragraph>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RegisterPage;
