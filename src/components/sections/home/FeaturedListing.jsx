import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Container from '../../ui/Container.jsx';
import {featuredListingQuery} from '../../../sanity/queries.js';
import {sanityClient} from '../../../sanity/client.js';
import {urlFor} from '../../../sanity/image.js';
import {formatPrice} from '../../../utils/listing.js';

export default function FeaturedListing() {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    let active = true;
    sanityClient.fetch(featuredListingQuery).then((data) => active && setListing(data || null)).catch(() => {});
    return () => { active = false; };
  }, []);

  if (!listing) return null;

  const imageUrl = listing.heroImage ? urlFor(listing.heroImage).width(1500).height(1100).fit('crop').quality(82).auto('format').url() : null;

  return (
    <section className="bg-brand-sand">
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:py-32">
        <Link to={`/listings/${listing.slug}`} className="group block overflow-hidden bg-brand-cream">
          {imageUrl ? <img src={imageUrl} alt={listing.heroImage.alt || listing.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:transform-none" loading="lazy" decoding="async" /> : <div className="aspect-[4/3]" />}
        </Link>
        <div>
          <p className="text-[0.65rem] font-bold tracking-[0.04em] text-brand-lake">A home currently represented</p>
          <h2 className="mt-5 font-serif text-[clamp(2.5rem,4vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em] text-stone-900">{listing.title}</h2>
          <p className="mt-4 text-[1rem] leading-[1.6] text-stone-700">{listing.displayAddress}</p>
          {formatPrice(listing.price) ? <p className="mt-6 text-xl text-stone-900">{formatPrice(listing.price)}</p> : null}
          <p className="mt-6 max-w-lg text-[1rem] leading-[1.75] text-stone-700">{listing.summary}</p>
          <Link to={`/listings/${listing.slug}`} className="mt-8 inline-flex border-b border-stone-900 pb-1 text-[0.92rem] font-medium text-stone-900 no-underline transition-opacity hover:opacity-65">View the listing <span aria-hidden="true" className="ml-3">→</span></Link>
        </div>
      </Container>
    </section>
  );
}
