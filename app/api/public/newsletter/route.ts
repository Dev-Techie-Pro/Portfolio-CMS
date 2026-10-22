// @ts-nocheck
import { publicCorsJson, publicCorsOptions } from '@/lib/api/public-cors';
import { checkRateLimit, rateLimitResponse } from '@/lib/api/rate-limit';
import { getClientIp } from '@/lib/auth/request-meta';
import { subscribePublicNewsletter } from '@/lib/cms/public-newsletter';

export async function OPTIONS(request: Request) {
  return publicCorsOptions(request);
}

export async function POST(request: Request) {
  const limit = await checkRateLimit(request, 'public_newsletter');
  if (!limit.allowed) {
    const { status, headers } = rateLimitResponse(limit.retryAfterSec);
    return publicCorsJson(request, { error: 'Too many requests. Please try again later.' }, { status, headers });
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
      return publicCorsJson(request, { error: result.error }, { status: result.status });
    }
    return publicCorsJson(request, {
      ok: true,
      already: !!result.already,
      message: result.already
        ? "You're already subscribed. Thanks for staying in touch!"
        : "You're subscribed. Watch your inbox for the next update.",
    });
  } catch (error) {
    console.error('[newsletter] subscribe failed:', (error as Error).message);
    return publicCorsJson(request, { error: 'Unable to subscribe right now.' }, { status: 500 });
  }
}
