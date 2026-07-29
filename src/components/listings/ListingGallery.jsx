import {useState} from 'react';
import {urlFor} from '../../sanity/image.js';

export default function ListingGallery({listing}) {
  const images = [listing.heroImage, ...(listing.gallery || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return <div className="aspect-[4/3] bg-brand-sand" aria-label="No listing images available" />;

  const activeImage = images[activeIndex];
  const activeUrl = urlFor(activeImage).width(1800).height(1200).fit('crop').quality(84).auto('format').url();

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % images.length);
  }

  return (
    <div aria-label="Listing photos">
      <div className="relative overflow-hidden bg-brand-sand">
        <img src={activeUrl} alt={activeImage.alt || listing.title} className="aspect-[5/4] w-full object-cover sm:aspect-[4/3]" />
        {images.length > 1 ? <span className="absolute left-4 top-4 bg-brand-cream/90 px-3 py-2 text-[0.62rem] font-bold tracking-[0.04em] text-stone-900">{activeIndex + 1} / {images.length}</span> : null}
        {images.length > 1 ? (
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <button type="button" onClick={showPrevious} aria-label="Previous listing image" className="grid h-10 w-10 place-items-center rounded-full bg-brand-cream/90 text-lg text-stone-900 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lake sm:h-11 sm:w-11">←</button>
            <button type="button" onClick={showNext} aria-label="Next listing image" className="grid h-10 w-10 place-items-center rounded-full bg-brand-cream/90 text-lg text-stone-900 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-lake sm:h-11 sm:w-11">→</button>
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-7 sm:overflow-visible" aria-label="Listing image thumbnails">
          {images.map((image, index) => {
            const thumbnailUrl = urlFor(image).width(260).height(180).fit('crop').quality(75).auto('format').url();
            return <button type="button" key={`${image.asset?._ref || index}`} onClick={() => setActiveIndex(index)} aria-label={`View listing image ${index + 1}`} aria-pressed={activeIndex === index} className={`w-20 shrink-0 overflow-hidden sm:w-auto ${activeIndex === index ? 'ring-2 ring-brand-lake ring-offset-2' : 'opacity-65 hover:opacity-100'}`}><img src={thumbnailUrl} alt="" className="aspect-[4/3] w-full object-cover" /></button>;
          })}
        </div>
      ) : null}
    </div>
  );
}
