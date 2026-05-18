import { Seo } from '../utils/seo.js';
import Section from '../components/ui/Section.jsx';

export default function About() {
  return (
    <>
      <Seo title="About" path="/about" />
      <Section>About Page</Section>
    </>
  );
}
