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
    title: 'How we use it',
    body:
      'We use this information to respond to inquiries, provide real estate guidance, share market updates when requested, and improve the site experience.',
  },
  {
    title: 'Sharing',
    body:
      'We do not sell personal information. We may share details with trusted service providers who help operate the website or deliver requested services.',
  },
  {
    title: 'Cookies and analytics',
    body:
      'We may use basic analytics or similar tools to understand traffic and improve performance. These tools help us see what pages are useful and where the site can be clearer.',
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