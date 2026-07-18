// /nav.js
(function() {

    // ---- CENTRAL LIST OF ALL YOUR PAGES ----
    const pages = [
        { text: 'Guides', href: '/hidden-fees-guides.html' },
        { text: 'HVAC Fees', href: '/hidden-hvac-contractor-fees.html' },
        { text: 'Renovation Fees', href: '/hidden-home-renovation-fees.html' },
        { text: 'Bank Fees', href: '/hidden-bank-overdraft-fees.html' },
        { text: 'Auto Financing', href: '/hidden-dealership-financing-fees.html' },
        { text: 'Medical Billing', href: '/duplicate-medical-billing-charges.html' },
        { text: 'Contract Review', href: '/ai-construction-contract-review.html' },
        { text: 'AI Contract Tool', href: '/ai-contract-review-tool.html' },
        { text: 'Contract AI Software', href: '/contract-review-ai-software.html' }
    ];

    // ---- FIND THE NAV CONTAINER ----
    const container = document.querySelector('.nav-links');
    if (!container) return;

    // ---- BUILD NAV HTML ----
    const currentPath = window.location.pathname;
    let html = '';

    pages.forEach(page => {
        const isActive = (currentPath === page.href) ? ' active' : '';
        html += `<a href="${page.href}" class="${isActive}">${page.text}</a>`;
    });

    // ---- THE BUTTON (with proper class) ----
    html += `<a href="https://hiddenfeeai.com" class="top-button">🚀 Analyze My Documents</a>`;

    // ---- INJECT ----
    container.innerHTML = html;

})();