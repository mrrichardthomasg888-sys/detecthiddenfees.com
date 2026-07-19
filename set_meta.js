const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com';

const pages = {
  'hidden-fee-intelligence-center': {
    title: 'Hidden Fee Intelligence Center: Complete Guide to Hidden Charges',
    desc: 'Your complete intelligence center for hidden fees. AI-powered analysis, industry guides, calculators, and expert strategies to detect and eliminate hidden charges.',
    keywords: 'hidden fee intelligence, hidden charges, find hidden fees, avoid hidden costs, pricing transparency',
    badge: 'HIDDEN FEE INTELLIGENCE CENTER',
    h1: 'Hidden Fee Intelligence Center: Detect, Analyze, and Eliminate Hidden Charges',
    hero: 'Welcome to the most comprehensive hidden fee intelligence resource available. Our AI-powered platform analyzes thousands of documents to identify hidden charges across every industry.'
  },
  'consumer-negotiation-academy': {
    title: 'Consumer Negotiation Academy: Master the Art of Paying Less',
    desc: 'Learn professional negotiation strategies for medical bills, service contracts, and monthly expenses. Expert scripts, templates, and AI-powered preparation tools.',
    keywords: 'consumer negotiation, negotiate bills, negotiation strategies, bill negotiation tips, lower expenses',
    badge: 'CONSUMER NEGOTIATION ACADEMY',
    h1: 'Consumer Negotiation Academy: Become a Master Negotiator',
    hero: 'Welcome to the Consumer Negotiation Academy. Learn proven strategies to negotiate bills, reduce expenses, and save thousands with AI-powered preparation tools.'
  },
  'hidden-fee-glossary': { title: 'Hidden Fee Glossary: Complete Dictionary of Hidden Charges', desc: 'Comprehensive glossary of hidden fee terms and definitions. Understand every charge on your bills and contracts.', keywords: 'hidden fee glossary, fee definitions, billing terms explained, hidden charges dictionary', badge: 'HIDDEN FEE GLOSSARY', h1: 'Hidden Fee Glossary: Every Term Explained in Plain English', hero: 'Understand every fee, surcharge, and billing term with our comprehensive glossary. Clear, plain-English explanations for hundreds of hidden charges.' },
  'hidden-fee-risk-score': { title: 'Hidden Fee Risk Score: Rate Your Risk of Hidden Charges', desc: 'Assess your exposure to hidden fees with our risk scoring system. Identify which industries and services pose the highest risk of hidden charges.', keywords: 'hidden fee risk score, fee risk assessment, hidden charge risk, financial risk analysis', badge: 'HIDDEN FEE RISK SCORE', h1: 'Hidden Fee Risk Score: Evaluate Your Exposure', hero: 'Not all industries pose the same risk of hidden fees. Our risk scoring system helps you understand where you are most vulnerable.' },
  'hidden-fee-reports': { title: 'Hidden Fee Reports: Industry Analysis and Consumer Research', desc: 'In-depth hidden fee reports across industries. Research-backed analysis of pricing practices, fee structures, and consumer protection strategies.', keywords: 'hidden fee reports, fee industry analysis, consumer pricing research, hidden fee investigation', badge: 'HIDDEN FEE REPORTS', h1: 'Hidden Fee Reports: Research-Backed Industry Analysis', hero: 'Our research team analyzes hidden fee practices across every major industry. Read our in-depth reports.' },
  'hidden-fee-examples': { title: 'Hidden Fee Examples: Real Examples of Hidden Charges', desc: 'Real-world examples of hidden fees across medical, banking, telecom, and service industries. See exactly what to look for on your bills.', keywords: 'hidden fee examples, real hidden charges, billing examples, fee examples by industry', badge: 'HIDDEN FEE EXAMPLES', h1: 'Hidden Fee Examples: Real Charges Real Consumers Faced', hero: 'Real examples of hidden fees discovered by HiddenFeeAI users across medical bills, banking statements, and service contracts.' },
  'hidden-fee-prevention-guide': { title: 'Hidden Fee Prevention Guide: Stop Hidden Charges Before They Happen', desc: 'Learn how to prevent hidden fees before they appear. Proactive strategies for avoiding unnecessary charges on bills, contracts, and services.', keywords: 'hidden fee prevention, avoid hidden fees, prevent overcharges, fee avoidance strategies', badge: 'HIDDEN FEE PREVENTION GUIDE', h1: 'Hidden Fee Prevention Guide: Stop Overpaying Before It Starts', hero: 'The best way to deal with hidden fees is to prevent them before they appear. This guide teaches you proactive strategies.' },
  'contract-red-flags': { title: 'Contract Red Flags: Warning Signs in Every Agreement', desc: 'Identify contract red flags before signing. Common warning signs of hidden fees, one-sided clauses, pricing manipulation, and unfair terms.', keywords: 'contract red flags, warning signs in contracts, bad contract clauses, contract risks, unfair contract terms', badge: 'CONTRACT RED FLAGS', h1: 'Contract Red Flags: Warning Signs to Watch For', hero: 'Every contract contains clues about its fairness. Learn to spot the red flags that indicate hidden fees and unfavorable terms.' },
  'hidden-contract-fees': { title: 'Hidden Contract Fees: Where Charges Hide in Agreements', desc: 'Discover where hidden fees hide in contracts and agreements. Learn how to identify buried charges before signing any contract.', keywords: 'hidden contract fees, contract hidden charges, buried fees in contracts, agreement fee detection', badge: 'HIDDEN CONTRACT FEES', h1: 'Hidden Contract Fees: Where Companies Hide the Real Cost', hero: 'Hidden contract fees are the most expensive kind of hidden charges because they lock you into paying for months or years.' },
  'contract-review-checklist': { title: 'Contract Review Checklist: Complete Guide to Reviewing Agreements', desc: 'Comprehensive contract review checklist covering hidden fees, risky clauses, pricing terms, and negotiation opportunities for any agreement.', keywords: 'contract review checklist, review contracts, contract analysis guide, check contracts for fees', badge: 'CONTRACT REVIEW CHECKLIST', h1: 'Contract Review Checklist: Never Miss a Hidden Fee', hero: 'Use this comprehensive checklist to review every contract thoroughly before signing. From hidden fees to risky clauses.' },
  'contract-risk-assessment-guide': { title: 'Contract Risk Assessment Guide: Evaluate Any Agreement', desc: 'Learn how to assess contract risk across five dimensions. Evaluate hidden fees, one-sided clauses, pricing manipulation, and negotiation opportunities.', keywords: 'contract risk assessment, evaluate contract risk, agreement risk analysis, contract safety', badge: 'CONTRACT RISK ASSESSMENT', h1: 'Contract Risk Assessment Guide: Know What You Are Signing', hero: 'Every contract carries risk. Learn how to assess it systematically across five key dimensions.' },
  'business-contract-review': { title: 'Business Contract Review: Protect Your Company From Hidden Fees', desc: 'Professional business contract review for small and medium businesses. Detect hidden fees, vendor overcharges, and unfavorable terms in commercial agreements.', keywords: 'business contract review, commercial contract analysis, vendor agreement review, business fee detection', badge: 'BUSINESS CONTRACT REVIEW', h1: 'Business Contract Review: Protect Your Bottom Line', hero: 'Hidden fees in business contracts cost companies thousands. Learn how to review commercial agreements effectively.' },
  'bill-negotiation-templates': { title: 'Bill Negotiation Templates: Ready-to-Use Scripts and Letters', desc: 'Professional bill negotiation templates for medical bills, utility bills, phone bills, and more. Ready-to-use scripts that get results.', keywords: 'bill negotiation templates, negotiation scripts, bill dispute templates, negotiation letter templates', badge: 'BILL NEGOTIATION TEMPLATES', h1: 'Bill Negotiation Templates: Proven Scripts That Work', hero: 'Use these proven templates to negotiate every type of bill. Each template is based on thousands of successful negotiations.' },
  'negotiation-scripts': { title: 'Negotiation Scripts: What to Say to Save Money on Every Bill', desc: 'Ready-to-use negotiation scripts for phone calls and emails. Know exactly what to say to billing departments to get results.', keywords: 'negotiation scripts, what to say to negotiate bills, bill negotiation phone scripts, negotiation language', badge: 'NEGOTIATION SCRIPTS', h1: 'Negotiation Scripts: Exactly What to Say to Save Money', hero: 'The right words make all the difference. Use these proven scripts for every negotiation situation.' },
  'fee-removal-request-template': { title: 'Fee Removal Request Template: Get Hidden Charges Removed', desc: 'Professional fee removal request templates. Write effective letters and emails to get hidden fees, late fees, and unauthorized charges removed.', keywords: 'fee removal request, remove hidden fees, fee waiver letter, dispute charges template', badge: 'FEE REMOVAL REQUEST', h1: 'Fee Removal Request Template: Write Letters That Work', hero: 'A well-written fee removal request can eliminate hundreds in charges. Use our proven templates.' },
  'medical-bill-negotiation-template': { title: 'Medical Bill Negotiation Template: Reduce Your Hospital Bill', desc: 'Ready-to-use medical bill negotiation templates. Proven scripts for negotiating hospital bills, reducing medical debt, and disputing billing errors.', keywords: 'medical bill negotiation template, hospital bill negotiation, medical bill dispute, reduce hospital costs', badge: 'MEDICAL BILL NEGOTIATION', h1: 'Medical Bill Negotiation Template: Cut Your Hospital Bill in Half', hero: 'Use these proven medical bill negotiation templates to reduce your hospital bills by 20-60%.' }
};

