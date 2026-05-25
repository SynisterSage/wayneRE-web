export const allPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  "featuredImage": image{
    alt,
    asset,
    crop,
    hotspot
  }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  metaTitle,
  metaDescription,
  "featuredImage": image{
    alt,
    asset,
    crop,
    hotspot
  },
  body
}`;

export const categoryLabels = {
  'local-lifestyle': 'Local Lifestyle',
  'market-insight': 'Market Insight',
  'buying-strategy': 'Buying Strategy',
  'selling-strategy': 'Selling Strategy',
  'neighborhood-notes': 'Neighborhood Notes',
};
