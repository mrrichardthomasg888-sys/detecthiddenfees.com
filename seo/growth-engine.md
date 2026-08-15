# DHF Growth Engine V1

This is the control contract for the private acquisition state. The public repository stores only the schema, rules, and prompt inventory. Connected Search Console, GA4, outreach outcomes, referral, checkout, purchase, and revenue state belongs under the ignored `private/growth-engine/` directory.

Run the private worker with:

```text
node scripts/run-growth-engine.js run <queries.csv> <pages.csv> <ga4.json>
node scripts/run-growth-engine.js score
node scripts/run-growth-engine.js validate
```

The worker deliberately represents unavailable values as `null`, never zero. It scores existing pages and queries, protects the contract-signing winner and `/before-you-sign`, and emits a ranked action queue. The initial execution may run outreach validation/dry-run, but it never sends email, creates links, queries restricted AI surfaces, or changes public pages.
