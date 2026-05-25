import Button from '../../ui/Button.jsx';
import Container from '../../ui/Container.jsx';
import heroImage from '/hero.jpg';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <Container className={styles.inner}>
        <header className={styles.content}>
          <p className={styles.eyebrow}>
            Wayne &amp; Packanack Lake
          </p>

          <h1
            id="home-hero-title"
            className={styles.title}
          >
            <span className="block">A local</span>
            <span className="block">perspective</span>
            <span className="block">
              on <em className="italic">home</em>.
            </span>
          </h1>

          <p className={styles.description}>
            Strategic guidance and neighborhood expertise for homeowners and future neighbors in
            Wayne, New Jersey.
          </p>

          <div className={styles.actions}>
            <Button to="/buy" variant="primary" className={`${styles.primaryButton} w-full sm:w-auto`}>
              Explore Local Listings
            </Button>
            <Button to="/sell" variant="secondary" className={`${styles.secondaryButton} w-full sm:w-auto`}>
              Selling Strategy
            </Button>
          </div>
        </header>

        <div className={styles.visual} aria-hidden="true">
          <img
            className={styles.image}
            src={heroImage}
            alt=""
            decoding="async"
            fetchPriority="high"
            loading="eager"
          />

          <blockquote className={styles.quoteCard}>
            <p>
              “Packanack is more than a location; it’s a community transition we help you navigate
              with precision.”
            </p>
            <footer>
              Starlet Ferguson
            </footer>
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
