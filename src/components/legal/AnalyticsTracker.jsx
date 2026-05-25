import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { hasTrackedPageView, loadGoogleAnalytics, trackPageView } from '../../utils/analytics.js';

const STORAGE_KEY = 'wnre_cookie_consent';

export default function AnalyticsTracker() {
  const location = useLocation();
  const lastTrackedRef = useRef(null);

  useEffect(() => {
    const consent = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    })();

    if (consent !== 'accepted') return;

    const path = `${location.pathname}${location.search || ''}`;

    // Load GA (idempotent) and then track if we haven't already tracked this path.
    loadGoogleAnalytics();

    if (lastTrackedRef.current !== path && !hasTrackedPageView(path)) {
      try {
        trackPageView(path);
        lastTrackedRef.current = path;
      } catch {
        // no-op
      }
    }
  }, [location.pathname, location.search]);

  return null;
}
