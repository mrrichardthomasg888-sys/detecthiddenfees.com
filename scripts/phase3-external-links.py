from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import csv, json

ROOT = Path(__file__).resolve().parents[1]
urls = []
for html in ROOT.glob('*.html'):
    soup = BeautifulSoup(html.read_text(encoding='utf-8', errors='ignore'), 'html.parser')
    canonical = soup.find('link', rel='canonical')
    if canonical and canonical.get('href','').startswith('https://detecthiddenfees.com'):
        for a in soup.find_all('a', href=True):
            href = a['href'].strip()
            if href.startswith(('http://','https://')) and 'detecthiddenfees.com' not in urlparse(href).netloc:
                urls.append({'file':html.name,'url':href,'anchor':' '.join(a.get_text(' ',strip=True).split())[:180],'target_blank':a.get('target')=='_blank','rel':list(a.get('rel',[]))})
unique = {}
for x in urls: unique.setdefault(x['url'], x)
rows=[]
for u,x in sorted(unique.items()):
    p=urlparse(u); rows.append({'url':u,'domain':p.netloc.lower(),'scheme':p.scheme,'occurrences':sum(y['url']==u for y in urls),'sample_file':x['file'],'anchor':x['anchor'],'target_blank':x['target_blank'],'rel':x['rel'],'flags':(["http"] if p.scheme=='http' else []) + (["affiliate_or_tracking_candidate"] if any(k in u.lower() for k in ['aff=','affiliate','ref=','utm_','partner']) else [])})
out=ROOT/'reports'; out.mkdir(exist_ok=True)
(out/'phase3-external-link-audit.json').write_text(json.dumps({'total_external_references':len(urls),'unique_urls':len(rows),'unique_domains':len(set(x['domain'] for x in rows)),'links':rows},indent=2),encoding='utf-8')
with (out/'phase3-external-link-report.md').open('w',encoding='utf-8') as f:
    f.write('# Phase 3 External-Link Audit\n\n')
    f.write(f'- External references: **{len(urls)}**\n- Unique URLs: **{len(rows)}**\n- Unique domains: **{len(set(x["domain"] for x in rows))}**\n\n')
    f.write('This is a structural audit. HTTP status and source support require periodic network checks and human review; a link being live does not prove that it supports a claim.\n\n')
    f.write('## Flags\n\n')
    flagged=[x for x in rows if x['flags']]
    if flagged:
        for x in flagged: f.write(f'- `{x["url"]}` — {", ".join(x["flags"])}; sample `{x["sample_file"]}`\n')
    else: f.write('- No HTTP or obvious tracking/affiliate candidates detected structurally.\n')
    f.write('\n## Review requirements\n\n- Verify redirects and final destinations before relying on a source.\n- Prefer primary sources for legal, regulatory, pricing, privacy, security, and product claims.\n- Add `sponsored` or `nofollow` only where a commercial relationship exists; do not add it to ordinary editorial citations without a reason.\n- Preserve `noopener noreferrer` for new-tab links.\n')
print(f'external references: {len(urls)}; unique URLs: {len(rows)}; domains: {len(set(x["domain"] for x in rows))}')
