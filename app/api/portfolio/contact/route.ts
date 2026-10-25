import { NextResponse } from "next/server";
import { publicJsonCacheControl } from "@/lib/api/public-cache-headers";
import { fetchPortfolioContact } from "@/lib/portfolio/contact-cms";

export async function GET() {
  try {
    const contact = await fetchPortfolioContact();
    const hasData = Boolean(
      contact.email || contact.phone || contact.whatsapp || contact.location,
    );
    return NextResponse.json(
      { contact, source: hasData ? "cms" : "empty" },
      { headers: { "Cache-Control": publicJsonCacheControl() } },
    );
  } catch (err) {
    console.error("[portfolio/contact] error:", err);
    return NextResponse.json({ error: "Could not load contact details." }, { status: 500 });
  }
}
