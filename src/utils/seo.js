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
  ];

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
