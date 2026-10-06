import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { sendEnquiry } from "@/lib/mailer";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { errors, value } = validateContact(body as Record<string, string>);

  if (value.referrer) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await sendEnquiry(value);

  if (result.delivered) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  if (result.reason === "not-configured") {
    console.info("[contact] enquiry received (SMTP not configured)", {
      name: value.name,
      email: value.email,
      company: value.company,
      service: value.service,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  console.error("[contact] SMTP delivery failed", result.error);
  return NextResponse.json(
    { ok: false, message: "We could not send that. Please email us directly." },
    { status: 502 },
  );
}
