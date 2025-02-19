/** 每个图表项的数据结构
 * @param shortName 图表项的简称
 * @param name 图表项的全称
 * @param icon 图表项的icon
 * @param description 图表的简介
 */
export type ChartItem = {
  shortName: string;
  name: string;
  icon: string;
  description: string;
};

/**
 * 每种图表的数据结构
 * @param category 图表的分类名称
 * @param items 图表的项
 */
export type ChartCategory = {
  category: string;
  items: ChartItem[];
};

/**
 * 可选的颜色主题
 * @param lightTheme 亮色主题
 * @param darkTheme 暗色主题
 */
export enum Theme {
  lightTheme = "lightTheme",
  darkTheme = "darkTheme",
}

/**
 * 卡片圆角的选择项
 * @param noRadius 无圆角
 * @param small 小圆角
 * @param middle 中圆角
 * @param large 大圆角
 */
export enum CardRadius {
  noRadius = "noRadius",
  small = "small",
  middle = "middle",
  large = "large",
}

/**
 * 卡片间距的选择项
 * @param compact 紧凑
 * @param normal 正常
 * @param custom 自定义
 */
export enum CardSpace {
  compact = "compact",
  normal = "normal",
  custom = "custom",
}
