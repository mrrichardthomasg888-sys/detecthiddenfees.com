const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf-8');
const orig = h;

// 1. Remove the entire EVA CSS style block (from "<!-- ===== EVA ASSISTANT ===== -->" to "</style>")
const evaStyleStart = h.indexOf('<!-- ===== EVA ASSISTANT ===== -->');
const evaStyleEnd = h.indexOf('</style>', evaStyleStart) + 8;
if (evaStyleStart > -1 && evaStyleEnd > evaStyleStart) {
  h = h.substring(0, evaStyleStart) + h.substring(evaStyleEnd);
}

// 2. Remove the eva-pulse div
h = h.replace(/<div class="eva-pulse" id="ePulse"><\/div>\s*\n?\s*/g, '');

// 3. Remove the entire evaW widget (from '<button class="cl"' to the closing '</div>' + </body>)
// Find the close button that starts the evaW
const evaBtnStart = h.indexOf('<button class="cl"');
const evaWClose = h.indexOf('</div>', evaBtnStart) + 6;
if (evaBtnStart > -1 && evaWClose > evaBtnStart) {
  h = h.substring(0, evaBtnStart) + h.substring(evaWClose);
}

// 4. Remove the Eva/Brevo script block
h = h.replace(/<script>[\s\S]*?xkeysib[\s\S]*?<\/script>/gi, '');
h = h.replace(/<script>[\s\S]*?brevo[\s\S]*?<\/script>/gi, '');
h = h.replace(/<script>\s*setTimeout\(function\(\)\{document\.getElementById\('evaW'\)[\s\S]*?<\/script>/g, '');

// 5. Clean up extra blank lines
h = h.replace(/\n\s*\n\s*\n/g, '\n\n');
h = h.replace(/\n\s*\n\s*\n/g, '\n\n');

// 6. Fix spacing at top of hero section - reduce padding
// Ensure the hero section has compact padding
h = h.replace(/\.hero \{/g, '.hero {\n            padding-top: 0;');

fs.writeFileSync('index.html', h, 'utf-8');
console.log('Fixed. Size: ' + h.length + ' (was ' + orig.length + ')');
console.log('Has Eva: ' + (h.indexOf('evaW') > -1));
console.log('Has Brevo: ' + (h.indexOf('xkeysib') > -1 || h.indexOf('brevo') > -1));