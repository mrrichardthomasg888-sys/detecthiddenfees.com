import os, glob, re
from pathlib import Path

root = r'c:\Users\lynns\Downloads\detecthiddenfees.com'
os.chdir(root)

html_files = glob.glob('**/*.html', recursive=True)
print(f'Total HTML files found: {len(html_files)}')

files_updated = 0
files_with_old_nav = 0

for f in html_files:
    if 'node_modules' in f or '.git' in f:
        continue
    try:
        # Read file as text since we need to inspect content
        with open(f, 'r', encoding='utf-8', errors='ignore') as fh:
            content = fh.read()
        
        original = content
        
        # 1. CHECK: Does this file have the old nav (has nav-links but NO AI Financial Advisor link)?
        has_nav = 'nav-links' in content and 'Bill Analyzer' in content
        has_financial = 'ai-financial-advisor' in content
        
        if has_nav and not has_financial:
            files_with_old_nav += 1
            # Add AI Financial Advisor link after Bill Analyzer in nav
            content = content.replace(
                '<a href="/ai-bill-analyzer.html">Bill Analyzer</a></div>',
                '<a href="/ai-bill-analyzer.html">Bill Analyzer</a><a href="/ai-financial-advisor.html">AI Financial Advisor</a></div>'
            )
        
        # 2. Standardize nav CTA button text
        content = content.replace(
            'class="nav-btn">Analyze My Documents With AI →</a>',
            'class="nav-btn">Analyze My Document →</a>'
        )
        
        # 3. Standardize sticky CTA button text
        content = content.replace(
            'class="sticky-btn">Analyze My Documents Now</a>',
            'class="sticky-btn">Analyze My Document</a>'
        )
        content = content.replace(
            'class="sticky-btn">Analyze Documents Now</a>',
            'class="sticky-btn">Analyze My Document</a>'
        )
        
        # 4. Standardize cta-anchor button text
        content = content.replace(
            'Analyze My Documents With AI — $15',
            'Analyze My Document — $15'
        )
        
        # 5. Skip index.html (already has the full nav correctly)
        if f == 'index.html':
            continue
        
        if content != original:
            with open(f, 'w', encoding='utf-8') as fh:
                fh.write(content)
            files_updated += 1
            reason = 'nav+cta' if has_nav and not has_financial else 'cta only'
            print(f'  UPDATED ({reason}): {f}')
            
    except Exception as e:
        print(f'  ERROR {f}: {e}')

print(f'\\nFiles with old nav: {files_with_old_nav}')
print(f'Files updated: {files_updated}')
print('Done!')
