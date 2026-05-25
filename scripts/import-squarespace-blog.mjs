import {createClient} from '@sanity/client';
import {existsSync, readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_XML_PATH = '/Users/lex/Downloads/Squarespace-Wordpress-Export-05-25-2026.xml';
const ENTITY_MAP = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  quot: '"',
  nbsp: ' ',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  ndash: '–',
  mdash: '—',
  hellip: '…',
};
const VOID_TAGS = new Set(['br', 'hr', 'img', 'meta', 'link', 'input']);
const WRAPPER_TAGS = new Set(['article', 'div', 'section', 'header', 'main', 'span']);
const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'blockquote']);
const LIST_TAGS = new Set(['ul', 'ol']);

const env = loadEnvFiles(['.env', '.env.local']);
const projectId = env.VITE_SANITY_PROJECT_ID?.trim() || process.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = env.VITE_SANITY_DATASET?.trim() || process.env.VITE_SANITY_DATASET?.trim();
const token = env.SANITY_WRITE_TOKEN?.trim() || process.env.SANITY_WRITE_TOKEN?.trim();
const apiVersion = env.SANITY_API_VERSION?.trim() || '2025-01-01';

const cliArgs = process.argv.slice(2);
const dryRun = cliArgs.includes('--dry-run');
const xmlPathArg = cliArgs.find((arg) => !arg.startsWith('--'));
const xmlPath = xmlPathArg ? path.resolve(process.cwd(), xmlPathArg) : DEFAULT_XML_PATH;

if (!projectId || !dataset) {
  console.error('Missing VITE_SANITY_PROJECT_ID or VITE_SANITY_DATASET.');
  process.exit(1);
}

if (!token && !dryRun) {
  console.error('Missing SANITY_WRITE_TOKEN. Add it to .env.local or your shell before importing.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token || undefined,
  useCdn: false,
  perspective: 'published',
  ignoreBrowserTokenWarning: true,
});

const imageCache = new Map();

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const xml = await readFile(xmlPath, 'utf8');
  const exportData = parseWordPressExport(xml);
  const posts = exportData.items.filter(
    (item) => item.postType === 'post' && item.status === 'publish',
  );

  const attachmentsById = new Map(
    exportData.items
      .filter((item) => item.postType === 'attachment' && item.attachmentUrl)
      .map((item) => [String(item.postId), item]),
  );

  console.log(`Found ${posts.length} published blog posts in export.`);
  console.log(`Found ${attachmentsById.size} attachments.`);

  let imported = 0;

  for (const post of posts) {
    const featuredAttachmentId = post.meta._thumbnail_id;
    const attachment = featuredAttachmentId ? attachmentsById.get(String(featuredAttachmentId)) : null;
    const featuredImage = !dryRun && attachment?.attachmentUrl
      ? await uploadSanityImage(attachment.attachmentUrl, post.title)
      : null;

    const contentHtml = stripOuterCdata(post.content || '');
    const body = await htmlToPortableText(contentHtml, post.title, {dryRun});
    const excerpt = createExcerpt(post.excerpt || htmlToPlainText(contentHtml));
    const category = inferCategory(post.title, contentHtml);
    const metaTitle = createMetaTitle(post.title);
    const metaDescription = createMetaDescription(excerpt);
    const slug = deriveSlug(post);

    const doc = {
      _id: `post.${slug}`,
      _type: 'post',
      title: post.title,
      slug: {current: slug},
      publishedAt: toIso(post.postDateGmt || post.postDate),
      category,
      excerpt,
      metaTitle,
      metaDescription,
      ...(featuredImage ? {image: featuredImage} : {}),
      body: body.length ? body : fallbackBody(post.title, excerpt),
    };

    if (dryRun) {
      console.log(`DRY RUN: would import ${slug}`);
      imported += 1;
      continue;
    }

    await client.createOrReplace(doc);
    imported += 1;
    console.log(`Imported ${imported}/${posts.length}: ${slug}`);
  }

  console.log(dryRun ? `Dry run complete for ${imported} posts.` : `Imported ${imported} posts.`);
}

