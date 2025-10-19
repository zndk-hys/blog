import { createClient, MicroCMSContentId, MicroCMSDate, MicroCMSImage, MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
    apiKey: process.env.MICROCMS_API_KEY!,
});

export type Tag = {
    name: string;
} & MicroCMSContentId & MicroCMSDate;

export type Blog = {
    title: string;
    body: string;
    eyecatch?: MicroCMSImage;
    tags: Tag[];
} & MicroCMSContentId & MicroCMSDate;

export async function getBlogList(queries?: MicroCMSQueries) {
    const listData = await client.getList<Blog>({
        endpoint: 'blog',
        queries,
        customRequestInit: {
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
        },
    }).catch(notFound);

    return detailData;
}

export async function getTagDetail(contentId: string, queries?: MicroCMSQueries) {
    const detailData = await client.getListDetail<Tag>({
        endpoint: 'tag',
        contentId,
        queries,
        customRequestInit: {
        },
    }).catch(notFound);

    return detailData;
}