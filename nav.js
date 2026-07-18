// nav.js — Universal Navigation Loader with Styles & Auto Cache Busting

(function() {
    'use strict';

    // ===== INJECT STYLES =====
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        nav {
            position: sticky;
            top: 0;
            z-index: 999;
            background: rgba(2, 8, 23, .85);
            backdrop-filter: blur(18px) saturate(1.2);
            border-bottom: 1px solid rgba(255, 255, 255, .06);
            box-shadow: 0 4px 40px rgba(0, 0, 0, 0.5);
        }
        .nav-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            gap: 10px;
            max-width: 1100px;
            margin: 0 auto;
            padding-left: 22px;
            padding-right: 22px;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: 900;
            letter-spacing: -1px;
            color: white;
            text-decoration: none;
            flex-shrink: 0;
            text-shadow: 0 0 30px rgba(37, 99, 235, 0.2);
        }
        .logo span {
            color: #3b82f6;
        }
        .nav-links {
            display: flex;
            gap: 6px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-end;
        }
        .nav-links a {
            color: #cbd5e1;
            font-weight: 600;
            font-size: .82rem;
            padding: 4px 5px;
            white-space: nowrap;
            transition: color 0.2s, text-shadow 0.3s;
        }
        .nav-links a:hover {
            color: #ffffff;
            text-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        .nav-links a.active {
            color: #ffffff;
            text-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        .nav-btn {
            padding: 8px 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #2563eb, #9333ea);
            color: white !important;
            font-weight: 700 !important;
            font-size: .78rem !important;
            box-shadow: 0 8px 24px rgba(37, 99, 235, .3);
            white-space: nowrap;
            transition: transform 0.25s, box-shadow 0.3s;
        }
        .nav-btn:hover {
            transform: scale(1.04);
            box-shadow: 0 12px 36px rgba(37, 99, 235, .5);
        }
        @media (max-width: 900px) {
            .nav-wrap {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px 0;
            }
            .nav-links {
                width: 100%;
                justify-content: flex-start;
                gap: 3px 6px;
            }
            .nav-links a {
                font-size: .75rem;
                padding: 2px 4px;
            }
            .nav-btn {
                width: 100%;
                text-align: center;
                font-size: .7rem !important;
                padding: 6px 12px;
            }
            .logo {
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(styleElement);

    // ===== INJECT NAVIGATION HTML =====
    const navHTML = `
    <div class="nav-wrap">
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
            <a href="/contract-review-ai-software.html">AI Software</a>
            <a href="https://hiddenfeeai.com" class="nav-btn">Analyze My Documents</a>
        </div>
    </div>
    `;

    // Find the nav element and inject HTML
    const navElement = document.querySelector('nav');
    if (navElement) {
        navElement.innerHTML = navHTML;
    }

    // Add active class based on current URL
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href !== '/' && currentPath.startsWith(href) && href !== '/')) {
            link.classList.add('active');
        }
    });

    // ===== AUTO CACHE BUSTING: Log version so you know it loaded =====
    console.log('✅ nav.js v2.0 loaded — AI Software link added');
})();