from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def replace_text(name, replacements):
    p = ROOT / name
    s = p.read_text(encoding='utf-8', errors='ignore')
    original = s
    for old, new in replacements:
        if old not in s:
            print(f'SKIP missing text in {name}: {old[:80]}')
            continue
        s = s.replace(old, new, 1)
    if s != original:
        p.write_text(s, encoding='utf-8')
        print('updated', name)

replace_text('ai-accuracy-and-limitations.html', [
    ('HiddenFeeAI achieves high accuracy in identifying known patterns of hidden fees, pricing anomalies, duplicate charges, and unfavorable contract terms. Our testing against validation datasets shows that the AI catches over 90% of known issues across the document types and industries it has been trained on. This includes common patterns such as administrative surcharges, regulatory recovery fees, duplicate line items, pricing that exceeds industry benchmarks, and vague language that could conceal additional charges.',
     'This page does not publish a verified accuracy percentage for HiddenFeeAI. Any performance claim should be based on a documented test protocol, a defined dataset, a versioned system, and separately reported false positives and false negatives. Users should treat results as potential issues to review, not as a complete determination.'),
    ('While HiddenFeeAI has been trained on thousands of documents spanning every major industry, it may not have encountered every possible fee structure or contract variation.',
     'The available public materials do not establish the size, composition, or coverage of any HiddenFeeAI training or evaluation dataset. The system may not have encountered every fee structure or contract variation.'),
    ('Documents uploaded to HiddenFeeAI are encrypted during transmission using industry-standard TLS 1.3 encryption and stored temporarily in isolated, encrypted storage containers. Documents are automatically deleted from our systems within 24 hours of analysis completion. We never use uploaded documents for AI training or model improvement. We never share document contents with third parties. Your documents are analyzed securely and your privacy is protected at every stage of the process.',
     'Document-handling, encryption, retention, deletion, training-use, and third-party-processing statements require confirmation against the current HiddenFeeAI implementation and privacy policy. Do not rely on this page alone for those decisions; review the current product disclosures before uploading sensitive material.'),
    ('Our accuracy rates are regularly tested against validation datasets and human expert reviews. We publish our performance metrics and are transparent about both the strengths and limitations of our system. The AI catches over 90% of known hidden fee patterns and pricing anomalies.',
     'No independently verifiable accuracy metric is asserted here. A responsible evaluation should publish the dataset scope, labeling method, system version, test date, false-positive rate, false-negative rate, and limitations.'),
])

def add_sources(name, html):
    p = ROOT / name
    s = p.read_text(encoding='utf-8', errors='ignore')
    if 'phase3-sources' in s:
        return
    marker = '</main>'
    if marker not in s:
        print('SKIP no main close', name); return
    s = s.replace(marker, html + marker, 1)
    p.write_text(s, encoding='utf-8')
    print('added sources', name)

def add_section(name, marker_text, html):
    p = ROOT / name
    s = p.read_text(encoding='utf-8', errors='ignore')
    if marker_text in s:
        return
    s = s.replace('</main>', html + '</main>', 1)
    p.write_text(s, encoding='utf-8')
    print('added section', name)

add_sources('ai-accuracy-and-limitations.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Sources and limitations</h2><p>AI systems can create risks from incorrect, incomplete, or context-sensitive outputs. The <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a> provides a general risk-management reference; it is not a performance evaluation of HiddenFeeAI. Product capability, privacy, retention, and security details require current first-party verification.</p><p class="phase3-source-note"><strong>Source:</strong> National Institute of Standards and Technology, <cite>Artificial Intelligence Risk Management Framework</cite>, accessed July 31, 2026.</p></section>''')

add_sources('editorial-policy.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Source and claim standard</h2><p>Material advertising and product claims should be supported by evidence appropriate to the claim. The <a href="https://www.ftc.gov/business-guidance/advertising-marketing">Federal Trade Commission advertising guidance</a> and its <a href="https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation">advertising-substantiation policy statement</a> are useful reference points for documenting support and avoiding misleading wording.</p><p class="phase3-source-note"><strong>Sources:</strong> Federal Trade Commission, advertising and substantiation guidance, accessed July 31, 2026.</p></section>''')

add_sources('hidden-bank-overdraft-fees.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Sources and scope</h2><p>For U.S. consumer-banking questions, consult the <a href="https://www.consumerfinance.gov/ask-cfpb/what-can-i-do-if-my-bank-charged-me-a-fee-for-overdrawing-my-account-en-1037/">Consumer Financial Protection Bureau overdraft-fee guidance</a> and related <a href="https://www.consumerfinance.gov/compliance/circulars/consumer-financial-protection-circular-2024-05/">CFPB circular</a>. These sources do not establish that every overdraft or account fee is improper; account terms, transaction type, and applicable law matter.</p><p class="phase3-source-note"><strong>Sources:</strong> Consumer Financial Protection Bureau, consumer guidance and Circular 2024-05, accessed July 31, 2026.</p></section>''')

add_sources('hidden-healthcare-fees.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Sources and scope</h2><p>For U.S. medical-billing questions, start with the <a href="https://www.cms.gov/newsroom/fact-sheets/no-surprises-understand-your-rights-against-surprise-medical-bills">Centers for Medicare &amp; Medicaid Services No Surprises guidance</a> and its <a href="https://www.cms.gov/digital-service/medical-bill-rights">Medical Bill Rights resources</a>. Coverage depends on the service, plan, provider, facility, and jurisdiction. This educational page is not legal or medical advice.</p><p class="phase3-source-note"><strong>Sources:</strong> Centers for Medicare &amp; Medicaid Services, Medical Bill Rights and No Surprises resources, accessed July 31, 2026.</p></section>''')

