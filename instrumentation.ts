import * as Sentry from "@sentry/nextjs";
import { sentryEnabled } from "@/lib/observability/sentry-shared";

export async function register() {
  if (!sentryEnabled()) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = sentryEnabled()
  ? Sentry.captureRequestError
  : undefined;
