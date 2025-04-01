/**
 * @description: 指标趋势图的特殊配置项
 */

import { FontConfig } from "./common";

/** 趋势图的配置-子标趋势图子项 */
export interface TrendChartConfig {
  /** 是否显示趋势图 */
  isShowTrendChart: boolean;
  /** 指标趋势图的类型 */
  trendChartType: "area" | "bar" | "line";
  /** 线条类型
   * - curve: 曲线
   * - straight: 直线
   */
  lineType: "curve" | "straight";
  /** 线条样式
   * - solid: 实线
   * - dashed: 虚线
   */
  lineStyle: "solid" | "dashed";
  /** 线条宽度 */
  lineWidth: number;
  /** 是否显示标记点 */
  showMarkers: boolean;
}

/** 指标内容配置 */
export interface IndicatorContentConfig {
  /** 内容在指标块的位置
   * - left: 左侧
   * - center: 居中
   */
  indicatorContentPosition: "left" | "center";
  /** 指标值的行间距
   * - normal: 正常
   * - small: 紧凑
   */
  indicatorValueLineSpace: "normal" | "small";
  /** 是否启用字号设置
   *  - true: 启用时支持自定义设置
   *  - false: 禁用时恢复默认配置
   */
  enableFontSetting: boolean;
  /** 指标名称字体配置 */
  indicatorNameFontConfig: FontConfig;
  /** 指标数值字体配置 */
  indicatorValueFontConfig: FontConfig;
}
