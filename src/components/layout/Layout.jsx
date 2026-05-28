import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CookieConsent from '../legal/CookieConsent.jsx';
import AnalyticsTracker from '../legal/AnalyticsTracker.jsx';

export default function Layout() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const headerSelector = '.site-header';
    const correctionWindowMs = 700;
    const correctionIntervalMs = 120;
    const topGap = 24;
    const startedAt = window.performance.now();
    let cancelled = false;
    let correctionTimer = null;

    const getTargetTop = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        return null;
      }

      const header = document.querySelector(headerSelector);
      const headerOffset = header ? header.getBoundingClientRect().height : 0;
      const desiredOffset = headerOffset + topGap;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      return Math.max(0, targetTop - desiredOffset);
    };

    const applyScroll = (behavior = 'auto') => {
      const top = getTargetTop();
      if (top === null || cancelled) {
        return false;
      }

      window.scrollTo({ top, left: 0, behavior });
      return true;
    };

    const scheduleCorrection = () => {
      correctionTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        const top = getTargetTop();
        if (top !== null) {
          const delta = Math.abs(window.scrollY - top);
          if (delta > 2) {
            window.scrollTo({ top, left: 0, behavior: 'auto' });
          }
        }

        if (window.performance.now() - startedAt < correctionWindowMs) {
          scheduleCorrection();
        }
      }, correctionIntervalMs);
    };

    let attempts = 0;
    const maxAttempts = 40;

    const tryScroll = () => {
      if (cancelled) {
        return;
      }

      if (applyScroll('auto')) {
        scheduleCorrection();
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        window.requestAnimationFrame(tryScroll);
      }
    };

    window.requestAnimationFrame(tryScroll);

    return () => {
      cancelled = true;
      if (correctionTimer) {
        window.clearTimeout(correctionTimer);
      }
    };
  }, [location.hash, location.pathname]);

  useEffect(() => {
    // Analytics tracking is handled by AnalyticsTracker (checks consent and tracks)
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar key={location.pathname} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <AnalyticsTracker />
      <CookieConsent />
    </div>
  );
}
