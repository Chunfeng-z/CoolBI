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
