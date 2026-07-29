import {defineField, defineType} from 'sanity'

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Alt text',
    type: 'string',
    description: 'Describe the image for visitors using a screen reader.',
    validation: (rule) => rule.required(),
  }),
]

export const listingType = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Public title', type: 'string', validation: (rule) => rule.required().min(10).max(120)}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({
      name: 'status',
      title: 'Listing status',
      description: 'Off market listings are hidden. Sold listings remain visible under Past listings.',
      type: 'string',
      options: {list: [
        {title: 'Active', value: 'active'},
        {title: 'Under contract', value: 'under-contract'},
        {title: 'Sold', value: 'sold'},
        {title: 'Off market', value: 'off-market'},
      ], layout: 'dropdown'},
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'price', title: 'Price', type: 'number', validation: (rule) => rule.required().min(0)}),
    defineField({name: 'propertyType', title: 'Property type', type: 'string', options: {list: ['Single-family home', 'Townhouse', 'Condominium', 'Land', 'Multi-family']}}),
    defineField({name: 'displayAddress', title: 'Display address', type: 'string', description: 'The address or neighborhood shown publicly on the site.', validation: (rule) => rule.required()}),
    defineField({name: 'city', title: 'City', type: 'string', initialValue: 'Wayne'}),
    defineField({name: 'state', title: 'State', type: 'string', initialValue: 'NJ'}),
    defineField({name: 'bedrooms', title: 'Bedrooms', type: 'number', validation: (rule) => rule.min(0)}),
    defineField({name: 'bathrooms', title: 'Bathrooms', type: 'number', validation: (rule) => rule.min(0)}),
    defineField({name: 'squareFeet', title: 'Square feet', type: 'number', validation: (rule) => rule.min(0)}),
    defineField({name: 'lotSize', title: 'Lot size', type: 'string'}),
    defineField({name: 'neighborhood', title: 'Neighborhood', type: 'string'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, fields: imageFields}),
    defineField({name: 'gallery', title: 'Gallery', description: 'Images appear in this order after the hero image. Drag to reorder.', type: 'array', of: [{type: 'image', options: {hotspot: true}, fields: imageFields}]}),
    defineField({name: 'summary', title: 'Short summary', type: 'text', rows: 3, validation: (rule) => rule.required().min(40).max(300)}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [{type: 'block'}], validation: (rule) => rule.required()}),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'mlsUrl', title: 'MLS link', type: 'url', description: 'Paste the public MLS listing URL.', validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']})}),
    defineField({name: 'featured', title: 'Feature on homepage', description: 'Only one listing should normally be featured. The newest featured listing is shown.', type: 'boolean', initialValue: false}),
    defineField({name: 'publishedAt', title: 'Published date', description: 'Used to order listings when they have the same featured status.', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required()}),
    defineField({name: 'metaTitle', title: 'SEO title', type: 'string', description: 'Optional SEO title for this listing.', validation: (rule) => rule.max(70)}),
    defineField({name: 'metaDescription', title: 'SEO description', type: 'text', rows: 3, description: 'Optional SEO description for this listing.', validation: (rule) => rule.max(170)}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'displayAddress', media: 'heroImage'},
  },
})
