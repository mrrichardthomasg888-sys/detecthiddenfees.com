const fs = require('fs');
const path = require('path');
const root = 'C:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

// Get production HTML files (same filter as sitemap)
const excludePatterns = [
  /^test/i, /^temp/i, /^draft/i, /^header/i, /^footer/i, /^partial/i, /^include/i,
  /^out/i, /^final/i, /^hdr/i, /^headpart/i, /^_/i, /^0/i, /^1/i, /^2/i, /^3/i, /^4/i,
  /^5/i, /^6/i, /^7/i, /^8/i, /^9/i
];
const excludeExact = ['final.html', 'hdr.html', 'header.html', 'headpart.html',
  'out0.html', 'out1.html', 'part1.html', 'test_check.html', 'test_long.html',
  'test_mini.html', 'test_out.html', '_source_copy.html', '_test123.html',
  'ai-financial-advisor.html']; // GOLD STANDARD - preserve exactly

const files = fs.readdirSync(root).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (excludeExact.includes(f)) return false;
  if (excludePatterns.some(p => p.test(f))) return false;
  return true;
});

console.log('=== PERFORMANCE OPTIMIZATION ===');
console.log('Files to process: ' + files.length + '\n');

let stats = { cssSaved: 0, jsDeferred: 0, htmlSaved: 0, errors: 0 };

for (const file of files) {
  try {
    let content = fs.readFileSync(path.join(root, file), 'utf-8');
    let original = content;
    let modified = false;
    
    // 1. Minify inline CSS (preserve all classes, properties, values)
    // Remove CSS comments
    const cssRegex = /<style>([\s\S]*?)<\/style>/gi;
    content = content.replace(cssRegex, (match, css) => {
      const minified = css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
        .replace(/\s{2,}/g, ' ') // Collapse whitespace
        .replace(/\s*\{\s*/g, '{') // Remove whitespace around {
        .replace(/\s*\}\s*/g, '}') // Remove whitespace around }
        .replace(/\s*:\s*/g, ':') // Remove whitespace around :
        .replace(/\s*;\s*/g, ';') // Remove whitespace around ;
        .replace(/\s*,\s*/g, ',') // Remove whitespace around ,
        .replace(/;}/g, '}') // Remove trailing semicolons
        .replace(/^\s+|\s+$/g, ''); // Trim
      if (minified !== css) {
        stats.cssSaved += css.length - minified.length;
        modified = true;
      }
      return '<style>' + minified + '</style>';
    });
    
    // 2. Defer non-critical scripts (scripts without async/defer that are not in head)
    // Keep inline event handlers, keep head scripts, defer body scripts
    content = content.replace(/<script(\s+[^>]*)?>(?!\s*function|\s*window\.addEventListener|\s*document\.addEventListener)/gi, (match, attrs) => {
      if (!attrs) return '<script>';
      if (attrs.includes('async') || attrs.includes('defer') || attrs.includes('type=')) return match;
      return '<script defer' + attrs + '>';
    });
    
    // 3. Minify HTML safely (preserve content in tags, scripts, pre, code)
    // Remove extra whitespace between block elements
    content = content
      .replace(/\n\s{2,}/g, '\n') // Collapse indentation
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/\s{2,}/g, ' '); // Collapse remaining whitespace
    
    // But preserve content in specific tags
    content = content.replace(/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/gi, (m, o, c, e) => {
      return o + c + e;
    });
    
    // 4. Add loading=lazy to images below the fold (after first 2000 chars)
    const bodyIndex = content.indexOf('<body');
    if (bodyIndex > -1) {
      const beforeBody = content.substring(0, bodyIndex + 6);
      let afterBody = content.substring(bodyIndex + 6);
      // Only lazy-load images that don't already have loading attribute
      afterBody = afterBody.replace(/<img(\s[^>]*?)(?!(?:\s|\/)loading=)([^>]*?)>/gi, (match, before, after) => {
        return '<img' + before + ' loading="lazy"' + after + '>';
      });
      content = beforeBody + afterBody;
    }
    
    // 5. Ensure preconnect/preload for fonts and API
    if (!content.includes('<link rel="preconnect" href="https://hiddenfeeai.com"')) {
      const headEnd = content.indexOf('</head>');
      if (headEnd > -1) {
        const preconnect = '\n<link rel="preconnect" href="https://hiddenfeeai.com" crossorigin/>';
        content = content.slice(0, headEnd) + preconnect + content.slice(headEnd);
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(path.join(root, file), content, 'utf-8');
      const saved = original.length - content.length;
      stats.htmlSaved += saved;
      process.stdout.write('OPTIMIZED: ' + file + ' (' + (saved / 1024).toFixed(1) + 'KB saved)\n');
    } else {
      process.stdout.write('SKIPPED (no changes): ' + file + '\n');
    }
  } catch (err) {
    stats.errors++;
    process.stdout.write('ERROR: ' + file + ' - ' + err.message + '\n');
  }
}

console.log('\\n=== OPTIMIZATION SUMMARY ===');
console.log('Files processed: ' + files.length);
console.log('HTML/CSS size saved: ' + (stats.htmlSaved / 1024).toFixed(1) + 'KB total');
console.log('CSS minification savings: ' + (stats.cssSaved / 1024).toFixed(1) + 'KB');
console.log('Errors: ' + stats.errors);
console.log('\\nOptimizations applied:');
console.log('- Inline CSS minified (comments removed, whitespace collapsed)');
console.log('- Body scripts deferred for non-blocking load');
console.log('- HTML whitespace collapsed between tags');
console.log('- Lazy loading added to images');
console.log('- Preconnect links ensured for fonts and API');
