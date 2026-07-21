const fs = require('fs');

const replacements = [
  {
    file: 'ai-financial-assistant.html',
    old: 'AI financial assistant helps consumers detect hidden fees, analyze contracts, review invoices, and uncover pricing manipulation before money leaves their accounts.',
    new: 'An AI financial assistant helps consumers detect hidden fees, analyze contracts, review invoices, and uncover pricing manipulation before money leaves their accounts. After analysis, you get specific negotiation leverage — questions to ask, charges to challenge, and terms to renegotiate before you sign or pay.'
  },
  {
    file: 'ai-financial-advisor.html',
    old: 'An AI financial advisor delivers automated financial intelligence that helps consumers detect hidden costs, analyze financial documents, identify pricing manipulation, and make smarter money decisions without expensive human advisors.',
    new: 'An AI financial advisor delivers automated financial intelligence that helps consumers detect hidden costs, analyze financial documents, identify pricing manipulation, and make smarter money decisions without expensive human advisors. Every analysis provides specific negotiation leverage — line items to question, markups to challenge, and terms to renegotiate.'
  },
  {
    file: 'ai-financial-analysis.html',
    old: 'AI for financial analysis transforms how consumers detect hidden fees, review contracts, analyze invoices, and make smarter financial decisions.',
    new: 'AI for financial analysis transforms how consumers detect hidden fees, review contracts, analyze invoices, and make smarter financial decisions. Every analysis delivers actionable negotiation leverage — giving you specific questions and talking points to challenge unfair pricing before you pay or sign.'
  },
  {
    file: 'financial-analysis-software.html',
    old: 'Financial analysis software has evolved from simple spreadsheet tools into sophisticated AI-powered platforms that detect hidden fees, review contracts, analyze invoices, and protect consumers from pricing manipulation.',
    new: 'Financial analysis software has evolved from simple spreadsheet tools into sophisticated AI-powered platforms that detect hidden fees, review contracts, analyze invoices, and protect consumers from pricing manipulation. The best tools also provide negotiation leverage — turning every hidden fee discovery into a concrete opportunity to save money.'
  },
  {
    file: 'financial-analysis-tools.html',
    old: 'Financial analysis tools have evolved from simple calculators into sophisticated AI-powered platforms that detect hidden fees, review contracts, analyze invoices, and protect consumers from pricing manipulation.',
    new: 'Financial analysis tools have evolved from simple calculators into sophisticated AI-powered platforms that detect hidden fees, review contracts, analyze invoices, and protect consumers from pricing manipulation. The right tools also deliver negotiation leverage — turning every finding into leverage you can use immediately to negotiate better terms.'
  }
];

let successCount = 0;
let failCount = 0;

replacements.forEach(r => {
  let content = fs.readFileSync(r.file, 'utf8');
  if (content.includes(r.old)) {
    content = content.replace(r.old, r.new);
    fs.writeFileSync(r.file, content, 'utf8');
    console.log('✓ ' + r.file + ' - updated hero paragraph');
    successCount++;
  } else {
    console.log('✗ ' + r.file + ' - could not find matching text');
    failCount++;
  }
});

console.log('\nDone: ' + successCount + ' succeeded, ' + failCount + ' failed');