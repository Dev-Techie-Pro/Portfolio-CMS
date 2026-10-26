import { getSettings, saveSettings } from "@/lib/cms/repository";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";
import { profileFromDb } from "@/lib/auth/profile";
import {
  detectSocialPlatformFromUrl,
  parseProfileSocialLink,
  type ProfileSocialPlatform,
} from "@/lib/profile/social-link-form";

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "website"
  | "email"
  | "other";

export type PortfolioSocialLink = {
  platform: SocialPlatform;
  href: string;
  label: string;
  icon: string;
  external: boolean;
};

export type PortfolioSocialVariant = "hero" | "contact" | "footer" | "author";

const PLATFORM_META: Record<
  SocialPlatform,
  { label: string; icon: string; external: boolean }
> = {
  github: { label: "GitHub", icon: "ri-github-fill", external: true },
  linkedin: { label: "LinkedIn", icon: "ri-linkedin-fill", external: true },
  x: { label: "Twitter / X", icon: "ri-twitter-x-fill", external: true },
  instagram: { label: "Instagram", icon: "ri-instagram-line", external: true },
  facebook: { label: "Facebook", icon: "ri-facebook-fill", external: true },
  youtube: { label: "YouTube", icon: "siGlobe", external: true },
  tiktok: { label: "TikTok", icon: "siGlobe", external: true },
  website: { label: "Website", icon: "siGlobe", external: true },
  email: { label: "Email", icon: "ri-mail-line", external: false },
  other: { label: "Link", icon: "siGlobe", external: true },
};

function normalizeHref(raw: string): string {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("mailto:")) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function detectPlatform(href: string): SocialPlatform {
  const detected = detectSocialPlatformFromUrl(href);
  if (detected === "auto" || detected === "custom" || detected === "discord") return "other";
  return detected as SocialPlatform;
}

function mapStoredPlatform(platform: ProfileSocialPlatform): SocialPlatform {
  if (platform === "discord" || platform === "custom" || platform === "auto") return "other";
  return platform as SocialPlatform;
}

function entryFromHref(href: string, platformOverride?: SocialPlatform): PortfolioSocialLink | null {
  const normalized = normalizeHref(href);
  if (!normalized) return null;
  const platform = platformOverride || detectPlatform(normalized);
  const meta = PLATFORM_META[platform] || PLATFORM_META.other;
  return {
    platform,
    href: normalized,
    label: meta.label,
    icon: meta.icon,
    external: meta.external,
  };
}

function dedupeEntries(entries: PortfolioSocialLink[]): PortfolioSocialLink[] {
  const seen = new Set<string>();
  const out: PortfolioSocialLink[] = [];
  for (const entry of entries) {
    const key = `${entry.platform}:${entry.href.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
}

function isUsableSocialUrl(url: string): boolean {
  const trimmed = String(url || "").trim();
  if (!trimmed || trimmed === "[object Object]") return false;
  return true;
}

function normalizeStoredSocialLinks(raw: unknown): unknown[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item) => {
    const parsed = parseProfileSocialLink(item);
    return Boolean(parsed?.url && isUsableSocialUrl(parsed.url));
  });
}

function buildAllEntries(socialLinks: unknown[]): PortfolioSocialLink[] {
  const entries: PortfolioSocialLink[] = [];

  for (const raw of socialLinks) {
    const stored = parseProfileSocialLink(raw);
    const href = stored?.url || (typeof raw === "string" ? raw : "");
    const platformOverride = stored?.platform ? mapStoredPlatform(stored.platform) : undefined;
    const entry = entryFromHref(href, platformOverride);
    if (entry) entries.push(entry);
  }

  return dedupeEntries(entries);
}

function pickVariant(entries: PortfolioSocialLink[], variant: PortfolioSocialVariant): PortfolioSocialLink[] {
  if (variant === "hero") {
    return entries.filter((e) => e.platform !== "email" && e.platform !== "website");
  }
  if (variant === "author") {
    return entries.filter((e) => e.platform !== "instagram" && e.platform !== "facebook");
  }
  return entries;
}

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

async function resolveSocialSources() {
  const settings = await getSettings();
  let socialLinks = normalizeStoredSocialLinks(settings.socialLinks);
  let website = String(settings.website || settings.siteUrl || "").trim();
  let email = String(settings.email || settings.adminEmail || "").trim();

  const profile = await portfolioOwnerProfileFallback();
  if (profile) {
    const profileLinks = normalizeStoredSocialLinks(profile.socialLinks);
    // Profile tab is the source of truth for Social Links in the admin UI.
    if (profileLinks.length) {
      socialLinks = profileLinks;
    }
    if (!website) website = String(profile.website || "").trim();
    if (!email) email = String(profile.email || "").trim();
  }

  return { socialLinks, website, email };
}

export async function fetchPortfolioSocial() {
  const sources = await resolveSocialSources();
  const all = buildAllEntries(sources.socialLinks);

  return {
    hero: pickVariant(all, "hero"),
    contact: pickVariant(all, "contact"),
    footer: pickVariant(all, "footer"),
    author: pickVariant(all, "author"),
  };
}

/** Keep public site_settings profile fields aligned with Settings → Profile saves. */
export async function syncPortfolioProfileToSiteSettings(profile: {
  fullName?: string | null;
  username?: string | null;
  role?: string | null;
  phone?: string | null;
  dob?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  socialLinks?: unknown[] | null;
}) {
  const patch: Record<string, unknown> = {};
  if (profile.fullName !== undefined) patch.fullName = profile.fullName;
  if (profile.username !== undefined) patch.username = profile.username;
  if (profile.role !== undefined) patch.role = profile.role;
  if (profile.phone !== undefined) patch.phone = profile.phone;
  if (profile.dob !== undefined) patch.dob = profile.dob;
  if (profile.bio !== undefined) patch.bio = profile.bio;
  if (profile.location !== undefined) patch.location = profile.location;
  if (profile.website !== undefined) {
    patch.website = profile.website;
    patch.siteUrl = profile.website;
  }
  if (profile.whatsapp !== undefined) patch.whatsapp = profile.whatsapp;
  if (profile.email !== undefined) patch.adminEmail = profile.email;
  if (profile.socialLinks !== undefined) {
    patch.socialLinks = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];
  }
  if (!Object.keys(patch).length) return;
  await saveSettings(patch);
}
