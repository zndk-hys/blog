import { Blog, Tag } from "@/lib/microcms"
import { fakerJA } from "@faker-js/faker";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import generateMicroCMSContent from "./microcmsContent";

export default function generateBlogList(tagList: (MicroCMSContentId & MicroCMSDate & Tag)[]): (MicroCMSContentId & MicroCMSDate & Blog)[] {
  return Array.from({ length: 30 }, () => generateBlogDetail(tagList));
}

function generateBlogDetail(tagList: (MicroCMSContentId & MicroCMSDate & Tag)[]): MicroCMSContentId & MicroCMSDate & Blog {
  const tagNum = fakerJA.number.int({ min: 0, max: 3 });
  const tags = fakerJA.helpers.arrayElements(tagList, tagNum);

  return {
    title: fakerJA.lorem.words({min:3, max:5}),
    body: generateBodyHtml(),
    tags,
    ...generateMicroCMSContent(),
  }
}

const p = () => `<p>${fakerJA.lorem.paragraph({ min: 2, max: 4 })}</p>`;
const h2 = (t: string) => `<h2>${t}</h2>`;
const h3 = (t: string) => `<h3>${t}</h3>`;

function generateBodyHtml(): string {
  const sections = fakerJA.number.int({ min: 2, max: 4 });
  let html = "";

  for (let i = 0; i < sections; i++) {
    const h2Title = fakerJA.lorem.sentence();
    html += h2(h2Title);

    // h2直下の段落を1〜3個
    const paraUnderH2 = fakerJA.number.int({ min: 1, max: 3 });
    for (let j = 0; j < paraUnderH2; j++) html += p();

    // 小見出し（h3）を1〜3個、それぞれに1〜3段落
    const subCount = fakerJA.number.int({ min: 1, max: 3 });
    for (let k = 0; k < subCount; k++) {
      const h3Title = fakerJA.lorem.sentence();
      html += h3(h3Title);

      const paraUnderH3 = fakerJA.number.int({ min: 1, max: 3 });
      for (let m = 0; m < paraUnderH3; m++) html += p();
    }
  }

  return html;
}