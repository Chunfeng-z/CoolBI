import {
  DeleteOutlined,
  FullscreenOutlined,
  HolderOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Dropdown,
  Flex,
  MenuProps,
  theme,
  Tooltip,
} from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";

import EllipsisText from "@/components/common/EllipsisText/index";

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
  /** 标题是否加粗 */
  isTitleBold?: boolean;
  /** 标题是否斜体 */
  isTitleItalic?: boolean;
  /** 标题对齐方式 */
  titleAlign?: "left" | "center";
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
  /** 卡片圆角 */
  borderRadius?: number;
  /** 是否展示组件自定义背景填充 */
  isShowBackgroundColor?: boolean;
  /** 组件背景颜色 */
  backgroundColor?: string;
  /** 组件的内边距 */
  chartCardPadding?: number[];
  /** 是否选中状态 */
  isSelected?: boolean;
  /** 外部传入的内容 */
  children?: React.ReactNode;
  /** 开片组件的样式 */
  style?: React.CSSProperties;
  /** 被点击的时候需要展开右侧的配置栏目 */
  onClick?: () => void;
  /** 点击图表菜单的删除选项 */
  onDelete?: () => void;
  /** 组件全屏展示选项 */
  onFullScreen?: () => void;
}
/** 仪表板设计-图表卡片 */
const ChartCard: React.FC<ChartCardProps> = React.memo((props) => {
  const {
    isShowCardTitle = true,
    cardTitle = "这是图表卡片标题",
    titleFontSize = 14,
    titleColor = "#1677ff",
    isTitleBold = true,
    isTitleItalic = false,
    titleAlign = "left",
    isShowRemark = false,
    remark = "",
    remarkPosition = "afterTitle",
    isShowEndNote = false,
    endNote = "",
    borderRadius = 4,
    isSelected = false,
    isShowBackgroundColor = false,
    chartCardPadding = [2, 2, 2, 2],
    backgroundColor = "#e3e3e3",
    children,
    style,
    onClick,
    onDelete,
    onFullScreen,
  } = props;
  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: (
          <Flex style={{ width: 70 }} align="center" justify="space-between">
            <span>删除</span>
            <DeleteOutlined />
          </Flex>
        ),
        onClick: () => {
          if (onDelete) {
            onDelete();
          }
        },
      },
      {
        key: "2",
        label: (
          <Flex style={{ width: 70 }} align="center" justify="space-between">
            <span>全屏</span>
            <FullscreenOutlined />
          </Flex>
        ),
        onClick: () => {
          if (onFullScreen) {
            onFullScreen();
          }
        },
      },
    ],
    []
  );

  return (
    <div
      className={`${prefixCls}-wrapper`}
      style={{
        padding: `${chartCardPadding[0]}px ${chartCardPadding[3]}px ${chartCardPadding[2]}px ${chartCardPadding[1]}px`,
        backgroundColor: isShowBackgroundColor ? backgroundColor : "#fff",
        border: isSelected ? "2px solid #1890ff" : "2px solid transparent",
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      onClick={(e) => {
        // 阻止事件冒泡，导致触发dashboard-page-chart-container的取消图表选中的事件
        e.stopPropagation();
        onClick?.();
      }}
    >
      <div className="chart-card-header">
        <div
          className={classNames("chart-card-header-title", {
            "text-align-center": titleAlign === "center",
          })}
        >
          <Tooltip title={cardTitle}>
            <EllipsisText
              text={cardTitle}
              style={{
                fontSize: titleFontSize,
                color: titleColor,
                display: isShowCardTitle ? "block" : "none",
                fontWeight: isTitleBold ? 600 : 300,
                // width: titleAlign === "center" ? "auto" : "150px",
                maxWidth: "200px",
                fontStyle: isTitleItalic ? "italic" : "normal",
              }}
            />
          </Tooltip>
          {isShowRemark &&
            remarkPosition === "afterTitle" &&
            titleAlign === "center" && (
              <div className="chart-card-header-middle">
                <Tooltip title={remark}>
                  <InfoCircleOutlined style={{ marginLeft: 3 }} />
                </Tooltip>
              </div>
            )}
        </div>
        {/* 不显示的站位元素支撑标题行 */}
        <span className="hidden-item">^v^</span>
        {isShowRemark &&
          remarkPosition === "afterTitle" &&
          titleAlign === "left" && (
            <div className="chart-card-header-middle">
              <Tooltip title={remark}>
                <InfoCircleOutlined
                  style={{
                    marginLeft: 3,
                  }}
                />
              </Tooltip>
            </div>
          )}

        <ConfigProvider
          theme={{
            algorithm: theme.compactAlgorithm,
            token: {
              borderRadius: 2,
            },
          }}
        >
          <Dropdown
            menu={{ items: items }}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <div className="chart-card-header-tail">
              <HolderOutlined />
            </div>
          </Dropdown>
        </ConfigProvider>
      </div>
      {isShowRemark && remarkPosition === "belowTitle" && (
        <p
          className="chart-card-remark-container"
          style={{ lineHeight: "18px", fontSize: 12 }}
        >
          {remark}
        </p>
      )}
      <div className="dashboard-chart-card-chart">{children}</div>
      {isShowEndNote && (
        <p
          className="chart-card-endnote-container"
          style={{
            lineHeight: "18px",
            fontSize: 12,
          }}
        >
          {endNote}
        </p>
      )}
    </div>
  );
});

export default ChartCard;
