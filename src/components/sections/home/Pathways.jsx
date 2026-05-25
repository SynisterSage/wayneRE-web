import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../ui/Container.jsx';

const pathways = [
  {
    title: "The Seller's Strategy",
    description:
      'Preparation is our greatest competitive advantage. We help you curate and position your home for a careful market transition.',
    href: '/sell',
    cta: 'Explore Selling Strategy',
    imageAlt: 'A modern interior with glass walls and a quiet hallway',
    imageClass: 'object-center',
  },
  {
    title: "Buying in Wayne",
    description:
      "Finding your place in Wayne requires more than a search. We offer a local's guide to neighborhoods, schools, and lake culture.",
    href: '/buy',
    cta: 'Learn About Buying in Wayne',
    imageAlt: 'A contemporary exterior with a pool and landscaped outdoor space',
    imageClass: 'object-[center_right]',
  },
];

export default function Pathways() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-sand">
      <Container className="pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {pathways.map((pathway, index) => (
            <article
              key={pathway.title}
              className={`group space-y-6 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 140}ms` : '0ms',
                willChange: 'opacity, transform',
              }}
            >
              <div
                className={`overflow-hidden bg-brand-sand transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 140 + 90}ms` : '0ms' }}
              >
                <img
                  src="/hero.jpg"
                  alt={pathway.imageAlt}
                  className={`h-72 w-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-105 sm:h-88 lg:h-96 ${pathway.imageClass}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>

              <div
                className={`space-y-4 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 140 + 160}ms` : '0ms' }}
              >
                <h3 className="font-serif text-[clamp(1.9rem,2.7vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-stone-900">
                  {pathway.title}
                </h3>
                <p className="max-w-136 text-[1rem] leading-[1.75] text-stone-700 sm:text-[1.05rem]">
                  {pathway.description}
                </p>
                <Link
                  to={pathway.href}
                  className="inline-flex items-center gap-2 border-b border-stone-900 pb-1 text-[0.98rem] font-medium text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
                >
                  <span className="inline-flex items-center gap-2 transition-transform duration-200 ease-out group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:transform-none">
                    {pathway.cta}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
