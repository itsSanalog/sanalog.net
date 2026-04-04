const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

async function main() {
  try {
    const rootDir = process.cwd();
    const astroDir = path.join(rootDir, 'sanastro');
    
    const sitemapPath = path.join(astroDir, 'dist', 'sitemap-index.xml');
    const fallbackPath = path.join(astroDir, 'dist', 'sitemap-0.xml');
    
    let sitemapXml;
    if (fs.existsSync(sitemapPath)) sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    else if (fs.existsSync(fallbackPath)) sitemapXml = fs.readFileSync(fallbackPath, 'utf8');
    else throw new Error('Sitemap file not found');
    
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapXml);
    let urls = [];
    
    if (result.sitemapindex) {
      for (const sitemap of result.sitemapindex.sitemap) {
        const loc = sitemap.loc[0];
        const individualSitemapPath = path.join(astroDir, 'dist', path.basename(loc));
        if (fs.existsSync(individualSitemapPath)) {
          const individualResult = await parser.parseStringPromise(fs.readFileSync(individualSitemapPath, 'utf8'));
          if (individualResult.urlset && individualResult.urlset.url) {
            urls = [...urls, ...individualResult.urlset.url];
          }
        }
      }
    } else if (result.urlset && result.urlset.url) {
      urls = result.urlset.url;
    }

    const siteUrl = 'https://sanalog.net'; 
    const nodesMap = new Map();
    const links = [];

    // Helper to add nodes
    function addNode(nodePath, label, isLeaf) {
      if (!nodesMap.has(nodePath)) {
        // Group by top-level directory for color coding
        const topLevel = nodePath.split('/')[1] || 'home';
        const nodeData = {
          id: nodePath,
          label: label,
          group: topLevel, 
          val: isLeaf ? 4 : 12, // 12 for Categories, 4 for individual posts
          url: nodePath
        };

        // All my homies home to origin
        if (nodePath === '/') {
          nodeData.fx = 0;
          nodeData.fy = 0;
        }

        nodesMap.set(nodePath, nodeData);
      }
    }

    // Always add home root
    addNode('/', 'home', false);

    urls.forEach(urlObj => {
      let urlPath = urlObj.loc[0].replace(siteUrl, '');
      if (urlPath === '/' || urlPath === '') return;
      if (urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1);
      
      const segments = urlPath.split('/').filter(Boolean).map(decodeURIComponent);
      let currentPath = '';
      let parentPath = '/';

      segments.forEach((segment, index) => {
        currentPath += '/' + segment;
        const isLeaf = index === segments.length - 1;
        
        addNode(currentPath, segment, isLeaf);

        // Map link
        if (!links.some(l => l.source === parentPath && l.target === currentPath)) {
          links.push({ source: parentPath, target: currentPath });
        }
        
        // Ensure parent is flagged as a large node
        if (nodesMap.has(parentPath) && parentPath !== '/') {
          nodesMap.get(parentPath).val = 12; 
        }
        
        parentPath = currentPath;
      });
    });

    const graphData = {
      nodes: Array.from(nodesMap.values()),
      links: links
    };

    const markdown = 
`---
title: "Sitemap"
sortOrder: 1
---

<pre id="graph-container" class="wide"></pre>

<script id="sitemap-data" type="application/json">
${JSON.stringify(graphData)}
</script>

<br>

<span class="muted">last updated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
`;

    const outputDir = path.join(astroDir, 'src', 'content', 'blog');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'sitemap.md'), markdown);
    
    console.log('JSON Sitemap generated successfully at src/content/blog/sitemap.md!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main();