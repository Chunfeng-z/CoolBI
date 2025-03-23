import { UserOutlined, LockOutlined, MobileOutlined } from "@ant-design/icons";
import { Card, Row, Tabs, Form, Input, Button, Col, App } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import logo from "@/assets/icons/logo-dark.svg";
import StarrySky from "@/components/common/StarrySky";
const base = import.meta.env.VITE_BASE;
const prefixCls = "login-page";

type LoginMethodType = "account" | "mobile";

type LoginFieldType = {
  account: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message } = App.useApp();
  /** 登陆方式 */
  const [loginMethod, setLoginMethod] = useState<LoginMethodType>("account");
  /** 展示忘记密码内容 */
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  /** 验证码的倒计时 */
  const [countdown, setCountdown] = useState(0);
  /** 忘记密码验证码的倒计时 */
  const [forgotPasswordCountdown, setForgotPasswordCountdown] = useState(0);

  /** 登陆方式切换 */
  const handleLoginMethodChange = (key: string) => {
    setLoginMethod(key as LoginMethodType);
  };

  const handleLogin = (values: LoginFieldType) => {
    message.success("登录成功");
    navigate(`${base}/home`);
  };

  const handleForgotPassword = (values: any) => {
    console.log("重置密码信息:", values);
    message.success("密码重置邮件已发送");
    setIsShowForgotPassword(false);
  };

  /** 没有账号跳转到注册界面 */
  const handleRegister = () => {
    navigate(`${base}/register`);
  };

  /** 发送请求获取手机登录验证码 */
  const handleSendCode = () => {
    form
      .validateFields(["mobile"])
      .then(() => {
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** 发送请求获取忘记密码验证码 */
  const handleSendForgotPasswordCode = () => {
    form
      .validateFields(["mobile"])
      .then(() => {
        setForgotPasswordCountdown(60);
        const timer = setInterval(() => {
          setForgotPasswordCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={`${prefixCls}-wrapper`}>
        {/* 气泡背景 */}
        <StarrySky />
        <div className="cool-bi-login-container">
          <Card
            variant="borderless"
            style={{
              width: "450px",
              height: "550px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="cool-bi-login-header">
              <Row justify="center" align="middle">
                <img src={logo} alt="logo" className="cool-bi-logo" />
                <h3>Cool BI</h3>
              </Row>
              <Row justify={"center"}>
                <span>Cool BI 是由 Chunfeng-z 开发的 BI 系统</span>
              </Row>
            </div>
            <div className="cool-bi-login-content">
              {isShowForgotPassword ? (
                <div className="forgot-password-form">
                  <div className="forgot-password-form-title">找回密码</div>
                  <Form
                    form={form}
                    size="large"
                    variant="filled"
                    onFinish={handleForgotPassword}
                  >
                    <Form.Item
                      name="mobile"
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
                      <Input
                        prefix={<MobileOutlined />}
                        placeholder="请输入手机号码"
                      />
                    </Form.Item>
                    <Form.Item
                      name="captcha"
                      hasFeedback
                      validateTrigger="onBlur"
                      rules={[{ required: true, message: "请输入验证码" }]}
                    >
                      <Input
                        placeholder="请输入6位验证码"
                        addonAfter={
                          <Button
                            style={{ width: 120 }}
                            type="link"
                            size="small"
                            disabled={forgotPasswordCountdown > 0}
                            onClick={handleSendForgotPasswordCode}
                          >
                            {forgotPasswordCountdown > 0
                              ? `${forgotPasswordCountdown}s后重新获取`
                              : "获取验证码"}
                          </Button>
                        }
                      />
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
                        placeholder="请输入新密码"
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
                              new Error("两次输入的密码不匹配!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="请再次输入新密码"
                      />
                    </Form.Item>
                    <Form.Item className="forgot-password-actions">
                      <Row justify="space-between" align="middle" gutter={16}>
                        <Col span={12}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="confirm-btn"
                            size="middle"
                            block
                          >
                            确认修改
                          </Button>
                        </Col>
                        <Col span={12}>
                          <Button
                            type="default"
                            size="middle"
                            className="back-login-btn"
                            onClick={() => setIsShowForgotPassword(false)}
                            block
                          >
                            返回登录
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <>
                  <Tabs
                    activeKey={loginMethod}
                    onChange={handleLoginMethodChange}
                    centered
                    items={[
                      {
                        key: "account",
                        label: "密码登录",
                        children: (
                          <Form
                            form={form}
                            variant="filled"
                            size="large"
                            onFinish={handleLogin}
                          >
                            <Form.Item
                              name="account"
                              hasFeedback
                              validateTrigger="onBlur"
                              rules={[
                                {
                                  required: true,
                                  message: "请输入账号",
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
                              <Input
                                prefix={<UserOutlined />}
                                placeholder="请输入账号"
                              />
                            </Form.Item>
                            <Form.Item
                              name="password"
                              hasFeedback
                              validateTrigger="onBlur"
                              rules={[
                                { required: true, message: "请输入密码" },
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
                            <Form.Item>
                              <Button type="primary" htmlType="submit" block>
                                登录
                              </Button>
                            </Form.Item>
                          </Form>
                        ),
                      },
                      {
                        key: "mobile",
                        label: "手机号登录",
                        children: (
                          <Form
                            form={form}
                            variant="filled"
                            size="large"
                            onFinish={handleLogin}
                          >
                            <Form.Item
                              name="mobile"
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
                              <Input
                                prefix={<MobileOutlined />}
                                placeholder="手机号"
                              />
                            </Form.Item>
                            <Form.Item
                              name="captcha"
                              hasFeedback
                              validateTrigger="onBlur"
                              rules={[
                                { required: true, message: "请输入验证码" },
                              ]}
                            >
                              <Input
                                placeholder="验证码"
                                addonAfter={
                                  <Button
                                    style={{ width: 120 }}
                                    type="link"
                                    size="small"
                                    disabled={countdown > 0}
                                    onClick={handleSendCode}
                                  >
                                    {countdown > 0
                                      ? `${countdown}s后重新获取`
                                      : "获取验证码"}
                                  </Button>
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" htmlType="submit" block>
                                登录
                              </Button>
                            </Form.Item>
                          </Form>
                        ),
                      },
                    ]}
                  />
                  <Row
                    className="login-content-footer"
                    justify={"space-between"}
                  >
                    <div className="cool-bi-forget-password">
                      <Button
                        type="link"
                        size="small"
                        onClick={() => setIsShowForgotPassword(true)}
                      >
                        忘记密码
                      </Button>
                    </div>
                    <div>
                      <span>没有账号？</span>
                      <Button type="link" onClick={handleRegister} size="small">
                        立即注册
                      </Button>
                    </div>
                  </Row>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
