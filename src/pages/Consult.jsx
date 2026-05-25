import { useState } from 'react';
import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import { submitFormSubmit } from '../utils/formSubmit.js';
import styles from './Consult.module.css';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/starletferguson@gmail.com';

const initialForm = {
  preferredDate: '',
  preferredTime: 'Morning',
  secondChoiceDate: '',
  secondChoiceTime: 'Morning',
  fullName: '',
  email: '',
  phone: '',
  interest: 'Buying',
  message: '',
};

const timeOptions = ['Morning', 'Midday', 'Afternoon', 'Evening'];
const interestOptions = ['Buying', 'Selling', 'Home valuation', 'Packanack Lake', 'General question'];

export default function Consult() {
  // Always show the consultation request form (no click-to-expand)
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
    payload.append('_subject', 'New Consultation Request');
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    payload.append('Appointment Type', 'Consultation');
    payload.append('Preferred Date', form.preferredDate);
    payload.append('Preferred Time', form.preferredTime);
    payload.append('Second Choice Date', form.secondChoiceDate);
    payload.append('Second Choice Time', form.secondChoiceTime);
    payload.append('Full Name', form.fullName);
    payload.append('Email', form.email);
    payload.append('Phone', form.phone);
    payload.append('I am interested in', form.interest);
    payload.append('Message', form.message);

    try {
      await submitFormSubmit(FORM_ENDPOINT, payload);
      setForm(initialForm);
      setStatus('success');
      setFeedback('Your consultation request has been sent. Starlet will follow up to confirm a time.');
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
        title="Schedule a Consultation | Wayne NJ & Packanack Lake Real Estate"
        description="Request a consultation with Starlet Ferguson for buying, selling, home valuation, or Wayne and Packanack Lake real estate questions."
        path="/consult"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Schedule a Consultation',
          url: 'https://www.waynenjrealestate.com/consult',
          mainEntity: {
            '@type': 'Service',
            name: 'Real estate consultation request',
            provider: {
              '@type': 'RealEstateAgent',
              name: 'Starlet Ferguson',
            },
            areaServed: ['Wayne, NJ', 'Packanack Lake, NJ'],
          },
        }}
      />

      <main className={styles.page}>
        <Section className={styles.heroSection}>
          <Container className={styles.container}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Consultation</p>
              <h1 className={styles.title}>Choose a time to talk through your next move.</h1>
              <p className={styles.lead}>
                Start with a simple conversation about buying, selling, timing, or the Wayne and
                Packanack market.
              </p>
              <p className={styles.note}>
                This is a request, not a confirmed appointment. Starlet will follow up to confirm
                availability.
              </p>
            </div>
          </Container>
        </Section>

        <Section className={styles.stepSection}>
          <Container className={styles.container}>
            <div className={styles.stepHeader}>
              <p className={styles.sectionLabel}>Appointment Type</p>
              <h2 className={styles.sectionTitle}>Consultation</h2>
              <p className={styles.sectionCopy}>
                A focused conversation for buying, selling, home valuation questions, or early
                planning.
              </p>
            </div>

            <div className={styles.typeCard}>
              <span className={styles.typeCardBody}>
                <span className={styles.typeCardTitle}>Consultation</span>
                <span className={styles.typeCardDesc}>
                  A focused conversation for buying, selling, home valuation questions, or early
                  planning.
                </span>
              </span>
              <span className={styles.typeCardMeta}>
                <span className={styles.typeCardMetaLabel}>Duration</span>
                <span className={styles.typeCardMetaValue}>30 minutes</span>
              </span>
            </div>
            {/* Moved consultation request form here to keep related content together */}
            <form className={styles.requestPanel} onSubmit={handleSubmit}>
              <div className={styles.panelIntro}>
                <p className={styles.sectionLabel}>Request Details</p>
                <h2 className={styles.sectionTitle}>Share a preferred time.</h2>
                <p className={styles.sectionCopy}>Starlet will follow up to confirm availability.</p>
              </div>

              <div className={styles.requestGrid}>
                <div className={styles.requestColumn}>
                  <label className={styles.field}>
                    <span>Preferred Date</span>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Preferred Time</span>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      required
                    >
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Second Choice Date</span>
                    <input
                      type="date"
                      name="secondChoiceDate"
                      value={form.secondChoiceDate}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Second Choice Time</span>
                    <select
                      name="secondChoiceTime"
                      value={form.secondChoiceTime}
                      onChange={handleChange}
                    >
                      {timeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className={styles.requestColumn}>
                  <label className={styles.field}>
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      value={form.fullName}
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
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span>I am interested in</span>
                    <select name="interest" value={form.interest} onChange={handleChange} required>
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={`${styles.field} ${styles.spanTwo}`}>
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share anything helpful for the conversation."
                    />
                  </label>
                </div>
              </div>

              <div className={styles.actionsRow}>
                <Button type="submit" variant="primary" className={styles.submitButton}>
                  {status === 'loading' ? 'Sending request...' : 'Request Consultation'}
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
            </form>
          </Container>
        </Section>
      </main>
    </>
  );
}
