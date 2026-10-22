import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, rateLimitResponse } from '@/lib/api/rate-limit';
import { getClientIp } from '@/lib/auth/request-meta';
import { subscribePublicNewsletter } from '@/lib/cms/public-newsletter';

export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(request, 'public_newsletter');
  if (!limit.allowed) {
    const { status, headers } = rateLimitResponse(limit.retryAfterSec);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status, headers },
    );
  }

  try {
    const body = await request.json();
    const senderIp = getClientIp(request);
    const result = await subscribePublicNewsletter(
      body?.email ?? body?.senderEmail,
      senderIp,
      body?.website ?? body?.url,
    );
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({
      ok: true,
      already: !!result.already,
      message: result.already
        ? "You're already subscribed. Thanks for staying in touch!"
        : "You're subscribed. Watch your inbox for the next update.",
    });
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}
