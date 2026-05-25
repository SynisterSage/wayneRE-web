import {createClient} from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim();

if (!projectId || !dataset) {
  throw new Error('Missing Sanity environment variables.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
});
