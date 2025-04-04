import { http, HttpResponse } from "msw";
import queryString from "query-string";

import { testData } from "@/mocks/test/chartStoreTestData";
import { DashboardDataResponse } from "@/types/dashboard";
const baseUrl = import.meta.env.BASE_URL;

export const dashboardHandlers = [
  // 模拟登录
  http.get(baseUrl + "api/dashboard/getDashboardData", async ({ request }) => {
    const parsedQuery = queryString.parseUrl(request.url).query;
    const query: { dashboardId: string } = {
      dashboardId: parsedQuery.dashboardId as string,
    };
    if (query.dashboardId === "dashboard1") {
      const respData: DashboardDataResponse = {
        code: 200,
        message: "获取仪表板数据成功",
        data: testData,
      };
      return HttpResponse.json(respData);
    }
  }),
];
