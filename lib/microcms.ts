import { createClient, MicroCMSContentId, MicroCMSDate, MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
});

export type Blog = {
    title: string;
    body: string;
    eyecatch?: MicroCMSImage;
} & MicroCMSContentId & MicroCMSDate;

export async function getBlogList(queries?: MicroCMSQueries) {
    const listData = await client.getList<Blog>({
        endpoint: 'blog',
        queries,
        customRequestInit: {
            next: {
                revalidate: 60,
            }
        },
    }).catch(notFound);
    return listData;
}

export async function getBlogDetail(contentId: string, queries?: MicroCMSQueries) {
    const detailData = await client.getListDetail<Blog>({
        endpoint: 'blog',
        contentId,
        queries,
        customRequestInit: {
            next: {
                revalidate: 60,
            }
        },
    }).catch(notFound);

    return detailData;
}