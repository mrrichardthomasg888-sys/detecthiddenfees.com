from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

taxonomy = ROOT / 'hidden-fee-encyclopedia.html'
s = taxonomy.read_text(encoding='utf-8', errors='ignore')
if 'phase4-taxonomy-downloads' not in s:
    section = '''<section id="phase4-taxonomy-downloads" class="phase3-sources" aria-labelledby="phase4-taxonomy-heading"><h2 id="phase4-taxonomy-heading">Public hidden-fee taxonomy and downloads</h2><p>This taxonomy distinguishes disclosed mandatory fees, poorly disclosed mandatory fees, optional and automatically selected add-ons, recurring fees, contract-triggered charges, and duplicate or unclear charges. A category does not mean a fee is illegal, deceptive, or improper. The document and jurisdiction determine what a charge means.</p><p><a href="/hidden-fee-taxonomy-public.json">Download the machine-readable JSON taxonomy</a> · <a href="/hidden-fee-taxonomy-public.csv">Download the CSV taxonomy</a> · <a href="/research-methodology">Review the research methodology</a></p><p class="phase3-source-note"><strong>Suggested citation:</strong> DetectHiddenFees Editorial Team. <cite>Public Hidden-Fee Taxonomy</cite>, version 0.1, July 31, 2026.</p></section>'''
    s = s.replace('</main>', section + '</main>', 1)
    taxonomy.write_text(s, encoding='utf-8')
    print('updated hidden-fee-encyclopedia.html')
