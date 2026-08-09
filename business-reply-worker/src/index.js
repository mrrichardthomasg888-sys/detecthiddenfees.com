import PostalMime from 'postal-mime';

const BUSINESS_REPLY_ADDRESS = 'research@detecthiddenfees.com';
const EVENT_TTL_SECONDS = 90 * 24 * 60 * 60;
const MAX_SUBJECT_LENGTH = 300;
const MAX_HEADER_LENGTH = 2048;
const MAX_CLASSIFICATION_TEXT = 12000;

function normalizeEmail(value) {
  const match = String(value || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : null;
}

function cleanHeader(value, max = MAX_HEADER_LENGTH) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max) || null;
}

function hasAny(text, patterns) {
  return patterns.some(pattern => pattern.test(text));
}

function classify({ subject, text, headers, sender }) {
  const sample = `${subject}\n${text}`.slice(0, MAX_CLASSIFICATION_TEXT).toLowerCase();
  const autoSubmitted = String(headers.get('auto-submitted') || '').toLowerCase();
  const precedence = String(headers.get('precedence') || '').toLowerCase();
  const senderLocal = String(sender || '').split('@')[0];

  if (autoSubmitted || /auto-replied|autoreply|out of office|automatic reply|vacation/i.test(sample) || /^(bulk|junk|list)$/.test(precedence)) return 'OUT_OF_OFFICE';
  if (/mailer-daemon|postmaster|delivery status notification|undeliverable|mail delivery failed|returned mail|delivery failure/i.test(`${sender} ${sample}`)) return 'BOUNCE';
  if (hasAny(sample, [/\bunsubscribe\b/i, /remove me/i, /take me off/i, /stop emailing/i, /do not contact/i, /don't contact/i])) return 'UNSUBSCRIBE';
  if (hasAny(sample, [/not interested/i, /no thanks/i, /please decline/i, /pass for now/i, /not a fit/i])) return 'DECLINED';
  if (sample.includes('?') || hasAny(sample, [/\bquestion\b/i, /could you clarify/i, /can you send/i, /how does/i])) return 'QUESTION';
  if (hasAny(sample, [/\binterested\b/i, /happy to review/i, /please send/i, /tell me more/i, /useful for our readers/i])) return 'INTERESTED';
  if (/noreply|no-reply|do-not-reply/i.test(senderLocal)) return 'OTHER';
  return 'UNCERTAIN';
}

function suppresses(classification) {
  return ['BOUNCE', 'DECLINED', 'UNSUBSCRIBE'].includes(classification);
}

function extractCandidateRecipient(text) {
  if (!text) return null;
  const matches = [...String(text).matchAll(/(?:final-recipient|original-recipient|rfc822;|recipient)\s*[:=]\s*<?([^>\s,;]+@[^>\s,;]+)>?/ig)];
  return normalizeEmail(matches[0]?.[1] || null);
}

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export default {
  async email(message, env) {
    if (String(message.to || '').toLowerCase() !== BUSINESS_REPLY_ADDRESS) {
      message.setReject('Recipient is not an active business reply address');
      return;
    }
    if (!env.REPLY_EVENT_QUEUE) {
      message.setReject('Business reply monitor is not configured');
      return;
    }

    const parsed = await PostalMime.parse(await new Response(message.raw).arrayBuffer());
    const subject = cleanHeader(parsed.subject || message.headers.get('subject')) || '';
    const text = String(parsed.text || '').slice(0, MAX_CLASSIFICATION_TEXT);
    const sender = normalizeEmail(message.from || parsed.from?.address);
    const classification = classify({ subject, text, headers: message.headers, sender });
    const messageId = cleanHeader(message.headers.get('message-id'));
    const inReplyTo = cleanHeader(message.headers.get('in-reply-to'));
    const references = cleanHeader(message.headers.get('references'));
    const eventId = await digest([sender, subject, messageId, inReplyTo, references].join('|'));
    const event = {
      schema_version: '2026-08-08.1',
      event_id: eventId,
      received_at: new Date().toISOString(),
      sender_email: sender,
      recipient: BUSINESS_REPLY_ADDRESS,
      subject: subject.slice(0, MAX_SUBJECT_LENGTH),
      message_id: messageId,
      in_reply_to: inReplyTo,
      references,
      classification,
      suppress: suppresses(classification),
      candidate_recipient: classification === 'BOUNCE' ? extractCandidateRecipient(text) : null
    };

    await env.REPLY_EVENT_QUEUE.put(`event:${eventId}`, JSON.stringify(event), { expirationTtl: EVENT_TTL_SECONDS });
  }
};

export { classify, suppresses, normalizeEmail };
