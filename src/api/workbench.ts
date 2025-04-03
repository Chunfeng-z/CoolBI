import { GetDashBoardTableParams } from "@/types/workbench";
import { get } from "@/utils/request";

/** 获取推荐仪表板列表 */
export function getRecommendDashboardList() {
  return get("/api/workbench/dashboard/recommendList");
}

/** 获取用户的仪表板表格数据 */
export function getUserDashboardTableData(params: GetDashBoardTableParams) {
  return get("/api/workbench/userDashboardTable", params);
}
