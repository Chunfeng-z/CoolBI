import { get, post } from "@/utils/request";

/** 获取当前仪表板的配置信息 */
export function getDashboardData(params: { dashboardId: string }) {
  return get("/api/dashboard/getDashboardData", params);
}

/** 获取当前仪表板已使用的所有数据源的信息
 * @params dashboardId 仪表板的id 基于id可以查找到使用的数据源
 */
export function getUsedDataSourceInfo(params: { dashboardId: string }) {
  return get("/api/dashboard/getDashboardDataSourceInfo", params);
}

/** 获取数据源列表 */
export function getDataSourceList(params: { userId: string }) {
  return get("/api/dashboard/getDataSourceList", params);
}

/** 获取任一数据源下面的所有字段信息 */
export function getDataSourceFields(params: { dataFromId: string }) {
  return get("/api/dashboard/getDataSourceFields", params);
}

/** 获取图表的数据信息
 * TODO: 后续的分析预警取数还需要增加字段
 * @params dataFromId 数据源的id
 * @params measureFields 指标字段的id
 * @params dimensionFields 维度字段的id
 */
export function getChartData(params: {
  dataFromId: string;
  measureFields: string[];
  dimensionFields: string[];
}) {
  return post("/api/dashboard/getChartData", params);
}
