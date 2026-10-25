import { getSettings } from "@/lib/cms/repository";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import { profileFromDb } from "@/lib/auth/profile";
import { getSiteUrlFromEnv } from "@/lib/site-url";

export type PortfolioContactDetails = {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  website: string;
};

async function portfolioOwnerProfileFallback() {
  const { data } = await createAdminClient()
    .from("profiles")
    .select("*")
    .eq("site_id", SITE_ID)
    .in("role", ["super_admin", "admin"])
    .is("deleted_at", null)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return profileFromDb(data);
}

export async function fetchPortfolioContact(): Promise<PortfolioContactDetails> {
  const settings = await getSettings();
  const profile = await portfolioOwnerProfileFallback();

  const email =
    String(profile?.email || settings.email || settings.adminEmail || "").trim();
  const phone = String(profile?.phone || settings.phone || "").trim();
  const whatsapp = String(profile?.whatsapp || settings.whatsapp || "").trim();
  const location = String(profile?.location || settings.location || "").trim();
  const website = String(
    profile?.website || settings.website || settings.siteUrl || getSiteUrlFromEnv(),
  ).trim();

  return { email, phone, whatsapp, location, website };
}

export function formatTelHref(value: string): string {
  const digits = String(value || "").replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}

export function formatWhatsAppHref(value: string): string {
  const digits = String(value || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function formatMailtoHref(email: string): string {
  const trimmed = String(email || "").trim();
  return trimmed ? `mailto:${trimmed}` : "";
}
