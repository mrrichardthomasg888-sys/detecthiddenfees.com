const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const filePath = path.join(root, 'hidden-fee-database.html');
const marker = 'id="evidence-summary-heading"';
const summary = `<div class="insight-block" aria-labelledby="evidence-summary-heading"><h3 id="evidence-summary-heading">Evidence summary</h3><p><strong>FACT:</strong> The release contains 25 individually reviewed records drawn from live public FTC, CFPB, CMS, and other authoritative government sources. Every public record retains a canonical source URL, evidence reference, collection date, classification, and limitation.</p><p><strong>CALCULATION:</strong> The dataset contains 25 verified records. The public JSON manifest reports one sample count for each of 25 fee or clause categories because the current review is organized around distinct source-level examples.</p><p><strong>OBSERVATION:</strong> The reviewed sample spans mandatory fee disclosures, consumer-finance and payment fees, medical billing and financing, automotive add-ons and transaction charges, subscriptions, home-improvement guidance, and consumer billing disputes.</p><p><strong>INTERPRETATION:</strong> The sources are useful for definitions, warning signs, disclosure context, and document-review questions. They do not establish how common a fee is across a market or whether a particular charge is unlawful in every jurisdiction.</p><p><strong>LIMITATION:</strong> This is a curated evidence review of public guidance, not a representative survey, enforcement census, pricing panel, or estimate of consumer harm. No prevalence, average amount, accuracy, savings, or market-wide percentage is published.</p><h4>Representative primary sources</h4><ul><li><a href="https://consumer.ftc.gov/consumer-alerts/2025/05/what-rule-unfair-or-deceptive-fees-means-you">FTC fee-disclosure guidance</a></li><li><a href="https://www.consumerfinance.gov/rules-policy/junk-fees/">CFPB junk-fee resource</a></li><li><a href="https://www.cms.gov/medical-bill-rights/help/guides/bill-errors">CMS medical-bill error guide</a></li><li><a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-finance-and-insurance-fi-department-en-747/">CFPB F&amp;I department guidance</a></li><li><a href="https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/">CFPB auto-fee negotiation guidance</a></li></ul><p>Use the <a href="/research-data.json">JSON manifest</a> or <a href="/research-data.csv">CSV download</a> to inspect all 25 source links and record-level evidence.</p></div>`;

let source = fs.readFileSync(filePath, 'utf8');
if (!source.includes(marker)) {
  const insertionPoint = '<h2>Record structure</h2>';
  if (!source.includes(insertionPoint)) throw new Error('hidden-fee-database.html has no Record structure marker');
  source = source.replace(insertionPoint, `${summary}${insertionPoint}`);
  fs.writeFileSync(filePath, source, 'utf8');
  console.log('Added the evidence summary to the public research database page.');
} else {
  console.log('Evidence summary already present; no change made.');
}
