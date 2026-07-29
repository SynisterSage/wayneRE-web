import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Seo} from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import PortableContent from '../components/blog/PortableContent.jsx';
import ListingGallery from '../components/listings/ListingGallery.jsx';
import {formatPrice} from '../utils/listing.js';
import {listingBySlugQuery, listingStatusLabels} from '../sanity/queries.js';
import {sanityClient} from '../sanity/client.js';
import {urlFor} from '../sanity/image.js';
import {trackEvent} from '../utils/analytics.js';

export default function ListingDetail() {
  const {slug} = useParams();
  const [status, setStatus] = useState('loading');
  const [listing, setListing] = useState(null);

  useEffect(() => {
    let active = true;
    sanityClient.fetch(listingBySlugQuery, {slug}).then((data) => {
      if (!active) return;
      setListing(data || null);
      setStatus(data ? 'ready' : 'empty');
    }).catch(() => active && setStatus('error'));
    return () => { active = false; };
  }, [slug]);

  if (status === 'loading') return <main className="bg-brand-cream"><Container className="py-32"><p className="text-stone-700">Loading listing...</p></Container></main>;
  if (status !== 'ready') return <main className="bg-brand-cream"><Container className="py-32"><h1 className="font-serif text-4xl text-stone-900">This listing is no longer available.</h1><Link to="/listings" className="mt-6 inline-block underline">Return to listings</Link></Container></main>;

  const image = listing.heroImage ? urlFor(listing.heroImage).width(1600).height(1000).fit('crop').url() : undefined;
  const facts = [['Beds', listing.bedrooms], ['Baths', listing.bathrooms], ['Square feet', listing.squareFeet ? listing.squareFeet.toLocaleString() : null]];
  const description = listing.summary;

  return (
    <>
      <Seo title={listing.title} description={description} path={`/listings/${listing.slug}`} image={image} imageAlt={listing.heroImage?.alt || listing.title} type="article" schema={{'@context': 'https://schema.org', '@type': 'RealEstateListing', name: listing.title, description, url: `https://www.waynenjrealestate.com/listings/${listing.slug}`, image, offers: listing.price ? {'@type': 'Offer', price: listing.price, priceCurrency: 'USD'} : undefined, address: {'@type': 'PostalAddress', addressLocality: listing.city || 'Wayne', addressRegion: listing.state || 'NJ'}}} />
      <main className="bg-brand-cream">
        <Container className="py-10 sm:py-16 lg:py-24">
          <Link to="/listings" className="inline-flex min-h-10 items-center text-[0.68rem] font-bold tracking-[0.04em] text-brand-lake no-underline hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-lake">← All listings</Link>
          <div className="mt-6 grid gap-10 sm:mt-10 sm:gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-20">
            <ListingGallery listing={listing} />
            <div className="self-start lg:sticky lg:top-8">
              <p className="text-[0.62rem] font-bold tracking-[0.04em] text-brand-lake">{listingStatusLabels[listing.status] || listing.status}</p>
              <h1 className="mt-4 font-serif text-[clamp(2.65rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-stone-900">{listing.title}</h1>
              <p className="mt-4 text-[1rem] leading-[1.6] text-stone-700 sm:text-[1.05rem]">{listing.displayAddress}</p>
              {formatPrice(listing.price) ? <p className="mt-6 text-[1.65rem] text-stone-900 sm:mt-8 sm:text-2xl">{formatPrice(listing.price)}</p> : null}
              <div className="mt-6 grid grid-cols-2 gap-y-5 border-y border-stone-300 py-5 sm:mt-8 sm:grid-cols-4 sm:py-6 lg:grid-cols-2">
                {facts.filter(([, value]) => value !== null && value !== undefined && value !== '').map(([label, value]) => <div key={label}><p className="text-[0.62rem] font-bold tracking-[0.04em] text-stone-500">{label}</p><p className="mt-1 text-[1rem] text-stone-900">{value}</p></div>)}
              </div>
              <p className="mt-6 text-[1rem] leading-[1.75] text-stone-700 sm:mt-8">{listing.summary}</p>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:gap-4"><Button to={`/contact?listingTitle=${encodeURIComponent(listing.title)}&address=${encodeURIComponent(listing.displayAddress || '')}`} className="w-full sm:w-auto">Ask about this home</Button>{listing.mlsUrl ? <Button href={listing.mlsUrl} variant="secondary" target="_blank" rel="noreferrer" onClick={() => trackEvent('listing_mls_click', {listing_slug: listing.slug, listing_title: listing.title})} className="w-full sm:w-auto">View full MLS listing</Button> : null}</div>
            </div>
          </div>
          <div className="mt-16 border-t border-stone-300 pt-10 sm:mt-24 sm:pt-14">
            <div className="max-w-2xl"><p className="text-[0.62rem] font-bold tracking-[0.04em] text-brand-lake">The home</p><div className="mt-5 sm:mt-6"><PortableContent value={listing.description} /></div></div>
          </div>
        </Container>
      </main>
    </>
  );
}
