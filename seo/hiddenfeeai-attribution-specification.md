# HiddenFeeAI cross-domain attribution specification

Status: DetectHiddenFees handoff implemented; HiddenFeeAI production integration implemented in its separate repository on 2026-08-09.

## Objective

Measure the path from a DetectHiddenFees landing page to a HiddenFeeAI referral, upload, analysis, checkout, purchase, and revenue event without transmitting document contents, filenames, extracted text, analysis results, or sensitive customer data.

## Events

| Event | Required properties | Owner |
| --- | --- | --- |
| `dhf_landing_view` | `event_id`, `event_time`, `session_id`, `landing_path`, sanitized `referrer_origin`, UTM fields, consent state | DetectHiddenFees |
| `dhf_cta_click` | all landing context, `cta_id`, `cta_type`, `cta_action`, `cta_position`, `cta_variant`, destination host/path | DetectHiddenFees |
| `hiddenfeeai_arrival` | new event ID, validated handoff context, entry route, received timestamp | HiddenFeeAI |
| `upload_started` | handoff ID/context, upload flow ID, document category selected by user if non-sensitive | HiddenFeeAI |
| `upload_completed` | handoff ID/context, upload flow ID, opaque document ID, file type/size bucket only if needed | HiddenFeeAI |
| `analysis_completed` | handoff ID/context, opaque analysis ID, product outcome status, duration bucket if needed | HiddenFeeAI |
| `checkout_started` | handoff ID/context, opaque checkout ID, product/price ID, currency | HiddenFeeAI |
| `purchase_completed` | handoff ID/context, opaque transaction ID, product/price ID, currency, amount, timestamp | HiddenFeeAI server |
| `revenue_recorded` | opaque transaction ID, net/gross amount, currency, attribution version, timestamp | HiddenFeeAI server |
| `refund_recorded` | opaque transaction ID, refund amount, currency, timestamp | HiddenFeeAI server |

`dhf_funnel_path_click` remains the event for internal DetectHiddenFees funnel links. It is not a downstream conversion event.

## Handoff fields

The existing DetectHiddenFees runtime passes `dhf_landing`, `dhf_referrer`, `dhf_session`, `dhf_source`, `dhf_cta_id`, `dhf_cta_type`, and `utm_*` values. HiddenFeeAI treats every value as untrusted, length-limits it, validates allowed paths/hosts, and discards malformed values. `dhf_cta_id` is a page/action/position label for attribution analysis, not an identity token.

Recommended addition: HiddenFeeAI should issue a short-lived, opaque `dhf_handoff_id` after validating the incoming context. If a signed handoff is used, signing must happen server-side and the signature must not contain document data. The opaque ID is the join key for downstream events; it is not an identity token.

## Attribution rules

1. Preserve first DetectHiddenFees landing path and first campaign context as immutable fields.
2. Preserve the most recent DetectHiddenFees page and CTA context separately; never overwrite first-touch data.
3. Preserve a sanitized referrer origin and path only; remove query strings and fragments.
4. Store attribution server-side on HiddenFeeAI after consent and according to HiddenFeeAI’s privacy notice.
5. Use idempotency keys for every downstream event so retries cannot double-count purchases or revenue.
6. Join revenue to the earliest valid handoff context and record the attribution model/version used.
7. The attribution window is an owner decision and must be configured and documented before reporting. No default window is asserted by this specification.
8. Cross-domain identity must not require email, advertising IDs, document IDs, or fingerprinting.
9. Consent, retention, deletion, and regional privacy behavior must be implemented by each domain under its own legal/privacy review.

## Storage and privacy

DetectHiddenFees may retain its existing short browser-session record. HiddenFeeAI should store a minimal server-side attribution object keyed by the opaque handoff/session identifiers, with a documented retention period. Analytics payloads must exclude document content, OCR text, filenames, account numbers, medical details, contract text, and analysis findings. Revenue and purchase IDs must be generated and sent server-side, never trusted from browser input.

## Implementation checklist for HiddenFeeAI

- Accept the existing query parameters on the intended entry routes.
- Validate host, path, length, character set, and UTM values.
- Create and persist an opaque handoff ID.
- Preserve attribution through upload, analysis, checkout, and payment redirects.
- Emit downstream events from the server where payment or revenue is involved.
- Add event idempotency and an attribution version.
- Define consent, retention, deletion, and cross-domain disclosure behavior.
- Provide a synthetic test route or staging environment.
- Return a test report proving first-touch landing, CTA, referral, upload, analysis, checkout, purchase, revenue, and refund joins without a real customer document or payment.

## Acceptance test

Use a synthetic visit with a known landing path, UTM campaign, CTA ID, and test session. Confirm that one opaque handoff joins all downstream events, that a repeated webhook does not duplicate revenue, and that exported event payloads contain no document content or sensitive fields. Test a direct HiddenFeeAI visit separately and confirm it has no DetectHiddenFees attribution.
