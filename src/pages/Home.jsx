import { Seo } from '../utils/seo.js';
import Hero from '../components/sections/home/Hero.jsx';
import LocalPositioning from '../components/sections/home/LocalPositioning.jsx';
import Pathways from '../components/sections/home/Pathways.jsx';
import PackanackFeature from '../components/sections/home/PackanackFeature.jsx';
import HomeValuationCTA from '../components/sections/home/HomeValuationCTA.jsx';
import BlogPreview from '../components/sections/home/BlogPreview.jsx';
import Testimonials from '../components/sections/home/Testimonials.jsx';
import FinalCTA from '../components/sections/home/FinalCTA.jsx';

export default function Home() {
  return (
    <>
      <Seo title="Home" path="/" />
      <Hero />
      <LocalPositioning />
      <Pathways />
      <PackanackFeature />
      <HomeValuationCTA />
      <BlogPreview />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
