"use client";

import { useReportWebVitals } from "next/web-vitals";

type VitalPayload = {
  name: string;
  value: number;
  id: string;
  path: string;
  rating?: string;
  navigationType?: string;
};

function reportVital(metric: {
  name: string;
  value: number;
  id: string;
  rating?: string;
  navigationType?: string;
}) {
  const payload: VitalPayload = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    path: typeof window !== "undefined" ? window.location.pathname : "",
    rating: metric.rating,
    navigationType: metric.navigationType,
  };

  if (process.env.NODE_ENV === "development") {
    console.debug("[web-vitals]", payload.name, payload.value, payload.rating);
  }

  if (process.env.NEXT_PUBLIC_VITALS_REPORT !== "1") return;

  const body = JSON.stringify(payload);
  const url = "/api/metrics/web-vitals";
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
    return;
  }
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export function WebVitalsReporter() {
  useReportWebVitals(reportVital);
  return null;
}
