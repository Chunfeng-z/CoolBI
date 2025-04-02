import { http, HttpResponse } from "msw";
// vite-config中的base
const baseUrl = import.meta.env.BASE_URL;
// 模拟 API 请求
export const handlers = [
  http.get(baseUrl + "api/user", () => {
    return HttpResponse.json(
      {
        id: 1,
        username: "admin",
        name: "管理员",
        email: "admin@example.com",
        role: "admin",
      },
      { status: 200 }
    );
  }),

  http.post(baseUrl + "api/user/login", async ({ request }) => {
    const { account, password } = (await request.json()) as {
      account: string;
      password: string;
    };
    if (account === "admin1" && password === "password") {
      return HttpResponse.json(
        {
          message: "Login successful",
          token: "mock-jwt-token",
          user: { id: 1, name: "管理员" },
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  }),

  http.post(baseUrl + "api/logout", () => {
    return HttpResponse.json({ message: "Logout successful" }, { status: 200 });
  }),

  http.get(baseUrl + "api/dashboard", () => {
    return HttpResponse.json(
      {
        stats: {
          users: 1250,
          visits: 87500,
          conversions: 583,
          revenue: 48370,
        },
        recentActivity: [
          { id: 1, type: "login", user: "admin", time: "2023-05-10T12:30:00Z" },
          {
            id: 2,
            type: "report",
            user: "user1",
            time: "2023-05-10T11:45:00Z",
          },
          {
            id: 3,
            type: "export",
            user: "user2",
            time: "2023-05-10T10:15:00Z",
          },
        ],
      },
      { status: 200 }
    );
  }),

  http.get(baseUrl + "api/reports", () => {
    return HttpResponse.json(
      {
        reports: [
          { id: 1, title: "月度销售报表", created: "2023-05-01T10:00:00Z" },
          { id: 2, title: "季度财务分析", created: "2023-04-15T14:30:00Z" },
          { id: 3, title: "年度业绩汇总", created: "2023-03-22T09:15:00Z" },
        ],
      },
      { status: 200 }
    );
  }),
];
