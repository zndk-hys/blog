import { http, HttpResponse } from "msw";
import tagList from "@/mocks/fixtures/tag.json" with { type: "json" };
import blogList from "@/mocks/fixtures/blog.json" with { type: "json" };
import { POSTS_PER_PAGE } from "@/constants";

export const handlers = [
  http.get("https://zndk.microcms.io/api/v1/blog/:slug", ({params}) => {
    for (let i = 0; i < blogList.length; i++) {
      if (blogList[i].id === params.slug) {
        return HttpResponse.json(blogList[i]);
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),
  
  http.get("https://zndk.microcms.io/api/v1/blog", ({request}) => {
    const url = new URL(request.url);

    const orders = url.searchParams.get('orders') ?? '';
    const filters = url.searchParams.get('filters') ?? '';
    const limit = Number(url.searchParams.get('limit') ?? POSTS_PER_PAGE);
    const offset = Number(url.searchParams.get('offset') ?? 0);

    console.log(filters);

    let list = Array.from(blogList);
    if (filters.startsWith('tags[contains]')) {
      const match = filters.match(/tags\[contains\](.+)/);
      if (match && match.length > 0) {
        list = list.filter(blog => {
          const tagIds = blog.tags.map(tag => tag.id);
          console.log(tagIds);
          console.log(tagIds.includes(match[1]));
          return tagIds.includes(match[1]);
        });
      }
    }
    console.log(list.length);

    if (orders === '-publishedAt') {
      list.sort((a,b) => {
        if (a.publishedAt > b.publishedAt) return -1;
        if (a.publishedAt > b.publishedAt) return 1;
        return 0;
      });
    }

    return HttpResponse.json({
      contents: list.slice(offset, offset + limit),
      totalCount: blogList.length,
    });
  }),
  
  http.get("https://zndk.microcms.io/api/v1/tag/:slug", ({params}) => {
    for (let i = 0; i < tagList.length; i++) {
      if (tagList[i].id === params.slug) {
        return HttpResponse.json(tagList[i]);
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),
];