function loadEnvFiles(files) {
  const result = {};

  for (const file of files) {
    try {
      if (existsSync(file)) {
        Object.assign(result, parseEnv(readFileSync(file, 'utf8')));
      }
    } catch {
      // no-op
    }
  }

  return result;
}

function parseEnv(text) {
  const result = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const equalsIndex = line.indexOf('=');
    if (equalsIndex === -1) continue;
    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }

  return result;
}

function parseWordPressExport(xml) {
  const items = [];
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const rawItem of itemMatches) {
    items.push(parseItem(rawItem));
  }

  return {items};
}

function parseItem(xml) {
  const postType = extractTag(xml, 'wp:post_type');
  const postId = extractTag(xml, 'wp:post_id');
  const postName = extractTag(xml, 'wp:post_name');
  const status = extractTag(xml, 'wp:status');
  const title = decodeEntities(stripOuterCdata(extractTag(xml, 'title') || '')).trim();
  const link = decodeEntities(stripOuterCdata(extractTag(xml, 'link') || '')).trim();
  const postDate = extractTag(xml, 'wp:post_date');
  const postDateGmt = extractTag(xml, 'wp:post_date_gmt');
  const content = extractTag(xml, 'content:encoded') || '';
  const excerpt = stripOuterCdata(extractTag(xml, 'excerpt:encoded') || '');
  const attachmentUrl = extractTag(xml, 'wp:attachment_url');

  const meta = {};
  const metaMatches = [...xml.matchAll(/<wp:postmeta>[\s\S]*?<wp:meta_key>([\s\S]*?)<\/wp:meta_key>[\s\S]*?<wp:meta_value>([\s\S]*?)<\/wp:meta_value>[\s\S]*?<\/wp:postmeta>/g)];
  for (const match of metaMatches) {
    const key = decodeEntities(stripOuterCdata(match[1] || '')).trim();
    const value = decodeEntities(stripOuterCdata(match[2] || '')).trim();
    if (key) {
      meta[key] = value;
    }
  }

  return {
    postId,
    postType,
    postName,
    link,
    status,
    title,
    postDate,
    postDateGmt,
    content,
    excerpt,
    attachmentUrl,
    meta,
  };
}

function extractTag(source, tagName) {
  const pattern = new RegExp(`<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegex(tagName)}>`, 'i');
  const match = source.match(pattern);
  return match ? match[1] : '';
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripOuterCdata(value) {
  const match = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return match ? match[1] : value;
}

function decodeEntities(value) {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity) => {
    if (entity.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return ENTITY_MAP[entity] ?? `&${entity};`;
  });
}

function normalizeText(value) {
  return decodeEntities(value)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeInlineText(value) {
  return decodeEntities(value)
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ');
}

function toIso(value) {
  if (!value) return new Date().toISOString();
  const normalized = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function createExcerpt(value) {
  const plain = normalizeText(value).replace(/\s+/g, ' ').trim();
  if (!plain) return 'Local real estate notes from Wayne NJ and Packanack Lake.';
  if (plain.length <= 220) return plain;
  return `${plain.slice(0, 217).trimEnd()}...`;
}

function createMetaTitle(title) {
  const suffix = ' | Wayne NJ Real Estate';
  const candidate = normalizeText(title);
  if ((candidate + suffix).length <= 70) {
    return `${candidate}${suffix}`;
  }
  return candidate.slice(0, 70);
}

function createMetaDescription(excerpt) {
  return createExcerpt(excerpt).slice(0, 170);
}

function inferCategory(title, contentHtml) {
  const haystack = `${title} ${htmlToPlainText(contentHtml)}`.toLowerCase();
  if (/(buy|buyer|homebuyer|first[- ]time|mortgage|grant|down payment)/.test(haystack)) {
    return 'buying-strategy';
  }
  if (/(sell|seller|listing|pre-listing|preparing|valuation)/.test(haystack)) {
    return 'selling-strategy';
  }
  if (/(packanack|lake|neighborhood|community)/.test(haystack)) {
    return 'neighborhood-notes';
  }
  if (/(market|tax|commute|wayne|schools|school|season|maintenance)/.test(haystack)) {
    return 'market-insight';
  }
  return 'local-lifestyle';
}

function deriveSlug(post) {
  const candidate =
    post.postName ||
    post.link ||
    post.title ||
    `post-${post.postId || randomKey()}`;

  const parts = normalizeText(candidate)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);

  const slugBase = parts.at(-1) || candidate;
  return slugBase
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `post-${post.postId || randomKey()}`;
}

function htmlToPlainText(html) {
  return normalizeText(
    html
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|h1|h2|h3|h4|li|blockquote)>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  );
}

