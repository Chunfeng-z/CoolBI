import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import { Button, ConfigProvider, Divider, Dropdown, Input, theme } from "antd";
import React, { useState } from "react";
import defaultProps from "./_defaultProps";
import logo from "@/assets/images/logo-dark.svg";
import WorkBenchPage from "./WorkBench/workBenchPage.tsx";

const SearchInput: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          backgroundColor: token.colorBgTextHover,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="搜索方案"
        variant="borderless"
      />
    </div>
  );
};

const Home = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: "mix",
    splitMenus: true,
  });

  const [pathname, setPathname] = useState("/welcome");
  const [showWorkbench, setShowWorkbench] = useState(true);
  if (typeof document === "undefined") {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("test-pro-layout") || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            {...defaultProps}
            location={{
              pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
              },
            }}
            siderMenuType="group"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              size: "small",
              title: "Cool",
              render: (props, avatarNode) => {
                return (
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
                    {avatarNode}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === "undefined") return [];
              return [
                props.layout !== "side" && document.body.clientWidth > 1400 ? (
                  <SearchInput />
                ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                <GithubFilled key="GithubFilled" />,
              ];
            }}
            headerTitleRender={(oldLogo, oldTitle, _) => {
              const defaultDom = (
                <a>
                  <img src={logo} alt="Cool BI logo"></img>
                  <h1 style={{ color: "black" }}>Cool BI</h1>
                </a>
              );
              if (typeof window === "undefined") return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                  <Divider
                    style={{
                      height: "1.5em",
                    }}
                    type="vertical"
                  />
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: "center",
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2025 Made with love</div>
                  <div>by Chunfeng-z</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  setPathname(item.path || "/welcome");
                }}
              >
                {dom}
              </div>
            )}
            {...settings}
          >
            {showWorkbench ? (
              <WorkBenchPage />
            ) : (
              <>
                <PageContainer
                  extra={[
                    <Button key="2">操作</Button>,
                    <Button key="1" type="primary">
                      主操作
                    </Button>,
                  ]}
                  subTitle="简单的描述"
                  footer={[
                    <Button key="3">重置</Button>,
                    <Button key="2" type="primary">
                      提交
                    </Button>,
                  ]}
                >
                  <ProCard
                    style={{
                      height: "200vh",
                      minHeight: 800,
                    }}
                  >
                    <div />
                  </ProCard>
                </PageContainer>
                <SettingDrawer
                  pathname={pathname}
                  enableDarkTheme
                  getContainer={(e: any) => {
                    if (typeof window === "undefined") return e;
                    return document.getElementById("test-pro-layout");
                  }}
                  settings={settings}
                  onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                  }}
                  disableUrlParams={false}
                />
              </>
            )}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default Home;
