import { IndicatorCardChartConfig, IndicatorTrendChartConfig } from "../charts";

/** 通用API响应类型 */
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

/** 响应仪表板数据 */
export type DashboardDataResponse = ApiResponse<
  (IndicatorTrendChartConfig | IndicatorCardChartConfig)[]
>;

/** 数据源的数据字段的类型 */
export interface DataSourceField {
  /** 字段id */
  id: string;
  /** 字段名称 */
  name: string;
  /** 字段类型 */
  type: "Measure" | "Dimension";
  /** 数据的column */
  column: string;
  /** 字段的数据类型 */
  dataType: "string" | "number" | "date";
}

/** 数据图表使用的数据源的信息-已使用的部分 */
export interface DataSourceConfig {
  /** 当前使用的数据源表单的id */
  dataFromId: string;
  /** 当前使用到的数据源的维度字段 */
  dimensionFields: DataSourceField[];
  /** 当前使用到的数据源的指标字段 */
  measureFields: DataSourceField[];
}

/** 单个数据源的全部信息 */
export interface DataSourceInfo {
  /** 数据源的id */
  dataFromId: string;
  /** 数据源的名称 */
  dataFromName: string;
  /** 所有的字段 */
  fields: DataSourceField[];
}
