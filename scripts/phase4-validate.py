from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import json

ROOT=Path(__file__).resolve().parents[1]
def canonical_files():
    out=[]
    for p in ROOT.glob('*.html'):
        s=BeautifulSoup(p.read_text(encoding='utf-8',errors='ignore'),'html.parser')
        c=s.find('link',rel='canonical')
        if c and c.get('href','').startswith('https://detecthiddenfees.com'):
            out.append((p,s,c['href']))
    return out
files=canonical_files()
missing=[]; canon=[]; broken=[]; bad_sources=[]
for p,s,url in files:
    if s.find_all('link',rel='canonical')[0].get('href') != url: canon.append(p.name)
    for a in s.find_all('a',href=True):
        h=a['href'].split('#')[0]
        if h.startswith('/') and h != '/':
            target=ROOT/(h.strip('/') or 'index')
            if target.suffix: exists=target.exists()
            else: exists=(ROOT/(h.strip('/')+'.html')).exists() or (ROOT/(h.strip('/')+'/index.html')).exists()
            if not exists: broken.append({'file':p.name,'href':h})
    for a in s.select('.phase3-sources a[href]'):
        if a['href'].startswith('http://'): bad_sources.append({'file':p.name,'href':a['href']})
sitemap=BeautifulSoup((ROOT/'sitemap.xml').read_text(encoding='utf-8',errors='ignore'),'xml')
sitemap_urls=[x.get_text(strip=True) for x in sitemap.find_all('loc')]
llms=(ROOT/'llms.txt').read_text(encoding='utf-8',errors='ignore')
llms_urls=[x.split('(')[1].split(')')[0] for x in llms.splitlines() if x.startswith('- [') and '(' in x]
result={'canonical_pages':len(files),'missing_files':missing,'canonical_errors':canon,'broken_internal_links':broken,'http_source_links':bad_sources,'sitemap_urls':len(sitemap_urls),'llms_urls':len(llms_urls),'new_tool_present':(ROOT/'automatic-renewal-date-calculator.html').exists(),'taxonomy_json_present':(ROOT/'hidden-fee-taxonomy-public.json').exists(),'taxonomy_csv_present':(ROOT/'hidden-fee-taxonomy-public.csv').exists(),'embed_present':(ROOT/'embed-prototype-hidden-fee-taxonomy.html').exists()}
(ROOT/'reports'/'phase4-validation.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
