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
    
     // Create a tree structure from the URLs
     const siteTree = { name: 'root', children: {}, path: '/' };
    
     urls.forEach(url => {
       const fullUrl = url.loc[0];
       let urlPath = new URL(fullUrl).pathname;
       
       // Skip if empty or just "/"
       if (!urlPath || urlPath === '/') {
         siteTree.children['home'] = { name: 'home', path: '/', children: {} };
         return;
       }
       
       // Remove trailing slash if exists
       if (urlPath.endsWith('/')) {
         urlPath = urlPath.slice(0, -1);
       }
       
       // Split path into segments
       const segments = urlPath.split('/').filter(Boolean);
       
       // Build the path in the tree
       let currentNode = siteTree;
       
       for (let i = 0; i < segments.length; i++) {
         const segment = segments[i];
         const segmentPath = '/' + segments.slice(0, i+1).join('/');
         
         if (!currentNode.children[segment]) {
           currentNode.children[segment] = { 
             name: segment,
             path: segmentPath,
             children: {}
           };
         }
         
         currentNode = currentNode.children[segment];
       }
     });
        
    // Generate Mermaid diagram
    let mermaidDiagram = `flowchart TD

      %% Styling
      classDef root fill:#f9f9f9,stroke:#333,stroke-width:2px,color:#333,font-weight:bold,font-size:16px
      classDef section fill:#e6f2ff,stroke:#0066cc,stroke-width:1px,color:#0066cc,font-weight:bold,font-size:14px
      classDef subsection fill:#f0f7ff,stroke:#4895ef,stroke-width:1px,color:#4895ef,font-size:14px
      classDef content fill:#f8f9fa,stroke:#adb5bd,stroke-width:1px,color:#495057,font-size:13px
      classDef countNode fill:#fff8f0,stroke:#f4a261,stroke-width:1px,color:#e76f51,font-style:italic,font-size:13px
      
      linkStyle default stroke:#999,stroke-width:1px\n
    `;
    
    // Generate nodes and connections
    function generateMermaidNodes(node, parentId = null) {
      const nodeName = node.name.replace(/-/g, ' '); // Replace hyphens with spaces for display
      const nodeId = parentId ? `${parentId}_${node.name}` : node.name;
      
      // Add node
      mermaidDiagram += `    ${nodeId}["${nodeName}"]\n`;
      
      // Add style class
      if (!parentId) {
        mermaidDiagram += `    class ${nodeId} root\n`;
      } else if (Object.keys(node.children).length > 0) {
        mermaidDiagram += `    class ${nodeId} section\n`;
      } else {
        mermaidDiagram += `    class ${nodeId} leaf\n`;
      }
      
      // Add connection to parent
      if (parentId) {
        mermaidDiagram += `    ${parentId} --> ${nodeId}\n`;
      }
      
      // Process children
      for (const [childName, childNode] of Object.entries(node.children)) {
        generateMermaidNodes(childNode, nodeId);
      }
    }
    
    // Generate nodes starting from root's children
    for (const [childName, childNode] of Object.entries(siteTree.children)) {
      generateMermaidNodes(childNode);
    }

    
    
    // Generate ASCII tree for alternative view
    let asciiTree = 'Site Structure\n============\n\n';
    
    function generateAsciiTree(node, indent = '') {
      const entries = Object.entries(node.children);
      
      entries.forEach(([key, childNode], index) => {
        const isLast = index === entries.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        
        asciiTree += `${indent}${connector}${childNode.name}\n`;
        
        if (Object.keys(childNode.children).length > 0) {
          const childIndent = indent + (isLast ? '    ' : '│   ');
          generateAsciiTree(childNode, childIndent);
        }
      });
    }
    
    generateAsciiTree(siteTree);
    
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

<details>
  <summary>DEBUG</summary>
  <pre>
    ${mermaidDiagram}
  </pre>
</details>

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