import { HolderOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import "./index.scss";

const prefixCls = "dashboard-chart-card";

interface ChartCardProps {
  /** 卡片的垂直间距 */
  marginBottom?: number;
  /** 卡片标题-图表的标题 */
  cardTitle?: string;
  /** 卡片的背景颜色 */
  bgColor?: string;
  /** 是否选中状态 */
  isSelected?: boolean;
  /** 外部传入的内容 */
  children?: React.ReactNode;
  /** 被点击的时候需要展开右侧的配置栏目 */
  onClick?: () => void;
}
/** 仪表板设计-图表卡片 */
const ChartCard: React.FC<ChartCardProps> = (props) => {
  const {
    marginBottom = 10,
    cardTitle,
    bgColor = "#2F2E31",
    isSelected,
    children,
    onClick,
  } = props;

  return (
    <div
      className={`${prefixCls}-container ${
        isSelected ? `${prefixCls}-selected` : ""
      }`}
      style={{ backgroundColor: "#E9E7E0" }}
      onClick={onClick}
    >
      <div
        className={`${prefixCls}-content`}
        style={{
          marginBottom: `${marginBottom}px`,
          padding: 10,
          backgroundColor: bgColor,
          border: isSelected ? "2px solid #1890ff" : "none",
        }}
      >
        <div className="chart-card-header">
          <div className="chart-card-header-title">
            <Tooltip title={cardTitle}>{cardTitle}</Tooltip>
          </div>
          <div className="chart-card-header-tail">
            <HolderOutlined />
          </div>
        </div>
        <div className={`${prefixCls}-chart`}>{children}</div>
      </div>
    </div>
  );
};

export default ChartCard;