function fallbackBody(title, excerpt) {
  return [
    {
      _type: 'block',
      _key: randomKey(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: randomKey(), text: excerpt || title, marks: []}],
    },
  ];
}

async function htmlToPortableText(html, title, options = {}) {
  const tree = parseHtmlFragment(html);
  const blocks = [];

  for (const child of tree.children) {
    const converted = await convertNode(child, options);
    if (converted.length) {
      blocks.push(...converted);
    }
  }

  if (!blocks.length && title) {
    blocks.push(...fallbackBody(title, title));
  }

  return blocks;
}

async function convertNode(node, options = {}) {
  if (node.type === 'text') {
    return [];
  }

  if (LIST_TAGS.has(node.tag)) {
    const listItemType = node.tag === 'ol' ? 'number' : 'bullet';
    const blocks = [];
    for (const child of node.children) {
      if (child.type === 'element' && child.tag === 'li') {
        const block = await createPortableBlock(child, 'normal', listItemType, options);
        if (block) blocks.push(block);
      }
    }
    return blocks;
  }

  if (BLOCK_TAGS.has(node.tag)) {
    const style = blockStyleForTag(node.tag);
    const block = await createPortableBlock(node, style, undefined, options);
    return block ? [block] : [];
  }

  if (node.tag === 'img') {
    const imageBlock = await createImageBlock(node.attrs, options);
    return imageBlock ? [imageBlock] : [];
  }

  if (WRAPPER_TAGS.has(node.tag) || node.tag === 'body' || node.tag === 'root') {
    const blocks = [];
    for (const child of node.children) {
      const converted = await convertNode(child, options);
      if (converted.length) {
        blocks.push(...converted);
      }
    }
    return blocks;
  }

  const blocks = [];
  for (const child of node.children || []) {
    const converted = await convertNode(child, options);
    if (converted.length) {
      blocks.push(...converted);
    }
  }
  return blocks;
}

async function createPortableBlock(node, style, listItem, options = {}) {
  const inline = collectInline(node.children || []);
  if (!inline.spans.length) return null;

  return {
    _type: 'block',
    _key: randomKey(),
    style,
    ...(listItem ? {listItem, level: 1} : {}),
    markDefs: inline.markDefs,
    children: inline.spans,
  };
}

