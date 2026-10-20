import { NextRequest, NextResponse } from "next/server";
import { getPublicEngagementBySlug } from "@/lib/cms/blog-engagement";
import { parseBlogSlug } from "@/lib/blog/slug";
import { parseVisitorKey } from "@/lib/blog/visitor";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }

  const visitorKey =
    parseVisitorKey(request.nextUrl.searchParams.get("visitor")) ??
    parseVisitorKey(request.nextUrl.searchParams.get("visitorKey")) ??
    parseVisitorKey(request.headers.get("x-blog-visitor"));

  try {
    const data = await getPublicEngagementBySlug(slug, visitorKey ?? undefined);
    if (!data) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({
      postSlug: slug,
      likesEnabled: data.likesEnabled,
      commentsEnabled: data.commentsEnabled,
      likeCount: data.likeCount,
      liked: data.liked,
      comments: (data.comments || []).map((c) => ({
        id: c.id,
        author_name: c.authorName,
        body: c.body,
        created_at: c.createdAt,
      })),
    });
  } catch (err) {
    console.error("[blog engagement] GET error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
