import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CookieConsent from '../legal/CookieConsent.jsx';
import AnalyticsTracker from '../legal/AnalyticsTracker.jsx';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

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
