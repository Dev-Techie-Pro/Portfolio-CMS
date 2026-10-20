import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioProjectsMap } from "@/lib/portfolio/projects-cms";

export async function GET() {
  try {
    const projects = await fetchPortfolioProjectsMap();
    if (Object.keys(projects).length === 0) {
      return NextResponse.json({ projects: null, source: "static-fallback" });
    }
    return NextResponse.json(
      { projects, source: "cms" },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[portfolio/projects] error:", err);
    return NextResponse.json(
      { projects: null, source: "error" },
      { status: 500 },
    );
  }
}
