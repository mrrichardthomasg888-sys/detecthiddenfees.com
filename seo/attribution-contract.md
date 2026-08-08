# DetectHiddenFees → HiddenFeeAI attribution contract

Status: implementation-ready, pending HiddenFeeAI integration.

## Purpose

DetectHiddenFees is a static authority/content site. This contract preserves non-sensitive marketing attribution when a visitor chooses a HiddenFeeAI link. It does not collect, inspect, or transmit document contents, filenames, extracted text, or analysis results.

## DetectHiddenFees behavior

`/attribution.js` stores a small, versioned record in browser storage:

- first landing path
- sanitized referrer origin and path, without query string or hash
- most recent page path
- UTM source, medium, campaign, content, and term when supplied
- short session identifier
- timestamps

Only links to `hiddenfeeai.com` receive handoff parameters. Recognized internal funnel links (`/analyze-my-bill`, `/analyze-my-document`, and `/upload-*`) remain on DetectHiddenFees and are tracked as funnel-step clicks without query-string handoff. A link can opt out with `data-no-attribution="true"`.

## Handoff parameters

| Parameter | Meaning |
| --- | --- |
| `dhf_landing` | First DetectHiddenFees landing path |
| `dhf_referrer` | Sanitized first referrer origin and path |
| `dhf_session` | Short browser-session identifier; not an identity token |
| `dhf_source` | Always `detecthiddenfees` for this handoff |
| `utm_source` ... `utm_term` | Original campaign values, when present |

HiddenFeeAI should validate, length-limit, and treat all values as untrusted input. It should preserve them server-side or in its analytics context only after the visitor consents under its own privacy policy.

## Event names

The runtime emits `dhf_cta_click` for outbound HiddenFeeAI links and `dhf_funnel_path_click` for recognized internal funnel links through DOM events and, when configured by the host site, through `gtag` and `dataLayer`. Events include page path, landing path, referrer, CTA position/variant/action, and a destination host or path. They never include document data.

HiddenFeeAI should create its own events for `hiddenfeeai_referral_received`, `upload_started`, `upload_completed`, `analysis_completed`, `checkout_started`, `purchase_completed`, and `revenue_recorded`, joining to the handoff only through its validated attribution context.

Recommended page-specific `data-cta-action` values are `contract_review`, `subscription_fee_review`, `estimate_review`, `bill_analysis`, `document_analysis`, and `document_upload`. These values describe the visitor intent represented by the source-page CTA; they do not assert HiddenFeeAI capabilities or a completed downstream conversion. Existing unannotated outbound links remain backward-compatible with the `document_analysis` default.

## Required integration checks

Before enabling end-to-end reporting, HiddenFeeAI must:

1. Accept and validate the handoff parameters on the landing route.
2. Preserve attribution through upload, analysis, checkout, and purchase redirects.
3. Keep document contents and sensitive fields out of analytics payloads.
4. Document consent, retention, deletion, and cross-domain disclosure behavior.
5. Provide a test environment or synthetic test route so the complete handoff can be verified without a real customer document or payment.
