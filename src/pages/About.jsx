import { Seo } from '../utils/seo.js';
import { siteConfig } from '../config/site.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './About.module.css';

const faqs = [
  {
    question: 'What is the average home price in Wayne, NJ?',
    answer:
      'Recent figures can change quickly, and pricing varies by property, location, condition, and market conditions. A current local conversation is usually more useful than a static average.',
  },
  {
    question: 'How are property taxes in Wayne, NJ?',
    answer:
      'Property taxes vary by home and tax history. Buyers should review current tax records and confirm details with the township and listing documents before making a decision.',
  },
  {
    question: 'How are the schools in Wayne, NJ?',
    answer:
      'Wayne Township Public Schools serve the area. School information should be reviewed through the district and independent education resources so you can compare current details directly.',
  },
  {
    question: 'What neighborhoods are popular in Wayne, NJ?',
    answer:
      'Different buyers are drawn to different parts of Wayne for different reasons. Packanack Lake, for example, has its own community rhythm, while other neighborhoods are shaped by commute patterns, lot types, and home style.',
  },
  {
    question: 'How is the commute from Wayne to NYC?',
    answer:
      'Commute options vary depending on where you live in Wayne and how you travel. Buyers should review current transit details, traffic patterns, and station access before assuming a standard commute time.',
  },
  {
    question: 'What is there to do in Wayne?',
    answer:
      'Wayne has parks, lake communities, recreation programs, library resources, neighborhood gatherings, and everyday routines that make it feel lived-in rather than purely residential.',
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Starlet Ferguson | Wayne NJ Real Estate"
        description="Learn about Starlet Ferguson, a Wayne NJ real estate professional serving Packanack Lake buyers, sellers, and local homeowners with a boutique, relationship-first approach."
        path="/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'About Starlet Ferguson',
          url: new URL('/about', siteConfig.url).toString(),
          mainEntity: {
            '@type': 'Person',
            name: siteConfig.personName,
            jobTitle: 'Real Estate Agent',
            url: siteConfig.url,
            image: new URL('/headshot.png', siteConfig.url).toString(),
            sameAs: siteConfig.sameAs,
            worksFor: {
              '@type': 'Organization',
              name: siteConfig.brandName,
              url: siteConfig.url,
            },
            knowsAbout: [
              'Wayne, NJ real estate',
              'Packanack Lake real estate',
              'First-time homebuyer support',
              'Seller strategy in Wayne, NJ',
            ],
          },
        }}
      />

      <main className={styles.page}>
        <Section className={styles.heroSection}>
          <Container className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>About Starlet</p>
                <h1 className={styles.heroTitle}>
                  Wayne NJ real estate guidance from Starlet Ferguson.
                </h1>
                <div className={styles.heroLead}>
                  <p>
                    Starlet Ferguson is a Wayne NJ real estate professional serving Packanack
                    Lake, Wayne, and the surrounding area with a boutique, relationship-first
                    approach.
                  </p>
                </div>

                <Button to="/consult" variant="primary" className={styles.heroButton}>
                  Schedule a Consultation
                </Button>
              </div>

              <div className={styles.headshotWrap} aria-label="Starlet Ferguson headshot">
                <div className={styles.headshot}>
                  <img
                    src="/headshot.png"
                    alt="Starlet Ferguson"
                    className={styles.headshotImage}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Who I Am</p>
                <h2 className={styles.sectionTitle}>
                  A local real estate professional rooted in Wayne and Packanack Lake.
                </h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  Based in Wayne, NJ, Starlet works with buyers and sellers throughout Packanack
                  Lake, Wayne, and surrounding neighborhoods. Her approach is calm and direct:
                  helping clients move through major real estate decisions with clarity, confidence,
                  and a clear sense of what comes next.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>First-Time Buyers</p>
                <h2 className={styles.sectionTitle}>
                  Helping first-time buyers understand what support may be available in Wayne NJ.
                </h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  For first-time buyers, it can be worth exploring programs and credits that may
                  help depending on eligibility and current terms. That can include resources such
                  as the NJHMFA Down Payment Assistance Program, the NJ First-Time Homebuyer
                  Mortgage Program, and lender credits or grants that may vary by lender and
                  qualification.
                </p>
                <p>
                  Those options are not guaranteed, and availability can change, but a careful
                  review of what may apply can be useful early in the process.
                </p>
                <Button to="/buy" variant="primary" className={styles.inlineButton}>
                  Learn About Buying in Wayne
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Packanack Sellers</p>
                <h2 className={styles.sectionTitle}>
                  Packanack Lake seller strategy with local context.
                </h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  Starlet is closely rooted in the Packanack Lake community and brings that local
                  context to seller strategy. The work starts with understanding what draws buyers
                  to the area, then shaping pricing, preparation, marketing, and presentation
                  around the setting as well as the home itself.
                </p>
                <Button to="/sell" variant="primary" className={styles.inlineButton}>
                  Explore Seller Strategy
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Boutique Approach</p>
                <h2 className={styles.sectionTitle}>A more personal way to work in Wayne NJ.</h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  The practice is intentionally boutique: direct communication, a limited client
                  load, and no unnecessary layers between the client and the agent. It is a
                  relationship-first approach built around steady guidance, clear information, and
                  trust.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Common Questions</p>
                <h2 className={styles.sectionTitle}>Common questions about Wayne NJ real estate.</h2>
              </div>

              <div className={styles.faqList}>
                {faqs.map((item) => (
                  <details key={item.question} className={styles.faqItem}>
                    <summary className={styles.faqSummary}>{item.question}</summary>
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.finalCta}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Starlet Ferguson</p>
                <h2 className={styles.sectionTitle}>Have a question about Wayne or Packanack?</h2>
              </div>

              <div className={styles.sectionCopy}>
                <p>
                  Whether you are buying, selling, or simply trying to understand your options,
                  start with a local conversation.
                </p>
                <Button to="/contact" variant="primary" className={styles.inlineButton}>
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
