import { VChart } from "@visactor/react-vchart";
import { Avatar, Col, Row, Space } from "antd";
import React from "react";

import "./index.scss";
import { exampleData } from "./exampleData";
const prefixCls = "cool-indicator-trend-chart";
interface ICoolIndicatorTrendChartProps {
  /** 图表宽度-图与文本均分 */
  width?: number;
  /** 图表高度 */
  height?: number;
  /** 指标内容在指标块的位置 */
  indicatorContentPosition?: "left" | "center";
  /** 指标值的行间距 */
  indicatorValueLineSpace?: "normal" | "small";
  /** 指标字号配置 */
  indicatorFontConfig?: {
    name?: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
    value?: {
      color?: string;
      fontSize?: number;
      isBold?: boolean;
      isItalic?: boolean;
    };
  };
  /** 是否显示指标修饰图 */
  isShowIndicatorDecoration?: boolean;
  /** 指标修饰图地址 */
  indicatorDecorationUrl?: string;
  /** 趋势图类型 */
  trendChartType?: "line" | "bar" | "area";
  /** 指标图的x坐标轴 */
  xField?: string | string[];
  /** 指标图的y坐标轴 */
  yField?: string | string[];
  /** 指标趋势图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}
/** 指标趋势图 */
const CoolIndicatorTrendChart: React.FC<ICoolIndicatorTrendChartProps> = (
  props
) => {
  const {
    indicatorContentPosition = "left",
    indicatorValueLineSpace = "normal",
    indicatorFontConfig = {
      name: {
        color: "#000",
        fontSize: 14,
        isBold: false,
        isItalic: false,
      },
      value: {
        color: "#000",
        fontSize: 18,
        isBold: false,
        isItalic: false,
      },
    },
    isShowIndicatorDecoration = true,
    indicatorDecorationUrl = "",
    trendChartType = "area",
    xField = "time",
    yField = "value",
    data = exampleData,
  } = props;
  const spec = {
    type: trendChartType,
    data: {
      values: data,
    },
    xField: xField,
    yField: yField,
    // 配置数据点的显示
    point: {
      // 默认显示图元但设置为透明
      visible: true,
      style: {
        fill: "transparent",
        stroke: "transparent",
      },
      // 在hover时显示特定点
      state: {
        dimension_hover: {
          shape: "circle",
          style: {
            fill: "#6FA4FE",
            stroke: "#FFFFFF",
          },
        },
      },
    },
    // 禁用坐标轴
    axes: [
      {
        orient: "left",
        visible: false,
        // 消除轴线两侧的留白
        trimPadding: true,
      },
      {
        orient: "bottom",
        visible: false,
      },
    ],
    // 关闭tooltip
    tooltip: {
      visible: false,
    },
    // hover时交叉轴的样式
    crosshair: {
      xField: {
        line: {
          type: "line",
          width: 1,
          style: {
            lineDash: [3, 3],
          },
        },
        label: {
          visible: true,
          style: {
            fontSize: 10,
            textBaseline: "middle",
            maxLineWidth: 50,
          },
        },
      },
    },
    area: {
      style: {
        fill: {
          gradient: "linear",
          x0: 0.2,
          y0: 0,
          x1: 0.2,
          y1: 1,
          stops: [
            {
              offset: 0,
              opacity: 1,
            },
            {
              offset: 1,
              opacity: 0,
            },
          ],
        },
      },
    },
    // 开启平滑曲线
    line: {
      style: {
        curveType: "monotone",
      },
    },
    // 关闭入场动画
    animationAppear: false,
    // 图元切换时的动画
    animationState: {
      // 关闭crosshair与line相交时的point的动画
      duration: 0,
    },
    // 图表内边距
    padding: [0, 0, 0, 0],
  };
  return (
    <div className={prefixCls}>
      <Row style={{ height: "100%" }}>
        <Col span={12} style={{ height: "100%" }}>
          <Space
            direction="vertical"
            size={indicatorValueLineSpace === "normal" ? "middle" : "small"}
            style={{
              display: "flex",
              height: "100%",
              alignItems:
                indicatorContentPosition === "center" ? "center" : "flex-start",
            }}
          >
            <div
              className="indicator-name"
              style={{
                fontSize: indicatorFontConfig.name?.fontSize,
                color: indicatorFontConfig.name?.color,
                fontWeight: indicatorFontConfig.name?.isBold
                  ? "bold"
                  : "normal",
                fontStyle: indicatorFontConfig.name?.isItalic
                  ? "italic"
                  : "normal",
              }}
            >
              {isShowIndicatorDecoration && (
                <Avatar
                  style={{ backgroundColor: "#6FA4FE", color: "#FFFFFF" }}
                  size={(indicatorFontConfig.name?.fontSize ?? 14) * 2}
                  src={indicatorDecorationUrl}
                >
                  Data
                </Avatar>
              )}
              <span>{xField}</span>
            </div>
            <div
              className="indicator-value"
              style={{
                fontSize: indicatorFontConfig.value?.fontSize,
                color: indicatorFontConfig.value?.color,
                fontWeight: indicatorFontConfig.value?.isBold
                  ? "bold"
                  : "normal",
                fontStyle: indicatorFontConfig.value?.isItalic
                  ? "italic"
                  : "normal",
              }}
            >
              <span>2</span>
            </div>
            <div className="sub-indicator-wrapper">x</div>
          </Space>
        </Col>
        <Col span={12} style={{ height: "100%" }}>
          <div className="indicator-text-container" style={{ height: "100%" }}>
            <VChart spec={spec} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CoolIndicatorTrendChart;
