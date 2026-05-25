import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Container from '../ui/Container.jsx';
import { navLinks } from '../../data/navLinks.js';
import './Navbar.css';

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
    <header className="site-header">
      <Container className="navbar">
        <div className="navbar__top">
          <Link
            to="/"
            className="navbar__brand"
            onClick={() => setIsOpen(false)}
            aria-label="Wayne Real Estate home"
          >
            <img
              className="navbar__brand-image"
              src="/logomark.svg"
              alt="Wayne Real Estate"
              width="160"
              height="52"
              decoding="async"
            />
            <span className="navbar__brand-name">Starlet Ferguson</span>
          </Link>

          <nav className="navbar__desktop" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Button to="/consult" variant="secondary" className="navbar__cta">
              Book your free consult
            </Button>
          </nav>

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span aria-hidden="true" className="navbar__toggle-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <div
          id="primary-navigation"
          className={`navbar__mobile-panel${isOpen ? ' navbar__mobile-panel--open' : ''}`}
        >
          <nav className="navbar__mobile" aria-label="Primary mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <Button to="/consult" variant="secondary" className="navbar__mobile-cta" onClick={() => setIsOpen(false)}>
              Book your free consult
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
