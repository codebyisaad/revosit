import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/content/site";

function readConfig() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.zoho.com";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) return null;

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const config = readConfig();

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
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject: `New enquiry — ${enquiry.name}${enquiry.company ? ` (${enquiry.company})` : ""}`,
      text,
      html,
    });
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
    cached = null;
    return { delivered: false, reason: "failed", error };
  }
}
