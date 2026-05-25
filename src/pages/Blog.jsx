import {useEffect, useState} from 'react';
import {Seo} from '../utils/seo.js';
import Container from '../components/ui/Container.jsx';
import Section from '../components/ui/Section.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import {allPostsQuery} from '../sanity/queries.js';
import {sanityClient} from '../sanity/client.js';
import styles from './Blog.module.css';

export default function Blog() {
  const [status, setStatus] = useState('loading');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const data = await sanityClient.fetch(allPostsQuery);
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
    <>
      <Seo
        title="Wayne Journal | Wayne NJ & Packanack Lake Real Estate"
        description="Thoughtful guidance on Wayne real estate, Packanack Lake, local market preparation, and the decisions that shape a move."
        path="/blog"
      />

      <main className={styles.page}>
        <Section className={styles.introSection}>
          <Container className={styles.container}>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>Wayne Journal</p>
              <h1 className={styles.title}>Local notes for buyers, sellers, and future neighbors.</h1>
              <p className={styles.lead}>
                Thoughtful guidance on Wayne real estate, Packanack Lake, local market
                preparation, and the decisions that shape a move.
              </p>
            </div>
          </Container>
        </Section>

        <Section className={styles.listSection}>
          <Container className={styles.container}>
            {isLoading ? <p className={styles.state}>Loading articles...</p> : null}
            {isError ? <p className={styles.state}>Unable to load articles right now.</p> : null}
            {isEmpty ? <p className={styles.state}>No articles are published yet. Please check back soon.</p> : null}

            {!isLoading && !isError && posts.length > 0 ? (
              <div className={styles.grid}>
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      </main>
    </>
  );
}
