import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioSocial } from "@/lib/portfolio/social-cms";

export async function GET() {
  try {
    const variants = await fetchPortfolioSocial();
    const hasLinks = Object.values(variants).some((list) => list.length > 0);
    return NextResponse.json(
      {
        variants,
        source: hasLinks ? "cms" : "empty",
      },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/social] error:", err);
    return NextResponse.json({ error: "Could not load social links." }, { status: 500 });
  }
}
