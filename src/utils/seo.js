import { createElement } from 'react';
import { Helmet } from 'react-helmet-async';

export const siteConfig = {
  name: 'Wayne NJ Real Estate',
  url: 'https://www.waynenjrealestate.com',
  defaultTitle: 'Wayne NJ Real Estate',
  defaultDescription: 'Wayne, Packanack Lake, and surrounding neighborhood real estate.',
};

export function Seo({
  title,
  description = siteConfig.defaultDescription,
  path = '/',
  noIndex = false,
  image,
  imageAlt,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;
  const canonical = new URL(path, siteConfig.url).toString();
  const headChildren = [
    createElement('title', { key: 'title' }, fullTitle),
    createElement('meta', {
      key: 'description',
      name: 'description',
      content: description,
    }),
    createElement('link', {
      key: 'canonical',
      rel: 'canonical',
      href: canonical,
    }),
    createElement('meta', {
      key: 'og:title',
      property: 'og:title',
      content: fullTitle,
    }),
    createElement('meta', {
      key: 'og:description',
      property: 'og:description',
      content: description,
    }),
    createElement('meta', {
      key: 'og:url',
      property: 'og:url',
      content: canonical,
    }),
    createElement('meta', {
      key: 'og:type',
      property: 'og:type',
      content: type,
    }),
    createElement('meta', {
      key: 'twitter:card',
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    }),
  ];

  if (image) {
    headChildren.push(
      createElement('meta', {
        key: 'og:image',
        property: 'og:image',
        content: image,
      }),
    );
  }

  if (imageAlt) {
    headChildren.push(
      createElement('meta', {
        key: 'og:image:alt',
        property: 'og:image:alt',
        content: imageAlt,
      }),
    );
  }

  if (noIndex) {
    headChildren.push(
      createElement('meta', {
        key: 'robots',
        name: 'robots',
        content: 'noindex, nofollow',
      }),
    );
  }

  return createElement(Helmet, null, ...headChildren);
}
