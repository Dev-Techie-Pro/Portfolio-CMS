export type ProfileSocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "discord"
  | "website"
  | "email"
  | "custom"
  | "auto";

export type ProfileSocialLinkRecord = {
  url: string;
  platform: ProfileSocialPlatform;
  iconClass?: string;
};

export const PROFILE_SOCIAL_PLATFORM_OPTIONS: {
  id: ProfileSocialPlatform;
  label: string;
  iconClass: string;
}[] = [
  { id: "github", label: "GitHub", iconClass: "ri-github-fill" },
  { id: "linkedin", label: "LinkedIn", iconClass: "ri-linkedin-fill" },
  { id: "x", label: "X (Twitter)", iconClass: "ri-twitter-x-fill" },
  { id: "instagram", label: "Instagram", iconClass: "ri-instagram-fill" },
  { id: "facebook", label: "Facebook", iconClass: "ri-facebook-fill" },
  { id: "youtube", label: "YouTube", iconClass: "ri-youtube-fill" },
  { id: "tiktok", label: "TikTok", iconClass: "ri-tiktok-fill" },
  { id: "discord", label: "Discord", iconClass: "ri-discord-fill" },
  { id: "website", label: "Website", iconClass: "ri-global-line" },
  { id: "email", label: "Email", iconClass: "ri-mail-line" },
  { id: "custom", label: "Other icon…", iconClass: "ri-link" },
];

export function detectSocialPlatformFromUrl(href: string): ProfileSocialPlatform {
  const lower = String(href || "").trim().toLowerCase();
  if (!lower) return "auto";
  if (lower.startsWith("mailto:")) return "email";
  if (lower.includes("github.com")) return "github";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "x";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("facebook.com") || lower.includes("fb.com")) return "facebook";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("discord.gg") || lower.includes("discord.com")) return "discord";
  return "website";
}

export function parseProfileSocialLink(raw: unknown): ProfileSocialLinkRecord | null {
  if (raw == null) return null;
  if (typeof raw === "string") {
    const url = raw.trim();
    if (!url) return null;
    return { url, platform: detectSocialPlatformFromUrl(url) };
  }
  if (typeof raw === "object") {
    const row = raw as { url?: string; href?: string; platform?: string; iconClass?: string };
    const url = String(row.url || row.href || "").trim();
    if (!url) return null;
    const platform = (row.platform as ProfileSocialPlatform) || detectSocialPlatformFromUrl(url);
    const iconClass = row.iconClass ? String(row.iconClass).trim() : "";
    return {
      url,
      platform,
      ...(iconClass ? { iconClass } : {}),
    };
  }
  return null;
}

export function serializeProfileSocialLink(record: ProfileSocialLinkRecord): ProfileSocialLinkRecord {
  const url = String(record.url || "").trim();
  const platform = record.platform || detectSocialPlatformFromUrl(url);
  const iconClass = record.iconClass ? String(record.iconClass).trim() : "";
  if (platform === "custom" && iconClass) {
    return { url, platform, iconClass };
  }
  if (platform && platform !== "auto" && platform !== detectSocialPlatformFromUrl(url)) {
    return { url, platform };
  }
  return { url, platform: detectSocialPlatformFromUrl(url) };
}

export function socialLinkIconClass(
  platform: ProfileSocialPlatform,
  iconClass?: string,
): string {
  if (platform === "custom" && iconClass) return iconClass;
  const match = PROFILE_SOCIAL_PLATFORM_OPTIONS.find((p) => p.id === platform);
  if (match) return match.iconClass;
  return "ri-link";
}

export function socialLinkStorageKey(raw: unknown): string {
  const parsed = parseProfileSocialLink(raw);
  if (!parsed) return "";
  return `${parsed.platform}:${parsed.url.toLowerCase()}`;
}
