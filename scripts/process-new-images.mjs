import sharp from '../node_modules/sharp/lib/index.js';
import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const BLOG_ROOT = 'C:/Users/hiron/OneDrive/デスクトップ/Claude code/my-blog';
const IMAGES_ROOT = 'C:/Users/hiron/OneDrive/デスクトップ/Claude code/画像';

const POSTS_DIR = `${BLOG_ROOT}/public/images/posts`;
const EYECATCH_1280 = `${IMAGES_ROOT}/アイキャッチ画像_1280x720`;
const ARTICLE_1280 = `${IMAGES_ROOT}/記事内画像_1280x720`;

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function sampleEdgeColor(image) {
  const { data } = await image.clone().resize(1, 1).raw().toBuffer({ resolveWithObject: true });
  return { r: data[0], g: data[1], b: data[2] };
}

async function processEyecatch(src, destFilename) {
  const destPost = path.join(POSTS_DIR, destFilename);
  const destEyecatch = path.join(EYECATCH_1280, destFilename);

  console.log(`\nProcessing eyecatch: ${path.basename(src)} -> ${destFilename}`);

  const image = sharp(src);
  const bgColor = await sampleEdgeColor(image);
  console.log(`  Edge color: rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`);

  await sharp(src)
    .resize(1280, 720, {
      fit: 'contain',
      background: bgColor
    })
    .png()
    .toFile(destPost);
  console.log(`  Saved to: ${destPost}`);

  // Copy to アイキャッチ画像_1280x720
  await copyFile(destPost, destEyecatch);
  console.log(`  Copied to: ${destEyecatch}`);
}

async function processArticleImage(src) {
  const filename = path.basename(src);
  const destArticle = path.join(ARTICLE_1280, filename);

  console.log(`\nProcessing article image: ${filename}`);

  await sharp(src)
    .resize(1280, 720, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255 }
    })
    .png()
    .toFile(destArticle);
  console.log(`  Saved to: ${destArticle}`);
}

async function main() {
  await ensureDir(POSTS_DIR);
  await ensureDir(EYECATCH_1280);
  await ensureDir(ARTICLE_1280);

  console.log('=== Step 1: Gemini アイキャッチ画像２ (土木) ===');
  const geminiEyecatch = [
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像２/Gemini_Generated_Image_gcurmagcurmagcur.png`,
      dest: 'doboku-1kyu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像２/Gemini_Generated_Image_fvqvshfvqvshfvqv.png`,
      dest: 'hinshutu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像２/Gemini_Generated_Image_oejdktoejdktoejd.png`,
      dest: 'doboku-2kyu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像２/Gemini_Generated_Image_qsoetuqsoetuqsoe.png`,
      dest: 'doboku-goukakuritsu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像２/Gemini_Generated_Image_9bd3xm9bd3xm9bd3.png`,
      dest: 'doboku-keiken-kijutsu-hero.png'
    },
  ];

  for (const { src, dest } of geminiEyecatch) {
    try {
      await processEyecatch(src, dest);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log('\n=== Step 2: ChatGPT 4/17 アイキャッチ画像 (造園) ===');
  const chatgptEyecatch = [
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像/ChatGPT Image 2026年4月17日 22_55_54.png`,
      dest: 'zouen-1kyu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像/ChatGPT Image 2026年4月17日 22_56_03.png`,
      dest: 'zouen-2kyu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像/ChatGPT Image 2026年4月17日 22_56_09.png`,
      dest: 'zouen-keiken-kijutsu-hero.png'
    },
    {
      src: `${IMAGES_ROOT}/アイキャッチ画像/ChatGPT Image 2026年4月17日 06_34_18.png`,
      dest: 'goukaku-career-hero.png'
    },
  ];

  for (const { src, dest } of chatgptEyecatch) {
    try {
      await processEyecatch(src, dest);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  console.log('\n=== Step 3: Gemini 記事内画像 (single-panel) ===');
  const articleImages = [
    `${IMAGES_ROOT}/記事内画像/Gemini_Generated_Image_863gks863gks863g.png`,
    `${IMAGES_ROOT}/記事内画像/Gemini_Generated_Image_fwoxihfwoxihfwox.png`,
    `${IMAGES_ROOT}/記事内画像/Gemini_Generated_Image_stlzqestlzqestlz.png`,
    `${IMAGES_ROOT}/記事内画像/Gemini_Generated_Image_y4tbliy4tbliy4tb.png`,
    `${IMAGES_ROOT}/記事内画像/Gemini_Generated_Image_v2qp0uv2qp0uv2qp.png`,
  ];

  for (const src of articleImages) {
    try {
      await processArticleImage(src);
    } catch (err) {
      console.error(`  ERROR processing ${path.basename(src)}: ${err.message}`);
    }
  }

  console.log('\n=== Done ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
