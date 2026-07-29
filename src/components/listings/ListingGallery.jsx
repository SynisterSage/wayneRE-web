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
    <div>
      <div className="relative overflow-hidden bg-brand-sand">
        <img src={activeUrl} alt={activeImage.alt || listing.title} className="aspect-[4/3] w-full object-cover" />
        {images.length > 1 ? (
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <button type="button" onClick={showPrevious} aria-label="Previous listing image" className="grid h-11 w-11 place-items-center rounded-full bg-brand-cream/90 text-xl text-stone-900 transition-colors hover:bg-white">←</button>
            <button type="button" onClick={showNext} aria-label="Next listing image" className="grid h-11 w-11 place-items-center rounded-full bg-brand-cream/90 text-xl text-stone-900 transition-colors hover:bg-white">→</button>
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-7" aria-label="Listing image gallery">
          {images.map((image, index) => {
            const thumbnailUrl = urlFor(image).width(260).height(180).fit('crop').quality(75).auto('format').url();
            return <button type="button" key={`${image.asset?._ref || index}`} onClick={() => setActiveIndex(index)} aria-label={`View listing image ${index + 1}`} aria-pressed={activeIndex === index} className={`overflow-hidden ${activeIndex === index ? 'ring-2 ring-brand-lake ring-offset-2' : 'opacity-65 hover:opacity-100'}`}><img src={thumbnailUrl} alt="" className="aspect-[4/3] w-full object-cover" /></button>;
          })}
        </div>
      ) : null}
    </div>
  );
}
