import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioHighlights } from "@/lib/portfolio/highlights-cms";

export async function GET() {
  try {
    const highlights = await fetchPortfolioHighlights(5);
    return NextResponse.json(
      { highlights, source: highlights.length ? "cms" : "empty" },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/highlights] error:", err);
    return NextResponse.json({ error: "Could not load portfolio highlights." }, { status: 500 });
  }
}
