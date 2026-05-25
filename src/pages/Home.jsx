import { Seo } from '../utils/seo.js';
import { siteConfig } from '../config/site.js';
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
      <Seo
        title="Starlet Ferguson | Wayne NJ Real Estate"
        description="Starlet Ferguson provides editorial local real estate guidance for Wayne, Packanack Lake, and surrounding neighborhoods."
        path="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateAgent',
          name: siteConfig.personName,
          url: siteConfig.url,
          image: new URL('/headshot.png', siteConfig.url).toString(),
          areaServed: siteConfig.localBusiness.areaServed,
          sameAs: siteConfig.sameAs,
          brand: {
            '@type': 'Brand',
            name: siteConfig.brandName,
          },
          description: 'Licensed real estate professional serving Wayne, NJ and Packanack Lake.',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'real estate inquiries',
            telephone: siteConfig.localBusiness.telephone,
            email: siteConfig.localBusiness.email,
            availableLanguage: 'en',
          },
        }}
      />
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
