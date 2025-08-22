import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import svelte from "@astrojs/svelte";
import sitemap from '@astrojs/sitemap';
import remarkAttr from "remark-attr";

// https://astro.build/config
export default defineConfig({
  site: "https://sanalog.net",
  // base: "/sanalog.net",
  compressHTML: true,
  scopedStyleStrategy: "class",
  // image: {
  //   // service: squooshImageService(),  //DEPRECATED Astro v5
  // },
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            class: "heading-linker",
          },
        },
      ],
    ],
    remarkPlugins: [
      [ remarkAttr,
        { properties: "className" }
      ],
    ],
  },
  integrations: [
    svelte(), 
    sitemap(),
  ],
});
