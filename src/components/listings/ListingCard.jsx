import {Link} from 'react-router-dom';
import {urlFor} from '../../sanity/image.js';
import {listingStatusLabels} from '../../sanity/queries.js';
import {formatPrice} from '../../utils/listing.js';

export default function ListingCard({listing}) {
  const imageUrl = listing.heroImage ? urlFor(listing.heroImage).width(1200).height(850).fit('crop').quality(82).auto('format').url() : null;

  return (
    <article className="group min-w-0">
      <Link to={`/listings/${listing.slug}`} className="block overflow-hidden bg-brand-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lake">
        {imageUrl ? (
            <img src={imageUrl} alt={listing.heroImage.alt || listing.title} className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none sm:aspect-[4/3]" loading="lazy" decoding="async" />
        ) : <div className="aspect-[4/3]" aria-hidden="true" />}
      </Link>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[0.62rem] font-bold tracking-[0.04em] text-brand-lake">
        <span>{listingStatusLabels[listing.status] || listing.status}</span>
        {formatPrice(listing.price) ? <span className="text-stone-700">{formatPrice(listing.price)}</span> : null}
      </div>
      <h2 className="mt-3 font-serif text-[clamp(1.55rem,2.6vw,2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-stone-900">
        <Link to={`/listings/${listing.slug}`} className="no-underline hover:opacity-70">{listing.title}</Link>
      </h2>
      <p className="mt-2 text-[0.95rem] leading-[1.6] text-stone-700">{listing.displayAddress}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.78rem] text-stone-500">
        {listing.bedrooms ? <span>{listing.bedrooms} beds</span> : null}
        {listing.bathrooms ? <span>{listing.bathrooms} baths</span> : null}
        {listing.squareFeet ? <span>{listing.squareFeet.toLocaleString()} sq ft</span> : null}
      </div>
    </article>
  );
}
