// /nav.js
(function() {

    // ---- Inject button CSS directly into the page ----
    function injectButtonStyles() {
        if (document.getElementById('nav-button-styles')) return;
        const style = document.createElement('style');
        style.id = 'nav-button-styles';
        style.textContent = `
            /* === BUTTON STYLES (injected by nav.js) === */
            .top-button {
                display: inline-block !important;
                padding: 8px 18px !important;
                border-radius: 12px !important;
                background: linear-gradient(135deg, #2563eb, #9333ea) !important;
                font-size: .78rem !important;
                font-weight: 700 !important;
                color: #ffffff !important;
                text-decoration: none !important;
                white-space: nowrap !important;
                box-shadow: 0 8px 24px rgba(37, 99, 235, .3) !important;
                transition: transform 0.25s, box-shadow 0.3s !important;
                border: none !important;
                cursor: pointer !important;
                line-height: 1.4 !important;
            }
            .top-button:hover {
                transform: scale(1.04) !important;
                box-shadow: 0 12px 36px rgba(37, 99, 235, .5) !important;
                color: #ffffff !important;
            }
            .nav-links {
                display: flex !important;
                gap: 6px !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                justify-content: flex-end !important;
                min-height: 36px !important;
            }
            .nav-links a {
                color: #cbd5e1 !important;
                font-weight: 600 !important;
                font-size: .8rem !important;
                padding: 4px 6px !important;
                white-space: nowrap !important;
                transition: color 0.2s !important;
                text-decoration: none !important;
            }
            .nav-links a:hover {
                color: #ffffff !important;
            }
            .nav-links a.active {
                color: #ffffff !important;
                text-shadow: 0 0 20px rgba(59, 130, 246, 0.3) !important;
            }
            @media(max-width:900px) {
                .nav-links {
                    width: 100% !important;
                    justify-content: flex-start !important;
                    gap: 4px 8px !important;
                }
                .nav-links a {
                    font-size: .78rem !important;
                    padding: 3px 4px !important;
                }
                .top-button {
                    width: 100% !important;
                    text-align: center !important;
                    font-size: .75rem !important;
                    padding: 8px 14px !important;
                }
            }
            @media(max-width:600px) {
                .nav-links a {
                    font-size: .7rem !important;
                    padding: 2px 3px !important;
                }
                .top-button {
                    font-size: .65rem !important;
                    padding: 6px 10px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ---- Build and inject the nav ----
    function buildNav() {
        const container = document.querySelector('.nav-links');
        if (!container) return;

        // Inject button CSS (safe to call multiple times)
        injectButtonStyles();

        // ---- CENTRAL LIST OF ALL PAGES ----
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

        const currentPath = window.location.pathname;
        let html = '';

        pages.forEach(page => {
            const isActive = (currentPath === page.href) ? ' active' : '';
            html += `<a href="${page.href}" class="${isActive}">${page.text}</a>`;
        });

        // Button with proper class
        html += `<a href="https://hiddenfeeai.com" class="top-button">🚀 Analyze My Documents</a>`;

        container.innerHTML = html;
    }

    // ---- Run when DOM is ready ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }

})();