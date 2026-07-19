import os
import re

base = 'c:\\Users\\lynns\\Downloads\\detecthiddenfees.com'
files = []
for f in os.listdir(base):
    if f.endswith('.html'):
        files.append(os.path.join(base, f))

# 1. Fix sticky button size on ALL pages
old_btn = '.sticky-cta-bar .sticky-btn{display:inline-block;padding:12px 28px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:800;font-size:.95rem;box-shadow:0 8px 30px rgba(59,130,246,.35);text-align:center;min-height:48px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:transform 0.2s}'
new_btn = '.sticky-cta-bar .sticky-btn{display:inline-block;padding:8px 18px;border-radius:10px;background:linear-gradient(135deg,#2563eb,#9333ea);color:white;font-weight:700;font-size:.85rem;box-shadow:0 8px 30px rgba(59,130,246,.35);text-align:center;min-height:34px;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:transform 0.2s}'

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        changed = True
        print(f'Fixed sticky btn size on {os.path.basename(fp)}')
    
    # 2. Add missing footer links
    if 'medical-debt-negotiation' not in content and 'footer-links' in content and 'negotiate-bills.html' in content:
        # Add after Negotiate Bills line
        pattern = r'(<a href="/negotiate-bills.html">Negotiate Bills</a>)'
        replacement = '\\1\\n            <a href="/negotiate-hospital-bill.html">Negotiate Hospital Bill</a>\\n            <a href="/how-to-reduce-medical-bills.html">Reduce Medical Bills</a>\\n            <a href="/medical-debt-negotiation.html">Medical Debt Negotiation</a>'
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            changed = True
            print(f'ADDED footer links to {os.path.basename(fp)}')
    
    if changed:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)

print('\\nDone!')
