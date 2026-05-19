import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';
import { useScrollReveal } from '../../../hooks/useScrollReveal.js';

const points = [
  'Local pricing context',
  'Preparation priorities',
  'Timing and positioning guidance',
];

export default function HomeValuationCTA() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} id="valuation" className="bg-brand-cream">
      <Container className="py-18 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div
            className={`max-w-2xl transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ willChange: 'opacity, transform' }}
          >
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-brand-lake">
              Home Valuation
            </p>

            <h2
              className={`mt-5 font-serif text-[clamp(2.6rem,4vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '90ms' : '0ms', willChange: 'opacity, transform' }}
            >
              Thinking about selling?
              <span className="block italic text-brand-lake">Start with context.</span>
            </h2>

            <p
              className={`mt-6 max-w-2xl text-[1rem] leading-[1.85] text-stone-700 sm:text-[1.08rem] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '160ms' : '0ms', willChange: 'opacity, transform' }}
            >
              Before a sign goes in the yard, it helps to understand how your home fits the
              current local market. A thoughtful valuation looks at more than square footage - it
              considers timing, preparation, location, buyer expectations, and the story your home
              can tell.
            </p>
          </div>

          <div
            className={`border border-stone-200 bg-white/40 px-6 py-7 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:px-8 sm:py-8 lg:mt-2 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '120ms' : '0ms', willChange: 'opacity, transform' }}
          >
            <div className="grid gap-5">
              {points.map((point, index) => (
                <div
                  key={point}
                  className="border-b border-stone-200 pb-4 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none last:border-b-0 last:pb-0"
                  style={{
                    transitionDelay: isVisible ? `${index * 90 + 190}ms` : '0ms',
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <p className="text-[1rem] leading-[1.6] text-stone-800">{point}</p>
                </div>
              ))}
            </div>

            <div
              className={`mt-8 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '430ms' : '0ms', willChange: 'opacity, transform' }}
            >
              <Button href="#valuation" variant="primary" className="w-full sm:w-auto">
                Request a Home Valuation
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
