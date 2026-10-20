/**
 * Public API smoke load test (requires k6: https://k6.io/docs/get-started/installation/)
 *
 *   BASE_URL=https://your-site.com npm run load:public
 */
import http from "k6/http";
import { check, sleep } from "k6";

const BASE = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  vus: Number(__ENV.VUS || 10),
  duration: __ENV.DURATION || "30s",
  thresholds: {
    http_req_failed: ["rate<0.02"],
    http_req_duration: ["p(95)<2000"],
  },
};

const endpoints = [
  "/api/blogs",
  "/api/portfolio/projects",
  "/api/portfolio/highlights",
  "/api/portfolio/testimonials",
  "/api/portfolio/faqs",
];

export default function run() {
  for (const path of endpoints) {
    const res = http.get(`${BASE}${path}`);
    check(res, {
      [`${path} status 200`]: (r) => r.status === 200,
    });
  }
  sleep(0.5);
}
