import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import { navLinks } from '../../data/navLinks.js';

const linkBase =
  'rounded-[5px] px-3 py-2 text-[0.98rem] text-stone-700 no-underline transition-colors duration-200 hover:text-stone-900';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-300 bg-white/98">
      <Container className="relative">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-16">
          <Link to="/" className="ml-2 inline-flex text-stone-900 no-underline" onClick={() => setIsOpen(false)}>
            <span className="block h-8 w-[7.75rem] overflow-hidden">
              <img
                className="block h-full w-full object-cover object-[center_58%]"
                src="/brandmark_black.svg"
                alt="Wayne Real Estate"
                width="160"
                height="52"
              />
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-stone-300 bg-brand-sand text-stone-900 lg:hidden"
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span aria-hidden="true" className="grid gap-[3px]">
              <span className="block h-px w-4 rounded-full bg-current" />
              <span className="block h-px w-4 rounded-full bg-current" />
              <span className="block h-px w-4 rounded-full bg-current" />
            </span>
          </button>

          <nav className="hidden items-center gap-6 lg:inline-flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive ? 'bg-brand-lake/5 text-stone-900' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="ml-5" variant="secondary">
              Book your free consult
            </Button>
          </nav>
        </div>

        <div
          id="primary-navigation"
          className={[
            'absolute left-0 right-0 top-full grid overflow-hidden border-b border-transparent bg-brand-cream/98 transition-[opacity,transform,visibility] duration-200 lg:hidden',
            isOpen
              ? 'visible translate-y-0 border-stone-300 opacity-100 pointer-events-auto'
              : 'invisible -translate-y-1 border-transparent opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <nav className="grid gap-1 py-4" aria-label="Primary mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  [
                    'flex min-h-11 items-center rounded-[5px] px-0 py-3 text-base text-stone-700 no-underline transition-colors duration-200 hover:text-stone-900',
                    isActive ? 'bg-brand-lake/5 text-stone-900' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Button
              to="/contact"
              className="mt-2 w-full justify-start rounded-[5px] border-stone-900 bg-transparent text-stone-900"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Book your free consult
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
