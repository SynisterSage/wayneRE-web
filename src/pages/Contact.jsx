import { useState } from 'react';
import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import { submitFormSubmit } from '../utils/formSubmit.js';
import styles from './Contact.module.css';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/starletferguson@gmail.com';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (status !== 'loading') {
      setStatus('idle');
      setFeedback('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setFeedback('');

    const payload = new FormData();
    payload.append('_subject', 'New Website Contact Message');
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    payload.append('Name', form.name);
    payload.append('Email', form.email);
    payload.append('Message', form.message);

    try {
      await submitFormSubmit(FORM_ENDPOINT, payload);
      setForm(initialForm);
      setStatus('success');
      setFeedback('Your message has been sent. Starlet will follow up shortly.');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or email Starlet directly.',
      );
    }
  }

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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.layout}>
                <div className={styles.intro}>
                  <p className={styles.eyebrow}>Wayne &amp; Packanack Lake</p>
                  <h1 className={styles.title}>Contact Starlet</h1>
                  <p className={styles.lead}>
                    Send a message if you are buying, selling, or just thinking through timing. A
                    short note is enough.
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
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className={styles.field}>
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <label className={styles.field}>
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Share a few details if you'd like."
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <div className={styles.actions}>
                    <Button type="submit" variant="primary" className={styles.submitButton}>
                      {status === 'loading' ? 'Sending request...' : 'Send Message'}
                    </Button>
                    {feedback ? (
                      <p
                        className={`${styles.feedback} ${
                          status === 'error' ? styles.feedbackError : styles.feedbackSuccess
                        }`}
                        role="status"
                        aria-live="polite"
                      >
                        {feedback}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </Container>
        </Section>
      </main>
    </>
  );
}
