import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';

const quickLinks = [
  { label: 'About', path: '/about' },
  { label: 'Buy', path: '/buy' },
  { label: 'Sell', path: '/sell' },
  { label: 'Packanack Lake', path: '/packanack-lake' },
  { label: 'Wayne Journal', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms of Service', path: '/terms' },
];

const socialLinks = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@starletf', kind: 'tiktok' },
  { label: 'YouTube', href: 'https://www.youtube.com/@starletsellsnj', kind: 'youtube' },
  { label: 'Instagram', href: 'https://www.instagram.com/xopackanack', kind: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/XOPackanack/61578327235400/', kind: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/starletsellsnj', kind: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/starletsellsNJ/', kind: 'facebook' },
  { label: 'LinkedIn', href: 'http://www.linkedin.com/in/starlet-ferguson-75a41813a', kind: 'linkedin' },
];

function SocialMark({ kind }) {
  switch (kind) {
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            fill="currentColor"
            d="M14.5 3c.5 2.8 2.2 4.4 4.9 4.7v2.5c-1.8 0-3.5-.5-4.9-1.5v5.7c0 2.9-2.3 5.3-5.4 5.3-2.8 0-5.1-2-5.1-4.8 0-2.9 2.3-5 5.2-5 .3 0 .6 0 .9.1v2.7c-.3-.1-.6-.1-.9-.1-1.5 0-2.8 1.1-2.8 2.6 0 1.4 1.1 2.4 2.7 2.4 1.8 0 3.1-1.2 3.1-3.2V3h2.3z"
          />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            fill="currentColor"
            d="M19.6 6.7c.4.4.7 1 .8 1.6.2 1.1.2 3.3.2 3.3s0 2.2-.2 3.3c-.1.6-.4 1.2-.8 1.6-.4.4-.9.7-1.5.8-1.3.2-6.1.2-6.1.2s-4.8 0-6.1-.2c-.6-.1-1.1-.4-1.5-.8-.4-.4-.7-1-.8-1.6-.2-1.1-.2-3.3-.2-3.3s0-2.2.2-3.3c.1-.6.4-1.2.8-1.6.4-.4.9-.7 1.5-.8C7.2 5.7 12 5.7 12 5.7s4.8 0 6.1.2c.6.1 1.1.4 1.5.8z"
          />
          <path fill="#fff" d="m10 9.2 5 2.8-5 2.8V9.2z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <rect
            x="4.5"
            y="4.5"
            width="15"
            height="15"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            fill="currentColor"
            d="M14.3 8.2h1.9V5.7h-2.3c-2 0-3.2 1.2-3.2 3.4v1.7H8.8v2.5h1.9v5H14v-5h2.1l.3-2.5H14v-1.2c0-.8.2-1.4.3-1.4z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path fill="currentColor" d="M6.5 9.1H4.2v9.3h2.3V9.1zm-1.1-4C4.7 5.1 4 5.8 4 6.7s.7 1.6 1.4 1.6c.8 0 1.5-.7 1.5-1.6S6.2 5.1 5.4 5.1zM20 18.4h-2.3v-4.6c0-1.1 0-2.6-1.6-2.6s-1.8 1.2-1.8 2.5v4.7H12V9.1h2.2v1.3c.3-.6 1.1-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.2v5.2z" />
        </svg>
      );
    default:
      return null;
  }
}

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
    <footer className="border-t border-stone-300/40 bg-brand-cream text-stone-900">
      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.05fr_0.9fr_0.95fr] lg:items-start lg:gap-12">
          <div className="max-w-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
              <Link to="/" className="inline-flex no-underline">
                <img
                  src="/headshot.png"
                  alt="Wayne NJ Real Estate"
                  className="block h-auto w-20 max-w-none sm:w-24 lg:w-28"
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <address className="not-italic text-[0.88rem] leading-[1.7] text-stone-500 sm:text-[0.94rem]">
                  <p className="m-0">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-brand-lake">
                      Email
                    </span>
                    <a
                      href="mailto:starletferguson@gmail.com"
                      className="text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
                    >
                      starletferguson@gmail.com
                    </a>
                  </p>
                  <p className="m-0 mt-3">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-brand-lake">
                      Cell
                    </span>
                    <a
                      href="tel:+18622269281"
                      className="text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
                    >
                      (862) 226-9281
                    </a>
                  </p>
                  <p className="m-0 mt-3">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-brand-lake">
                      Office
                    </span>
                    <a
                      href="tel:+19736960077"
                      className="text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
                    >
                      (973) 696-0077
                    </a>
                  </p>
                  <p className="m-0 mt-3">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-brand-lake">
                      Office Address
                    </span>
                    1700 Rt. 23 North, Suite 300
                    <br />
                    Wayne, NJ 07470
                  </p>
                </address>

                <div className="flex flex-nowrap gap-1 sm:gap-1.5">
                  {socialLinks.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-brand-cream text-stone-600 no-underline transition-colors duration-200 hover:border-brand-lake hover:text-brand-lake sm:h-7 sm:w-7"
                    >
                      <SocialMark kind={link.kind} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-3 max-w-sm text-[0.92rem] leading-[1.75] text-stone-500 sm:mt-4 sm:text-[0.98rem]">
              Devoted to the historic character and modern community life of Wayne, NJ and
              Packanack Lake.
            </p>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <div className="mt-3 sm:mt-4">
              <FooterLinkList links={quickLinks} />
            </div>
          </div>

          <div>
            <FooterHeading>Local Notes</FooterHeading>
            <p className="mt-3 max-w-xs text-[0.92rem] leading-[1.75] text-stone-500 sm:mt-4 sm:text-[0.98rem]">
              Market notes and Packanack updates, sent occasionally.
            </p>

            <form className="mt-3 flex max-w-sm overflow-hidden border border-stone-300 bg-white sm:mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-[0.92rem] text-stone-900 placeholder:text-stone-400 focus:outline-none sm:px-4 sm:py-3 sm:text-[0.95rem]"
              />
              <button
                type="submit"
                className="border-0 bg-stone-900 px-4 py-2.5 text-[0.92rem] text-brand-cream transition-colors duration-200 hover:bg-stone-800 sm:py-3 sm:text-[0.95rem]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-4 sm:mt-12 sm:pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[18rem] text-[0.54rem] font-bold uppercase leading-normal tracking-[0.22em] text-stone-400 sm:max-w-none sm:text-[0.62rem] sm:leading-none sm:tracking-[0.28em]">
              © 2026 Wayne NJ & Packanack Lake Real Estate. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4 sm:justify-end sm:gap-5">
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
