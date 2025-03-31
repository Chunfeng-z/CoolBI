import { VChart } from "@visactor/react-vchart";
import { Space } from "antd";
import React, { useEffect, useState } from "react";

import "./index.scss";
import { exampleData } from "./exampleData";

import { addExtremeValueFlags, calculateSum } from "@/utils/hooks";
const prefixCls = "cool-indicator-trend-chart";
interface ICoolIndicatorTrendChartProps {
  /** 图表背景色配置 */
  backgroundColor?: string | object;
  /** 是否显示趋势图 */
  isShowTrendChart?: boolean;
  /** 趋势图类型 */
  trendChartType?: "line" | "bar" | "area";
  /**
   * 线条类型
   * - monotone: 曲线
   * - linear: 直线
   */
  curveType?: "linear" | "monotone";
  /**
   * 线条样式,设置为undefined变化时不会触发渲染，初始时设置为undefined不显示dashed
   */
  lineDash?: [number, number];
  /** 线的宽度 */
  lineWidth?: number;
  /** 是否显示标记点 */
  showMarkers?: boolean;
  /** 指标内容在指标块的位置 */
  indicatorContentPosition?: "left" | "center";
  /** 指标值的行间距
   * - normal: 正常采用space的small间距
   * - small: 紧凑，不设置间距
   */
  indicatorValueLineSpace?: "normal" | "small";
  /** 指标字号配置
   * - name: 指标名称的配置
   * - value: 指标值的配置
   */
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
  /** 指标图的x坐标轴 */
  xField?: string | string[];
  /** 指标图的y坐标轴 */
  yField?: string | string[];
  /** 指标趋势图数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  /** 是否显示数据标签 */
  showDataLabels?: boolean;
  /** 数据标签配置 */
  dataLabelConfig?: {
    /** 字体颜色 */
    fill?: string;
    /** 字体大小 */
    fontSize?: number;
    /** 是否加粗 */
    fontWeight?: string | number;
    /** 是否斜体 */
    fontStyle?: "italic" | "normal";
  };
  /** 是否显示最值 */
  showExtremeValue?: boolean;
  /** 指标前缀 */
  indicatorPrefix?: string;
  /** 指标后缀 */
  indicatorSuffix?: string;
}
/** 指标趋势图 */
const CoolIndicatorTrendChart: React.FC<ICoolIndicatorTrendChartProps> = (
  props
) => {
  const {
    backgroundColor,
    isShowTrendChart,
    trendChartType = "area",
    curveType = "monotone",
    lineDash = undefined,
    lineWidth = 2,
    showMarkers = false,
    indicatorContentPosition = "left",
    indicatorValueLineSpace = "small",
    indicatorFontConfig = {
      name: {
        color: "#000",
        fontSize: 14,
        isBold: false,
        isItalic: false,
      },
      value: {
        color: "#000",
        fontSize: 32,
        isBold: false,
        isItalic: false,
      },
    },
    xField = "time",
    yField = "value",
    data = exampleData,
    showDataLabels = true,
    dataLabelConfig = {
      fill: "#333",
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
    },
    showExtremeValue = false,
    indicatorPrefix = "",
    indicatorSuffix = "",
  } = props;

  /** 当前数据的总和 */
  const [curDataSum, setCurDataSum] = useState<number>(0);

  useEffect(() => {
    // 计算当前数据的总和
    const sum = calculateSum(data, yField);
    setCurDataSum(sum);
  }, [data, yField]);

  // 添加极值标记
  const processedData = showExtremeValue
    ? addExtremeValueFlags(data, yField)
    : data;

  const spec = {
    type: trendChartType,
    data: {
      values: processedData,
    },
    xField: xField,
    yField: yField,
    background: backgroundColor,
    // 配置数据点的显示
    point: {
      // 默认显示图元但设置为透明
      visible: true,
      style: {
        fill: showMarkers ? "#1990FF" : "transparent",
        stroke: showMarkers ? "#fff" : "transparent",
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
        trimPadding: true,
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
    // 面积图的配置
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
    // 切换到柱状图时的配置
    barWidth: "70%",
    bar: {
      style: { cornerRadius: 2 },
    },
    // 添加数据标签配置
    label: {
      visible: showDataLabels,
      style: {
        fill: dataLabelConfig.fill,
        fontSize: dataLabelConfig.fontSize,
        fontWeight: dataLabelConfig.fontWeight,
        fontStyle: dataLabelConfig.fontStyle,
        // 每个数据标签是否显示
        visible: showExtremeValue
          ? (datum: any) => !!(datum.highest || datum.lowest)
          : true,
      },
    },
    // 开启平滑曲线
    line: {
      style: {
        curveType: curveType,
        lineDash: lineDash,
        lineWidth: lineWidth,
      },
    },
    // 关闭入场动画
    animationAppear: false,
    // 图元切换时的动画
    animationState: {
      // 关闭crosshair与line相交时的point的动画
      duration: 0,
    },
    // 图表内边距,在消除轴线的留白后预留一定的padding
    padding: [0, 5, 0, 5],
  };
  return (
    <div className={prefixCls}>
      <div className="cool-indicator-trend-chart-wrapper">
        <div className="left-content">
          <Space
            direction="vertical"
            size={indicatorValueLineSpace === "small" ? 0 : "small"}
            style={{
              display: "flex",
              height: "100%",
              alignItems:
                indicatorContentPosition === "center" ? "center" : "flex-start",
              justifyContent: "center",
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
              <span style={{ fontSize: 14 }}>{indicatorPrefix}</span>
              <span>{curDataSum}</span>
              <span style={{ fontSize: 14 }}>{indicatorSuffix}</span>
            </div>
            {/* !TODO:当前系统暂不支持环比 */}
            {/* <div className="sub-indicator-wrapper">月环比</div> */}
          </Space>
        </div>
        {isShowTrendChart && (
          <div className="right-content">
            <div
              className="indicator-text-container"
              style={{ height: "100%" }}
            >
              <VChart spec={spec} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoolIndicatorTrendChart;
