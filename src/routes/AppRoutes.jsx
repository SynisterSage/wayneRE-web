import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Buy from '../pages/Buy.jsx';
import HomeValue from '../pages/HomeValue.jsx';
import Sell from '../pages/Sell.jsx';
import PackanackLake from '../pages/PackanackLake.jsx';
import WayneNJ from '../pages/WayneNJ.jsx';
import Blog from '../pages/Blog.jsx';
import BlogPost from '../pages/BlogPost.jsx';
import Contact from '../pages/Contact.jsx';
import Consult from '../pages/Consult.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import TermsOfService from '../pages/TermsOfService.jsx';
import NotFound from '../pages/NotFound.jsx';
import Testimonials from '../pages/Testimonials.jsx';
import Listings from '../pages/Listings.jsx';
import ListingDetail from '../pages/ListingDetail.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/home-value" element={<HomeValue />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/packanack-lake" element={<PackanackLake />} />
        <Route path="/wayne-nj" element={<WayneNJ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing" element={<Listings />} />
        <Route path="/listings/:slug" element={<ListingDetail />} />
        <Route path="/listing/:slug" element={<ListingDetail />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
