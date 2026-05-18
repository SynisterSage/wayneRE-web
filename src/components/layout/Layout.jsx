import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const location = useLocation();

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
    </div>
  );
}
