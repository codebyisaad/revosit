import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/content/site";

/**
 * SMTP configuration, read once per process.
 *
 * SMTP_USER / SMTP_PASS are an account and an app password — not a login
 * password. Zoho requires the app-password form once 2FA is on and rejects the
 * account password outright.
 *
 * SMTP_HOST is region-specific on Zoho: smtp.zoho.com (US), smtp.zoho.eu (EU),
 * smtp.zoho.in (IN), smtp.zoho.com.au (AU). Using the wrong region authenticates
 * against the wrong datacentre and fails with a misleading credentials error.
 */
function readConfig() {
  // Only the account and its app password are mandatory; the rest have
  // sensible defaults so .env stays as small as possible.
  const host = process.env.SMTP_HOST?.trim() || "smtp.zoho.com";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) return null;

  // 465 is implicit TLS; 587 upgrades with STARTTLS. Getting `secure` wrong for
  // the port is the usual cause of a hang rather than an error.
  const port = Number(process.env.SMTP_PORT ?? 465);

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from: resolveFrom(process.env.CONTACT_FROM?.trim(), user),
    to: process.env.CONTACT_TO?.trim() || site.email,
  };
}

/**
 * CONTACT_FROM may be a full address, a "Name <addr>" pair, or — a common slip —
 * just a display name. A bare name would build an invalid From header and get
 * the message rejected at the provider, so pair it with the authenticated
 * account rather than failing on it.
 *
 * Zoho requires the sending address to be the authenticated mailbox or one of
 * its verified aliases, so `user` is always the right thing to fall back to.
 */
function resolveFrom(configured: string | undefined, user: string) {
  if (!configured) return `${site.name} <${user}>`;
  if (configured.includes("@")) return configured;
  return `${configured} <${user}>`;
}

let cached: Transporter | null = null;

function getTransport(config: NonNullable<ReturnType<typeof readConfig>>) {
  cached ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });
  return cached;
}

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export type DeliveryResult =
  | { delivered: true; messageId: string; accepted: string[] }
  | { delivered: false; reason: "not-configured" }
  | { delivered: false; reason: "failed"; error: unknown };

/** Escapes untrusted text before it goes into the HTML part of the email. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const config = readConfig();

  // No credentials yet: the caller still reports success to the visitor and
  // logs the enquiry, so the form is never a dead end during setup.
  if (!config) return { delivered: false, reason: "not-configured" };

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Company", enquiry.company || "—"],
    ["Service", enquiry.service || "—"],
    ["Budget", enquiry.budget || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    enquiry.message,
  ].join("\n");

  const html = [
    '<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">',
    "<h2 style=\"margin:0 0 16px\">New enquiry</h2>",
    '<table cellpadding="0" cellspacing="0" style="margin-bottom:20px">',
    ...rows.map(
      ([k, v]) =>
        `<tr><td style="padding:2px 16px 2px 0;color:#666">${k}</td><td>${escapeHtml(v)}</td></tr>`,
    ),
    "</table>",
    `<div style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:14px">${escapeHtml(enquiry.message)}</div>`,
    "</div>",
  ].join("");

  try {
    const info = await getTransport(config).sendMail({
      from: config.from,
      to: config.to,
      // Hitting reply goes to the person who filled the form, not to ourselves.
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject: `New enquiry — ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ""}`,
      text,
      html,
    });
    // Logged on purpose: the only other record that a enquiry left the box is
    // in Zoho's sent folder, which is awkward to check when one goes missing.
    console.info("[contact] delivered", {
      messageId: info.messageId,
      from: config.from,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return {
      delivered: true,
      messageId: String(info.messageId ?? ""),
      accepted: (info.accepted ?? []).map(String),
    };
  } catch (error) {
    // Drop the cached transport so the next attempt rebuilds the connection.
    cached = null;
    return { delivered: false, reason: "failed", error };
  }
}
