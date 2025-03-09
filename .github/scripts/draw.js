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
    
    // Define content sections to group
    const contentSections = [
      'blog/code',
      'blog/work',
      'blog/talk',
      'blog/reviews/music',
      'blog/reviews/games',
      'blog/reviews/webtoon',
      'blog/reviews/film',
      'blog/reviews/tools'
    ];
    
    // Process URLs and build page hierarchy
    urls.forEach(url => {
      const fullUrl = url.loc[0];
      const urlPath = new URL(fullUrl).pathname;
      
      if (urlPath === '/') {
        pages['home'] = { path: '/', children: {} };
        return;
      }
      
      // Skip specific files that shouldn't be in the sitemap
      if (['/404.html', '/robots.txt', '/favicon.ico'].includes(urlPath)) {
        return;
      }
      
      // Split path into segments
      const segments = urlPath.split('/').filter(Boolean);
      
      // Check if this path belongs to a content section we want to group
      let shouldGroup = false;
      let groupPath = '';
      
      for (const section of contentSections) {
        const sectionSegments = section.split('/');
        if (segments.length > sectionSegments.length &&
            sectionSegments.every((seg, i) => segments[i] === seg)) {
          shouldGroup = true;
          groupPath = section;
          break;
        }
      }
      
      if (shouldGroup) {
        // For content pages, just add to count in their parent section
        const groupSegments = groupPath.split('/');
        let current = pages;
        
        for (let i = 0; i < groupSegments.length; i++) {
          const segment = groupSegments[i];
          const segmentPath = '/' + groupSegments.slice(0, i+1).join('/');
          
          if (!current[segment]) {
            current[segment] = { 
              path: segmentPath, 
              children: {},
              contentCount: 0 
            };
          }
          
          if (i === groupSegments.length - 1) {
            // We're at the content section, increment count
            current[segment].contentCount = (current[segment].contentCount || 0) + 1;
          }
          
          current = current[segment].children;
        }
      } else {
        // For structure pages, add them normally
        let current = pages;
        
        for (let i = 0; i < segments.length; i++) {
          const segment = segments[i];
          const segmentPath = '/' + segments.slice(0, i+1).join('/');
          
          if (!current[segment]) {
            current[segment] = { path: segmentPath, children: {} };
          }
          
          current = current[segment].children;
        }
      }
    });

        
    // Generate Mermaid diagram
    let mermaidDiagram = `flowchart LR

    %% Theme and styling
    classDef root fill:#f4f6f8,stroke:#1a73e8,stroke-width:3px,color:#1a73e8,font-weight:bold
    classDef section fill:#e8f0fe,stroke:#4285f4,stroke-width:2px,color:#4285f4,font-weight:bold
    classDef subsection fill:#f1f8e9,stroke:#43a047,stroke-width:1.5px,color:#2e7d32
    classDef content fill:#ffffff,stroke:#90a4ae,stroke-width:1px,color:#546e7a
    classDef countNode fill:#fff8e1,stroke:#ffb74d,stroke-width:1.5px,color:#e65100,font-style:italic
    
    %% Layout direction and spacing
    linkStyle default stroke:#bdbdbd,stroke-width:1.5px
    `;

    // Add nodes and links
    function addToMermaid(obj, parentId = null, depth = 0) {
      for (const [key, value] of Object.entries(obj)) {
        const id = parentId ? `${parentId}_${key}` : key;
        let displayName = key.replace(/-/g, ' ');
        
        // Add content count if available
        if (value.contentCount) {
          displayName = `${displayName} (${value.contentCount} items)`;
          mermaidDiagram += `    ${id}["${displayName}"]\n`;
          mermaidDiagram += `    class ${id} countNode\n`;
          
          // Add URL link for navigation
          mermaidDiagram += `    click ${id} "${value.path}" _self\n`;
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
          
          // Add URL link for navigation
          mermaidDiagram += `    click ${id} "${value.path}" _self\n`;
        }
        
        if (parentId) {
          // Add logical connection hierarchy
          mermaidDiagram += `    ${parentId} --> ${id}\n`;
        }
        
        if (Object.keys(value.children).length > 0) {
          addToMermaid(value.children, id, depth + 1);
        }
      }
    }
    
    addToMermaid(pages);
    
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