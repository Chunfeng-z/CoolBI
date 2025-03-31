import { MehOutlined } from "@ant-design/icons";
import React from "react";
import "./index.scss";
const prefixCls = "cool-bi-empty-tooltip";
const EmptyTooltip: React.FC = () => {
  return (
    <div className={prefixCls}>
      <div className="cool-bi-empty-icon">
        <MehOutlined style={{ fontSize: 24, color: "#1990FF" }} />
      </div>
      <div className="cool-bi-empty-text">
        <span>cool bi当前不支持此功能,</span>
        <span>请继续探索其他功能吧!</span>
      </div>
    </div>
  );
};

export default EmptyTooltip;
