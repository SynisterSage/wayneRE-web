import { Link } from 'react-router-dom';
import Container from '../../ui/Container.jsx';
import { blogPosts } from '../../../data/blogPosts.js';
import { useScrollReveal } from '../../../hooks/useScrollReveal.js';

export default function BlogPreview() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} className="bg-brand-cream">
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="flex items-end justify-between gap-8">
          <div
            className={`max-w-2xl transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ willChange: 'opacity, transform' }}
          >
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.35em] text-brand-lake">
              Editorial
            </p>
            <h2
              className={`mt-4 font-serif text-[clamp(2.5rem,3.8vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '80ms' : '0ms', willChange: 'opacity, transform' }}
            >
              The Wayne <span className="italic">Journal.</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className={`hidden border-b border-stone-900 pb-1 text-[0.92rem] font-medium text-stone-900 no-underline transition-[opacity,transform] duration-700 ease-out hover:translate-x-2 hover:opacity-70 motion-reduce:transition-none motion-reduce:transform-none sm:inline-flex ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '160ms' : '0ms', willChange: 'opacity, transform' }}
          >
            View All Articles
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={post.title}
              className={`space-y-5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 120 + 120}ms` : '0ms',
                willChange: 'opacity, transform',
              }}
            >
              <div className="overflow-hidden bg-brand-sand">
                <img
                  src="/hero.jpg"
                  alt={post.imageAlt}
                  className={`h-96 w-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-105 ${
                    index === 0 ? 'object-[center_18%]' : index === 1 ? 'object-center' : 'object-[center_42%]'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-stone-500">
                  {post.category}
                </p>
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-stone-400">
                  {post.date}
                </p>
              </div>

              <h3 className="font-serif text-[1.55rem] font-medium italic leading-[1.15] tracking-[-0.02em] text-stone-900">
                <Link to={post.href} className="no-underline hover:opacity-75">
                  {post.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link
            to="/blog"
            className="inline-flex border-b border-stone-900 pb-1 text-[0.92rem] font-medium text-stone-900 no-underline transition-opacity duration-200 hover:opacity-70"
          >
            View All Articles
          </Link>
        </div>
      </Container>
    </section>
  );
}
