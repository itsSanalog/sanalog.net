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
    // If using the basic sitemap format without index
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
    
    // If it's a sitemap index, we need to fetch the actual sitemaps
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
    
    // Group section pages and count content
    function groupAndCountPages(obj) {
      for (const [key, value] of Object.entries(obj)) {
        if (Object.keys(value.children).length > 0) {
          // Count content pages in specific sections we want to group
          if (['reviews_music', 'reviews_games', 'reviews_webtoon', 'talk'].some(section => key.includes(section))) {
            value.contentCount = Object.keys(value.children).length;
            value.children = {}; // Remove individual content pages
          } else {
            groupAndCountPages(value.children);
          }
        }
      }
      return obj;
    }
    
    // Group content pages
    const groupedPages = groupAndCountPages(structuredClone(pages));
        
    // Generate Mermaid diagram
    let mermaidDiagram = `flowchart TD

    %% Mermaid diagram styling
    classDef root fill:#ffffff,stroke:#333,stroke-width:2px,color:#333,font-weight:bold
    classDef section fill:#e6f3ff,stroke:#0077b6,stroke-width:1px,color:#0077b6,font-weight:bold
    classDef subsection fill:#f0f7ff,stroke:#4895ef,stroke-width:1px,color:#4895ef
    classDef content fill:#f8f9fa,stroke:#adb5bd,stroke-width:1px,color:#495057
    classDef countNode fill:#ffedd8,stroke:#f4a261,stroke-width:1px,color:#e76f51,font-style:italic
    `;
    
    function addToMermaid(obj, parentId = null, depth = 0) {
      for (const [key, value] of Object.entries(obj)) {
        const id = parentId ? `${parentId}_${key}` : key;
        let displayName = key.replace(/-/g, ' ');
        
        // Add content count if available
        if (value.contentCount) {
          displayName = `${displayName} (${value.contentCount} items)`;
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
          mermaidDiagram += `    ${parentId} -->|"${key.replace(/-/g, ' ')}"| ${id}\n`;
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
      for (const [key, value] of Object.entries(obj)) {
        asciiTree += `${indent}├── ${key}\n`;
        
        if (Object.keys(value.children).length > 0) {
          buildAsciiTree(value.children, `${indent}│   `);
        }
      }
    }
    
    buildAsciiTree(pages);
    
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

<!--commit test 1-->

<pre class="wide mermaid">
${mermaidDiagram}
</pre>

<pre>
${asciiTree}
</pre>

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