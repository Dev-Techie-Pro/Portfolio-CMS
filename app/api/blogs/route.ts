import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPublishedBlogCatalog } from "@/lib/blog/catalog";

export async function GET() {
  try {
    const catalog = await fetchPublishedBlogCatalog({ includeContent: false });
    return NextResponse.json(catalog, {
      headers: {
        "Cache-Control": publicJsonCacheControl(),
      },
    });
  } catch (err) {
    console.error("[blogs] catalog error:", err);
    return NextResponse.json(
      { error: "Could not load blogs." },
      { status: 500 },
    );
  }
}
