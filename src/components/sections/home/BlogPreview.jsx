import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Container from '../../ui/Container.jsx';
import {useScrollReveal} from '../../../hooks/useScrollReveal.js';
import {allPostsQuery, categoryLabels} from '../../../sanity/queries.js';
import {sanityClient} from '../../../sanity/client.js';
import {urlFor} from '../../../sanity/image.js';

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function BlogPreview() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [status, setStatus] = useState('loading');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const data = await sanityClient.fetch(`${allPostsQuery}[0...3]`);
        if (!active) return;
        setPosts(Array.isArray(data) ? data : []);
        setStatus('ready');
      } catch {
        if (!active) return;
        setStatus('error');
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const isLoading = status === 'loading';
  const isError = status === 'error';
  const isEmpty = status === 'ready' && posts.length === 0;

  return (
    <section ref={sectionRef} className="bg-brand-cream">
      <Container className="py-16 sm:py-20 lg:py-32">
        <div className="flex items-end justify-between gap-8">
          <div
            className={`max-w-2xl transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{willChange: 'opacity, transform'}}
          >
            <p className="text-[0.625rem] font-bold tracking-[0.04em] text-brand-lake">
              Editorial
            </p>
            <h2
              className={`mt-4 font-serif text-[clamp(2.5rem,3.8vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-stone-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{transitionDelay: isVisible ? '80ms' : '0ms', willChange: 'opacity, transform'}}
            >
              Wayne <span className="italic">Local Insights</span>
            </h2>
          </div>

          <Link
            to="/blog"
            className={`hidden border-b border-stone-900 pb-1 text-[0.92rem] font-medium text-stone-900 no-underline transition-[opacity,transform] duration-700 ease-out hover:translate-x-2 hover:opacity-70 motion-reduce:transition-none motion-reduce:transform-none sm:inline-flex ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{transitionDelay: isVisible ? '160ms' : '0ms', willChange: 'opacity, transform'}}
          >
            View All Articles
          </Link>
        </div>

        <div className="mt-12">
          {isLoading ? <p className="text-[1rem] leading-[1.8] text-stone-700">Loading articles...</p> : null}
          {isError ? <p className="text-[1rem] leading-[1.8] text-stone-700">Unable to load articles right now.</p> : null}
          {isEmpty ? <p className="text-[1rem] leading-[1.8] text-stone-700">No articles are published yet. Please check back soon.</p> : null}
        </div>

        {!isLoading && !isError && posts.length > 0 ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-10">
            {posts.map((post, index) => {
              const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(900).quality(80).url() : null;
              const imageAlt = post.featuredImage?.alt || post.title;
              const date = formatDate(post.publishedAt);
              const category = categoryLabels[post.category] || post.category;

              return (
                <article
                  key={post._id}
                  className={`space-y-5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 120 + 120}ms` : '0ms',
                    willChange: 'opacity, transform',
                  }}
                >
                  {imageUrl ? (
                    <Link to={`/blog/${post.slug}`} className="block overflow-hidden bg-brand-sand">
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className={`h-96 w-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-105 ${
                          index === 0 ? 'object-[center_18%]' : index === 1 ? 'object-center' : 'object-[center_42%]'
                        }`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </Link>
                  ) : null}

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.62rem] font-bold tracking-[0.04em] text-stone-500">
                      {category}
                    </p>
                    <p className="text-[0.62rem] tracking-[0.04em] text-stone-400">
                      {date}
                    </p>
                  </div>

                  <h3 className="font-serif text-[1.55rem] font-medium italic leading-[1.15] tracking-[-0.02em] text-stone-900">
                    <Link to={`/blog/${post.slug}`} className="no-underline hover:opacity-75">
                      {post.title}
                    </Link>
                  </h3>
                </article>
              );
            })}
          </div>
        ) : null}

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
