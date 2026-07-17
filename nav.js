// nav.js — Universal Navigation Loader

(function() {
    'use strict';

    const navHTML = `
    <div class="container nav-wrap">
        <div class="logo">
            DetectHiddenFees<span>.</span>
        </div>
        <div class="nav-links">
            <a href="/hidden-fees-guides.html">Guides</a>
            <a href="/hidden-hvac-contractor-fees.html">HVAC Fees</a>
            <a href="/hidden-home-renovation-fees.html">Renovation Fees</a>
            <a href="/hidden-bank-overdraft-fees.html">Bank Fees</a>
            <a href="/hidden-dealership-financing-fees.html">Auto Financing</a>
            <a href="/duplicate-medical-billing-charges.html">Medical Billing</a>
            <a href="/ai-construction-contract-review.html">Contract Review</a>
            <a href="/ai-contract-review-tool.html">AI Contract Tool</a>
            <a href="https://hiddenfeeai.com" class="nav-btn">Analyze My Documents</a>
        </div>
    </div>
    `;

    // Find the nav element and inject the HTML
    const navElement = document.querySelector('nav');
    if (navElement) {
        navElement.innerHTML = navHTML;
    }
})();