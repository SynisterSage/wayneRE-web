import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../ui/Container.jsx';

export default function PackanackFeature() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () =>
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
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-cream">
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div
            className={`relative mx-auto w-full max-w-[42rem] overflow-visible lg:mx-0 lg:justify-self-start transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-sand">
              <img
                src="/hero.jpg"
                alt="Aerial view of Packanack Lake in Wayne, New Jersey"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              className={`mx-auto -mt-12 w-[min(16rem,68%)] bg-[#eceeea] px-6 py-7 shadow-[0_0_0_1px_rgba(44,74,82,0.06)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:w-[16rem] lg:absolute lg:-right-6 lg:bottom-[-2.25rem] lg:mx-0 lg:mt-0 lg:w-[17rem] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '120ms' : '0ms', willChange: 'opacity, transform' }}
            >
              <p className="font-serif text-[1.35rem] leading-[1.18] tracking-[-0.02em] text-stone-900">
                90+ years of lake tradition.
              </p>
            </div>
          </div>

          <div className="flex items-center lg:pl-6">
            <div
              className={`max-w-2xl transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '160ms' : '0ms', willChange: 'opacity, transform' }}
            >
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-brand-lake">
                Neighborhood Spotlight
              </p>

              <h2
                className={`mt-5 font-serif text-[clamp(2.8rem,4.2vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? '240ms' : '0ms', willChange: 'opacity, transform' }}
              >
                A Specific Kind <span className="italic text-brand-lake">of Life.</span>
              </h2>

              <p
                className={`mt-8 max-w-160 text-[1rem] leading-[1.8] text-stone-700 sm:text-[1.08rem] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? '320ms' : '0ms', willChange: 'opacity, transform' }}
              >
                Packanack Lake is not just another neighborhood in Wayne. Lake-front, lake-block,
                and interior streets all move differently, and that affects how a home should be
                read, priced, and presented.
              </p>

              <p
                className={`mt-6 max-w-xl text-[0.96rem] leading-[1.8] text-stone-600 sm:text-[1rem] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? '400ms' : '0ms', willChange: 'opacity, transform' }}
              >
                The work starts with place: the shoreline, the setting, the lot, and the way the
                community actually lives through the seasons.
              </p>

              <div
                className={`mt-8 h-px w-10 bg-stone-300/70 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                aria-hidden="true"
                style={{ transitionDelay: isVisible ? '470ms' : '0ms', willChange: 'opacity, transform' }}
              />

              <Link
                to="/packanack-lake"
                className={`mt-8 inline-flex items-center gap-2 border-b border-stone-900 pb-1 text-[0.98rem] font-medium text-stone-900 no-underline transition-transform duration-200 ease-out hover:translate-x-2 hover:opacity-70 motion-reduce:transform-none motion-reduce:transition-none ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? '540ms' : '0ms' }}
              >
                <span>The Packanack Guide</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
