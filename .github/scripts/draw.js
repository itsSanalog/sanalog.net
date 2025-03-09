// THIS WAS FIRST MADE WITH COPILOT BECAUSE I REALLY COULDNT BE ARSED TO FIGURE IT OUT MYSELF

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Parse the XML sitemap
async function main() {
  try {
    const rootDir = process.cwd();
    const astroDir = path.join(rootDir, 'sanastro');
    
    // Read the generated sitemap.xml
    const sitemapPath = path.join(astroDir, 'dist', 'sitemap-index.xml');
    const fallbackPath = path.join(astroDir, 'dist', 'sitemap-0.xml');
    
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
    
    // Parse sitemap
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapXml);
    
    let urls = [];
    
    if (result.sitemapindex) {
      // It's a sitemap index, we need to fetch each sitemap
      for (const sitemap of result.sitemapindex.sitemap) {
        const loc = sitemap.loc[0];
        const filename = path.basename(loc);
        const individualSitemapPath = path.join(astroDir, 'dist', filename);
        
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
    
    urls.forEach(url => {
      const fullUrl = url.loc[0];
      const urlPath = new URL(fullUrl).pathname;
      
      if (urlPath === '/') {
        pages['home'] = { path: '/', children: {} };
        return;
      }
      
      // Split the path into segments
      const segments = urlPath.split('/').filter(Boolean);
      
      // Skip if not under /blog
      if (segments[0] !== 'blog') return;
      
      // Build the hierarchy
      let current = pages;
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const segmentPath = '/' + segments.slice(0, i+1).join('/');
        
        if (!current[segment]) {
          current[segment] = { 
            path: segmentPath, 
            children: {},
            contentCount: 0
          };
        }
        
        if (i < segments.length - 1) {
          current = current[segment].children;
        } else {
          // This is a leaf node (content page)
          current[segment].isContent = true;
        }
      }
    });

    // Group pages and count content
    function groupPages(obj) {
      const contentCategories = {};
      
      // First pass: identify content categories
      for (const [key, value] of Object.entries(obj)) {
        if (Object.keys(value.children).length > 0) {
          // Get category from first path segment
          const category = key.split('_')[0];
          if (!contentCategories[category]) {
            contentCategories[category] = [];
          }
          contentCategories[category].push(key);
        }
      }
      
      // Second pass: process each node
      for (const [key, value] of Object.entries(obj)) {
        // If this is a section with children
        if (Object.keys(value.children).length > 0) {
          // Count content pages
          let contentCount = 0;
          for (const childValue of Object.values(value.children)) {
            if (childValue.isContent) {
              contentCount++;
            }
          }
          
          // If it has content pages, store the count and clear children
          if (contentCount > 0) {
            value.contentCount = contentCount;
            value.children = {}; // Remove individual content pages
          } else {
            // Recursively process its children
            groupPages(value.children);
          }
        }
      }
      
      return obj;
    }
    
    // Group content pages
    const groupedPages = groupPages(structuredClone(pages));
        
    // Generate Mermaid diagram
    let mermaidDiagram = `flowchart TD

      %% Styling
      classDef root fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#333,font-weight:bold,font-size:16px
      classDef section fill:#e6f2ff,stroke:#0066cc,stroke-width:1px,color:#0066cc,font-weight:bold,font-size:14px
      classDef subsection fill:#f0f7ff,stroke:#4895ef,stroke-width:1px,color:#4895ef,font-size:14px
      classDef content fill:#f8f9fa,stroke:#adb5bd,stroke-width:1px,color:#495057,font-size:13px
      classDef countNode fill:#fff8f0,stroke:#f4a261,stroke-width:1px,color:#e76f51,font-style:italic,font-size:13px
      
      linkStyle default stroke:#999,stroke-width:1px
    `;

    function addToMermaid(obj, parentId = null, depth = 0) {
      for (const [key, value] of Object.entries(obj)) {
        const id = parentId ? `${parentId}_${key}` : key;
        let displayName = key.replace(/-/g, ' ');
        
        // Add content count if available
        if (value.contentCount && value.contentCount > 0) {
          displayName = `${displayName} (${value.contentCount})`;
          mermaidDiagram += `    ${id}["${displayName}"]\n`;
          mermaidDiagram += `    class ${id} countNode\n`;
        } else {
          mermaidDiagram += `    ${id}["${displayName}"]\n`;
          
          // Apply classes based on depth
          if (depth === 0) {
            mermaidDiagram += `    class ${id} root\n`;
          } else if (depth === 1) {
            mermaidDiagram += `    class ${id} section\n`;
          } else if (depth === 2) {
            mermaidDiagram += `    class ${id} subsection\n`;
          } else {
            mermaidDiagram += `    class ${id} content\n`;
          }
        }
        
        if (parentId) {
          // Cleaner label without the path
          mermaidDiagram += `    ${parentId} --> ${id}\n`;
        }
        
        if (Object.keys(value.children).length > 0) {
          addToMermaid(value.children, id, depth + 1);
        }
      }
    }
    
    addToMermaid(groupedPages);

    
    
    // Also generate ASCII tree as fallback
    let asciiTree = `ASCII version\n`;
    asciiTree += `=============\n\n`;
    
    function buildAsciiTree(obj, indent = '') {
      const entries = Object.entries(obj);
      entries.forEach(([key, value], index) => {
        const isLast = index === entries.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const contentInfo = value.contentCount ? ` (${value.contentCount} items)` : '';
        
        asciiTree += `${indent}${connector}${key}${contentInfo}\n`;
        
        if (Object.keys(value.children).length > 0) {
          const childIndent = indent + (isLast ? '    ' : '│   ');
          buildAsciiTree(value.children, childIndent);
        }
      });
    }
    
    buildAsciiTree(groupedPages);
    
    // Create or update the markdown file
    const markdown = 
`---
# cover:
# coverAlt:
# banner:
# bannerAlt:

title: "Sitemap"
# description: ""
# author:
# publicationDate:
# creationDate: 
sortOrder: 1
---

<pre class="wide mermaid">
${mermaidDiagram}
</pre>

<details>
  <summary>ASCII version — click to expand</summary>
  <pre>
  ${asciiTree}
  </pre>
</details>

<br>

<span class="muted">last updated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
`;

    // Make sure the directory exists
    const outputDir = path.join(astroDir, 'src', 'content', 'blog');
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Write the markdown file to the new location
    fs.writeFileSync(path.join(outputDir, 'sitemap.md'), markdown);
    
    console.log('Sitemap diagram generated successfully at src/content/blog/sitemap.md!');
    
  } catch (error) {
    console.error('Error generating sitemap diagram:', error);
    process.exit(1);
  }
}

main();