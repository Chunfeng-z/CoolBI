import { delay, http, HttpResponse } from "msw";
import queryString from "query-string";

import { indicatorCardData } from "../test-charts-data/indicator-card-chart";
import { indicatorTrendData } from "../test-charts-data/trend-chart";

import { testData } from "@/mocks/test/chartStoreTestData";
import { DataSourceConfig } from "@/types/chartConfigItems/common";
import { ChartDataResponse, DashboardDataResponse } from "@/types/dashboard";
const baseUrl = import.meta.env.BASE_URL;

export const dashboardHandlers = [
  // 获取仪表板的图表配置信息
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
  // 获取图表当前筛选条件下的数据
  http.post(baseUrl + "api/dashboard/queryChartData", async ({ request }) => {
    const data = (await request.json()) as DataSourceConfig;
    if (data.dataFromId === "dataSource2") {
      await delay(2000);
      const respData: ChartDataResponse = {
        code: 200,
        message: "获取图表数据成功",
        data: {
          columns: [
            {
              id: "field3",
              name: "订单日期",
              type: "Dimension",
              column: "time",
              dataType: "datetime",
            },
            {
              id: "field4",
              name: "销售额",
              type: "Measure",
              column: "value",
              dataType: "number",
            },
          ],
          values: indicatorTrendData,
        },
      };
      return HttpResponse.json(respData);
    } else if (data.dataFromId === "dataSource1") {
      await delay(2000);
      const respData: ChartDataResponse = {
        code: 200,
        message: "获取图表数据成功",
        data: {
          columns: [
            {
              id: "field4",
              name: "销售额",
              type: "Measure",
              column: "COL_2",
              dataType: "number",
            },
            {
              id: "field5",
              name: "利润",
              type: "Measure",
              column: "COL_5",
              dataType: "number",
            },
            {
              id: "field6",
              name: "客户数",
              type: "Measure",
              column: "COL_6",
              dataType: "number",
            },
          ],
          values: indicatorCardData,
        },
      };
      return HttpResponse.json(respData);
    }
  }),
];
