import {
  ChartLayout,
  DataSeriesConfig,
  DataSourceConfig,
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
  /** 系列配置-只使用id、name、indicatorPrefix、indicatorSuffix */
  seriesConfig: DataSeriesConfig[];
  /** 图表在仪表板中的布局位置 */
  layout: ChartLayout;
  /** 图表使用的数据源配置 */
  dataSourceConfig: DataSourceConfig;
}
