import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './Sell.module.css';

const sellerSteps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description:
      'We begin with pricing context, timing, condition, and preparation priorities before the home ever goes live.',
    points: [
      'Local pricing guidance',
      'Preparation recommendations',
      'Timing considerations',
      'Condition and update review',
    ],
  },
  {
    number: '02',
    title: 'Presentation',
    description:
      'Photography, staging guidance, and listing presentation should help buyers understand the home clearly and naturally.',
    points: [
      'Photography and listing support',
      'Staging and presentation priorities',
      'Marketing exposure',
      'Clear listing language',
    ],
  },
  {
    number: '03',
    title: 'Offers & Closing',
    description:
      'From negotiations through closing, the goal is steady communication and thoughtful decision-making.',
    points: [
      'Offer and negotiation guidance',
      'Inspection coordination',
      'Attorney and transaction support',
      'Closing coordination',
    ],
  },
];

const sellerSupport = [
  'Local pricing guidance',
  'Preparation recommendations',
  'Photography and listing support',
  'Marketing exposure',
  'Offer and negotiation guidance',
  'Closing coordination',
];

export default function Sell() {
  return (
    <>
      <Seo
        title="Sell Your Home in Wayne NJ | Packanack Lake Seller Strategy"
        description="Selling in Wayne or Packanack Lake starts with local pricing context, preparation, presentation, and a thoughtful seller strategy."
        path="/sell"
      />

      <main className={styles.page}>
        <Section className={styles.heroSection}>
          <Container className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Wayne &amp; Packanack Lake</p>
                <h1 className={styles.heroTitle}>
                  Selling in Wayne starts before the listing does.
                </h1>
                <p className={styles.heroLead}>
                  Preparation, timing, and local context shape how buyers experience a home long
                  before an offer arrives.
                </p>

                <div className={styles.heroActions}>
                  <Button to="/home-value" variant="primary">
                    Request a Home Valuation
                  </Button>
                  <Button to="/contact" variant="secondary" className={styles.whiteButton}>
                    Contact Starlet
                  </Button>
                </div>
              </div>

            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>The Seller Process</p>
              <h2 className={styles.sectionTitle}>A thoughtful approach to selling.</h2>
              <div className={styles.sectionCopy}>
                <p>
                  Every home enters the market differently. The process begins with understanding
                  the property, the setting, and how buyers are likely to experience it.
                </p>
              </div>
            </div>

            <div className={styles.stepGrid}>
              {sellerSteps.map((step) => (
                <article key={step.number} className={styles.step}>
                  <p className={styles.stepNumber}>{step.number}</p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepCopy}>{step.description}</p>
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

            <ul className={styles.supportList}>
              {sellerSupport.map((item) => (
                <li key={item} className={styles.supportItem}>
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.contextGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Packanack Context</p>
                <h2 className={styles.sectionTitle}>Packanack homes move differently.</h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  Lake access, setting, updates, seasonality, and neighborhood rhythm can all shape
                  how buyers respond to a home in Packanack. Local context matters before pricing
                  and presentation decisions are made.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.valuationGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Home Valuation</p>
                <h2 className={styles.sectionTitle}>Thinking about selling? Start with context.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    A thoughtful valuation includes more than square footage and online estimates.
                    Timing, condition, preparation, and local demand all shape how a home should
                    enter the market.
                  </p>
                </div>

                <div className={styles.valuationActions}>
                  <Button to="/home-value" variant="primary">
                    Request a Home Valuation
                  </Button>
                  <Button to="/contact" variant="secondary" className={styles.whiteButton}>
                    Contact Starlet
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
