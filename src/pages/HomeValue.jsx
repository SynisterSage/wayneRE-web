import { useState } from 'react';
import { Seo } from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import styles from './HomeValue.module.css';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/starletferguson@gmail.com';

const initialForm = {
  address: '',
  city: '',
  moveDate: '',
  preferredContactMethod: 'Phone',
  phone: '',
  email: '',
  propertyType: 'Select an option',
  bedrooms: 'Select an option',
  bathrooms: 'Select an option',
  squareFootage: '',
  comments: '',
};

const propertyTypeOptions = ['Select an option', 'Single-family home', 'Condo / townhome', 'Lake home', 'Other'];
const bedroomOptions = ['Select an option', '1', '2', '3', '4', '5+'];
const bathroomOptions = ['Select an option', '1', '1.5', '2', '2.5', '3+'];

export default function HomeValue() {
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
    payload.append('_subject', 'New Home Valuation Request');
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    payload.append('Address', form.address);
    payload.append('City', form.city);
    payload.append('Approximate Date of Move', form.moveDate);
    payload.append('Preferred Contact Method', form.preferredContactMethod);
    payload.append('Phone', form.phone);
    payload.append('Email', form.email);
    payload.append('Property Type', form.propertyType);
    payload.append('Bedrooms', form.bedrooms);
    payload.append('Bathrooms', form.bathrooms);
    payload.append('Square Footage', form.squareFootage);
    payload.append('Additional Comments', form.comments);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to send request.');
      }

      setForm(initialForm);
      setStatus('success');
      setFeedback('Your request has been sent. Starlet will reach out shortly.');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or contact Starlet directly.',
      );
    }
  }

  return (
    <>
      <Seo
        title="Home Valuation | Wayne NJ & Packanack Lake Real Estate"
        description="Request a thoughtful local home valuation for your Wayne or Packanack Lake property."
        path="/home-value"
      />

      <main className={styles.page}>
      

        <Section className={styles.formSection} id="valuation-form">
          <Container className={styles.container}>
            <div className={styles.formLayout}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Valuation Form</p>
                <h2 className={styles.sectionTitle}>Request a local valuation.</h2>
                <div className={styles.sectionCopy}>
                  <p>Share a few details about the property and timeline. Early planning conversations are always welcome.</p>
                </div>
              </div>

              <div className={styles.formCard}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="New Home Valuation Request" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className={styles.fieldGrid}>
                    <label className={`${styles.field} ${styles.spanTwo}`}>
                      <span>Address</span>
                      <input
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        placeholder="Property address"
                        value={form.address}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className={styles.field}>
                      <span>City</span>
                      <input
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        placeholder="Wayne"
                        value={form.city}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className={styles.field}>
                      <span>Approximate Date of Move</span>
                      <input
                        type="date"
                        name="moveDate"
                        value={form.moveDate}
                        onChange={handleChange}
                      />
                    </label>

                    <fieldset className={`${styles.field} ${styles.spanTwo}`}>
                      <legend>Preferred Contact Method</legend>
                      <div className={styles.radioGroup}>
                        {['Phone', 'Email'].map((option) => (
                          <label key={option} className={styles.radioOption}>
                            <input
                              type="radio"
                              name="preferredContactMethod"
                              value={option}
                              checked={form.preferredContactMethod === option}
                              onChange={handleChange}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <label className={styles.field}>
                      <span>Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="(973) 555-0123"
                        value={form.phone}
                        onChange={handleChange}
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
                      />
                    </label>

                    <label className={styles.field}>
                      <span>Property Type</span>
                      <select
                        name="propertyType"
                        value={form.propertyType}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {propertyTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.field}>
                      <span>Bedrooms</span>
                      <select
                        name="bedrooms"
                        value={form.bedrooms}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {bedroomOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.field}>
                      <span>Bathrooms</span>
                      <select
                        name="bathrooms"
                        value={form.bathrooms}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        {bathroomOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.field}>
                      <span>Square Footage</span>
                      <input
                        type="number"
                        name="squareFootage"
                        min="0"
                        step="1"
                        placeholder="Approximate square footage"
                        value={form.squareFootage}
                        onChange={handleChange}
                      />
                    </label>

                    <label className={`${styles.field} ${styles.spanTwo}`}>
                      <span>Additional Comments</span>
                      <textarea
                        name="comments"
                        rows="5"
                        placeholder="Anything helpful about the home, timing, or what you'd like to know?"
                        value={form.comments}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  {feedback ? (
                    <p
                      className={`${styles.feedback} ${
                        status === 'success' ? styles.feedbackSuccess : styles.feedbackError
                      }`}
                      role={status === 'success' ? 'status' : 'alert'}
                    >
                      {feedback}
                    </p>
                  ) : null}

                  <div className={styles.actions}>
                    <Button
                      type="submit"
                      variant="primary"
                      className={styles.submitButton}
                      disabled={status === 'loading'}
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending...' : 'Request Valuation'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </Section>

        <Section className={styles.noteSection}>
          <Container className={styles.container}>
            <div className={styles.noteWrap}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>Closing Note</p>
                <h2 className={styles.sectionTitle}>A local perspective matters.</h2>
                <div className={styles.sectionCopy}>
                  <p>
                    Online estimates can be useful starting points, but Wayne and Packanack homes
                    are often shaped by details that automated tools miss.
                  </p>
                </div>
              </div>

              <Button to="/contact" variant="text" className={styles.noteLink}>
                Prefer to ask a question first? Contact Starlet &rarr;
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
