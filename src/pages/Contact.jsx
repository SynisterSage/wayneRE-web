import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Starlet Ferguson | Wayne NJ Real Estate"
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
                        <a href="mailto:starletferguson@gmail.com">starletferguson@gmail.com</a>
                      </p>
                      <p>
                        <span>Cell</span>
                        <a href="tel:+18622269281">(862) 226-9281</a>
                      </p>
                      <p>
                        <span>Office</span>
                        <a href="tel:+19736960077">(973) 696-0077</a>
                      </p>
                      <p>
                        <span>Office Address</span>
                        <span>
                          1700 Rt. 23 North, Suite 300
                          <br />
                          Wayne, NJ 07470
                        </span>
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
