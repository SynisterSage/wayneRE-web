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

export const listingFields = `
  _id,
  title,
  "slug": slug.current,
  status,
  price,
  propertyType,
  displayAddress,
  city,
  state,
  bedrooms,
  bathrooms,
  squareFeet,
  lotSize,
  neighborhood,
  summary,
  description,
  highlights,
  mlsUrl,
  featured,
  publishedAt,
  metaTitle,
  metaDescription,
  "heroImage": heroImage{alt, asset, crop, hotspot},
  "gallery": gallery[]{alt, asset, crop, hotspot}
`;

export const allListingsQuery = `*[_type == "listing" && defined(slug.current) && status in ["active", "under-contract"]] | order(featured desc, publishedAt desc) {${listingFields}}`;

export const soldListingsQuery = `*[_type == "listing" && defined(slug.current) && status == "sold"] | order(publishedAt desc) {${listingFields}}`;

export const listingBySlugQuery = `*[_type == "listing" && slug.current == $slug && status != "off-market"][0] {${listingFields}}`;

export const featuredListingQuery = `*[_type == "listing" && defined(slug.current) && featured == true && status in ["active", "under-contract"]] | order(publishedAt desc)[0] {${listingFields}}`;

export const listingStatusLabels = {
  active: 'Active listing',
  'under-contract': 'Under contract',
  sold: 'Sold',
  'off-market': 'Off market',
};
