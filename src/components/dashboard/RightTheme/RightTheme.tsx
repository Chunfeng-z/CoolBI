import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, CollapseProps, Tooltip } from "antd";
import classNames from "classnames";
import React from "react";
import CoolCollapse from "../../common/CoolCollapse";
import GlobalStyle from "./GlobalStyle";
const prefixCls = "right-theme";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "全局样式",
    children: <GlobalStyle />,
  },
  {
    key: "2",
    label: "页面布局",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "组件",
    children: <p>{text}</p>,
  },
  {
    key: "4",
    label: "通用内容样式",
    children: <p>{text}</p>,
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
            <CoolCollapse items={items} defaultActiveKey={["1"]}></CoolCollapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightTheme;
