import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';

const quickLinks = [
  { label: 'Neighborhood Guide', path: '/packanack-lake' },
  { label: 'Buy', path: '/buy' },
  { label: 'Sell', path: '/sell' },
  { label: 'Wayne Journal', path: '/blog' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '/contact' },
  { label: 'Equal Housing', path: '/about' },
  { label: 'Terms of Service', path: '/contact' },
];

function FooterHeading({ children }) {
  return (
    <p className="font-serif text-[1.05rem] italic leading-none text-stone-900 sm:text-[1.15rem]">
      {children}
    </p>
  );
}

function FooterLinkList({ links }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="text-[0.96rem] text-stone-600 no-underline transition-opacity duration-200 hover:opacity-70"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterLegalLink({ link }) {
  return (
    <Link
      to={link.path}
      className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-stone-500 no-underline transition-opacity duration-200 hover:opacity-70"
    >
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-cream text-stone-900">
      <Container className="py-10 sm:py-12 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.9fr] lg:items-start lg:gap-14">
          <div className="max-w-md">
            <Link to="/" className="inline-flex no-underline">
              <img
                src="/brandmark_black.svg"
                alt="Wayne NJ Real Estate"
                className="h-auto w-40 max-w-none sm:w-44 lg:w-48"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <p className="mt-4 max-w-sm text-[0.95rem] leading-[1.8] text-stone-500 sm:text-[1rem]">
              Devoted to the historical character and modern community life of Wayne, NJ and
              Packanack Lake. We partner with sellers and buyers who value local strategy and
              architectural appreciation.
            </p>

            <div className="mt-5 flex items-center gap-4 text-[0.78rem] text-stone-400">
              <Link to="/" className="no-underline transition-opacity duration-200 hover:opacity-70">
                Instagram
              </Link>
              <Link to="/" className="no-underline transition-opacity duration-200 hover:opacity-70">
                Facebook
              </Link>
              <Link to="/" className="no-underline transition-opacity duration-200 hover:opacity-70">
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <div className="mt-4">
              <FooterLinkList links={quickLinks} />
            </div>
          </div>

          <div>
            <FooterHeading>Journal Signup</FooterHeading>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-[1.8] text-stone-500">
              Join our list for local market briefs and Packanack news.
            </p>

            <form className="mt-4 flex max-w-sm overflow-hidden border border-stone-300 bg-white">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-[0.95rem] text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="border-0 bg-stone-900 px-4 py-3 text-[0.95rem] text-brand-cream transition-colors duration-200 hover:bg-stone-800"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-stone-400">
              © 2026 Wayne NJ & Packanack Lake Real Estate. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-5 sm:justify-end">
              {legalLinks.map((link) => (
                <FooterLegalLink key={link.label} link={link} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
