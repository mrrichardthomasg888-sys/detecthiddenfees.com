(function () {
  'use strict';

  var STORAGE_KEY = 'dhf_attribution_v1';
  var SESSION_KEY = 'dhf_session_v1';
  var DESTINATION_HOST = 'hiddenfeeai.com';
  var GA4_MEASUREMENT_ID = 'G-KDGZ83RRHL';
  var MAX_VALUE_LENGTH = 160;

  function installGA4() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      linker: { domains: ['detecthiddenfees.com', 'hiddenfeeai.com'] }
    });
    if (!document.querySelector('script[data-dhf-ga4="' + GA4_MEASUREMENT_ID + '"]')) {
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
      script.setAttribute('data-dhf-ga4', GA4_MEASUREMENT_ID);
      document.head.appendChild(script);
    }
  }

  function clean(value) {
    return String(value || '')
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .trim()
      .slice(0, MAX_VALUE_LENGTH);
  }

  function cleanParam(value) {
    return clean(value).replace(/[^a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=% -]/g, '');
  }

  function readStorage(storage, key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch (error) {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
  }

  function getSessionId() {
    var existing = readStorage(window.sessionStorage, SESSION_KEY);
    if (existing) return existing;
    var random = Math.random().toString(36).slice(2) + Date.now().toString(36);
    var sessionId = clean(random).slice(0, 64);
    writeStorage(window.sessionStorage, SESSION_KEY, sessionId);
    return sessionId;
  }

  function referrerValue() {
    if (!document.referrer) return '';
    try {
      var url = new URL(document.referrer);
      return clean(url.origin + url.pathname);
    } catch (error) {
      return '';
    }
  }

  function currentPage() {
    return clean(window.location.pathname || '/');
  }

  function readStoredAttribution() {
    var raw = readStorage(window.localStorage, STORAGE_KEY);
    if (!raw) return {};
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function queryAttribution() {
    var params = new URLSearchParams(window.location.search);
    var result = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
      var value = cleanParam(params.get(key));
      if (value) result[key] = value;
    });
    return result;
  }

  function buildAttribution() {
    var previous = readStoredAttribution();
    var query = queryAttribution();
    var referrer = referrerValue();
    var page = currentPage();
    var now = new Date().toISOString();
    var firstTouch = previous.first_touch || {
      landing_page: page,
      referrer: referrer,
      occurred_at: now
    };
    var current = {
      version: 1,
      session_id: getSessionId(),
      landing_page: clean(firstTouch.landing_page || page),
      original_referrer: clean(firstTouch.referrer || referrer),
      current_page: page,
      first_touch: firstTouch,
      last_touch: {
        page: page,
        referrer: referrer,
        occurred_at: now
      },
      utm: Object.assign({}, previous.utm || {}, query),
      updated_at: now
    };
    writeStorage(window.localStorage, STORAGE_KEY, JSON.stringify(current));
    return current;
  }

  function emit(name, detail) {
    var eventDetail = Object.assign({
      event: name,
      page_path: currentPage(),
      landing_page: detail.landing_page,
      original_referrer: detail.original_referrer,
      session_id: detail.session_id
    }, detail);
    var analyticsDetail = {
      page_path: eventDetail.page_path,
      dhf_source: 'detecthiddenfees',
      dhf_landing: eventDetail.landing_page,
      dhf_session: eventDetail.session_id,
      dhf_cta_id: eventDetail.cta_id,
      dhf_cta_type: eventDetail.cta_type,
      destination: eventDetail.destination,
      cta_position: eventDetail.cta_position,
      cta_variant: eventDetail.cta_variant,
      cta_action: eventDetail.cta_action
    };
    window.dispatchEvent(new CustomEvent('dhf:' + name, { detail: eventDetail }));
    if (typeof window.gtag === 'function') {
      if (name === 'dhf_landing_view') {
        window.gtag('event', 'page_view', Object.assign({ page_title: clean(document.title) }, analyticsDetail));
      }
      window.gtag('event', name, analyticsDetail);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(analyticsDetail);
    }
  }

  function destinationIsHiddenFeeAI(anchor) {
    try {
      return new URL(anchor.href, window.location.href).hostname.replace(/^www\./, '') === DESTINATION_HOST;
    } catch (error) {
      return false;
    }
  }

  function internalFunnelPath(anchor) {
    try {
      var url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return '';
      if (/^\/analyze-my-(?:bill|document)$/.test(url.pathname)) return url.pathname;
      if (/^\/upload-[^/]+$/.test(url.pathname)) return url.pathname;
      return '';
    } catch (error) {
      return '';
    }
  }

  function funnelAction(anchor, pathname) {
    var explicit = clean(anchor.getAttribute('data-cta-action') || '');
    if (explicit) return explicit;
    if (pathname === '/analyze-my-bill') return 'bill_analysis';
    if (pathname === '/analyze-my-document') return 'document_analysis';
    return 'document_upload';
  }

  function ctaPosition(anchor) {
    var explicit = clean(anchor.getAttribute('data-cta-position') || '');
    if (explicit) return explicit;
    var className = String(anchor.className || '').toLowerCase();
    if (className.indexOf('sticky') !== -1) return 'sticky';
    if (anchor.closest && anchor.closest('.hero')) return 'top';
    if (anchor.closest && anchor.closest('.cta-block')) return 'end';
    if (anchor.closest && anchor.closest('header, nav')) return 'nav';
    return 'middle';
  }

  function ctaType(anchor, isProductLink) {
    var explicit = clean(anchor.getAttribute('data-cta-type') || '');
    return explicit || (isProductLink ? 'hiddenfeeai_referral' : 'internal_funnel');
  }

  function ctaId(anchor, pathname) {
    var explicit = clean(anchor.getAttribute('data-cta-id') || '');
    if (explicit) return explicit;
    return clean(currentPage() + ':' + funnelAction(anchor, pathname) + ':' + ctaPosition(anchor));
  }

  function decorate(anchor, attribution) {
    if (!destinationIsHiddenFeeAI(anchor) || anchor.getAttribute('data-no-attribution') === 'true') return;
    try {
      var url = new URL(anchor.href, window.location.href);
      var params = url.searchParams;
      var pathname = internalFunnelPath(anchor);
      params.set('dhf_landing', clean(attribution.landing_page));
      params.set('dhf_referrer', clean(attribution.original_referrer));
      params.set('dhf_session', clean(attribution.session_id));
      params.set('dhf_source', 'detecthiddenfees');
      params.set('dhf_cta_id', ctaId(anchor, pathname));
      params.set('dhf_cta_type', ctaType(anchor, true));
      Object.keys(attribution.utm || {}).forEach(function (key) {
        if (!params.has(key)) params.set(key, cleanParam(attribution.utm[key]));
      });
      anchor.href = url.toString();
    } catch (error) {
      // A malformed or non-HTTP link is left untouched.
    }
  }

  installGA4();
  var attribution = buildAttribution();
  emit('dhf_landing_view', {
    landing_page: attribution.landing_page,
    original_referrer: attribution.original_referrer,
    utm: attribution.utm,
    current_page: attribution.current_page
  });
  document.querySelectorAll('a[href]').forEach(function (anchor) {
    decorate(anchor, attribution);
  });

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    var isProductLink = destinationIsHiddenFeeAI(anchor);
    var internalPath = internalFunnelPath(anchor);
    if (!isProductLink && !internalPath) return;
    var eventName = isProductLink ? 'dhf_cta_click' : 'dhf_funnel_path_click';
    emit(eventName, {
      landing_page: attribution.landing_page,
      original_referrer: attribution.original_referrer,
      destination: isProductLink ? DESTINATION_HOST : internalPath,
      cta_id: ctaId(anchor, internalPath),
      cta_type: ctaType(anchor, isProductLink),
      cta_position: ctaPosition(anchor),
      cta_variant: clean(anchor.getAttribute('data-cta-variant') || 'unspecified'),
      cta_action: funnelAction(anchor, internalPath),
      link_text: clean(anchor.textContent || '').replace(/\s+/g, ' ')
    });
  }, true);
})();
