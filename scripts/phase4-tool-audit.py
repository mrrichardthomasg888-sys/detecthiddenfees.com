from pathlib import Path
from bs4 import BeautifulSoup
import json

ROOT=Path(__file__).resolve().parents[1]
terms=('calculator','tool','analyzer','detector','scanner','checker','score','upload','analyze')
rows=[]
for p in sorted(ROOT.glob('*.html')):
    s=BeautifulSoup(p.read_text(encoding='utf-8',errors='ignore'),'html.parser')
    c=s.find('link',rel='canonical')
    if not c or not c.get('href','').startswith('https://detecthiddenfees.com'): continue
    path=c['href'].rstrip('/').split('/')[-1]
    if not any(t in path.lower() for t in terms): continue
    forms=len(s.find_all('form')); inputs=len(s.find_all(['input','textarea','select'])); scripts=len(s.find_all('script'))
    rows.append({'file':p.name,'url':c['href'],'title':s.title.get_text(strip=True) if s.title else '', 'forms':forms,'inputs':inputs,'scripts':scripts,'functional_signal':forms>0 or inputs>0,'has_methodology_link':any('methodology' in (a.get('href','') or '').lower() for a in s.find_all('a',href=True)),'has_download':any((a.get('href','') or '').lower().endswith(('.csv','.json','.xlsx','.pdf')) for a in s.find_all('a',href=True))})
out=ROOT/'reports'; out.mkdir(exist_ok=True)
(out/'phase4-tool-audit.json').write_text(json.dumps({'count':len(rows),'tools':rows},indent=2),encoding='utf-8')
(out/'phase4-tool-audit.md').write_text('# Phase 4 Tool Audit\n\nThis structural audit identifies pages whose canonical path suggests a tool or analysis function. A landing page, CTA, or product description is not proof that a tool is functional. Forms, inputs, output behavior, formulas, methodology, accessibility, and privacy must be tested separately.\n\n| Page | Form/input signal | Methodology link | Download signal | Assessment |\n|---|---:|---:|---:|---|\n' + ''.join(f'| `{r["file"]}` | {r["forms"]}/{r["inputs"]} | {"yes" if r["has_methodology_link"] else "no"} | {"yes" if r["has_download"] else "no"} | {"functional signal" if r["functional_signal"] else "landing-page signal; verify"} |\n' for r in rows),encoding='utf-8')
print('audited',len(rows),'tool-like canonical pages')
