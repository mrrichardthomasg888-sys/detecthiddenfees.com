// /nav.js — FINAL: Hardcoded fallback preserved + dynamic updates + left-aligned + big button
(function() {

    // ---- CENTRAL PAGE LIST ----
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

    // ---- BUILD TOP NAV (overwrites hardcoded fallback) ----
    function buildNav() {
        const container = document.querySelector('.nav-links');
        if (!container) return;
        const currentPath = window.location.pathname;
        let html = '';
        pages.forEach(page => {
            const isActive = (currentPath === page.href) ? ' active' : '';
            html += `<a href="${page.href}" class="${isActive}">${page.text}</a>`;
        });
        html += `<a href="https://hiddenfeeai.com" class="top-button">🚀 Analyze My Documents</a>`;
        container.innerHTML = html;
    }

    // ---- BUILD FOOTER ----
    function buildFooter() {
        const container = document.querySelector('.footer-links');
        if (!container) return;
        let html = '';
        pages.forEach(page => {
            html += `<a href="${page.href}">${page.text}</a>`;
        });
        container.innerHTML = html;
    }

    // ---- INJECT CSS (left-aligned + big button) ----
    function injectStyles() {
        if (document.getElementById('nav-system-styles')) return;

        const style = document.createElement('style');
        style.id = 'nav-system-styles';
        style.textContent = `
            /* === NAV – LEFT ALIGNED === */
            .nav {
                display: flex !important;
                justify-content: flex-start !important;
                align-items: center !important;
                padding: 12px 0 !important;
                gap: 10px !important;
                flex-wrap: wrap !important;
                flex-direction: row !important;
            }
            .nav-links {
                display: flex !important;
                gap: 6px !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                justify-content: flex-start !important;
                min-height: 36px !important;
                width: auto !important;
            }
            .nav-links a {
                color: #cbd5e1 !important;
                font-weight: 600 !important;
                font-size: 0.82rem !important;
                padding: 4px 5px !important;
                white-space: nowrap !important;
                transition: color 0.2s !important;
                text-decoration: none !important;
                background: none !important;
                border: none !important;
                margin: 0 !important;
            }
            .nav-links a:hover {
                color: #ffffff !important;
            }
            .nav-links a.active {
                color: #ffffff !important;
                text-shadow: 0 0 20px rgba(59,130,246,0.3) !important;
            }

            /* === BIG BUTTON === */
            .top-button {
                display: inline-block !important;
                padding: 10px 22px !important;
                border-radius: 12px !important;
                background: linear-gradient(135deg, #2563eb, #9333ea) !important;
                font-size: 0.9rem !important;
                font-weight: 700 !important;
                color: #ffffff !important;
                text-decoration: none !important;
                white-space: nowrap !important;
                box-shadow: 0 8px 24px rgba(37,99,235,0.3) !important;
                transition: transform 0.25s, box-shadow 0.3s !important;
                border: none !important;
                cursor: pointer !important;
                line-height: 1.4 !important;
            }
            .top-button:hover {
                transform: scale(1.04) !important;
                box-shadow: 0 12px 36px rgba(37,99,235,0.5) !important;
                color: #ffffff !important;
            }

            /* === FOOTER === */
            .footer-links {
                display: flex !important;
                justify-content: center !important;
                gap: 14px !important;
                flex-wrap: wrap !important;
                margin-bottom: 14px !important;
            }
            .footer-links a {
                color: #94a3b8 !important;
                font-weight: 600 !important;
                font-size: 0.85rem !important;
                transition: color 0.2s !important;
                text-decoration: none !important;
            }
            .footer-links a:hover {
                color: white !important;
            }

            /* === RESPONSIVE === */
            @media(max-width:900px) {
                .nav {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                    padding: 10px 0 !important;
                }
                .nav-links {
                    width: 100% !important;
                    justify-content: flex-start !important;
                    gap: 4px 8px !important;
                }
                .nav-links a {
                    font-size: 0.78rem !important;
                    padding: 3px 4px !important;
                }
                .top-button {
                    width: 100% !important;
                    text-align: center !important;
                    font-size: 0.85rem !important;
                    padding: 8px 16px !important;
                }
                .footer-links a {
                    font-size: 0.75rem !important;
                }
            }
            @media(max-width:600px) {
                .nav-links a {
                    font-size: 0.7rem !important;
                    padding: 2px 3px !important;
                }
                .top-button {
                    font-size: 0.8rem !important;
                    padding: 6px 14px !important;
                }
                .footer-links a {
                    font-size: 0.7rem !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ---- INIT ----
    function init() {
        injectStyles();
        buildNav();
        buildFooter();
    }

    // Wait for DOM ready before overriding nav
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();