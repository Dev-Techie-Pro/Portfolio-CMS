import { NextRequest, NextResponse } from "next/server";
import { submitPublicComment } from "@/lib/cms/blog-engagement";
import { getClientIp } from "@/lib/auth/request-meta";
import { parseBlogSlug } from "@/lib/blog/slug";

type CommentPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  parentId?: unknown;
  parentCommentId?: unknown;
};

type RouteContext = { params: Promise<{ slug: string }> };

function asTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }

  let body: CommentPayload;
  try {
    body = (await request.json()) as CommentPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = asTrimmed(body.name);
  const email = asTrimmed(body.email);
  const message = asTrimmed(body.message);
  const parentRaw = body.parentId ?? body.parentCommentId;
  const parentCommentId =
    typeof parentRaw === "string" && parentRaw.trim() ? parentRaw.trim() : null;

  try {
    const result = await submitPublicComment(
      slug,
      {
        authorName: name,
        authorEmail: email || undefined,
        body: message,
        parentCommentId,
      },
      getClientIp(request),
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json({
      ok: true,
      pending: result.pending,
      comment: result.comment
        ? {
            id: result.comment.id,
            author_name: result.comment.authorName,
            body: result.comment.body,
            created_at: result.comment.createdAt,
            status: result.comment.status,
            parent_id: result.comment.parentCommentId,
          }
        : null,
    });
  } catch (err) {
    console.error("[blog comments] error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
