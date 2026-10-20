import * as Sentry from "@sentry/nextjs";
import { baseSentryOptions, sentryEnabled } from "@/lib/observability/sentry-shared";

if (sentryEnabled()) {
  Sentry.init({
    ...baseSentryOptions(),
    integrations: [Sentry.replayIntegration()],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: Number(
      process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? "1.0",
    ),
  });
}
