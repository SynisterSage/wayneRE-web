import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Wayne NJ Real Estate</p>
      <Link to="/contact">Contact</Link>
    </footer>
  );
}
