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
  github: { label: "GitHub", icon: "siGithub", external: true },
  linkedin: { label: "LinkedIn", icon: "siLinkedin", external: true },
  x: { label: "Twitter / X", icon: "siXcom", external: true },
  instagram: { label: "Instagram", icon: "siInstagram", external: true },
  facebook: { label: "Facebook", icon: "siFacebook", external: true },
  youtube: { label: "YouTube", icon: "siGlobe", external: true },
  tiktok: { label: "TikTok", icon: "siGlobe", external: true },
  website: { label: "Website", icon: "siGlobe", external: true },
  email: { label: "Email", icon: "siEnvelope", external: false },
  other: { label: "Link", icon: "siGlobe", external: true },
};

const VARIANT_PLATFORMS: Record<PortfolioSocialVariant, SocialPlatform[]> = {
  hero: ["github", "linkedin", "x", "instagram", "facebook", "youtube", "tiktok", "other"],
  contact: ["github", "linkedin", "website", "email"],
  footer: ["github", "linkedin", "website", "email"],
  author: ["github", "linkedin", "x", "email"],
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

function buildAllEntries(sources: {
  socialLinks: string[];
  website: string;
  email: string;
}): PortfolioSocialLink[] {
  const entries: PortfolioSocialLink[] = [];

  for (const raw of sources.socialLinks) {
    const stored = parseProfileSocialLink(raw);
    const href = stored?.url || (typeof raw === "string" ? raw : "");
    const platformOverride = stored?.platform ? mapStoredPlatform(stored.platform) : undefined;
    const entry = entryFromHref(href, platformOverride);
    if (entry) entries.push(entry);
  }

  const websiteHref = normalizeHref(sources.website);
  if (websiteHref && !websiteHref.startsWith("mailto:")) {
    const hasWebsite = entries.some(
      (e) => e.platform === "website" || e.href.toLowerCase() === websiteHref.toLowerCase(),
    );
    if (!hasWebsite) {
      const websiteEntry = entryFromHref(websiteHref, "website");
      if (websiteEntry) entries.push(websiteEntry);
    }
  }

  const emailRaw = String(sources.email || "").trim();
  if (emailRaw) {
    const mailHref = emailRaw.startsWith("mailto:") ? emailRaw : `mailto:${emailRaw}`;
    const hasEmail = entries.some((e) => e.platform === "email");
    if (!hasEmail) {
      const emailEntry = entryFromHref(mailHref, "email");
      if (emailEntry) entries.push(emailEntry);
    }
  }

  return dedupeEntries(entries);
}

function pickVariant(entries: PortfolioSocialLink[], variant: PortfolioSocialVariant): PortfolioSocialLink[] {
  const order = VARIANT_PLATFORMS[variant] || VARIANT_PLATFORMS.footer;
  const byPlatform = new Map<SocialPlatform, PortfolioSocialLink>();
  for (const entry of entries) {
    if (!byPlatform.has(entry.platform)) byPlatform.set(entry.platform, entry);
  }

  const picked: PortfolioSocialLink[] = [];
  for (const platform of order) {
    const entry = byPlatform.get(platform);
    if (entry) picked.push(entry);
  }

  if (variant === "hero") {
    for (const entry of entries) {
      if (entry.platform === "email" || entry.platform === "website") continue;
      if (picked.some((p) => p.href === entry.href)) continue;
      if (!order.includes(entry.platform)) picked.push(entry);
    }
  }

  return picked;
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

export async function fetchPortfolioSocial() {
  const settings = await getSettings();
  let socialLinks = Array.isArray(settings.socialLinks)
    ? settings.socialLinks.map((u) => String(u || "").trim()).filter(Boolean)
    : [];
  let website = String(settings.website || settings.siteUrl || "").trim();
  let email = String(settings.email || settings.adminEmail || "").trim();

  if (!socialLinks.length && !website && !email) {
    const profile = await portfolioOwnerProfileFallback();
    if (profile) {
      socialLinks = Array.isArray(profile.socialLinks)
        ? profile.socialLinks.map((u: string) => String(u || "").trim()).filter(Boolean)
        : [];
      website = String(profile.website || "").trim();
      email = String(profile.email || "").trim();
    }
  }

  const sources = {
    socialLinks,
    website,
    email,
  };

  const all = buildAllEntries(sources);

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
  email?: string | null;
  socialLinks?: string[] | null;
}) {
  const patch: Record<string, unknown> = {};
  if (profile.fullName !== undefined) patch.fullName = profile.fullName;
  if (profile.username !== undefined) patch.username = profile.username;
  if (profile.role !== undefined) patch.role = profile.role;
  if (profile.phone !== undefined) patch.phone = profile.phone;
  if (profile.dob !== undefined) patch.dob = profile.dob;
  if (profile.bio !== undefined) patch.bio = profile.bio;
  if (profile.location !== undefined) patch.location = profile.location;
  if (profile.website !== undefined) patch.website = profile.website;
  if (profile.email !== undefined) patch.adminEmail = profile.email;
  if (profile.socialLinks !== undefined) {
    patch.socialLinks = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];
  }
  if (!Object.keys(patch).length) return;
  await saveSettings(patch);
}
