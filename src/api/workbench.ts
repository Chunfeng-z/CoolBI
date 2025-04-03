import { get } from "@/utils/request";

/** 获取推荐仪表板列表 */
export function getRecommendDashboardList() {
  return get("/api/workbench/dashboard/recommendList");
}