async function createImageBlock(attrs, options = {}) {
  if (options.dryRun) return null;

  const src = attrs.src || attrs['data-src'] || '';
  if (!src) return null;

  const asset = await uploadSanityImage(src, attrs.alt || attrs.title || '');
  if (!asset) return null;

  return {
    _type: 'image',
    _key: randomKey(),
    alt: attrs.alt || attrs.title || '',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

function blockStyleForTag(tag) {
  if (tag === 'h1') return 'h1';
  if (tag === 'h2') return 'h2';
  if (tag === 'h3') return 'h3';
  if (tag === 'h4') return 'h4';
  if (tag === 'blockquote') return 'blockquote';
  return 'normal';
}

function collectInline(nodes, markState = [], markDefs = [], spans = []) {
  for (const node of nodes) {
    if (node.type === 'text') {
      const text = normalizeInlineText(node.text);
      if (!text) continue;
      spans.push({
        _type: 'span',
        _key: randomKey(),
        text,
        marks: [...markState],
      });
      continue;
    }

    if (node.tag === 'br') {
      spans.push({
        _type: 'span',
        _key: randomKey(),
        text: '\n',
        marks: [...markState],
      });
      continue;
    }

    if (node.tag === 'strong' || node.tag === 'b') {
      collectInline(node.children || [], [...markState, 'strong'], markDefs, spans);
      continue;
    }

    if (node.tag === 'em' || node.tag === 'i') {
      collectInline(node.children || [], [...markState, 'em'], markDefs, spans);
      continue;
    }

    if (node.tag === 'a') {
      const href = node.attrs.href || '#';
      const markKey = `link-${markDefs.length}`;
      markDefs.push({_key: markKey, _type: 'link', href});
      collectInline(node.children || [], [...markState, markKey], markDefs, spans);
      continue;
    }

    if (node.tag === 'img') {
      continue;
    }

    collectInline(node.children || [], markState, markDefs, spans);
  }

  return {spans, markDefs};
}

function parseHtmlFragment(html) {
  const root = {type: 'element', tag: 'root', attrs: {}, children: []};
  const stack = [root];
  const tokenRe = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[^>]+>|[^<]+/g;
  const tokens = html.match(tokenRe) || [];

  for (const token of tokens) {
    if (!token) continue;
    if (token.startsWith('<!--')) continue;

    if (token.startsWith('<![CDATA[')) {
      appendText(stack.at(-1), token.slice(9, -3));
      continue;
    }

    if (token.startsWith('</')) {
      const closingTag = token.slice(2, -1).trim().split(/\s+/)[0].toLowerCase();
      while (stack.length > 1 && stack.at(-1).tag !== closingTag) {
        stack.pop();
      }
      if (stack.length > 1) {
        stack.pop();
      }
      continue;
    }

    if (token.startsWith('<')) {
      const parsed = parseOpenTag(token);
      if (!parsed) continue;
      const node = {type: 'element', tag: parsed.tag, attrs: parsed.attrs, children: []};
      stack.at(-1).children.push(node);
      if (!parsed.selfClosing && !VOID_TAGS.has(parsed.tag)) {
        stack.push(node);
      }
      continue;
    }

    appendText(stack.at(-1), token);
  }

  return root;
}

function parseOpenTag(token) {
  const match = token.match(/^<\s*([^\s/>]+)([\s\S]*?)\/?\s*>$/);
  if (!match) return null;

  const tag = match[1].toLowerCase();
  const attrs = {};
  const attrString = match[2] || '';
  const attrRe = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let attrMatch;

  while ((attrMatch = attrRe.exec(attrString))) {
    const key = attrMatch[1].toLowerCase();
    const value = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
    attrs[key] = decodeEntities(value);
  }

  return {
    tag,
    attrs,
    selfClosing: /\/>$/.test(token),
  };
}

function appendText(node, text) {
  if (!text) return;
  node.children.push({type: 'text', text: decodeEntities(text)});
}

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadSanityImage(url, label) {
  const cleanUrl = url.replace(/^http:\/\//i, 'https://');
  if (imageCache.has(cleanUrl)) {
    return imageCache.get(cleanUrl);
  }

  const response = await fetch(cleanUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image ${cleanUrl}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const buffer = Buffer.from(await response.arrayBuffer());
  const filename = filenameFromUrl(cleanUrl, label);
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  });

  imageCache.set(cleanUrl, asset);
  return asset;
}

function filenameFromUrl(url, label) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname) || 'image';
  const safeLabel = normalizeText(label)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const prefix = safeLabel ? `${safeLabel}-` : '';
  return `${prefix}${base}`.slice(0, 120);
}
