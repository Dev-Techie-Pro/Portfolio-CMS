import { NextResponse } from "next/server";
import { guardEditor, isGuardFailure } from "@/lib/auth/guard";
import { parseBlogSlug } from "@/lib/blog/slug";
import { updateBlogHiddenSectionsBySlug } from "@/lib/cms/blog-section-visibility";
import { z } from "zod";

type RouteContext = { params: Promise<{ slug: string }> };

const patchSchema = z.object({
  hiddenSections: z.array(z.string().max(120)).max(64),
});

export async function GET(_request: Request, context: RouteContext) {
  const auth = await guardEditor();
  const canEdit = !isGuardFailure(auth);
  return NextResponse.json({ canEdit });
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await guardEditor();
  if (isGuardFailure(auth)) return auth.response;

  const { slug: rawSlug } = await context.params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }
    const result = await updateBlogHiddenSectionsBySlug(
      slug,
      parsed.data.hiddenSections,
    );
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("[blogs] section-visibility PATCH:", err);
    return NextResponse.json(
      { error: "Could not update sections." },
      { status: 500 },
    );
  }
}
