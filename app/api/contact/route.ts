import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/api/rate-limit";
import { getClientIp } from "@/lib/auth/request-meta";
import { verifyTurnstileToken } from "@/lib/api/turnstile";
import { submitPublicContactMessage } from "@/lib/cms/public-contact";
import { maybeSendContactAutoReply } from "@/lib/email/send-contact-auto-reply";
import { notifyAdminOfContact } from "@/lib/email/notify-admin";

export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(request, "public_contact");
  if (!limit.allowed) {
    const { status, headers } = rateLimitResponse(limit.retryAfterSec);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status, headers },
    );
  }

  try {
    const body = await request.json();
    const senderIp = getClientIp(request);
    const captcha = await verifyTurnstileToken(
      body?.turnstileToken ?? body?.captchaToken,
      senderIp,
    );
    if (!captcha.ok) {
      return NextResponse.json({ error: captcha.error }, { status: 400 });
    }

    const result = await submitPublicContactMessage(
      {
        senderName: body?.senderName ?? body?.name,
        senderEmail: body?.senderEmail ?? body?.email,
        subject: body?.subject,
        body: body?.body ?? body?.message,
        website: body?.website ?? body?.url,
      },
      senderIp,
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    const name = String(body?.name ?? body?.senderName ?? "").trim();
    const email = String(body?.email ?? body?.senderEmail ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? body?.body ?? "").trim();

    void maybeSendContactAutoReply({ senderName: name, senderEmail: email });
    void notifyAdminOfContact({ name, email, subject, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
