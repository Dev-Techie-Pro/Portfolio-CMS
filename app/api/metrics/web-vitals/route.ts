import { NextResponse } from "next/server";

const ALLOWED_NAMES = new Set([
  "FCP",
  "LCP",
  "CLS",
  "FID",
  "INP",
  "TTFB",
]);

/** Ingest Core Web Vitals when NEXT_PUBLIC_VITALS_REPORT=1 (structured server logs). */
export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_VITALS_REPORT !== "1") {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const raw = await request.text();
    if (!raw || raw.length > 4096) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }
    const data = JSON.parse(raw) as {
      name?: string;
      value?: number;
      id?: string;
      path?: string;
      rating?: string;
    };
    if (!data.name || !ALLOWED_NAMES.has(data.name)) {
      return NextResponse.json({ error: "Unknown metric." }, { status: 400 });
    }
    if (typeof data.value !== "number" || !Number.isFinite(data.value)) {
      return NextResponse.json({ error: "Invalid value." }, { status: 400 });
    }

    console.info(
      JSON.stringify({
        type: "web_vital",
        name: data.name,
        value: Math.round(data.value * 100) / 100,
        id: data.id,
        path: data.path,
        rating: data.rating,
      }),
    );

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
