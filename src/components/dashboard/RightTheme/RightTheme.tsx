import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, CollapseProps, Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import CoolCollapse from "../../common/CoolCollapse";
import GlobalStyle from "./GlobalStyle";
import PageLayout from "./PageLayout";
import DashboardBackground from "./DashboardBackground";
import ComponentStyle from "./ComponentStyle";
const prefixCls = "right-theme";
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "全局样式",
    children: <GlobalStyle />,
  },
  {
    key: "2",
    label: "页面布局",
    children: <PageLayout />,
  },
  {
    key: "3",
    label: "仪表板背景",
    children: <DashboardBackground />,
  },
  {
    key: "4",
    label: "组件",
    children: <ComponentStyle />,
  },
];
const RightTheme: React.FC = () => {
  /** 折叠面板提示内容 */
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  return (
    <div
      className={classNames(`${prefixCls}-container`, {
        "is-collapsed": isCollapsed,
      })}
    >
      <div
        className={classNames(`${prefixCls}-collapse-header`, {
          "is-collapsed": isCollapsed,
        })}
      >
        <Tooltip title={isCollapsed ? "展开" : "收起"}>
          <Button
            type="text"
            size="small"
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          />
        </Tooltip>
        <div className={`${prefixCls}-title`}>主题</div>
      </div>
      {!isCollapsed && (
        <div className={`${prefixCls}-collapse-body`}>
          <div className={`${prefixCls}-collapse-content`}>
            <CoolCollapse
              items={items}
              defaultActiveKey={["1", "2", "3"]}
            ></CoolCollapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightTheme;
