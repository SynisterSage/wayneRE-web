import { useEffect, useRef, useState } from 'react';

export default function LocalPositioning() {
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
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-cream">
      <div className="mx-auto w-full max-w-384 px-6">
        <div
          className={`mx-auto max-w-3xl py-20 text-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:py-24 lg:py-32 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ willChange: 'opacity, transform' }}
        >
          <h2
            className={`font-serif text-[clamp(2.5rem,4.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '80ms' : '0ms', willChange: 'opacity, transform' }}
          >
            Specific to Wayne.
            <span className="block italic">Expert in Packanack.</span>
          </h2>

          <div
            className={`mx-auto my-10 h-px w-10 bg-stone-300/70 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            aria-hidden="true"
            style={{ transitionDelay: isVisible ? '150ms' : '0ms', willChange: 'opacity, transform' }}
          />

          <blockquote
            className={`mx-auto max-w-2xl text-[clamp(1rem,1.15vw,1.15rem)] leading-[1.8] text-stone-700 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '220ms' : '0ms', willChange: 'opacity, transform' }}
          >
            <p className="m-0 italic">
              In Packanack, the market moves with its own rhythm. Guidance here starts with the
              street, the setting, and the way the neighborhood lives day to day.
            </p>
          </blockquote>

          <p
            className={`mt-10 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-stone-700 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '300ms' : '0ms', willChange: 'opacity, transform' }}
          >
            Local Strategy, Lake Community, Wayne NJ Estate
          </p>
        </div>
      </div>
    </section>
  );
}
