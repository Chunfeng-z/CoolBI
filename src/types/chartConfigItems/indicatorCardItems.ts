/**
 * @description: 指标卡片的特殊配置项
 */

import { FontConfig, IndicatorDecorationImgConfig } from "./common";

/** 指标布局 */
export interface IndicatorLayout {
  /** 指标间关系
   * - same-level:并列
   * - sub-level: 主副
   */
  indicatorRelation: "same-level" | "sub-level";
  /** 指标块组的展示形式
   * - swipe: 滑动
   * - line-feed: 换行
   */
  indicatorBlockGroupType: "swipe" | "line-feed";
  /** 每行最多显示的个数 */
  maxGroupCount: number;
  /** 指标块分隔形式
   * - line: 分隔线
   * - none: 无分隔线
   */
  indicatorBlockSeparator: "line" | "none";
  /** 分隔线颜色 */
  indicatorBlockSeparatorColor: string;
}

/** 指标内容配置
 * TODO: 指标卡片当前配置支持指标修饰图，指标趋势暂不支持
 */
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
  /** 是否开启指标修饰图 */
  isShowIndicatorDecoration: boolean;
  /** 指标修饰图配置 */
  indicatorDecorationConfig: IndicatorDecorationImgConfig[];
}
