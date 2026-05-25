import { Link } from 'react-router-dom';
import { Seo } from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 Not Found"
        description="The page you were looking for could not be found."
        path="*"
        noIndex
      />
      <Section>
        <Container className="py-24 sm:py-28 lg:py-32">
          <div className="mx-auto flex max-w-xl flex-col items-start gap-6">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-brand-lake">
              404
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.03em] text-stone-900">
              Page not found.
            </h1>
            <p className="max-w-lg text-[1rem] leading-[1.8] text-stone-700 sm:text-[1.05rem]">
              The page you requested does not exist or may have moved.
            </p>
            <Link
              to="/"
              className="inline-flex items-center border-b border-stone-900 pb-1 text-[0.98rem] font-medium text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
            >
              Return home
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
