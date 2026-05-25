import { Seo } from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';

const policySections = [
  {
    title: 'Information we collect',
    body:
      'We may collect information you choose to share through contact forms, email, or newsletter signups. This can include your name, email address, phone number, and property interests.',
  },
  {
    title: 'Website analytics and cookies',
    body:
      'We use Google Analytics to understand how visitors use the site and to improve the experience. Depending on your browser and settings, Google Analytics may collect traffic data such as page activity, approximate location, browser and device information, and may use cookies or similar identifiers to distinguish sessions. You can manage cookies through your browser settings and may be able to use Google’s analytics opt-out tools.',
  },
  {
    title: 'Content management and publishing',
    body:
      'We use Sanity as a content management platform to create, organize, and publish blog and editorial content on the site. Sanity may process technical or operational data in connection with those services according to its own policies.',
  },
  {
    title: 'How we use it',
    body:
      'We use information you share to respond to inquiries, provide real estate guidance, share updates when requested, and improve the site experience. Analytics data helps us understand what content is useful and where the site can be clearer.',
  },
  {
    title: 'Sharing',
    body:
      'We do not sell personal information. We may share details with trusted service providers that help operate the website, deliver requested services, publish content, or measure site performance, including Sanity and Google Analytics. Google Analytics uses cookies and similar technologies for measurement, and Sanity may process technical data needed to host and publish site content.',
  },
  {
    title: 'Your choices',
    body:
      'You can ask us to update or remove contact information you have shared. You can also unsubscribe from email updates at any time.',
  },
  {
    title: 'Contact',
    body:
      'If you have a question about this policy, please contact Starlet through the contact page and we will follow up directly.',
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Wayne NJ & Packanack Lake Real Estate"
        description="Privacy policy for Wayne NJ and Packanack Lake Real Estate, including how we collect, use, and protect information shared through the site."
        path="/privacy-policy"
      />

      <Section className="bg-brand-cream py-20 sm:py-24 lg:py-28">
        <Container>
          <article className="w-full">
            <h1 className="font-serif text-[clamp(2.5rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-[1rem] leading-[1.85] text-stone-700 sm:text-[1.08rem]">
              This policy explains how we handle information shared through the website and what
              you can expect when you contact us.
            </p>

            <div className="mt-12 space-y-10">
              {policySections.map((section) => (
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
