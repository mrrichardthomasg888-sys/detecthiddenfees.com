(function () {
  'use strict';

  var STORAGE_KEY = 'dhf_attribution_v1';
  var SESSION_KEY = 'dhf_session_v1';
  var DESTINATION_HOST = 'hiddenfeeai.com';
  var MAX_VALUE_LENGTH = 160;

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
    window.dispatchEvent(new CustomEvent('dhf:' + name, { detail: eventDetail }));
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, eventDetail);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventDetail);
    }
  }

  function destinationIsHiddenFeeAI(anchor) {
    try {
      return new URL(anchor.href, window.location.href).hostname.replace(/^www\./, '') === DESTINATION_HOST;
    } catch (error) {
      return false;
    }
  }

  function decorate(anchor, attribution) {
    if (!destinationIsHiddenFeeAI(anchor) || anchor.getAttribute('data-no-attribution') === 'true') return;
    try {
      var url = new URL(anchor.href, window.location.href);
      var params = url.searchParams;
      params.set('dhf_landing', clean(attribution.landing_page));
      params.set('dhf_referrer', clean(attribution.original_referrer));
      params.set('dhf_session', clean(attribution.session_id));
      params.set('dhf_source', 'detecthiddenfees');
      Object.keys(attribution.utm || {}).forEach(function (key) {
        if (!params.has(key)) params.set(key, cleanParam(attribution.utm[key]));
      });
      anchor.href = url.toString();
    } catch (error) {
      // A malformed or non-HTTP link is left untouched.
    }
  }

  var attribution = buildAttribution();
  document.querySelectorAll('a[href]').forEach(function (anchor) {
    decorate(anchor, attribution);
  });

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor || !destinationIsHiddenFeeAI(anchor)) return;
    emit('dhf_cta_click', {
      landing_page: attribution.landing_page,
      original_referrer: attribution.original_referrer,
      destination: DESTINATION_HOST,
      cta_position: clean(anchor.getAttribute('data-cta-position') || 'unspecified'),
      cta_variant: clean(anchor.getAttribute('data-cta-variant') || 'unspecified'),
      cta_action: clean(anchor.getAttribute('data-cta-action') || 'document_analysis'),
      link_text: clean(anchor.textContent || '').replace(/\s+/g, ' ')
    });
  }, true);
})();
