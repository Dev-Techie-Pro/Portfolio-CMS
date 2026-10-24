import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioExperience } from "@/lib/portfolio/experience-cms";

export async function GET() {
  try {
    const experience = await fetchPortfolioExperience();
    return NextResponse.json(
      { experience, source: experience.length ? "cms" : "empty" },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/experience] error:", err);
    return NextResponse.json({ error: "Could not load experience." }, { status: 500 });
  }
}
