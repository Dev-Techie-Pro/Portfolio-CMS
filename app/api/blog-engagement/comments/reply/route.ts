// @ts-nocheck
import { NextResponse } from "next/server";
import { submitStaffCommentReply } from "@/lib/cms/blog-engagement";
import { guardEditor } from "@/lib/auth/guard";

export async function POST(request) {
  const auth = await guardEditor();
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const parentCommentId = String(body?.parentCommentId || body?.parentId || "").trim();
    const message = String(body?.message || body?.body || "").trim();
    if (!parentCommentId) {
      return NextResponse.json(
        { error: "parentCommentId is required." },
        { status: 400 },
      );
    }

    const displayName =
      auth.profile.full_name ||
      auth.profile.username ||
      auth.user.email ||
      "Site author";
    const email = auth.profile.email || auth.user.email || null;

    const result = await submitStaffCommentReply(parentCommentId, message, {
      displayName,
      email,
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ ok: true, comment: result.comment });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
