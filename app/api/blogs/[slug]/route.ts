import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPublishedBlogBySlug } from "@/lib/blog/catalog";
import { parseBlogSlug } from "@/lib/blog/slug";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }

  try {
    const post = await fetchPublishedBlogBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json(
      { post },
      {
        headers: {
          "Cache-Control": publicJsonCacheControl(),
        },
      },
    );
  } catch (err) {
    console.error("[blogs] post error:", err);
    return NextResponse.json(
      { error: "Could not load post." },
      { status: 500 },
    );
  }
}