for (const [name, m] of Object.entries(pages)) {
  const fp = path.join(dir, name + '.html');
  if (!fs.existsSync(fp)) { console.log('MISSING: ' + name); continue; }
  try {
    let c = fs.readFileSync(fp, 'utf8');
    c = c.replace(/<title>[^<]+<\/title>/, '<title>' + m.title + ' | DetectHiddenFees<\/title>');
    c = c.replace(/<meta name=\"description\" content=\"[^\"]*\"/, '<meta name=\"description\" content=\"' + m.desc + '\"');
    c = c.replace(/<meta name=\"keywords\" content=\"[^\"]*\"/, '<meta name=\"keywords\" content=\"' + m.keywords + '\"');
    c = c.replace(/<link rel=\"canonical\" href=\"[^\"]*\"/, '<link rel=\"canonical\" href=\"https://detecthiddenfees.com/' + name + '.html\"');
    c = c.replace(/<meta property=\"og:title\" content=\"[^\"]*\"/, '<meta property=\"og:title\" content=\"' + m.title + ' | DetectHiddenFees\"');
    c = c.replace(/<meta property=\"og:description\" content=\"[^\"]*\"/, '<meta property=\"og:description\" content=\"' + m.desc + '\"');
    c = c.replace(/<meta property=\"og:url\" content=\"[^\"]*\"/, '<meta property=\"og:url\" content=\"https://detecthiddenfees.com/' + name + '.html\"');
    c = c.replace(/<div class=\"badge\">[^<]*<\/div>/, '<div class=\"badge\">' + m.badge + '<\/div>');
    c = c.replace(/<h1>[^<]+<\/h1>/, '<h1>' + m.h1 + '<\/h1>');
    c = c.replace(/<p class=\"hero-sub\">[^<]+<\/p>/, '<p class=\"hero-sub\">' + m.hero + '<\/p>');
    fs.writeFileSync(fp, c, 'utf8');
    console.log('OK: ' + name);
  } catch (e) {
    console.log('ERR: ' + name + ' - ' + e.message);
  }
}
console.log('Metadata set for all ' + Object.keys(pages).length + ' new pages');
