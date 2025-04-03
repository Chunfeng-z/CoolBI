import { http, HttpResponse } from "msw";
// vite-config中的base
const baseUrl = import.meta.env.BASE_URL;
export const workbenchHandlers = [
  http.post(baseUrl + "api/logout", () => {
    return HttpResponse.json({ message: "Logout successful" }, { status: 200 });
  }),
];
