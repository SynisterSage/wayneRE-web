import { createElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site.js';

export function Seo({
  title,
  description = siteConfig.defaultDescription,
  path = '/',
  noIndex = false,
  image = new URL(siteConfig.defaultImage, siteConfig.url).toString(),
  imageAlt,
  type = 'website',
  schema,
}) {
  const fullTitle = title ? `${title} | ${siteConfig.brandName}` : siteConfig.defaultTitle;
  const canonical = new URL(path, siteConfig.url).toString();
  const robotsContent = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      '@id': new URL('/#real-estate-agent', siteConfig.url).toString(),
      name: siteConfig.brandName,
      alternateName: siteConfig.personName,
      url: siteConfig.url,
      logo: new URL('/logomark.svg', siteConfig.url).toString(),
      image: new URL('/headshot.png', siteConfig.url).toString(),
      email: siteConfig.localBusiness.email,
      telephone: siteConfig.localBusiness.telephone,
      address: {
        '@type': 'PostalAddress',
        ...siteConfig.localBusiness.address,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: siteConfig.localBusiness.telephone,
          availableLanguage: 'en',
        },
      ],
      areaServed: siteConfig.localBusiness.areaServed,
      sameAs: siteConfig.sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': new URL('/about#starlet-ferguson', siteConfig.url).toString(),
      name: siteConfig.personName,
      url: new URL('/about', siteConfig.url).toString(),
      image: new URL('/headshot.png', siteConfig.url).toString(),
      jobTitle: 'Real Estate Agent',
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.brandName,
        url: siteConfig.url,
      },
      areaServed: siteConfig.localBusiness.areaServed,
      sameAs: siteConfig.sameAs,
      knowsAbout: [
        'Wayne, NJ real estate',
        'Packanack Lake real estate',
        'Wayne, NJ neighborhoods',
        'Buyers and sellers in North Jersey',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.brandName,
      url: siteConfig.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const scripts = [...structuredData, ...schemaItems];
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
      key: 'robots',
      name: 'robots',
      content: robotsContent,
    }),
    createElement('meta', {
      key: 'googlebot',
      name: 'googlebot',
      content: robotsContent,
    }),
    createElement('meta', {
      key: 'theme-color',
      name: 'theme-color',
      content: '#fdfcf8',
    }),
    createElement('meta', {
      key: 'application-name',
      name: 'application-name',
      content: siteConfig.shortName,
    }),
    createElement('meta', {
      key: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      content: siteConfig.shortName,
    }),
    createElement('meta', {
      key: 'author',
      name: 'author',
      content: 'Starlet Ferguson',
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
      key: 'og:site_name',
      property: 'og:site_name',
      content: siteConfig.brandName,
    }),
    createElement('meta', {
      key: 'og:locale',
      property: 'og:locale',
      content: 'en_US',
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
    createElement('meta', {
      key: 'twitter:title',
      name: 'twitter:title',
      content: fullTitle,
    }),
    createElement('meta', {
      key: 'twitter:description',
      name: 'twitter:description',
      content: description,
    }),
    createElement('meta', {
      key: 'twitter:image',
      name: 'twitter:image',
      content: image,
    }),
    createElement('meta', {
      key: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: imageAlt || 'Starlet Ferguson and Wayne NJ Real Estate',
    }),
    createElement('meta', {
      key: 'twitter:site',
      name: 'twitter:site',
      content: '@starletsellsnj',
    }),
    createElement('meta', {
      key: 'twitter:creator',
      name: 'twitter:creator',
      content: '@starletsellsnj',
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
    // handled above via robotsContent
  }

  scripts.forEach((item, index) => {
    headChildren.push(
      createElement('script', {
        key: `schema-${index}`,
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(item) },
      }),
    );
  });

  if (image) {
    headChildren.push(
      createElement('meta', {
        key: 'og:image:width',
        property: 'og:image:width',
        content: '1600',
      }),
      createElement('meta', {
        key: 'og:image:height',
        property: 'og:image:height',
        content: '900',
      }),
      createElement('meta', {
        key: 'og:image:type',
        property: 'og:image:type',
        content: 'image/jpeg',
      }),
    );
  }

  return createElement(Helmet, null, ...headChildren);
}
