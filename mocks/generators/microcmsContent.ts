import { faker } from "@faker-js/faker";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export default function generateMicroCMSContent(): MicroCMSContentId & MicroCMSDate {
  const createdAt = faker.date.anytime().toISOString();
  const updatedAt = faker.date.soon({refDate: createdAt}).toISOString();
  const publishedAt = faker.date.anytime().toISOString();
  const revisedAt = faker.date.soon({refDate: publishedAt}).toISOString();

  return {
    id: faker.string.alpha({length: 10}),
    createdAt,
    updatedAt,
    publishedAt,
    revisedAt,
  };
}