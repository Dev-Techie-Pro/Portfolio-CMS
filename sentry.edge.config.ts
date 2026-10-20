import * as Sentry from "@sentry/nextjs";
import { baseSentryOptions, sentryEnabled } from "@/lib/observability/sentry-shared";

if (sentryEnabled()) {
  Sentry.init(baseSentryOptions());
}
