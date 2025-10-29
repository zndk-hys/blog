import fs from 'node:fs';
import path from 'node:path';
import generateBlogList from '@/mocks/generators/blog';
import generateTagList from '@/mocks/generators/tag';

const outDir = path.resolve(process.cwd(), 'mocks/fixtures');

const tagList = generateTagList();
const blogList = generateBlogList(tagList);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'tag.json'), JSON.stringify(tagList, null, 2));
fs.writeFileSync(path.join(outDir, 'blog.json'), JSON.stringify(blogList, null, 2));