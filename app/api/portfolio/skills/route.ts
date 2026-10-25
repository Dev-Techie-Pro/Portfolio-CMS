import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioSkills } from "@/lib/portfolio/skills-cms";

export async function GET() {
  try {
    const data = await fetchPortfolioSkills();
    return NextResponse.json(
      {
        ...data,
        source: data.categories.length ? "cms" : "empty",
      },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/skills] error:", err);
    return NextResponse.json({ error: "Could not load skills." }, { status: 500 });
  }
}
