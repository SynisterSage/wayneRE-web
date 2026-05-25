import {createClient} from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'fyrj5x2b';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
});
