import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Seo} from '../utils/seo.js';
import Button from '../components/ui/Button.jsx';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import PortableContent from '../components/blog/PortableContent.jsx';
import {categoryLabels, postBySlugQuery} from '../sanity/queries.js';
import {sanityClient} from '../sanity/client.js';
import {urlFor} from '../sanity/image.js';
import styles from './BlogPost.module.css';

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

export default function BlogPost() {
  const {slug} = useParams();
  const [status, setStatus] = useState('loading');
  const [post, setPost] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadPost() {
      if (!slug) {
        setStatus('not-found');
        return;
      }

      try {
        const data = await sanityClient.fetch(postBySlugQuery, {slug});
        if (!active) return;
        if (!data) {
          setPost(null);
          setStatus('not-found');
          return;
        }
        setPost(data);
        setStatus('ready');
      } catch {
        if (!active) return;
        setStatus('error');
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <main className={styles.page}>
        <Section className={styles.section}>
          <Container className={styles.container}>
            <p className={styles.state}>Loading article...</p>
          </Container>
        </Section>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className={styles.page}>
        <Seo title="Article not found" description="The requested article could not be loaded." path={`/blog/${slug || ''}`} noIndex />
        <Section className={styles.section}>
          <Container className={styles.container}>
            <p className={styles.state}>Unable to load article right now.</p>
            <div className={styles.backWrap}>
              <Button to="/blog" variant="text">
                Back to Journal
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  if (status === 'not-found' || !post) {
    return (
      <main className={styles.page}>
        <Seo title="Article not found" description="The requested article could not be found." path={`/blog/${slug || ''}`} noIndex />
        <Section className={styles.section}>
          <Container className={styles.container}>
            <p className={styles.state}>Article not found.</p>
            <div className={styles.backWrap}>
              <Button to="/blog" variant="text">
                Back to Journal
              </Button>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  const publishedDate = formatDate(post.publishedAt);
  const category = categoryLabels[post.category] || post.category;
  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const featuredImage = post.featuredImage ? urlFor(post.featuredImage).width(1600).quality(82).url() : null;
  const imageAlt = post.featuredImage?.alt || post.title;

  return (
    <>
      <Seo
        title={metaTitle}
        description={metaDescription}
        path={`/blog/${post.slug}`}
        image={featuredImage || undefined}
        imageAlt={imageAlt}
        type="article"
      />

      <main className={styles.page}>
        <Section className={styles.section}>
          <Container className={styles.container}>
            <article className={styles.article}>
              <div className={styles.backWrap}>
                <Link to="/blog" className={styles.backLink}>
                  Back to Journal
                </Link>
              </div>

              <header className={styles.header}>
                <div className={styles.meta}>
                  {category ? <span>{category}</span> : null}
                  {publishedDate ? <span>{publishedDate}</span> : null}
                </div>
                <h1 className={styles.title}>{post.title}</h1>
                {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
              </header>

              {featuredImage ? (
                <figure className={styles.figure}>
                  <img src={featuredImage} alt={imageAlt} className={styles.image} loading="eager" decoding="async" />
                </figure>
              ) : null}

              <div className={styles.body}>
                <PortableContent value={post.body} />
              </div>

              <div className={styles.footerBack}>
                <Button to="/blog" variant="text">
                  Back to Journal
                </Button>
              </div>
            </article>
          </Container>
        </Section>
      </main>
    </>
  );
}
