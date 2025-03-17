import React, { CSSProperties } from "react";
import "./index.scss";
import CoolCollapse from "@comp/common/CoolCollapse";
import { CollapseProps } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const prefixCls = "right-theme-component-style";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "标题样式",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "背景样式",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "空数据样式",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
/** 组件样式设置 */
const ComponentStyle: React.FC = () => {
  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: "#F7F7F7",
    borderRadius: 5,
  };
  return (
    <div className={`${prefixCls}-container`}>
      <CoolCollapse
        defaultActiveKey={["1", "2", "3"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems(panelStyle)}
        style={{ fontSize: 13 }}
      />
    </div>
  );
};

export default ComponentStyle;
