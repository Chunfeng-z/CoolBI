import { ChartLayout, TitleCardConfig } from "../chartConfigItems/common";
import { LineDrawAreaConfig } from "../chartConfigItems/lineItems";

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
}
