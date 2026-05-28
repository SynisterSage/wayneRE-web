import { useEffect, useRef, useState } from 'react';
import Container from '../../ui/Container.jsx';
import { testimonials } from '../../../data/testimonials.js';
import { useScrollReveal } from '../../../hooks/useScrollReveal.js';

const DISPLAY_DURATION = 7000;
const FADE_DURATION = 360;
const FADE_RESET_DELAY = 24;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [sectionRef, isVisible] = useScrollReveal();
  const advanceTimerRef = useRef(null);
  const fadeResetTimerRef = useRef(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (testimonials.length < 2) {
      return undefined;
    }

    let disposed = false;

    const clearTimers = () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
      if (fadeResetTimerRef.current) {
        window.clearTimeout(fadeResetTimerRef.current);
        fadeResetTimerRef.current = null;
      }
    };

    const scheduleNext = () => {
      clearTimers();

      if (reducedMotion) {
        advanceTimerRef.current = window.setTimeout(() => {
          if (disposed) return;

          setActiveIndex((current) => (current + 1) % testimonials.length);
          scheduleNext();
        }, DISPLAY_DURATION);
        return;
      }

      advanceTimerRef.current = window.setTimeout(() => {
        if (disposed) return;

        setIsFading(true);
        fadeResetTimerRef.current = window.setTimeout(() => {
          if (disposed) return;

          setActiveIndex((current) => (current + 1) % testimonials.length);
          fadeResetTimerRef.current = window.setTimeout(() => {
            if (disposed) return;

            setIsFading(false);
            scheduleNext();
          }, FADE_RESET_DELAY);
        }, FADE_DURATION);
      }, DISPLAY_DURATION);
    };

    scheduleNext();

    return () => {
      disposed = true;
      clearTimers();
    };
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-brand-cream"
      style={{ scrollMarginTop: '6rem' }}
    >
      <Container className="py-16 sm:py-20 lg:py-32">
        <div
          className={`mx-auto max-w-4xl text-center transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ willChange: 'opacity, transform' }}
        >
          <div
            className="mx-auto flex w-full max-w-184 flex-col items-center gap-5"
            style={{ minHeight: '28rem' }}
          >
            <div
              className={`w-full transition-opacity ease-in-out motion-reduce:transition-none ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ transitionDuration: '360ms', willChange: 'opacity' }}
              aria-live="polite"
            >
              <blockquote className="mx-auto flex flex-col justify-center">
                <p className="font-serif text-[clamp(1.7rem,2.7vw,3.15rem)] italic leading-[1.32] tracking-[-0.03em] text-stone-900 sm:text-[clamp(1.9rem,2.4vw,3.2rem)]">
                  “{activeTestimonial.quote}”
                </p>
                <footer className="mt-10">
                  <p className="font-serif text-[1.1rem] italic leading-none text-stone-900 sm:text-[1.2rem]">
                    — {activeTestimonial.name}
                  </p>
                  {activeTestimonial.since ? (
                    <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-stone-500">
                      {activeTestimonial.since}
                    </p>
                  ) : null}
                </footer>
              </blockquote>
            </div>

            <div className="flex justify-center gap-1.5 text-brand-lake" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
