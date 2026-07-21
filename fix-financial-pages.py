import re

# ============================================================
# FIX CONFIGURATION
# ============================================================
NEW_FOOTER_LINKS = [
    '<a href="/ai-financial-assistant.html">AI Financial Assistant</a>',
    '<a href="/ai-financial-advisor.html">AI Financial Advisor</a>',
    '<a href="/ai-financial-analysis.html">AI for Financial Analysis</a>',
    '<a href="/financial-analysis-software.html">Financial Analysis Software</a>',
    '<a href="/financial-analysis-tools.html">Financial Analysis Tools</a>'
]
NEW_FOOTER_BLOCK = ''.join(NEW_FOOTER_LINKS) + '</div>'

# Standard CTA button (matching existing pages)
# From hidden-hvac-contractor-fees.html: "Analyze My HVAC Proposal — $15"
# Standard hero CTA should be one of the existing patterns
HERO_CTA = 'Analyze My Documents With AI — $15'

# ============================================================
# READ EACH FILE
# ============================================================
pages = [
    'ai-financial-assistant.html',
    'ai-financial-advisor.html',
    'ai-financial-analysis.html',
    'financial-analysis-software.html',
    'financial-analysis-tools.html'
]

for filename in pages:
    print(f"\n=== Processing {filename} ===")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changes = []
    
    # -------------------------------------------------------
    # 1. FOOTER: Add new pages to HIDDEN FEE RESOURCES column
    # -------------------------------------------------------
    # Find the Industry Fee Guides link in the footer, add new links after it
    old_footer_section = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a></div>'
    new_footer_section = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a>\n<a href="/ai-financial-assistant.html">AI Financial Assistant</a>\n<a href="/ai-financial-advisor.html">AI Financial Advisor</a>\n<a href="/ai-financial-analysis.html">AI for Financial Analysis</a>\n<a href="/financial-analysis-software.html">Financial Analysis Software</a>\n<a href="/financial-analysis-tools.html">Financial Analysis Tools</a></div>'
    
    if old_footer_section in content:
        content = content.replace(old_footer_section, new_footer_section)
        changes.append("FOOTER: Added 5 new financial analysis page links to HIDDEN FEE RESOURCES section")
    else:
        print("  WARNING: Could not find footer target for HIDDEN FEE RESOURCES")
    
    # -------------------------------------------------------
    # 2. TEXT BRIGHTNESS - Add gradient style to section h2 headings
    # -------------------------------------------------------
    # Add gradient text style to .section h2 (matching index.html pattern)
    old_h2_style = '''        .section h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.08; margin-bottom: 18px; font-weight: 900; letter-spacing: -.04em; max-width: 760px; text-shadow: 0 0 30px rgba(37,99,235,0.08); }'''
    new_h2_style = '''        .section h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.08; margin-bottom: 18px; font-weight: 900; letter-spacing: -.04em; max-width: 760px; background: linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c084fc 70%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200% 200%; animation: gradientShift 10s ease infinite; text-shadow: none; filter: drop-shadow(0 0 30px rgba(37,99,235,0.15)); }'''
    
    if old_h2_style in content:
        content = content.replace(old_h2_style, new_h2_style)
        changes.append("TEXT: Added gradient heading style to .section h2")
    else:
        # Try inline version (already minified)
        old_h2_inline = '.section h2 { font-size: clamp(2rem, 4.5vw, 2.8rem); line-height: 1.08; margin-bottom: 18px; font-weight: 900; letter-spacing: -.04em; max-width: 760px; text-shadow: 0 0 30px rgba(37,99,235,0.08); }'
        if old_h2_inline in content:
            content = content.replace(old_h2_inline, new_h2_style)
            changes.append("TEXT: Added gradient heading style to .section h2 (inline)")
        else:
            print("  WARNING: Could not find .section h2 style")
    
    # -------------------------------------------------------
    # 3. HERO CTA BUTTON CONSISTENCY
    # -------------------------------------------------------
    # Fix inconsistent hero CTAs - use existing standard
    cta_fixes = [
        ('>Try HiddenFeeAI — $15 Analysis<', '>Analyze My Documents With AI — $15<'),
        ('>Try Our AI Analysis Tool — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Analyze Your Financial Documents — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Analyze Your Financial Documents With AI — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Analyze My Documents With AI — $15<', '>Analyze My Documents With AI — $15<'),  # already correct
    ]
    
    for old_cta, new_cta in cta_fixes:
        if old_cta in content:
            if old_cta != new_cta:
                content = content.replace(old_cta, new_cta)
                changes.append(f"CTA: Fixed hero button text")
    
    # Fix mid-page CTAs to be consistent
    mid_cta_fixes = [
        ('>Get Your Document Analysis — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Get Your Financial Document Analysis — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Get Your Financial Analysis — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Start Your Financial Analysis — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Start Analyzing Your Documents — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Start Building Your Toolkit — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Start Your Analysis — $15<', '>Find Hidden Fees Before You Sign →<'),
        ('>Analyze Your Financial Documents With AI — $15<', '>Analyze My Documents With AI — $15<'),
        ('>Analyze Your Financial Documents — $15<', '>Analyze My Documents With AI — $15<'),
    ]
    
    for old_cta, new_cta in mid_cta_fixes:
        if old_cta in content:
            content = content.replace(old_cta, new_cta)
            changes.append(f"CTA: Fixed mid-page button text")
    
    # Fix final CTA buttons
    final_cta_fixes = [
        ('>Analyze My Documents Now — $15<', '>Find Hidden Fees Before You Sign →<'),
        ('>Start Your Financial Analysis — $15<', '>Find Hidden Fees Before You Sign →<'),
        ('>Choose the Right Financial Analysis Software<', '>Find Hidden Fees Before You Sign →<'),
        ('>Get Started With the Best Financial Analysis Tools<', '>Find Hidden Fees Before You Sign →<'),
        ('>Get AI-Powered Financial Intelligence Today<', '>Find Hidden Fees Before You Sign →<'),
        ('>Experience AI-Powered Financial Analysis Today<', '>Find Hidden Fees Before You Sign →<'),
    ]
    
    # Fix CTA section titles
    final_title_fixes = [
        ('Stop Hidden Fees Before They Cost You Thousands', 'Stop Hidden Fees Before They Cost You Thousands'),
    ]
    
    # -------------------------------------------------------
    # 4. MOBILE TABLE FIX - Add responsive table wrapper
    # -------------------------------------------------------
    # Find table patterns and add overflow-x wrapper
    # Tables in our pages are inside .card divs
    table_pattern = '<table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:.95rem;">'
    
    # Add table-responsive class to styles
    table_responsive_css = '\n        /* ===== RESPONSIVE TABLES ===== */\n        .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 0 1px 0; }\n        .table-responsive table { min-width: 500px; }\n        @media(max-width:600px) { .table-responsive table { font-size: .8rem; } .table-responsive td, .table-responsive th { padding: 8px 4px !important; } }'
    
    # Insert before .faq section or after .card section
    insert_before = '.faq { margin-top: 48px; }'
    if insert_before in content and '.table-responsive' not in content:
        content = content.replace(insert_before, table_responsive_css + '\n        ' + insert_before)
        changes.append("TABLE: Added responsive table CSS")
    
    # Wrap tables with table-responsive div
    # Find tables inside cards
    card_table_count = 0
    while '<table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:.95rem;">' in content:
        old = '<table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:.95rem;">'
        # Check if already wrapped
        idx = content.find(old)
        before = content[max(0,idx-80):idx]
        if 'table-responsive' not in before:
            new = '<div class="table-responsive">\n                <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:.95rem;">'
            content = content.replace(old, new, 1)
            card_table_count += 1
            # Find closing table tag and close div
            # We need to be more careful - find the matching </table>
            close_table = '</table>'
            # Count table tags to find proper closing
            # Simple approach: find the </table> after this <table>
            # Since there's only one table per card, just find next </table>
            idx2 = content.find(close_table, idx)
            if idx2 > 0:
                # Add </div> after </table>  
                content = content[:idx2+len(close_table)] + '</div>' + content[idx2+len(close_table):]
    
    if card_table_count > 0:
        changes.append(f"TABLE: Wrapped {card_table_count} tables in responsive containers")
    
    # -------------------------------------------------------
    # 5. HERO CTA BUTTON TEXT CONSISTENCY  
    # -------------------------------------------------------
    # Fix the hero CTA section description text
    hero_cta_texts = [
        ('Try HiddenFeeAI — $15 Analysis', 'Analyze My Documents With AI — $15'),
        ('Try Our AI Analysis Tool — $15', 'Analyze My Documents With AI — $15'),
    ]
    
    for old_text, new_text in hero_cta_texts:
        if old_text in content:
            content = content.replace(old_text, new_text)
    
    # -------------------------------------------------------
    # WRITE FIXED FILE
    # -------------------------------------------------------
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    for change in changes:
        print(f"  ✓ {change}")
    if not changes:
        print("  No changes needed")

# ============================================================
# NOW FIX INDEX.HTME FOOTER
# ============================================================
print("\n=== Processing index.html ===")
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

old_footer_end = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a></div>'
new_footer_end = '<a href="/hidden-fee-industry-guide.html">Industry Fee Guides</a>\n<a href="/ai-financial-assistant.html">AI Financial Assistant</a>\n<a href="/ai-financial-advisor.html">AI Financial Advisor</a>\n<a href="/ai-financial-analysis.html">AI for Financial Analysis</a>\n<a href="/financial-analysis-software.html">Financial Analysis Software</a>\n<a href="/financial-analysis-tools.html">Financial Analysis Tools</a></div>'

if old_footer_end in index_content:
    index_content = index_content.replace(old_footer_end, new_footer_end)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_content)
    print("  ✓ FOOTER: Added 5 new links to index.html HIDDEN FEE RESOURCES section")
else:
    print("  WARNING: Could not find footer target in index.html")

print("\n=== All fixes complete ===")