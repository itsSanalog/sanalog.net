// THIS WAS MADE WITH COPILOT BECAUSE I REALLY COULDNT BE ARSED TO FIGURE IT OUT MYSELF


const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Parse the XML sitemap
async function main() {
  try {
    // Read the generated sitemap.xml
    const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-index.xml');
    // If using the basic sitemap format without index
    const fallbackPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');
    
    const sitemapExists = fs.existsSync(sitemapPath);
    const fallbackExists = fs.existsSync(fallbackPath);
    
    let sitemapXml;
    if (sitemapExists) {
      sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    } else if (fallbackExists) {
      sitemapXml = fs.readFileSync(fallbackPath, 'utf8');
    } else {
      throw new Error('Sitemap file not found');
    }
    
    // If it's a sitemap index, we need to fetch the actual sitemaps
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapXml);
    
    let urls = [];
    
    if (result.sitemapindex) {
      // It's a sitemap index, we need to fetch each sitemap
      for (const sitemap of result.sitemapindex.sitemap) {
        const loc = sitemap.loc[0];
        const filename = path.basename(loc);
        const individualSitemapPath = path.join(process.cwd(), 'dist', filename);
        
        if (fs.existsSync(individualSitemapPath)) {
          const individualSitemapXml = fs.readFileSync(individualSitemapPath, 'utf8');
          const individualResult = await parser.parseStringPromise(individualSitemapXml);
          if (individualResult.urlset && individualResult.urlset.url) {
            urls = [...urls, ...individualResult.urlset.url];
          }
        }
      }
    } else if (result.urlset && result.urlset.url) {
      // It's a direct sitemap
      urls = result.urlset.url;
    }
    
    // Extract page paths and organize by hierarchy
    const pages = {};
    const site = new URL(urls[0].loc[0]).origin;
    
    urls.forEach(url => {
      const fullUrl = url.loc[0];
      const path = new URL(fullUrl).pathname;
      
      if (path === '/') {
        pages['home'] = { path: '/', children: {} };
        return;
      }
      
      // Split the path into segments
      const segments = path.split('/').filter(Boolean);
      
      // Build the hierarchy
      let current = pages;
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const segmentPath = '/' + segments.slice(0, i+1).join('/');
        
        if (!current[segment]) {
          current[segment] = { path: segmentPath, children: {} };
        }
        
        if (i < segments.length - 1) {
          current = current[segment].children;
        }
      }
    });
    
    // Generate Mermaid diagram
    let mermaidDiagram = `graph TD\n`;
    
    function addToMermaid(obj, parentId = null) {
      for (const [key, value] of Object.entries(obj)) {
        const id = parentId ? `${parentId}_${key}` : key;
        const displayName = key.replace(/-/g, ' ');
        
        mermaidDiagram += `    ${id}["${displayName}"]\n`;
        
        if (parentId) {
          mermaidDiagram += `    ${parentId} --> ${id}\n`;
        }
        
        if (Object.keys(value.children).length > 0) {
          addToMermaid(value.children, id);
        }
      }
    }
    
    addToMermaid(pages);
    
    // Also generate ASCII tree as fallback
    let asciiTree = `Site Structure\n`;
    asciiTree += `============\n\n`;
    
    function buildAsciiTree(obj, indent = '') {
      for (const [key, value] of Object.entries(obj)) {
        asciiTree += `${indent}├── ${key}\n`;
        
        if (Object.keys(value.children).length > 0) {
          buildAsciiTree(value.children, `${indent}│   `);
        }
      }
    }
    
    buildAsciiTree(pages);
    
    // Update the markdown file
    const markdown = `---
title: Sitemap Diagram
layout: ../sanastro/layouts/BlogLayout.astro
---

# Site Structure Diagram

Mermaid diagram:

\`\`\`mermaid
${mermaidDiagram}
\`\`\`

## Fallback ASCII Tree

ASCII version:

\`\`\`
${asciiTree}
\`\`\`
`;

    // Make sure the directory exists
    const outputDir = path.join(process.cwd(), 'src', 'pages');
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Write the markdown file
    fs.writeFileSync(path.join(outputDir, 'sitemap-diagram.md'), markdown);
    
    console.log('Sitemap diagram generated successfully!');
    
  } catch (error) {
    console.error('Error generating sitemap diagram:', error);
    process.exit(1);
  }
}

main();