add_sources('research-methodology.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Methodology framework</h2><p>Future research should document its dataset, sampling, human verification, model or analysis version, limitations, and correction process. The <a href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/">NIST AI Risk Management Framework core guidance</a> is a general reference for documenting AI risks and governance; it is not evidence of DetectHiddenFees or HiddenFeeAI performance.</p><p class="phase3-source-note"><strong>Source:</strong> National Institute of Standards and Technology, AI RMF core guidance, accessed July 31, 2026.</p></section>''')

replace_text('ai-analysis-methodology.html', [
    ('HiddenFeeAI uses advanced machine learning algorithms trained on thousands of real documents spanning every major industry. The AI has been trained on medical bills, service contracts, construction estimates, financing agreements, insurance policies, utility statements, phone bills, subscription terms, and countless other document types. Through this extensive training, the AI has learned to recognize patterns associated with hidden fees, inflated pricing, duplicate charges, and unfavorable contract language that human reviewers often miss. The system continuously improves as more documents are analyzed, learning from every new pattern and fee structure it encounters across different industries and geographic regions.',
     'The public repository does not verify the size, composition, provenance, or update process of any HiddenFeeAI training dataset. The product may identify patterns in documents, but coverage should not be treated as complete and users should review important findings in context.'),
    ('Our accuracy rates are regularly tested against validation datasets and human expert reviews. We publish our performance metrics and are transparent about both the strengths and limitations of our system. The AI catches over 90% of known hidden fee patterns and pricing anomalies. However, new fee structures and deceptive practices are constantly emerging, and our system may not immediately identify patterns it has not been trained on. We continuously update our training data as new patterns are discovered through document analysis and industry research.',
     'No independently verifiable accuracy percentage is asserted here. A responsible evaluation should identify the dataset, labels, system version, test date, false-positive and false-negative rates, and limitations before a performance number is published.'),
    ('Documents uploaded to HiddenFeeAI are encrypted during transmission using industry-standard TLS 1.3 encryption and stored temporarily in isolated, encrypted storage containers. Documents are automatically deleted from our systems within 24 hours of analysis completion. We never use uploaded documents for AI training or model improvement. We never share document contents with third parties. Your documents are analyzed securely and your privacy is protected at every stage of the process.',
     'Document-handling, encryption, retention, deletion, training-use, and third-party-processing statements require confirmation against the current HiddenFeeAI implementation and privacy policy. This page should not be treated as the sole source for those decisions.'),
    ('How accurate is AI document analysis? Our AI catches over 90% of known hidden fee patterns and pricing anomalies. Accuracy is regularly tested against validation datasets and human expert reviews. The system continuously improves as more documents are analyzed.',
     'How accurate is AI document analysis? No verified public percentage is asserted here. Results may miss issues or flag legitimate charges, so important findings require human review and, where appropriate, professional advice.'),
    ('Can AI detect all types of hidden fees? The AI is trained on thousands of document types and fee patterns. While it catches the vast majority of common hidden fees, new fee structures emerge constantly. The AI may not immediately identify patterns it has not been trained on, which is why we continuously update our training data.',
     'Can AI detect all types of hidden fees? No. Document quality, context, jurisdiction, and unfamiliar fee structures can affect results. The tool should be treated as an aid to review, not a complete detector.'),
    ('Is my document secure during AI analysis? Yes. Documents are encrypted during transmission, stored temporarily in isolated encrypted storage, and automatically deleted within 24 hours. Documents are never used for AI training and never shared with third parties.',
     'Is my document secure during AI analysis? Confirm current handling, retention, deletion, encryption, training-use, and third-party-processing terms in the current HiddenFeeAI privacy and security disclosures before uploading sensitive material.')
])
add_sources('ai-analysis-methodology.html', '''<section class="phase3-sources" aria-labelledby="phase3-sources-heading"><h2 id="phase3-sources-heading">Methodology and risk reference</h2><p>The <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</a> is a general reference for identifying and managing AI risks. It does not validate HiddenFeeAI’s accuracy, data handling, or security controls.</p><p class="phase3-source-note"><strong>Source:</strong> National Institute of Standards and Technology, <cite>Artificial Intelligence Risk Management Framework</cite>, accessed July 31, 2026.</p></section>''')

add_section('editorial-policy.html', 'Corrections and transparency', '''<section class="phase3-sources" aria-labelledby="phase3-corrections-heading"><h2 id="phase3-corrections-heading">Corrections and transparency</h2><p>Readers can report a factual error, outdated source, broken citation, or unclear scope through the <a href="/contact">Contact</a> page. Requests are evaluated against the page text, source, jurisdiction, and date. Material corrections are described on the affected page or in a revision note; minor grammar and styling changes may not receive a public notice.</p><p>When a law, price, product policy, or source changes, the page is reviewed and its update date changes only when the content materially changes. Disputed claims are marked for review rather than presented as settled fact. A correction does not guarantee a particular legal, financial, or product outcome.</p></section>''')

print('Tier 1 edits complete')
