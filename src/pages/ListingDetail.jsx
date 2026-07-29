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
  const facts = [['Beds', listing.bedrooms], ['Baths', listing.bathrooms], ['Square feet', listing.squareFeet ? listing.squareFeet.toLocaleString() : null], ['Lot', listing.lotSize]];
  const description = listing.metaDescription || listing.summary;

  return (
    <>
      <Seo title={listing.metaTitle || listing.title} description={description} path={`/listings/${listing.slug}`} image={image} imageAlt={listing.heroImage?.alt || listing.title} type="article" schema={{'@context': 'https://schema.org', '@type': 'RealEstateListing', name: listing.title, description, url: `https://www.waynenjrealestate.com/listings/${listing.slug}`, image, offers: listing.price ? {'@type': 'Offer', price: listing.price, priceCurrency: 'USD'} : undefined, address: {'@type': 'PostalAddress', addressLocality: listing.city || 'Wayne', addressRegion: listing.state || 'NJ'}}} />
      <main className="bg-brand-cream">
        <Container className="py-12 sm:py-20 lg:py-28">
          <Link to="/listings" className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-brand-lake no-underline hover:opacity-70">← All listings</Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.6fr)] lg:gap-20">
            <ListingGallery listing={listing} />
            <div className="self-start lg:sticky lg:top-8">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-lake">{listingStatusLabels[listing.status] || listing.status}</p>
              <h1 className="mt-5 font-serif text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-stone-900">{listing.title}</h1>
              <p className="mt-5 text-[1.05rem] leading-[1.6] text-stone-700">{listing.displayAddress}</p>
              {formatPrice(listing.price) ? <p className="mt-8 text-2xl text-stone-900">{formatPrice(listing.price)}</p> : null}
              <div className="mt-8 grid grid-cols-2 gap-y-5 border-y border-stone-300 py-6 sm:grid-cols-4 lg:grid-cols-2">
                {facts.filter(([, value]) => value !== null && value !== undefined && value !== '').map(([label, value]) => <div key={label}><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-stone-500">{label}</p><p className="mt-1 text-[1rem] text-stone-900">{value}</p></div>)}
              </div>
              <p className="mt-8 text-[1rem] leading-[1.75] text-stone-700">{listing.summary}</p>
              <div className="mt-8 flex flex-wrap gap-4"><Button to={`/contact?listingTitle=${encodeURIComponent(listing.title)}&address=${encodeURIComponent(listing.displayAddress || '')}`}>Ask about this home</Button>{listing.mlsUrl ? <Button href={listing.mlsUrl} variant="secondary" target="_blank" rel="noreferrer" onClick={() => trackEvent('listing_mls_click', {listing_slug: listing.slug, listing_title: listing.title})}>View full MLS listing</Button> : null}</div>
            </div>
          </div>
          <div className="mt-20 grid gap-12 border-t border-stone-300 pt-12 lg:mt-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            {listing.highlights?.length ? <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-lake">At a glance</p><ul className="mt-6 space-y-3 text-[1rem] leading-[1.6] text-stone-700">{listing.highlights.map((item) => <li key={item}>— {item}</li>)}</ul></div> : null}
            <div className="max-w-2xl"><p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-lake">The home</p><div className="mt-6"><PortableContent value={listing.description} /></div></div>
          </div>
        </Container>
      </main>
    </>
  );
}
