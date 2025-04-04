import { DataSourceConfig } from "@/types/chartConfigItems/common";
import { get, post } from "@/utils/request";

/** 获取当前仪表板的配置信息 */
export function getDashboardData(params: { dashboardId: string }) {
  return get("/api/dashboard/getDashboardData", params);
}

/** 查询当前条件下的图表数据
 * TODO: 后续的分析预警取数还需要增加字段,到时需要单独抽取类型
 */
export function queryChartData(params: DataSourceConfig) {
  return post("/api/dashboard/queryChartData", params);
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
