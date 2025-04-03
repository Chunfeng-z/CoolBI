import { http, HttpResponse } from "msw";
import queryString from "query-string";

import {
  recommendCardListData,
  dashboardTableEditData,
} from "@/test/workbenchTestData";
import {
  DashBoardTableDataRespType,
  GetDashBoardTableParams,
  RecommendDashBoardListDataType,
} from "@/types/workbench";
// vite-config中的base
const baseUrl = import.meta.env.BASE_URL;
export const workbenchHandlers = [
  // 获取工作台仪表盘推荐
  http.get(baseUrl + "api/workbench/dashboard/recommendList", () => {
    const respData: RecommendDashBoardListDataType = {
      code: 200,
      message: "获取成功",
      data: recommendCardListData,
    };
    return HttpResponse.json(respData);
  }),

  // 获取用户的仪表板表格数据
  http.get(baseUrl + "api/workbench/userDashboardTable", ({ request }) => {
    const parsedQuery = queryString.parseUrl(request.url).query;
    const query: GetDashBoardTableParams = {
      userId: parsedQuery.userId as string,
      pageSize: Number(parsedQuery.pageSize),
      pageNum: Number(parsedQuery.pageNum),
    };
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (token === "mock-jwt-token" && query.userId === "1") {
      const respData: DashBoardTableDataRespType = {
        code: 200,
        message: "获取成功",
        data: dashboardTableEditData,
      };
      return HttpResponse.json(respData);
    }
  }),
];
