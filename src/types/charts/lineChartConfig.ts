import {
  AuxiliaryConfig,
  ChartLayout,
  CoolBIToolTipConfig,
  DataLabelConfig,
  DataSourceConfig,
  LegendConfig,
  TitleCardConfig,
} from "../chartConfigItems/common";
import {
  LineAxisConfig,
  LineDrawAreaConfig,
} from "../chartConfigItems/lineItems";

import { ChartTypeEnum } from "@/components/dashboard/utils";

export interface LineChartConfig {
  /** 图表组件的id */
  chartId: string;
  /** 图表类型 */
  type: ChartTypeEnum.line;
  /** 标题与卡片配置 */
  titleCardConfig: TitleCardConfig;
  /** 图表在仪表板中的布局 */
  layout: ChartLayout;
  /** 绘图区域配置 */
  drawAreaConfig: LineDrawAreaConfig;
  /** 坐标轴配置 */
  axisConfig: LineAxisConfig;
  /** 图例配置 */
  legendConfig: LegendConfig;
  /** 数据标签配置 */
  dataLabelConfig: DataLabelConfig;
  /** 工具提示配置 */
  tooltipConfig: CoolBIToolTipConfig;
  /** 辅助展示配置 */
  auxiliaryConfig: AuxiliaryConfig;
  /** 图表使用的数据源配置 */
  dataSourceConfig: DataSourceConfig;
}
