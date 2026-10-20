import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPublishedFaqs } from "@/lib/portfolio/faqs-cms";

export async function GET() {
  try {
    const faqs = await fetchPublishedFaqs();
    return NextResponse.json(
      { faqs, source: faqs.length ? "cms" : "empty" },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/faqs] error:", err);
    return NextResponse.json({ error: "Could not load FAQs." }, { status: 500 });
  }
}
