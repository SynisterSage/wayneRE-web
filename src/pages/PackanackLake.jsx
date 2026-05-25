import React, { useState, useRef, useEffect } from 'react';
import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './PackanackLake.module.css';

const searchPoints = [
  {
    title: 'Lake access and proximity',
    copy: 'Homes closer to the water or with easier access can feel different from those deeper into the neighborhood.',
  },
  {
    title: 'Street setting and lot feel',
    copy: 'The street, the trees, and the way a lot sits all shape how a home reads in Packanack.',
  },
  {
    title: 'Updates, layout, and condition',
    copy: 'A home’s flow and finish matter, especially when buyers are comparing older lake homes and newer updates.',
  },
  {
    title: 'Seasonality and community rhythm',
    copy: 'The neighborhood has a pace that changes through the year, and that can influence how homes are viewed.',
  },
];

const localNotes = [
  'Packanack Lake is part of Wayne, NJ.',
  'The lake community has long-standing traditions tied to the beaches, clubs, and association life.',
  'The lake setting can influence how homes are searched, compared, and presented.',
  'Local context matters more here than a generic home search filter.',
];

const carouselImages = [
  '/carousel/lake1.jpeg',
  '/carousel/lake2.jpeg',
  '/carousel/lake3.jpeg',
  '/carousel/lake4.jpg',
  '/carousel/lake5.jpeg',
  '/carousel/lake6.jpeg',
  '/carousel/lake8.jpeg',
  '/carousel/lake9.jpg',
  '/carousel/lake10.jpeg',
];

function Carousel({ images = [], autoPlay = true, interval = 4500 }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const isInteracting = useRef(false);
  const autoplayRef = useRef(null);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    autoplayRef.current = () => {
      if (!isInteracting.current && images.length > 1) {
        setIndex((i) => (i + 1) % images.length);
      }
    };
  }, [images.length]);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = setInterval(() => autoplayRef.current && autoplayRef.current(), interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, images.length]);

  const onTouchStart = (e) => {
    isInteracting.current = true;
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startX.current == null) {
      isInteracting.current = false;
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    startX.current = null;
    setTimeout(() => (isInteracting.current = false), 600);
  };

  const onMouseEnter = () => (isInteracting.current = true);
  const onMouseLeave = () => (isInteracting.current = false);

  return (
    <div
      className={styles.carousel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.carouselViewport}>
        {images.map((src, i) => (
          <div
            key={i}
            className={styles.carouselSlide}
            style={{ transform: `translateX(${(i - index) * 100}%)` }}
            aria-hidden={i !== index}
            data-active={i === index}
          >
            <img src={src} alt={`Packanack ${i + 1}`} className={styles.carouselImage} />
          </div>
        ))}
      </div>

      <div className={styles.carouselControls}>
        <button onClick={prev} aria-label="Previous" className={styles.carouselButton}>
          ‹
        </button>
        <button onClick={next} aria-label="Next" className={styles.carouselButton}>
          ›
        </button>
      </div>
    </div>
  );
}

export default function PackanackLake() {
  return (
    <>
      <Seo
        title="Packanack Lake Real Estate Guide | Wayne NJ"
        description="A local guide to Packanack Lake in Wayne, NJ, including buyer context, seller strategy, lake community lifestyle, and what to know before making a move."
        path="/packanack-lake"
      />

      <main className={styles.page}>
        <Section className={styles.heroSection}>
          <Container className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>Packanack Lake, Wayne NJ</p>
                <h1 className={styles.heroTitle}>More than a search area.</h1>
                <div className={styles.heroLead}>
                  <p>
                    Packanack Lake is a lake community within Wayne, New Jersey, with a history,
                    layout, and daily rhythm that feel different from a standard suburban search.
                    Lake-front, lake-block, and interior streets can all read differently to
                    buyers, and that context matters when you are comparing homes or preparing one
                    for sale.
                  </p>
                </div>
              </div>

              <div className={styles.heroVisual} aria-hidden="true">
                <Carousel images={carouselImages} autoPlay={true} interval={5000} />
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.textBlock}>
              <p className={styles.sectionLabel}>What Shapes the Search</p>
              <h2 className={styles.sectionTitle}>What to pay attention to in Packanack.</h2>
            </div>

            <div className={styles.pointsGrid}>
              {searchPoints.map((point) => (
                <article key={point.title} className={styles.point}>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointCopy}>{point.copy}</p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionLight}>
          <Container className={styles.container}>
            <div className={styles.contextGrid}>
              <article className={styles.contextCard}>
                <p className={styles.sectionLabel}>Buying in Packanack</p>
                <h2 className={styles.sectionTitle}>Understand the home and the setting together.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    A listing can tell you the bedrooms and square footage, but the street, commute,
                    lake access, and daily routines often shape the real decision.
                  </p>
                </div>
                <Button to="/buy" variant="primary" className={styles.contextButton}>
                  Buyer Guidance
                </Button>
              </article>

              <article className={styles.contextCard}>
                <p className={styles.sectionLabel}>Selling in Packanack</p>
                <h2 className={styles.sectionTitle}>Positioning should reflect more than the property itself.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    The way a home is priced, prepared, photographed, and described should help
                    buyers understand the setting as clearly as the house.
                  </p>
                </div>
                <Button to="/sell" variant="primary" className={styles.contextButton}>
                  Seller Strategy
                </Button>
              </article>
            </div>
          </Container>
        </Section>

        <Section className={styles.sectionSand}>
          <Container className={styles.container}>
            <div className={styles.textBlock}>
              <p className={styles.sectionLabel}>Local Notes</p>
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
              <div className={styles.textBlock}>
                <p className={styles.sectionLabel}>Connect</p>
                <h2 className={styles.sectionTitle}>Thinking about Packanack?</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Whether you are buying, selling, or simply trying to understand how the lake
                    community fits into the Wayne market, start with a grounded local conversation.
                  </p>
                </div>

                <Button to="/contact" variant="primary" className={styles.finalButton}>
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
