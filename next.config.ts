import type { NextConfig } from "next";
import path from "node:path";
import { withSentryConfig } from "@sentry/nextjs";

function supabaseOrigins(): string[] {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return [];
  try {
    const url = new URL(raw);
    const ws = url.origin.replace(/^https:/, "wss:").replace(/^http:/, "ws:");
    return [url.origin, ws];
  } catch {
    return [];
  }
}

const noCacheJs = "public, max-age=0, must-revalidate";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/admin/blog-post/view/:id",
        destination: "/admin/blog-post?open=:id",
        permanent: false,
      },
      {
        source: "/admin/settings/integrations",
        destination: "/admin/settings/system",
        permanent: false,
      },
      {
        source: "/admin/settings/logs",
        destination: "/admin/settings/general",
        permanent: false,
      },
      {
        source: "/settings",
        destination: "/admin/settings/general",
        permanent: false,
      },
      {
        source: "/settings/:tab",
        destination: "/admin/settings/:tab",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/projects/:slug",
        destination: "/project-details",
      },
      {
        source: "/blogs/:category/:slug",
        destination: "/blog-details",
      },
    ];
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    const staticCache = isProd
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate";
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    if (isProd) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }
    const supabase = supabaseOrigins();
    const cspConnect = supabase.length ? ` connect-src 'self' ${supabase.join(" ")}` : "";
    return [
      {
        source: "/admin/:path*",
        headers: securityHeaders,
      },
      {
        source: "/js/chunks/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/js/vendor/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isProd ? "public, max-age=604800" : staticCache,
          },
        ],
      },
      {
        source: "/vendor/remixicon/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/js/main.js",
        headers: [{ key: "Cache-Control", value: noCacheJs }],
      },
      {
        source: "/js/:file(boot-prefetch|prefetch-config|body-loader-template).js",
        headers: [{ key: "Cache-Control", value: noCacheJs }],
      },
      {
        source: "/js/core/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/js/modules/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
      {
        source: "/js/utils/:path*",
        headers: [{ key: "Cache-Control", value: staticCache }],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["@opentelemetry/instrumentation", "thesvg", "@thesvg/icons"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      {
        module: /node_modules\/@opentelemetry\/instrumentation/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ];
    return config;
  },
};

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

export default sentryDsn
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI,
      disableLogger: true,
      widenClientFileUpload: true,
      automaticVercelMonitors: false,
    })
  : nextConfig;
