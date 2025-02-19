import { Collapse } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ItemType } from "rc-collapse/es/interface";
import React from "react";
const prefixCls = "cool-collapse";
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
}
/** Cool BI 风格的折叠面板 */
const CoolCollapse: React.FC<CoolCollapseProps> = (props) => {
  const {
    activeKey,
    defaultActiveKey,
    size = "small",
    accordion,
    items,
  } = props;
  return (
    <div className={`${prefixCls}-container`}>
      <Collapse
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        size={size}
        bordered={false}
        accordion={accordion}
        items={items}
        style={{ borderRadius: 0, backgroundColor: "transparent" }}
      ></Collapse>
    </div>
  );
};

export default CoolCollapse;
