import { DataSeriesConfig, TitleCardConfig } from "../chartConfigItems/common";
import {
  IndicatorContentConfig,
  TrendChartConfig,
} from "../chartConfigItems/indicatorTrendItems";

import { ChartTypeEnum } from "@/components/dashboard/utils";

/** 指标趋势图的完整配置 */
export interface IndicatorTrendChartConfig {
  /** 图表组件的id */
  chartId: string;
  /** 图表类型 */
  type: ChartTypeEnum.indicatorTrend;
  /** 标题与卡片配置 */
  titleCardConfig: TitleCardConfig;
  /** 趋势图的配置 */
  trendChartConfig: TrendChartConfig;
  /** 指标内容配置 */
  indicatorContentConfig: IndicatorContentConfig;
  /** 系列配置-只有存在数据的时候才可以配置 */
  seriesConfig: DataSeriesConfig[];
}
