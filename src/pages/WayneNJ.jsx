import { Seo } from '../utils/seo.js';
import { siteConfig } from '../config/site.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './WayneNJ.module.css';

const facts = [
  {
    label: 'Passaic County township',
    copy: 'Wayne sits in Passaic County and has the scale of a full township, not a single neighborhood.',
  },
  {
    label: 'About 20 miles from Midtown Manhattan',
    copy: 'For many buyers, Wayne balances space and access without feeling removed from the region.',
  },
  {
    label: '2020 Census population: 54,838',
    copy: 'It is a substantial North Jersey town with a wide range of property types and settings.',
  },
  {
    label: 'William Paterson University',
    copy: 'The campus adds energy and daily activity to the town’s larger local fabric.',
  },
  {
    label: 'Willowbrook Mall, Wayne Towne Center, and local parks',
    copy: 'Shopping, errands, recreation, and open space all shape the way people live here.',
  },
  {
    label: 'NJ Transit access',
    copy: 'Wayne Route 23 Transit Center connects the town to bus service and the Montclair-Boonton Line.',
  },
];

const searchPoints = [
  {
    title: 'Commute and daily routes',
    copy: 'Routes in and out of town matter when the search has to fit real life, not just the listing photos.',
  },
  {
    title: 'Property style and condition',
    copy: 'Wayne includes everything from older homes with character to updated properties with a different feel.',
  },
  {
    title: 'Parks, shopping, and routines',
    copy: 'The town’s practical conveniences help shape how a home works day to day.',
  },
  {
    title: 'Setting, street, and neighborhood feel',
    copy: 'Location inside the town often changes how a buyer understands value and how a seller should present a home.',
  },
];

const localNotes = [
  'Wayne is home to William Paterson University, Willowbrook Mall, Wayne Towne Center, High Mountain Park Preserve, and Dey Mansion.',
  'Wayne Route 23 Transit Center gives the town NJ Transit bus and rail access, including the Montclair-Boonton Line.',
  'Packanack Lake is one distinct community within Wayne, but the broader town includes many other residential settings.',
  'A Wayne search usually works best when commute, setting, and property style are considered together.',
];

export default function WayneNJ() {
  return (
    <>
      <Seo
        title="Wayne NJ Real Estate Guide | Wayne & Packanack Homes"
        description="A local guide to Wayne, NJ real estate, including buyer context, seller strategy, commuter access, parks, shopping, Packanack Lake, and what to know before making a move."
        path="/wayne-nj"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Wayne NJ Real Estate Guide',
          url: new URL('/wayne-nj', siteConfig.url).toString(),
          description:
            'A local guide to Wayne, NJ real estate, including buyer context, seller strategy, commuter access, parks, shopping, Packanack Lake, and what to know before making a move.',
          about: {
            '@type': 'Place',
            name: 'Wayne, New Jersey',
          },
        }}
      />

      <main className={styles.page}>
        <Section className={styles.heroSection}>
          <Container className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Wayne, New Jersey</p>
                <h1 className={styles.heroTitle}>A practical local guide to Wayne real estate.</h1>
                <div className={styles.heroLead}>
                  <p>
                    Wayne offers a mix of lake communities, established neighborhoods, commuter
                    access, shopping, parks, and local history. The right move starts with
                    understanding how those pieces fit your life and your home search.
                  </p>
                </div>

                <div className={styles.heroActions}>
                  <Button to="/buy" variant="primary">
                    Explore Buying in Wayne
                  </Button>
                  <Button to="/sell" variant="secondary">
                    Selling in Wayne
                  </Button>
                </div>
              </div>

              <div className={styles.heroVisual} aria-hidden="true">
                <div className={styles.mosaic}>
                  <figure className={`${styles.frame} ${styles.frameTall}`}>
                    <img
                      src="/selling.jpeg"
                      alt=""
                      className={styles.image}
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                  <figure className={styles.frame}>
                    <img
                      src="/specific.jpeg"
                      alt=""
                      className={styles.image}
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                  <figure className={styles.frame}>
                    <img
                      src="/buying.jpeg"
                      alt=""
                      className={styles.image}
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Wayne at a glance</p>
              <h2 className={styles.sectionTitle}>Wayne at a glance.</h2>
            </div>

            <ul className={styles.factsList}>
              {facts.map((fact) => (
                <li key={fact.label} className={styles.factItem}>
                  <p className={styles.factLabel}>{fact.label}</p>
                  <p className={styles.factCopy}>{fact.copy}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.splitGrid}>
              <div className={styles.sectionCopyBlock}>
                <p className={styles.sectionLabel}>How Wayne lives</p>
                <h2 className={styles.sectionTitle}>A town with more than one rhythm.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Wayne is not a single type of market. Some buyers are drawn to lake
                    communities, some to commuter access, some to space, parks, and established
                    residential streets. For sellers, those differences change how a home should be
                    presented and positioned.
                  </p>
                </div>

                <div className={styles.sectionActions}>
                  <Button to="/packanack-lake" variant="text">
                    Explore Packanack Lake
                  </Button>
                </div>
              </div>

              <div className={styles.pointsGrid}>
                {searchPoints.map((point) => (
                  <article key={point.title} className={styles.point}>
                    <h4 className={styles.pointTitle}>{point.title}</h4>
                    <p className={styles.pointCopy}>{point.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.contextGrid}>
              <article className={styles.contextCard}>
                <p className={styles.sectionLabel}>Buying in Wayne</p>
                <h2 className={styles.sectionTitle}>A search that starts with more than the listing.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Timing, financing, commute patterns, and local context all shape which homes
                    are worth seeing.
                  </p>
                </div>
                <Button to="/buy" variant="primary" className={styles.contextButton}>
                  Buyer Guidance
                </Button>
              </article>

              <article className={styles.contextCard}>
                <p className={styles.sectionLabel}>Selling in Wayne</p>
                <h2 className={styles.sectionTitle}>Positioning starts before the listing goes live.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Pricing, preparation, photography, and local framing all matter when buyers
                    are comparing homes.
                  </p>
                </div>
                <Button to="/sell" variant="primary" className={styles.contextButton}>
                  Seller Strategy
                </Button>
              </article>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Local notes</p>
              <h2 className={styles.sectionTitle}>A few local notes.</h2>
            </div>

            <ul className={styles.noteList}>
              {localNotes.map((note) => (
                <li key={note} className={styles.noteItem}>
                  {note}
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.finalCta}>
              <div className={styles.sectionCopyBlock}>
                <p className={styles.sectionLabel}>Connect</p>
                <h2 className={styles.sectionTitle}>Thinking about Wayne?</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Whether you are buying, selling, or comparing Wayne to nearby towns, start
                    with a grounded local conversation.
                  </p>
                </div>

                <div className={styles.finalActions}>
                  <Button to="/contact" variant="primary">
                    Contact Starlet
                  </Button>
                  <Button to="/packanack-lake" variant="secondary">
                    Explore Packanack Lake
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
