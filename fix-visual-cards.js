var fs=require('fs'),c=fs.readFileSync('ai-financial-advisor.html','utf-8');
// Replace placeholder 1: workflow diagram
c=c.replace(
  '<div class=\"visual-placeholder\">[AI Financial Analysis Workflow Diagram — Document ingestion through extraction, classification, benchmarking, and reporting]</div><p>Figure 1: AI financial analysis workflow — from document upload to actionable findings. Recommended image: workflow diagram showing the complete analysis pipeline. Alt text: AI financial advisor analyzing contracts, invoices, and bills for hidden fees.</p>',
  '<div class=\"visual-placeholder\" style=\"padding:24px;text-align:left;line-height:1.8;\"><div style=\"display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(59,130,246,0.15);\"><span style=\"width:24px;height:24px;background:#2563eb;color:white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.7rem;flex-shrink:0;\">1</span><strong>Document Upload</strong><span style=\"color:#94a3b8;font-size:.85rem;\"> — Receive and verify</span></div><div style=\"display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(59,130,246,0.15);\"><span style=\"width:24px;height:24px;background:#2563eb;color:white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.7rem;flex-shrink:0;\">2</span><strong>Data Extraction</strong><span style=\"color:#94a3b8;font-size:.85rem;\"> — Every charge extracted</span></div><div style=\"display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(59,130,246,0.15);\"><span style=\"width:24px;height:24px;background:#2563eb;color:white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.7rem;flex-shrink:0;\">3</span><strong>Fee Classification</strong><span style=\"color:#94a3b8;font-size:.85rem;\"> — Categorize by risk</span></div><div style=\"display:flex;align-items:center;gap:10px;padding:6px 0;\"><span style=\"width:24px;height:24px;background:#2563eb;color:white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.7rem;flex-shrink:0;\">4</span><strong>Report &amp; Actions</strong><span style=\"color:#94a3b8;font-size:.85rem;\"> — Prioritized findings</span></div></div><p style=\"font-size:.85rem;color:#64748b;margin-bottom:0;\">AI financial analysis workflow — from document upload to actionable findings.</p>'
);
// Replace placeholder 2: example report preview
c=c.replace(
  '<div class=\"visual-placeholder\">[Example AI Analysis Report Preview — Sample output showing flagged line items with risk scores]</div><p>Figure 2: Example AI analysis report. Recommended image: screenshot of an AI-generated financial analysis report showing flagged charges, severity scores, and recommendations. Alt text: AI-powered financial document analysis report showing hidden fee detection results and savings opportunities.</p>',
  '<div class=\"visual-placeholder\" style=\"padding:20px;text-align:left;\"><div style=\"display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(37,99,235,.15);border-radius:8px;margin-bottom:8px;\"><span style=\"font-weight:700;font-size:.85rem;\">Flagged Charge</span><span style=\"font-size:.75rem;padding:2px 8px;border-radius:4px;background:rgba(239,68,68,.2);color:#fca5a5;font-weight:700;\">HIGH RISK</span></div><div style=\"padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;\"><span style=\"color:#cbd5e1;font-size:.85rem;\">Administrative Fee</span><span style=\"color:#e2e8f0;font-weight:700;font-size:.85rem;\">$2,800</span></div><div style=\"padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;\"><span style=\"color:#cbd5e1;font-size:.85rem;\">Material Markup (32%)</span><span style=\"color:#e2e8f0;font-weight:700;font-size:.85rem;\">$1,940</span></div><div style=\"padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;\"><span style=\"color:#cbd5e1;font-size:.85rem;\">Permit Processing Fee</span><span style=\"color:#e2e8f0;font-weight:700;font-size:.85rem;\">$950</span></div><div style=\"padding:8px 12px;display:flex;justify-content:space-between;\"><span style=\"color:#cbd5e1;font-size:.85rem;\">Potential Savings Identified</span><span style=\"color:#6ee7b7;font-weight:800;font-size:.85rem;\">$4,700+</span></div></div><p style=\"font-size:.85rem;color:#64748b;margin-bottom:0;\">Example AI analysis output showing flagged charges with risk levels and potential savings identified for review. Individual results vary.</p>'
);
// Replace placeholder 3: framework graphic
c=c.replace(
  '<div class=\"visual-placeholder\">[DetectHiddenFees 6-Step Framework Graphic — Visual overview of the six-stage methodology]</div><p>Figure 3: The DetectHiddenFees 6-Step AI Financial Analysis Framework. Recommended image: flow diagram showing all six steps connected in sequence. Alt text: DetectHiddenFees 6-step framework for AI financial document analysis showing document ingestion, data extraction, fee classification, risk detection, scoring, and recommendations.</p>',
  '<div class=\"visual-placeholder\" style=\"padding:20px;text-align:left;\"><div style=\"display:flex;gap:8px;flex-wrap:wrap;justify-content:center;\"><div style=\"background:rgba(37,99,235,.2);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:#93c5fd;\">1. Ingest</div><div style=\"color:#64748b;\">→</div><div style=\"background:rgba(37,99,235,.2);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:#93c5fd;\">2. Extract</div><div style=\"color:#64748b;\">→</div><div style=\"background:rgba(37,99,235,.2);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:#93c5fd;\">3. Classify</div><div style=\"color:#64748b;\">→</div><div style=\"background:rgba(37,99,235,.2);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:#93c5fd;\">4. Detect</div><div style=\"color:#64748b;\">→</div><div style=\"background:rgba(37,99,235,.2);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:#93c5fd;\">5. Score</div><div style=\"color:#64748b;\">→</div><div style=\"background:linear-gradient(135deg,#2563eb,#9333ea);padding:10px 16px;border-radius:8px;font-weight:700;font-size:.85rem;color:white;\">6. Act</div></div></div><p style=\"font-size:.85rem;color:#64748b;margin-bottom:0;\">DetectHiddenFees 6-Step Framework: Document Ingest → Data Extract → Fee Classify → Risk Detect → Score → Action.</p>'
);

// Add mobile-responsive comparison table CSS
c=c.replace(
  '.comparison-table th{padding:18px 20px;text-align:left;background:rgba(37,99,235,0.15);color:#93c5fd;font-weight:800;font-size:.9rem;}',
  '.comparison-table th{padding:18px 20px;text-align:left;background:rgba(37,99,235,0.15);color:#93c5fd;font-weight:800;font-size:.9rem;white-space:nowrap;}'
);
c=c.replace(
  '.comparison-table td{padding:16px 20px;border-top:1px solid rgba(255,255,255,.06);color:#cbd5e1;font-size:.95rem;}',
  '.comparison-table td{padding:16px 20px;border-top:1px solid rgba(255,255,255,.06);color:#cbd5e1;font-size:.95rem;white-space:nowrap;}'
);

// Add mobile scrollable table CSS inside the existing @media max-width:900px section
c=c.replace(
  '.comparison-table{font-size:.85rem;}',
  '.comparison-table{font-size:.85rem;}.comparison-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:24px 0;border-radius:20px;}'
);

// Wrap the comparison table in a scrollable container
c=c.replace(
  '<table class="comparison-table">',
  '<div class="comparison-table-wrap"><table class="comparison-table">'
);
c=c.replace(
  '</table>',
  '</table></div>'
);

fs.writeFileSync('ai-financial-advisor.html',c);
console.log('Done - all 3 visual placeholders replaced, mobile table added');
