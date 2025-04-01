import {
  ChartLayout,
  DataSeriesConfig,
  TitleCardConfig,
} from "../chartConfigItems/common";
import {
  IndicatorContentConfig,
  IndicatorLayout,
} from "../chartConfigItems/indicatorCardItems";

import { ChartTypeEnum } from "@/components/dashboard/utils";

/** 指标看板图的完整配置 */
export interface IndicatorCardChartConfig {
  /** 图表组件的id */
  chartId: string;
  /** 图表类型 */
  type: ChartTypeEnum.indicatorCard;
  /** 标题与卡片配置 */
  titleCardConfig: TitleCardConfig;
  /** 指标布局配置 */
  indicatorLayout: IndicatorLayout;
  /** 指标内容配置 */
  indicatorContentConfig: IndicatorContentConfig;
  /** 系列配置-只有存在数据的时候才可以配置 */
  seriesConfig: DataSeriesConfig[];
  /** 图表在仪表板中的布局位置 */
  layout: ChartLayout;
}
