import { useEffect, useState } from 'react';
import { loadGoogleAnalytics, markPageViewTracked, trackPageView } from '../../utils/analytics.js';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const STORAGE_KEY = 'wnre_cookie_consent';

export default function CookieConsent() {
  const [consent, setConsent] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
  }, [consent]);

  // Don't render if user already made a choice
  if (consent === 'accepted' || consent === 'declined') return null;

  function saveChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage failures
    }
    setConsent(value);
    if (value === 'accepted') {
      loadGoogleAnalytics();
      const currentPath = window.location.pathname + window.location.search;
      markPageViewTracked(currentPath);
      trackPageView(currentPath);
    }
  }

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className="cookie-consent__content">
        <p className="cookie-consent__text">
          This site uses limited analytics cookies to understand site traffic and improve the
          experience. No personal information is sold.
        </p>

        <div className="cookie-consent__actions">
          <button
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={() => saveChoice('accepted')}
          >
            Accept
          </button>
          <button
            className="cookie-consent__btn cookie-consent__btn--secondary"
            onClick={() => saveChoice('declined')}
          >
            Decline
          </button>
        </div>

        <div className="cookie-consent__policy">
          <Link to="/privacy-policy" className="cookie-consent__link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
