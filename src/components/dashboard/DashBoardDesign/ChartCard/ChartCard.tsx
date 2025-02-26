import { HolderOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import "./index.scss";

const prefixCls = "dashboard-chart-card";

interface ChartCardProps {
  /** 开篇的垂直间距 */
  marginBottom?: number;
  /** 卡片标题-图表的标题 */
  cardTitle?: string;
  /** 外部传入的内容 */
  children?: React.ReactNode;
  /** 卡片的背景颜色 */
  bgColor?: string;
}
/** 仪表板设计-图表卡片 */
const ChartCard: React.FC<ChartCardProps> = (props) => {
  const { marginBottom = 10, cardTitle, children, bgColor = "#2F2E31" } = props;

  return (
    <div
      className={`${prefixCls}-container`}
      style={{ backgroundColor: "#E9E7E0" }}
    >
      <div
        className={`${prefixCls}-content`}
        style={{
          marginBottom: `${marginBottom}px`,
          padding: 10,
          backgroundColor: bgColor,
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
