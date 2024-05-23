// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({  // not using ({ image }) will break stuff
    cover: image().optional(),
    coverAlt: z.string().optional(),
    banner: image().optional(),
    bannerAlt: z.string().optional(),

    title: z.string(),  // required
    description: z.string().optional(),
    author: z.string().optional().default('Sanalog'),
    creationDate: z.string().optional(),

    publicationDate: z.date().optional(),
    sortOrder: z.number().optional(),
    // "slug" is a special, reserved property name that is not allowed in custom collection schema
  }),
});

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    imageLink: z.string().optional(),
    imageAlt: z.string().optional(),

    title: z.string(), // required
    artist: z.string().optional(),
    releaseDate: z.date().optional(),

    publicationDate: z.date().optional(),
    sortOrder: z.number().optional(),
    
    stars: z.number().optional(),
    rating: z.number().optional(),
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
  'reviews': reviewsCollection,
};
