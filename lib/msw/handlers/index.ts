import { http, HttpResponse } from "msw";
import blogList from "@/mocks/fixtures/blog.json" assert { type: "json" };

export const handlers = [
  http.get("https://zndk.microcms.io/api/v1/blog/:slug", () => {
    return HttpResponse.json(blogList[0]);
  }),
  
  http.get("https://zndk.microcms.io/api/v1/blog", () => {
    return HttpResponse.json({
      contents: blogList,
      totalCount: blogList.length,
    });
  }),
];