import { Seo } from '../utils/seo.js';
import Section from '../components/ui/Section.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Not Found" path="*" noIndex />
      <Section>Not Found</Section>
    </>
  );
}
