import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Seo} from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import ListingCard from '../components/listings/ListingCard.jsx';
import {allListingsQuery, soldListingsQuery} from '../sanity/queries.js';
import {sanityClient} from '../sanity/client.js';

export default function Listings() {
  const [status, setStatus] = useState('loading');
  const [listings, setListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all([sanityClient.fetch(allListingsQuery), sanityClient.fetch(soldListingsQuery)]).then(([data, sold]) => {
      if (!active) return;
      setListings(Array.isArray(data) ? data : []);
      setSoldListings(Array.isArray(sold) ? sold : []);
      setStatus('ready');
    }).catch(() => active && setStatus('error'));
    return () => { active = false; };
  }, []);

  return (
    <>
      <Seo title="Current Listings" description="Explore homes currently represented by Starlet Ferguson in Wayne, NJ and Packanack Lake." path="/listings" />
      <main>
        <section className="bg-brand-cream">
          <Container className="py-16 sm:py-24 lg:py-32">
            <div className="max-w-4xl">
              <p className="text-[0.65rem] font-bold tracking-[0.04em] text-brand-lake">Current listings</p>
              <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.85rem,6vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.04em] text-stone-900">Homes with a sense of place.</h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-[1.75] text-stone-700 sm:text-[1.1rem]">A small collection of homes represented with thoughtful local guidance across Wayne and Packanack Lake.</p>
            </div>
          </Container>
        </section>
        <section className="bg-brand-sand">
          <Container className="py-14 sm:py-20 lg:py-28">
            {status === 'loading' ? <p className="text-stone-700">Loading listings...</p> : null}
            {status === 'error' ? <p className="text-stone-700">Listings are temporarily unavailable. <Link to="/contact" className="underline">Start a conversation</Link>.</p> : null}
            {status === 'ready' && listings.length === 0 ? <p className="max-w-xl text-[1.1rem] leading-[1.75] text-stone-700">Current listings are being prepared. For private opportunities or local guidance, <Link to="/contact" className="underline">start with a conversation</Link>.</p> : null}
            {status === 'ready' && listings.length > 0 ? <div className="grid gap-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">{listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}</div> : null}
            {status === 'ready' && soldListings.length > 0 ? <div className="mt-20 border-t border-stone-300 pt-10 sm:mt-28 sm:pt-14"><div className="max-w-2xl"><p className="text-[0.65rem] font-bold tracking-[0.04em] text-brand-lake">Past listings</p><h2 className="mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1] tracking-[-0.035em] text-stone-900">A record of homes represented.</h2></div><div className="mt-10 grid gap-12 md:grid-cols-2 lg:mt-14 lg:gap-x-16 lg:gap-y-20">{soldListings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}</div></div> : null}
          </Container>
        </section>
      </main>
    </>
  );
}
