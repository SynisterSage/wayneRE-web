import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';
import { useScrollReveal } from '../../../hooks/useScrollReveal.js';
import styles from './HomeValuationCTA.module.css';

const points = [
  'Local pricing context',
  'Preparation priorities',
  'Timing and positioning guidance',
];

export default function HomeValuationCTA() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} id="valuation" className={styles.section}>
      <Container className="py-18 sm:py-24 lg:py-32">
        <div className={styles.grid}>
          <div
            className={`${styles.left} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ willChange: 'opacity, transform' }}
          >
            <p className="text-[0.625rem] font-bold tracking-[0.04em] text-brand-lake">
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
            className={`${styles.right} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '120ms' : '0ms', willChange: 'opacity, transform' }}
          >
            <ol className={styles.list}>
              {points.map((point, index) => (
                <li
                  key={point}
                  className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${styles.item}`}
                  style={{ transitionDelay: isVisible ? `${index * 90 + 190}ms` : '0ms' }}
                >
                  <div className={styles.row}>
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    <p className={styles.label}>{point}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div
              className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${styles.buttonWrap} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '430ms' : '0ms', willChange: 'opacity, transform' }}
            >
              <Button to="/home-value" variant="primary" className="w-full sm:w-auto">
                Request a Home Valuation
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
