// analytics.js
// Minimal wrapper to dynamically load Google Analytics only after user consent.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const trackedPageViews = new Set();

export function isGaLoaded() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export async function loadGoogleAnalytics() {
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;
  if (isGaLoaded()) return;

  // Insert gtag script
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args) => {
    window.dataLayer.push(args);
  };
  window.gtag = window.gtag || gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize gtag once script loads (or immediately — gtag will queue)
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!isGaLoaded()) return;
  try {
    window.gtag('event', 'page_view', { page_path: path });
    trackedPageViews.add(path);
  } catch {
    // swallow errors — analytics should not break the app
  }
}

export function hasTrackedPageView(path) {
  return trackedPageViews.has(path);
}

export function markPageViewTracked(path) {
  trackedPageViews.add(path);
}

export default {
  loadGoogleAnalytics,
  trackPageView,
  hasTrackedPageView,
  markPageViewTracked,
};
