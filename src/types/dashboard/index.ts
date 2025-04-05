import { DataSourceField } from "../chartConfigItems/common";
import { IndicatorCardChartConfig, IndicatorTrendChartConfig } from "../charts";

/** 通用API响应类型 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

/** 仪表板数据 */
export type DashboardDataResponse = ApiResponse<
  (IndicatorTrendChartConfig | IndicatorCardChartConfig)[]
>;

export type DataSourceValues = { v: string | number; r?: string | number }[][];

/** 图表数据的响应 */
export type ChartDataResponse = ApiResponse<{
  columns: DataSourceField[];
  /** 数据的值
   * - v: 数据的值
   * - r: 数据的原始值
   */
  values: DataSourceValues;
}>;

/** 单个数据源的全部信息 */
export interface DataSourceInfo {
  /** 数据源的id */
  dataFromId: string;
  /** 数据源的名称 */
  dataFromName: string;
  /** 所有的字段 */
  fields: DataSourceField[];
}
