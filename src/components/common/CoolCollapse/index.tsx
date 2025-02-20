import { Collapse } from "antd";
import { CollapsibleType } from "antd/es/collapse/CollapsePanel";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ItemType } from "rc-collapse/es/interface";
import React from "react";
const prefixCls = "cool-collapse";
interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
}
interface CoolCollapseProps {
  /** 当前激活 tab 面板的 key */
  activeKey?: Array<string | number> | string | number;
  /** 初始化选中面板的 key */
  defaultActiveKey?: Array<string | number> | string | number;
  /** 折叠面板大小-默认小尺寸 */
  size?: SizeType;
  /** 手风琴模式 */
  accordion?: boolean;
  /** 折叠项目内容 */
  items?: ItemType[];
  /** 自定义切换图标 */
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  /** css样式 */
  style?: React.CSSProperties;
}
/** Cool BI 风格的折叠面板 */
const CoolCollapse: React.FC<CoolCollapseProps> = (props) => {
  const {
    activeKey,
    defaultActiveKey,
    size = "small",
    accordion,
    items,
    expandIcon,
    style,
  } = props;
  const defaultStyle: React.CSSProperties = {
    borderRadius: 0,
    backgroundColor: "transparent",
  };
  const mergedStyle = { ...defaultStyle, ...style };
  return (
    <div className={`${prefixCls}-container`}>
      <Collapse
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        size={size}
        bordered={false}
        expandIcon={expandIcon}
        accordion={accordion}
        items={items}
        style={{ ...mergedStyle }}
      ></Collapse>
    </div>
  );
};

export default CoolCollapse;
