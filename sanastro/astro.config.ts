import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://sanalog.net",
  // base: "/sanalog.net",
  compressHTML: true,
  scopedStyleStrategy: "class",

  integrations: [
    svelte(), 
    sitemap(),
    mdx(),
  ]
});