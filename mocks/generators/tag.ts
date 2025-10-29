import { Tag } from "@/lib/microcms"
import { fakerJA } from "@faker-js/faker";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import generateMicroCMSContent from "./microcmsContent";

export default function generateTagList(): (MicroCMSContentId & MicroCMSDate & Tag)[] {
  return Array.from({ length: 30 }, generateTagDetail);
}

function generateTagDetail(): MicroCMSContentId & MicroCMSDate & Tag {
  return {
    name: fakerJA.lorem.word(),
    ...generateMicroCMSContent(),
  }
}