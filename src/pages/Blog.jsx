import { Seo } from '../utils/seo.js';
import Section from '../components/ui/Section.jsx';

export default function Blog() {
  return (
    <>
      <Seo title="Blog" path="/blog" />
      <Section>Blog Page</Section>
    </>
  );
}
