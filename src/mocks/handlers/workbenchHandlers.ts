import { http, HttpResponse } from "msw";

import { recommendCardListData } from "@/test/workbenchTestData";
import { RecommendDashBoardListDataType } from "@/types/workbench";
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
];
