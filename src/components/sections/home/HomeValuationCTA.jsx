import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';

const points = [
  'Local pricing context',
  'Preparation priorities',
  'Timing and positioning guidance',
];

export default function HomeValuationCTA() {
  return (
    <section id="valuation" className="bg-brand-cream">
      <Container className="py-18 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-brand-lake">
              Home Valuation
            </p>

            <h2 className="mt-5 font-serif text-[clamp(2.6rem,4vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900">
              Thinking about selling?
              <span className="block italic text-brand-lake">Start with context.</span>
            </h2>

            <p className="mt-6 max-w-[42rem] text-[1rem] leading-[1.85] text-stone-700 sm:text-[1.08rem]">
              Before a sign goes in the yard, it helps to understand how your home fits the
              current local market. A thoughtful valuation looks at more than square footage - it
              considers timing, preparation, location, buyer expectations, and the story your home
              can tell.
            </p>
          </div>

          <div className="border border-stone-200 bg-white/40 px-6 py-7 sm:px-8 sm:py-8 lg:mt-2">
            <div className="grid gap-5">
              {points.map((point) => (
                <div key={point} className="border-b border-stone-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-[1rem] leading-[1.6] text-stone-800">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
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
