import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioTestimonials } from "@/lib/portfolio/testimonials-cms";

export async function GET() {
  try {
    const testimonials = await fetchPortfolioTestimonials();
    return NextResponse.json(
      { testimonials, source: testimonials.length ? "cms" : "empty" },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/testimonials] error:", err);
    return NextResponse.json({ error: "Could not load testimonials." }, { status: 500 });
  }
}
