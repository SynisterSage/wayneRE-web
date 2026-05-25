import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact | Wayne NJ & Packanack Lake Real Estate"
        description="Contact Starlet Ferguson for buyer guidance, seller planning, and local real estate insight in Wayne, NJ and Packanack Lake."
        path="/contact"
      />

      <main className={styles.page}>
        <Section className={styles.section}>
          <Container className={styles.container}>
              <form
                className={styles.form}
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className={styles.layout}>
                  <div className={styles.intro}>
                    <p className={styles.eyebrow}>Wayne &amp; Packanack Lake</p>
                    <h1 className={styles.title}>Contact Starlet</h1>
                    <p className={styles.lead}>
                      Send a message if you are buying, selling, or just thinking through timing.
                      A short note is enough.
                    </p>

                    <address className={styles.contactDetails}>
                      <p>
                        <span>Email</span>
                        <a href="mailto:hello@waynenjrealestate.com">hello@waynenjrealestate.com</a>
                      </p>
                      <p>
                        <span>Phone</span>
                        <a href="tel:+19735550123">(973) 555-0123</a>
                      </p>
                      <p>
                        <span>Location</span>
                        <span>Wayne, New Jersey</span>
                      </p>
                    </address>
                  </div>

                  <div className={styles.formBody}>
                    <div className={styles.fieldGrid}>
                  <label className={styles.field}>
                    <span>Name</span>
                    <input type="text" name="name" autoComplete="name" placeholder="Your name" />
                  </label>

                  <label className={styles.field}>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </label>
                    </div>

                    <label className={styles.field}>
                      <span>Message</span>
                      <textarea
                        name="message"
                        rows="6"
                        placeholder="Share a few details if you'd like."
                      />
                    </label>

                    <Button type="submit" variant="primary" className={styles.submitButton}>
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
          </Container>
        </Section>
      </main>
    </>
  );
}
