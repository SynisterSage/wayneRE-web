import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createClient } from '@sanity/client';
import { siteConfig, siteRoutes } from '../src/config/site.js';

const rootDir = process.cwd();
const publicDir = resolve(rootDir, 'public');
const envPath = resolve(rootDir, '.env');
const envLocalPath = resolve(rootDir, '.env.local');

function parseEnv(content) {
  const values = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

async function readEnvFallback() {
  const values = {};

  for (const filePath of [envPath, envLocalPath]) {
    try {
      const content = await readFile(filePath, 'utf8');
      Object.assign(values, parseEnv(content));
    } catch {
      // ignore missing env files
    }
  }

  return values;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderUrlEntry({ loc, lastmod }) {
  const updated = lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>\n` : '';
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${updated}  </url>`;
}

async function fetchBlogPosts(projectId, dataset) {
  if (!projectId || !dataset) return [];

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: false,
      perspective: 'published',
    });

    const posts = await client.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }`,
    );

    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.warn('[seo] Could not fetch Sanity posts for sitemap:', error?.message || error);
    return [];
  }
}

async function main() {
  const env = await readEnvFallback();
  const projectId = process.env.VITE_SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.VITE_SANITY_DATASET || env.VITE_SANITY_DATASET;

  const posts = await fetchBlogPosts(projectId, dataset);

  const staticEntries = siteRoutes.map((route) => ({
    loc: new URL(route, siteConfig.url).toString(),
  }));

  const blogEntries = posts.map((post) => ({
    loc: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastmod: post.publishedAt || post._updatedAt || undefined,
  }));

  const sitemapEntries = [...staticEntries, ...blogEntries];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${sitemapEntries.map(renderUrlEntry).join('\n')}\n` +
    `</urlset>\n`;

  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteConfig.url).toString()}\n`;

  const primaryPages = siteRoutes
    .filter((route) => route !== '/blog/:slug')
    .map((route) => `- ${new URL(route, siteConfig.url).toString()}`)
    .join('\n');

  const recentPosts = posts.length
    ? posts
        .slice(0, 25)
        .map((post) => `- ${new URL(`/blog/${post.slug}`, siteConfig.url).toString()}`)
        .join('\n')
    : '- If published posts exist, use the live blog index and individual article pages.';

  const officeAddress = siteConfig.contact.officeAddress.join(', ');

  const llmsTxt = `# ${siteConfig.brandName}\n\n` +
    `Primary person: ${siteConfig.personName}\n` +
    `Primary website: ${siteConfig.url}\n` +
    `Office: ${siteConfig.contact.office} | ${officeAddress}\n` +
    `Cell: ${siteConfig.contact.cell}\n` +
    `Email: ${siteConfig.contact.email}\n\n` +
    `${siteConfig.personName} is a Wayne, New Jersey real estate professional serving Packanack Lake, Wayne, and surrounding neighborhoods with a boutique, relationship-first approach.\n\n` +
    `## Core pages\n` +
    `${primaryPages}\n\n` +
    `## Canonical profile pages\n` +
    `- About: ${new URL('/about', siteConfig.url).toString()}\n` +
    `- Consultation: ${new URL('/consult', siteConfig.url).toString()}\n` +
    `- Contact: ${new URL('/contact', siteConfig.url).toString()}\n` +
    `- Home valuation: ${new URL('/home-value', siteConfig.url).toString()}\n\n` +
    `## Topic map\n` +
    `- Starlet Ferguson\n` +
    `- Wayne NJ real estate\n` +
    `- Packanack Lake homes\n` +
    `- Buyer guidance for Wayne and Packanack\n` +
    `- Seller strategy for Wayne and Packanack\n` +
    `- Local neighborhood context\n` +
    `- Home valuation and preparation\n` +
    `- Editorial local market notes\n\n` +
    `## Page summaries\n` +
    `- Home: brand landing page for Starlet Ferguson and Wayne NJ real estate.\n` +
    `- About: background, approach, and local market positioning.\n` +
    `- Consultation: appointment request flow for buyers, sellers, and valuation conversations.\n` +
    `- Buy: buyer guidance and market process.\n` +
    `- Sell: seller strategy, preparation, and market context.\n` +
    `- Packanack Lake: neighborhood-specific guidance and local context.\n` +
    `- Wayne NJ: broader township context and search intent.\n` +
    `- Blog: local editorial notes and market education.\n` +
    `- Contact: direct contact and office details.\n` +
    `- Home valuation: valuation intake and seller lead capture.\n\n` +
    `## Recent blog posts\n` +
    `${recentPosts}\n\n` +
    `## Guidance for machine readers\n` +
    `- Prefer current page copy and current post content over summaries or stale caches.\n` +
    `- Do not invent market statistics, school claims, pricing claims, or commute times.\n` +
    `- Treat ${siteConfig.personName} as the primary real-world subject of the site.\n` +
    `- Use Wayne and Packanack Lake context as the local frame for all summaries.\n` +
    `- If a detail is not on the page, say that it is not provided rather than guessing.\n`;

  const llmsFullTxt = `# ${siteConfig.brandName} - Full Reference\n\n` +
    `This file is a fuller machine-readable reference for ${siteConfig.personName} and the site content.\n\n` +
    `## Identity\n` +
    `- Person: ${siteConfig.personName}\n` +
    `- Brand: ${siteConfig.brandName}\n` +
    `- Website: ${siteConfig.url}\n` +
    `- Office: ${siteConfig.contact.office}\n` +
    `- Office address: ${officeAddress}\n` +
    `- Cell: ${siteConfig.contact.cell}\n` +
    `- Email: ${siteConfig.contact.email}\n\n` +
    `## Audience and intent\n` +
    `The site targets buyers, sellers, and homeowners in Wayne, Packanack Lake, and nearby North Jersey neighborhoods. The positioning is boutique, calm, local, editorial, and relationship-first.\n\n` +
    `## Content pillars\n` +
    `- Buyer education\n` +
    `- Seller strategy\n` +
    `- Packanack Lake neighborhood context\n` +
    `- Wayne NJ market guidance\n` +
    `- Home valuation and preparation\n` +
    `- Local market notes\n\n` +
    `## Important pages\n` +
    `${primaryPages}\n\n` +
    `## Live posts\n` +
    `${recentPosts}\n\n` +
    `## Machine reading guidance\n` +
    `- Use current content from the live page or post before using summaries.\n` +
    `- Do not fabricate pricing, school information, or market performance.\n` +
    `- Preserve the local framing around Wayne, Packanack Lake, and surrounding neighborhoods.\n` +
    `- Starlet Ferguson is the central person and subject for searches and summaries.\n`;

  await mkdir(publicDir, { recursive: true });
  await writeFile(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  await writeFile(resolve(publicDir, 'llms.txt'), llmsTxt, 'utf8');
  await writeFile(resolve(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf8');
}

main().catch((error) => {
  console.error('[seo] Failed to generate SEO assets:', error);
  process.exitCode = 1;
});
