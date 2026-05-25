import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './Buy.module.css';

const buyerSteps = [
  {
    number: '01',
    title: 'Discovery & Game Plan',
    description:
      'Before touring homes, we focus on preparation. Budget, financing, timing, commute patterns, neighborhood preferences, and long-term goals all shape the search more than square footage alone.',
    points: [
      'First-time buyer guidance and readiness planning',
      'Down payment and closing cost program awareness',
      'Lender introductions and financing preparation',
      'Local market context for Wayne and Packanack',
      'Defining priorities, non-negotiables, and lifestyle goals',
    ],
  },
  {
    number: '02',
    title: 'Curated Search',
    description:
      'The right home is rarely just a filtered listing result. Street position, neighborhood rhythm, lake access, updates, layout flow, and long-term value all influence how a home actually lives day to day.',
    points: [
      'Personalized home recommendations',
      'Guidance across Wayne and nearby communities',
      'Local insight into neighborhoods and commuting',
      'Lifestyle-focused property tours',
      'Context around schools, parks, clubs, and routines',
      'Strategic evaluation of value and resale potential',
    ],
  },
  {
    number: '03',
    title: 'Offer & Closing',
    description:
      'Once the right home appears, the goal becomes moving decisively and carefully. Offer structure, negotiation strategy, inspections, and communication all shape how smoothly the process unfolds.',
    points: [
      'Offer and negotiation guidance',
      'Inspection and attorney coordination',
      'Vendor and contractor recommendations',
      'Transaction management through closing',
      'Organized communication and timeline support',
      'Practical guidance from accepted offer to keys in hand',
    ],
  },
];

const KW_SEARCH_URL = 'https://starletsellsnj.kw.com/search/sale/Wayne-NJ-USA/984636?q=Wayne,%20NJ,%20USA';

export default function Buy() {
  return (
    <>
      <Seo
        title="Buy a Home in Wayne NJ | Packanack Lake Buyer Blueprint"
        description="Buying in Wayne and Packanack starts with local context, preparation, and a grounded plan for the right home search."
        path="/buy"
      />

      <main className={styles.page}>
        <Section className={styles.hero}>
          <Container className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <p className={styles.eyebrow}>Buyer Blueprint</p>
                <h1 className={styles.heroTitle}>The Buyer Blueprint</h1>
                <div className={styles.sectionCopy}>
                  <p>
                    Buying in Wayne and Packanack should feel informed, not rushed. The process
                    works best when the search begins with clarity: understanding what matters
                    most, what the market is doing locally, and how to move with confidence when
                    the right home appears.
                  </p>
                  <p>The Buyer Blueprint is designed to simplify the process into three grounded steps.</p>
                </div>

                <div className={styles.heroActions}>
                  <Button
                    href={KW_SEARCH_URL}
                    variant="primary"
                    className={styles.fullWidthButton}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Buyer Search
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionWhite}>
          <Container className={styles.container}>
            <div className={styles.textBlock}>
              <p className={styles.sectionLabel}>Buyer Strategy</p>
              <h2 className={styles.sectionTitle}>Three grounded steps, from first conversation to closing.</h2>
            </div>

            <div className={styles.pillarsGrid}>
              {buyerSteps.map((step) => (
                <article key={step.number} className={styles.pillar}>
                  <p className={styles.pillarNumber}>{step.number}</p>
                  <h3 className={styles.pillarTitle}>{step.title}</h3>
                  <p className={styles.pillarCopy}>{step.description}</p>
                  <ul className={styles.pointList}>
                    {step.points.map((point) => (
                      <li key={point} className={styles.pointItem}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className={styles.valuationSection} id="valuation">
          <Container className={styles.container}>
            <div className={styles.valuationWrap}>
              <div className={styles.textBlock}>
                <p className={styles.sectionLabel}>Wayne Listings</p>
                <h2 className={styles.sectionTitle}>Start with the current market.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Use the live Wayne search below to explore active homes. It is a useful
                    starting point, but the best next step is translating what you see into a
                    search plan that fits your timeline, financing, and priorities.
                  </p>
                </div>
              </div>

              <div className={styles.searchShell}>
                <div className={styles.searchWindow}>
                  <div className={styles.searchWindowBar} aria-hidden="true">
                    <span className={styles.windowDot} />
                    <span className={styles.windowDot} />
                    <span className={styles.windowDot} />
                    <span className={styles.windowUrl}>
                      starletsellsnj.kw.com/search/sale/Wayne-NJ-USA/984636
                    </span>
                  </div>

                  <div className={styles.searchWindowBody}>
                    <p className={styles.searchWindowTitle}>Wayne, NJ live search</p>
                    <p className={styles.searchWindowCopy}>
                      The Keller Williams search is best used directly in a browser. Open the live
                      search to browse current listings in Wayne and compare what is active now.
                    </p>
                    <Button
                      href={KW_SEARCH_URL}
                      variant="primary"
                      className={styles.searchWindowButton}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Buyer Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSoft}>
          <Container className={styles.container}>
            <div className={styles.bridge}>
              <div className={styles.textBlock}>
                <p className={styles.sectionLabel}>Contact Bridge</p>
                <h2 className={styles.sectionTitle}>Prefer to talk it through first?</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    If you are not ready to start with the listings, you can still ask a question,
                    talk through timing, or get a grounded read on what a search in Wayne or
                    Packanack may look like.
                  </p>
                </div>

                <Button to="/contact" variant="primary" className={styles.bridgeButton}>
                  Contact Starlet
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
