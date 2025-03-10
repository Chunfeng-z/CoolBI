import { HolderOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import "./index.scss";

const prefixCls = "dashboard-chart-card";

interface ChartCardProps {
  /** 是否展示标题 */
  isShowCardTitle?: boolean;
  /** 卡片标题-图表的标题 */
  cardTitle?: string;
  /** 标题字号 */
  titleFontSize?: string | number | undefined;
  /** 标题颜色 */
  titleColor?: string;
  /** 是否展示备注 */
  isShowRemark?: boolean;
  /** 备注内容 */
  remark?: string;
  /** 备注位置 */
  remarkPosition?: "afterTitle" | "belowTitle";
  /** 是否展示尾注 */
  isShowEndNote?: boolean;
  /** 尾注内容 */
  endNote?: string;
  /** 卡片的垂直间距 */
  marginBottom?: number;
  /** 卡片的背景颜色 */
  bgColor?: string;
  /** 卡片圆角 */
  borderRadius?: number;
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
    isShowCardTitle = true,
    cardTitle = "这是图表卡片标题",
    titleFontSize = 14,
    titleColor = "#1677ff",
    isShowRemark = false,
    remark = "",
    remarkPosition = "afterTitle",
    isShowEndNote = false,
    endNote = "",
    marginBottom = 10,
    bgColor = "#2F2E31",
    borderRadius = 0,
    isSelected = false,
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
          borderRadius: `${borderRadius}px`,
        }}
      >
        <div className="chart-card-header">
          <div className="chart-card-header-title">
            {isShowCardTitle && (
              <Tooltip title={cardTitle}>
                <span style={{ fontSize: titleFontSize, color: titleColor }}>
                  {cardTitle}
                </span>
              </Tooltip>
            )}
          </div>
          {isShowRemark && remarkPosition === "afterTitle" && (
            <span className="chart-card-remark">{remark}</span>
          )}
          <div className="chart-card-header-tail">
            <HolderOutlined />
          </div>
        </div>
        {isShowRemark && remarkPosition === "belowTitle" && (
          <div className="chart-card-remark-container">
            <span className="chart-card-remark">{remark}</span>
          </div>
        )}
        <div className={`${prefixCls}-chart`}>{children}</div>
        {isShowEndNote && (
          <div className="chart-card-endnote-container">
            <span>{endNote}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
