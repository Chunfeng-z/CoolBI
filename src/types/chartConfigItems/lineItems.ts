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
export interface LineAxisGridConfig {
  /** 是否显示网格线 */
  isShowAxisGrid: boolean;
  /** 网格线样式 */
  lineStyle: "solid" | "dashed";
  /** 网格线颜色 */
  lineColor: string;
  /** 网格线宽度 */
  lineWidth: number;
}

/** 坐标轴配置 */
export interface LineAxisConfig {
  /** x轴配置 */
  xAxisConfig: {
    /** 显示轴 */
    isShowAxis: boolean;
    /** x轴标题和单位配置 */
    axisTitleConfig: LineAxisTitleAndUnitConfig;
    /** x轴轴标签配置 */
    axisLabelConfig: LineAxisLabelConfig;
    /** 是否显示刻度线 */
    isShowTickLine: boolean;
    /** x轴网格线配置 */
    axisGridConfig: LineAxisGridConfig;
  };
  /** y轴配置 */
  yAxisConfig: {
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
    /** y轴网格线配置 */
    axisGridConfig: LineAxisGridConfig;
    /** 轴值范围与间隔配置 */
    axisRangeConfig: {
      /** 最大轴值范围模式 */
      maxRangeMode: "auto" | "custom";
      /** 最小轴值范围模式 */
      minRangeMode: "auto" | "custom";
      /** 最小值 */
      minValue: number;
      /** 最大值 */
      maxValue: number;
    };
    /** 间隔配置 */
    intervalConfig: {
      /** 是否启用自定义间隔配置*/
      isEnableCustomInterval: boolean;
      /** 间隔等分的数量 */
      intervalCount: number;
    };
  };
}
