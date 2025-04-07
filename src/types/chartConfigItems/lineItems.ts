/**
 * @description:  折线入的特殊配置项
 */

import { FontConfig } from "./common";

/** 绘图区域配置 */
export interface LineDrawAreaConfig {
  /** 是否开启渐变效果 */
  isShowGradient: boolean;
  /** 线条类型 */
  lineType: "curve" | "straight";
  /** 线条样式 */
  lineStyle: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth: number;
}

/** 轴线标题与单位配置 */
export interface LineAxisTitleAndUnitConfig {
  /** 是否显示标题和单位 */
  isShowTitleAndUnit: boolean;
  /** 标题 */
  title: string;
  /** 单位 */
  unit: string;
  /** 字体配置 */
  fontConfig: FontConfig;
}

/** 轴线标签配置 */
export interface LineAxisLabelConfig {
  /** 是否显示轴标签 */
  isShowAxisLabel: boolean;
  /** 字体配置 */
  fontConfig: FontConfig;
}

/**  轴线的网格配置 */
export interface LineConfig {
  /** 是否展示线条 */
  isShowLine: boolean;
  /** 网格线样式 */
  lineStyle: "solid" | "dashed";
  /** 网格线颜色 */
  lineColor: string;
  /** 网格线宽度 */
  lineWidth: number;
}

/** x轴配置项 */
export interface LineXAxisConfig {
  /** 显示轴 */
  isShowAxis: boolean;
  /** x轴标题和单位配置 */
  axisTitleConfig: LineAxisTitleAndUnitConfig;
  /** x轴轴标签配置 */
  axisLabelConfig: LineAxisLabelConfig;
  /** 是否显示刻度线 */
  isShowTickLine: boolean;
  /** x轴线配置 */
  axisLineConfig: LineConfig;
  /** x轴网格线配置 */
  axisGridConfig: LineConfig;
}

/** y轴配置 */
export interface LineYAxisConfig {
  /** 显示轴 */
  isShowAxis: boolean;
  /** y轴标题和单位配置 */
  axisTitleConfig: LineAxisTitleAndUnitConfig & {
    /** y轴标题和单位显示位置
     * - top: 轴上方
     * - outer: 轴外侧
     */
    position: "top" | "outer";
  };
  /** y轴轴标签配置 */
  axisLabelConfig: LineAxisLabelConfig;
  /** 是否显示刻度线 */
  isShowTickLine: boolean;
  /** y轴线配置 */
  axisLineConfig: LineConfig;
  /** y轴网格线配置 */
  axisGridConfig: LineConfig;
  /** 轴值范围与间隔配置 */
  axisRangeConfig: {
    /** 最大轴值范围模式 */
    isMaxRangeModeAuto: boolean;
    /** 最小轴值范围模式 */
    isMinRangeModeAuto: boolean;
    /** 最小值 */
    minValue: number | undefined;
    /** 最大值 */
    maxValue: number | undefined;
  };
  /** 间隔配置 */
  intervalConfig: {
    /** 是否启用自定义间隔配置*/
    isEnableCustomInterval: boolean;
    /** 间隔等分的数量 */
    intervalCount: number;
  };
}

/** 坐标轴配置 */
export interface LineAxisConfig {
  /** x轴配置 */
  xAxisConfig: LineXAxisConfig;
  /** y轴配置 */
  yAxisConfig: LineYAxisConfig;
}
