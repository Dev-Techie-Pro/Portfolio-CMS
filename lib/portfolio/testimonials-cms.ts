import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";

export type PortfolioTestimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  createdAt: string;
};

export async function fetchPortfolioTestimonials(): Promise<PortfolioTestimonial[]> {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("testimonials")
    .select(
      "legacy_id, client_name, client_role, company, quote, rating, avatar_url, avatar_alt, is_featured, created_at",
    )
    .eq("site_id", SITE_ID)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((row, index) => ({
    id: typeof row.legacy_id === "number" ? row.legacy_id : index + 1,
    name: row.client_name,
    role: row.client_role || "",
    company: row.company || "",
    quote: row.quote,
    rating: row.rating ?? 5,
    imageUrl: row.avatar_url || "",
    imageAlt: row.avatar_alt || "",
    featured: !!row.is_featured,
    createdAt: row.created_at,
  }));
}
