import { NextRequest, NextResponse } from "next/server";
import { togglePublicLike } from "@/lib/cms/blog-engagement";
import { getClientIp } from "@/lib/auth/request-meta";
import { parseBlogSlug } from "@/lib/blog/slug";
import { parseVisitorKey, visitorKeyFromRequest } from "@/lib/blog/visitor";

type RouteContext = { params: Promise<{ slug: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }

  let visitorKey = visitorKeyFromRequest(request);
  if (!visitorKey) {
    try {
      const body = (await request.json()) as {
        visitor?: unknown;
        visitorKey?: unknown;
      };
      visitorKey =
        parseVisitorKey(
          typeof body.visitor === "string" ? body.visitor : null,
        ) ??
        parseVisitorKey(
          typeof body.visitorKey === "string" ? body.visitorKey : null,
        );
    } catch {
      visitorKey = null;
    }
  }
  if (!visitorKey) {
    return NextResponse.json(
      { error: "Missing or invalid visitor id." },
      { status: 400 },
    );
  }

  try {
    const result = await togglePublicLike(
      slug,
      visitorKey,
      getClientIp(request),
    );
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({
      liked: result.liked,
      likeCount: result.likeCount,
    });
  } catch (err) {
    console.error("[blog like] error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
