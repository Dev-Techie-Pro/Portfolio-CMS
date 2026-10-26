// @ts-nocheck
import { NextResponse } from "next/server";
import { guardEditor } from "@/lib/auth/guard";
import {
  buildIconRegistryManifest,
  normalizeIconRegistryState,
} from "@/lib/cms/icon-registry-store";
import {
  getIconRegistryState,
  saveIconRegistryState,
} from "@/lib/cms/repository";

export async function GET() {
  const auth = await guardEditor();
  if (!auth.ok) return auth.response;
  try {
    const state = await getIconRegistryState();
    const manifest = buildIconRegistryManifest(state);
    return NextResponse.json(manifest);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load icon registry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await guardEditor();
  if (!auth.ok) return auth.response;
  try {
    const body = await request.json();
    const state = normalizeIconRegistryState(body?.state || body);
    await saveIconRegistryState(state);
    const manifest = buildIconRegistryManifest(state);
    return NextResponse.json({ ok: true, ...manifest });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save icon registry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
