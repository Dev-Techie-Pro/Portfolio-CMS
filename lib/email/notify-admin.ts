import nodemailer from "nodemailer";

export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const BRAND = {
  name: "M Sohaib Ishaque",
  role: "Full Stack Web Developer",
  accent: "#22c55e",
  bg: "#0a0a0a",
  card: "#111111",
  border: "#1f1f1f",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://sohaibishaque.com",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailShell(options: {
  preheader: string;
  eyebrow: string;
  titleHtml: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  const { preheader, eyebrow, titleHtml, bodyHtml, footerNote } = options;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};color:${BRAND.text};font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 20px;border-bottom:1px solid ${BRAND.border};">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:42px;height:42px;border-radius:10px;background:${BRAND.accent};color:#04140a;font-weight:700;font-size:14px;text-align:center;vertical-align:middle;">SI</td>
                  <td style="padding-left:12px;">
                    <div style="font-size:15px;font-weight:700;color:${BRAND.text};line-height:1.2;">${escapeHtml(BRAND.name)}</div>
                    <div style="font-size:12px;color:${BRAND.muted};margin-top:2px;">${escapeHtml(BRAND.role)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <div style="display:inline-block;padding:4px 10px;border-radius:999px;border:1px solid rgba(34,197,94,0.35);background:rgba(34,197,94,0.08);color:${BRAND.accent};font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:14px;">${escapeHtml(eyebrow)}</div>
              <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;font-weight:700;color:${BRAND.text};">${titleHtml}</h1>
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 26px;border-top:1px solid ${BRAND.border};">
              <p style="margin:0 0 10px;font-size:12px;line-height:1.6;color:${BRAND.muted};">${escapeHtml(footerNote)}</p>
              <p style="margin:0;font-size:11px;color:${BRAND.muted};">&copy; ${year} ${escapeHtml(BRAND.name)}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;width:110px;color:${BRAND.muted};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-size:14px;line-height:1.5;">${value}</td>
    </tr>`;
}

export function buildAdminEmailHtml(payload: ContactEmailPayload): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const subject = escapeHtml(payload.subject);
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return emailShell({
    preheader: `New message from ${payload.name}: ${payload.subject}`,
    eyebrow: "New Contact Message",
    titleHtml: `Someone just reached out.`,
    bodyHtml: `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        A new inquiry was submitted through your portfolio contact form.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
        ${detailRow("Name", name)}
        ${detailRow("Email", `<a href="mailto:${email}" style="color:${BRAND.accent};text-decoration:none;">${email}</a>`)}
        ${detailRow("Subject", subject)}
      </table>
      <div style="margin:0 0 22px;padding:16px;border-radius:12px;background:#0a0a0a;border:1px solid ${BRAND.border};">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:8px;">Message</div>
        <div style="font-size:14px;line-height:1.7;color:${BRAND.text};">${message}</div>
      </div>
      <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${payload.subject}`)}"
         style="display:inline-block;padding:12px 18px;border-radius:999px;background:${BRAND.accent};color:#04140a;font-size:13px;font-weight:700;text-decoration:none;">
        Reply to ${name}
      </a>
    `,
    footerNote: `Reply directly to this email to respond to ${payload.name}. Saved in your contact messages inbox.`,
  });
}

export function buildSenderConfirmationHtml(payload: ContactEmailPayload): string {
  const firstName = escapeHtml(payload.name.split(/\s+/)[0] || payload.name);
  const subject = escapeHtml(payload.subject);
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return emailShell({
    preheader: `Thanks ${payload.name.split(/\s+/)[0] || payload.name} — I got your message and will reply soon.`,
    eyebrow: "Message Received",
    titleHtml: `Thanks, <span style="color:${BRAND.accent};">${firstName}</span>. I got your note.`,
    bodyHtml: `
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${BRAND.muted};">
        Thanks for reaching out. Your message is in my inbox and I usually reply within
        <strong style="color:${BRAND.text};">24 hours</strong>.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
        ${detailRow("Subject", subject)}
      </table>
      <div style="margin:0 0 22px;padding:16px;border-radius:12px;background:#0a0a0a;border:1px solid ${BRAND.border};">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:8px;">Your message</div>
        <div style="font-size:14px;line-height:1.7;color:${BRAND.text};">${message}</div>
      </div>
      <a href="${escapeHtml(BRAND.siteUrl)}"
         style="display:inline-block;padding:12px 18px;border-radius:999px;background:${BRAND.accent};color:#04140a;font-size:13px;font-weight:700;text-decoration:none;">
        Back to portfolio
      </a>
    `,
    footerNote: "If you didn’t submit this form, you can ignore this email.",
  });
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

function getFromAddress(smtpUser: string): string {
  return (
    process.env.SMTP_FROM?.trim() || `Portfolio Contact <${smtpUser}>`
  );
}

/**
 * Sends branded admin notification + sender confirmation via SMTP (Nodemailer).
 * Never throws — returns status for logging.
 */
export async function notifyAdminOfContact(
  payload: ContactEmailPayload,
): Promise<{ sent: boolean; provider?: string; reason?: string }> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  if (!adminEmail) {
    console.warn("[email] ADMIN_EMAIL is not set — skipping emails");
    return { sent: false, reason: "missing_admin_email" };
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    console.warn("[email] SMTP_USER / SMTP_PASS missing — skipping emails");
    return { sent: false, reason: "missing_smtp" };
  }

  const from = getFromAddress(smtp.auth.user);

  try {
    const transporter = nodemailer.createTransport(smtp);

    await Promise.all([
      transporter.sendMail({
        from,
        to: adminEmail,
        replyTo: payload.email,
        subject: `[Portfolio] ${payload.subject} — ${payload.name}`,
        text: [
          "New portfolio contact message",
          "",
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Subject: ${payload.subject}`,
          "",
          payload.message,
        ].join("\n"),
        html: buildAdminEmailHtml(payload),
      }),
      transporter.sendMail({
        from,
        to: payload.email,
        replyTo: adminEmail,
        subject: `Thanks ${payload.name.split(/\s+/)[0] || payload.name} — I received your message`,
        text: [
          `Hi ${payload.name},`,
          "",
          "Thanks for reaching out via my portfolio. I received your message and will get back to you soon (usually within 24 hours).",
          "",
          `Subject: ${payload.subject}`,
          "",
          "Your message:",
          payload.message,
          "",
          `— ${BRAND.name}`,
        ].join("\n"),
        html: buildSenderConfirmationHtml(payload),
      }),
    ]);

    return { sent: true, provider: "smtp" };
  } catch (err) {
    console.error("[email] Failed to send contact emails:", err);
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "send_failed",
    };
  }
}
