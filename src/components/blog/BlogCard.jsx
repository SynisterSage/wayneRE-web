import {Link} from 'react-router-dom';
import Button from '../ui/Button.jsx';
import {categoryLabels} from '../../sanity/queries.js';
import {urlFor} from '../../sanity/image.js';
import styles from './BlogCard.module.css';

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

export default function BlogCard({post}) {
  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).quality(80).url() : null;
  const imageAlt = post.featuredImage?.alt || post.title;
  const date = formatDate(post.publishedAt);
  const category = categoryLabels[post.category] || post.category;

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <Link to={`/blog/${post.slug}`} className={styles.imageLink} aria-label={post.title}>
          <img src={imageUrl} alt={imageAlt} className={styles.image} loading="lazy" decoding="async" />
        </Link>
      ) : null}

      <div className={styles.content}>
        <div className={styles.meta}>
          {category ? <span>{category}</span> : null}
          {date ? <span>{date}</span> : null}
        </div>

        <h2 className={styles.title}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}

        <Button to={`/blog/${post.slug}`} variant="text" className={styles.link}>
          Read Article
        </Button>
      </div>
    </article>
  );
}
