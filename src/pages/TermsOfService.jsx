import { Seo } from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';

const termsSections = [
  {
    title: 'Use of the site',
    body:
      'This website is provided for general informational purposes. You may use it to learn about the market, explore local pages, and contact us about real estate services.',
  },
  {
    title: 'Information accuracy',
    body:
      'We work to keep information current, but property details, market notes, and related content may change without notice. We do not guarantee that every detail on the site will always be complete or current.',
  },
  {
    title: 'No professional advice',
    body:
      'Content on this site is not legal, tax, financial, or engineering advice. You should consult the appropriate professional before making decisions that depend on those topics.',
  },
  {
    title: 'Intellectual property',
    body:
      'The site design, copy, images, and branding belong to Wayne NJ & Packanack Lake Real Estate unless otherwise noted. You may not reuse or reproduce them without permission.',
  },
  {
    title: 'Third-party links',
    body:
      'This site may link to third-party services or resources. We are not responsible for the content, policies, or performance of those sites.',
  },
  {
    title: 'Third-party services',
    body:
      'The site may use third-party services such as Google Analytics and Sanity to measure traffic, manage content, and support site operation. Those services are governed by their own terms and privacy policies.',
  },
  {
    title: 'Changes to these terms',
    body:
      'We may update these terms from time to time. Changes take effect when posted to this page, and continued use of the site means you accept the updated terms.',
  },
  {
    title: 'Contact',
    body:
      'If you have a question about these terms, please contact Starlet through the contact page and we will follow up directly.',
  },
];

export default function TermsOfService() {
  return (
    <>
      <Seo
        title="Terms of Service | Wayne NJ & Packanack Lake Real Estate"
        description="Terms of service for the Wayne NJ and Packanack Lake Real Estate website, including use, accuracy, intellectual property, and updates."
        path="/terms"
      />

      <Section className="bg-brand-cream py-20 sm:py-24 lg:py-28">
        <Container>
          <article className="w-full">
            <h1 className="font-serif text-[clamp(2.5rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900">
              Terms of Service
            </h1>

            <p className="mt-6 max-w-2xl text-[1rem] leading-[1.85] text-stone-700 sm:text-[1.08rem]">
              These terms cover how the site may be used and what you should know before relying
              on the information here.
            </p>

            <div className="mt-12 space-y-10">
              {termsSections.map((section) => (
                <section key={section.title} className="space-y-3 border-t border-stone-200 pt-6">
                  <h2 className="font-serif text-[1.55rem] font-medium leading-[1.08] tracking-[-0.02em] text-stone-900 sm:text-[1.8rem]">
                    {section.title}
                  </h2>
                  <p className="max-w-2xl text-[1rem] leading-[1.85] text-stone-700 sm:text-[1.05rem]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
