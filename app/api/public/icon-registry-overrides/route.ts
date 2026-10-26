// @ts-nocheck
import { NextResponse } from "next/server";
import { normalizeIconRegistryState } from "@/lib/cms/icon-registry-store";
import { getIconRegistryState } from "@/lib/cms/repository";

export async function GET() {
  try {
    const state = normalizeIconRegistryState(await getIconRegistryState());
    return NextResponse.json(
      {
        overrides: state.overrides,
        removed: state.removed,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return NextResponse.json({ overrides: {}, removed: [] });
  }
}
