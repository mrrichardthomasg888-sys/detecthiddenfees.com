(function () {
  "use strict";
  var money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  var pct = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });
  function num(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field ? Number(field.value || 0) : 0;
  }
  function date(form, name) {
    var field = form.querySelector('[name="' + name + '"]');
    return field && field.value ? new Date(field.value + "T00:00:00Z") : null;
  }
  function result(form, headline, detail) {
    var box = form.querySelector(".calculator-result");
    box.hidden = false;
    box.setAttribute("aria-live", "polite");
    box.querySelector(".result-main").innerHTML = "<span>Estimated result</span>" + headline;
    box.querySelector(".result-detail").textContent = detail;
    var resultDetail = {
      event: "hiddenfee_calculator_result",
      calculator_type: form.getAttribute("data-calculator") || "unknown",
      page_slug: location.pathname.replace(/^\//, "") || "home"
    };
    window.dispatchEvent(new CustomEvent("dhf:calculator_result", { detail: resultDetail }));
    if (typeof window.gtag === "function") window.gtag("event", "hiddenfee_calculator_result", resultDetail);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(resultDetail);
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function dateText(value) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(value);
  }
  function calculate(form, type) {
    var total, detail, d, rate, start, years, i;
    switch (type) {
      case "hidden-fee":
        total = num(form, "mandatory") + num(form, "optional") + (num(form, "recurring") * num(form, "months"));
        result(form, money.format(total), "That is the estimated annual or term-based hidden-fee exposure from the charges you entered. Visible spend is not included."); break;
      case "contract-cost":
        start = num(form, "monthly"); years = Math.max(1, Math.round(num(form, "months") / 12)); rate = num(form, "escalation") / 100; total = num(form, "setup") + num(form, "passThrough");
        for (i = 0; i < num(form, "months"); i++) total += start * Math.pow(1 + rate, Math.floor(i / 12));
        result(form, money.format(total), "Includes the setup charge, pass-through costs, monthly pricing, and the escalation rate applied at each anniversary."); break;
      case "automatic-renewal":
        d = date(form, "renewalDate"); total = num(form, "noticeDays") + num(form, "bufferDays");
        if (!d || !Number.isFinite(total)) { result(form, "Add a renewal date", "Enter the date the agreement renews and the notice buffer you want to keep."); break; }
        d.setUTCDate(d.getUTCDate() - total); result(form, dateText(d), "Planning deadline: renewal date minus the notice period and your personal review buffer. Verify the automatic renewal clause before relying on it."); break;
      case "price-escalation":
        start = num(form, "startingPrice"); years = Math.max(1, Math.round(num(form, "years"))); rate = num(form, "increase") / 100; total = 0;
        for (i = 0; i < years; i++) total += start * Math.pow(1 + rate, i);
        result(form, money.format(total), "Estimated total across the term. Without escalation, the same term would cost " + money.format(start * years) + "."); break;
      case "termination-fee":
        total = (num(form, "monthly") * num(form, "monthsRemaining") * (num(form, "penaltyPercent") / 100)) + num(form, "flatFee") + num(form, "adminFee");
        result(form, money.format(total), "Estimated exit cost using the remaining term, penalty percentage, flat charge, and administration fee you entered."); break;
      case "late-fee":
        total = (num(form, "balance") * (num(form, "lateRate") / 100)) + num(form, "flatCharge");
        detail = "Estimated late charge for " + num(form, "daysLate") + " day(s). Check for grace periods, caps, and whether the rate is monthly or annual.";
        result(form, money.format(total), detail); break;
      case "subscription-cost":
        total = (num(form, "monthly") * num(form, "months")) + num(form, "setup") + (num(form, "addon") * num(form, "months"));
        total *= 1 - (num(form, "discount") / 100); result(form, money.format(total), "Estimated term cost after the discount, including setup and recurring add-ons."); break;
      case "service-fee":
        total = (num(form, "serviceAmount") * (num(form, "mandatoryRate") / 100)) + num(form, "fixedFee") + (num(form, "monthlyFee") * num(form, "months"));
        result(form, money.format(total), "Estimated service-fee load from percentage-based, fixed, and recurring charges."); break;
      case "processing-fee":
        total = (num(form, "transactionAmount") * (num(form, "percentRate") / 100) + num(form, "perTransaction")) * num(form, "transactions");
        result(form, money.format(total), "Estimated processing cost for the transaction volume entered, before any account or chargeback fees."); break;
      case "convenience-fee":
        total = (num(form, "paymentAmount") * (num(form, "surchargeRate") / 100)) + num(form, "flatSurcharge");
        result(form, money.format(total), "Estimated convenience charge for one payment. Compare it with the payment method and any required disclosures."); break;
      case "contract-risk":
        total = num(form, "renewal") * 18 + num(form, "escalation") * 18 + num(form, "termination") * 16 + num(form, "discretion") * 15 + num(form, "liability") * 12 + num(form, "arbitration") * 9 + num(form, "data") * 12;
        total = Math.min(100, Math.round(total)); result(form, total + "/100", total >= 60 ? "Higher review priority: several terms could affect cost, control, or exit rights." : "Lower initial score: still read the agreement and confirm the terms match the quote."); break;
      case "hidden-fee-risk":
        total = num(form, "vague") * 8 + num(form, "mandatoryUnknown") * 12 + num(form, "defaultOptIn") * 10 + num(form, "passThrough") * 10 + num(form, "renewal") * 9;
        total = Math.min(100, Math.round(total)); result(form, total + "/100", total >= 55 ? "Higher hidden-fee risk: upload the document for line-by-line review before accepting the price." : "Lower initial risk based on the signals entered; verify the fine print and final invoice."); break;
      case "invoice":
        total = num(form, "subtotal") + num(form, "tax") + num(form, "serviceFees") + num(form, "processingFees") - num(form, "credits");
        result(form, money.format(total), "Expected invoice total after taxes, service charges, processing fees, and credits. Compare it with the amount due."); break;
      case "negotiation-savings":
        total = (num(form, "annualCost") * (num(form, "reduction") / 100)) + num(form, "removableFees") + (num(form, "monthlySavings") * 12);
        result(form, money.format(total), "Estimated first-year savings from a price reduction, removable fees, and recurring monthly savings."); break;
      case "consumer-savings":
        total = ((num(form, "monthlyFees") * num(form, "months")) + num(form, "oneTimeFees")) * (num(form, "removalRate") / 100);
        result(form, money.format(total), "Estimated savings over the period if the share of fees you entered is removed or avoided."); break;
      default: result(form, "Ready when you are", "Enter the values above to see an estimate.");
    }
  }
  document.querySelectorAll("[data-calculator]").forEach(function (form) {
    form.addEventListener("submit", function (event) { event.preventDefault(); calculate(form, form.getAttribute("data-calculator")); });
  });
  function track(el) {
    var detail = {
      event: "hiddenfeeai_cta_click",
      page_slug: el.getAttribute("data-page-slug") || location.pathname.replace(/^\//, "") || "home",
      cta_position: el.getAttribute("data-cta-position") || "unknown",
      cta_action: el.getAttribute("data-cta-intent") || el.getAttribute("data-cta-action") || "unknown",
      cta_variant: el.getAttribute("data-cta-variant") || "unknown"
    };
    window.dispatchEvent(new CustomEvent("dhf:cta", { detail: detail }));
    if (typeof window.gtag === "function") window.gtag("event", "hiddenfeeai_cta_click", detail);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
  }
  var handoff = document.querySelector(".scan-handoff");
  var closeHandoff = function () { if (handoff) handoff.hidden = true; };
  document.addEventListener("click", function (event) {
    var el = event.target.closest ? event.target.closest("[data-cta-position]") : null;
    var isHiddenFeeAiLink = el && el.tagName === "A" && el.href.indexOf("hiddenfeeai.com") > -1;
    var action = isHiddenFeeAiLink ? el.getAttribute("data-cta-action") : null;
    var isScan = isHiddenFeeAiLink && (el.getAttribute("data-cta-intent") === "scan" || action === "scan");
    var isDesktop = window.matchMedia && window.matchMedia("(min-width: 768px)").matches;
    if (isHiddenFeeAiLink) {
      track(el);
      if (action === "upload" || (isScan && !isDesktop)) {
        event.preventDefault();
        window.location.assign(el.href);
        return;
      }
    }
    var scan = event.target.closest ? event.target.closest(".calculator-scan-trigger, .scan-doc-trigger") : null;
    if (scan && handoff && isDesktop) {
      event.preventDefault();
      handoff.hidden = false;
      var close = handoff.querySelector(".scan-handoff-close");
      if (close) close.focus();
    }
    if (event.target === handoff || (event.target.closest && event.target.closest(".scan-handoff-close"))) closeHandoff();
  });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeHandoff(); });
}());
