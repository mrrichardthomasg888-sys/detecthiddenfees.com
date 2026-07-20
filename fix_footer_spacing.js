const fs = require('fs');

// The footer links need display:block and padding to space them out
// The current CSS has: footer-links a { color, font-weight, font-size, transition }
// We need to add: display:block; padding:4px 0; to space them vertically

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('simple_test'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix 1: Update the footer-links a CSS to add vertical spacing
  // The existing CSS pattern
  const oldCss = `.footer-links a{color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;}`;
  const oldCssAlt = `.footer-links a{color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;}`;
  const oldCss2 = `.footer-links a:hover{color:#fff;}`;
  
  const newCss = `.footer-links a{color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;display:block;padding:4px 0;line-height:1.6;}`;
  
  if (content.includes(oldCss)) {
    content = content.replace(oldCss, newCss);
  }
  
  // Also fix the footer-links container to use proper alignment
  const oldFooterLinks = `.footer-links{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;}`;
  const newFooterLinks = `.footer-links{display:flex;justify-content:center;flex-wrap:wrap;margin-bottom:14px;}`;
  
  if (content.includes(oldFooterLinks)) {
    content = content.replace(oldFooterLinks, newFooterLinks);
  }
  
  // Fix 2: Add padding to the grid columns' anchor tags that use inline style
  // Each <a> in footer columns - add padding-bottom to separate them
  // The grid columns have inline style "min-width:180px" - add padding to links inside them
  // Let's add padding to the <strong> headers too for more breathing room
  const oldStrong = `margin-bottom:8px;font-size:1.05rem;`;
  const newStrong = `margin-bottom:12px;font-size:1.05rem;`;
  
  if (content.includes(oldStrong)) {
    content = content.replace(new RegExp(oldStrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStrong);
  }
  
  // Fix 3: Add wrapper div spacing - gap between grid items
  const oldGridStyle = `display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:left;`;
  const newGridStyle = `display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px;text-align:left;`;
  
  if (content.includes(oldGridStyle)) {
    content = content.replace(oldGridStyle, newGridStyle);
  }
  
  // Fix 4: Add padding to the container inside footer for better margins
  const footerContainer = `<footer>\n<div class="container">\n<div class="footer-links"`;
  // Add padding to the footer element itself
  const oldFooter = `footer{padding:50px 20px 60px;text-align:center;color:#64748b;border-top:1px solid rgba(255,255,255,.06);margin-top:50px;}`;
  const newFooter = `footer{padding:50px 20px 60px;text-align:center;color:#64748b;border-top:1px solid rgba(255,255,255,.06);margin-top:50px;}`;
  
  // Check if we need to add padding to the column divs
  // Each column div has style="min-width:180px;" - we need to add padding and proper link spacing
  // Let's add a small CSS class for footer column links
  const additionalCss = `.footer-column{min-width:200px;}.footer-column a{display:block;padding:5px 0;color:#94a3b8;font-weight:600;font-size:.85rem;transition:color 0.2s;}.footer-column a:hover{color:#fff;}.footer-column strong{color:#94a3b8;display:block;margin-bottom:14px;font-size:1.05rem;letter-spacing:0.5px;}`;
  
  // Insert additional CSS before </style>
  const styleEnd = content.indexOf('</style>');
  if (styleEnd > -1 && !content.includes('footer-column')) {
    content = content.substring(0, styleEnd) + additionalCss + '\n' + content.substring(styleEnd);
  }
  
  // Replace inline column styles with class
  content = content.replace(/<div style="min-width:180px;">/g, '<div class="footer-column">');
  content = content.replace(/<strong style="color:#94a3b8;display:block;margin-bottom:12px;font-size:1.05rem;">/g, '<strong>');
  
  fs.writeFileSync(file, content, 'utf8');
  count++;
}

console.log(`Fixed footer spacing on ${count} pages`);