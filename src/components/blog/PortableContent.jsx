import {PortableText} from '@portabletext/react';
import {urlFor} from '../../sanity/image.js';

const components = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  types: {
    image: ({value}) => {
      const image = urlFor(value)?.width(1600).quality(80).auto('format').url();

      if (!image) return null;

      return <img src={image} alt={value?.alt || ''} loading="lazy" />;
    },
  },
  list: {
    bullet: ({children}) => <ul>{children}</ul>,
    number: ({children}) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href || '#';
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};

export default function PortableContent({value}) {
  if (!value) return null;

  return (
    <div className="blog-rich">
      <PortableText value={value} components={components} />
    </div>
  );
}
