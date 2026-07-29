import Container from './Container.jsx';
import { Seo } from '../../utils/seo.js';

export default function RoutePage({ title, description, path, eyebrow, children, noIndex = false }) {
  return (
    <>
      <Seo title={title} description={description} path={path} noIndex={noIndex} />
      <section className="bg-brand-cream">
        <Container className="py-24 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
              <p className="mb-6 text-[0.625rem] font-bold tracking-[0.04em] text-stone-700">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-serif text-[clamp(2.5rem,4.8vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900">
              {title}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-[1rem] leading-[1.8] text-stone-700 sm:text-[1.08rem]">
              {description}
            </p>
          </div>

          {children ? <div className="mt-14">{children}</div> : null}
        </Container>
      </section>
    </>
  );
}
