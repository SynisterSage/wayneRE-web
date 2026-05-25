import {createImageUrlBuilder} from '@sanity/image-url';
import {sanityClient} from './client.js';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}
