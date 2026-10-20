import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_ID } from "@/lib/cms/constants";

export type PortfolioFaqItem = {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
};

export async function fetchPublishedFaqs(): Promise<PortfolioFaqItem[]> {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("faq_entries")
    .select("legacy_id, question, answer, sort_order")
    .eq("site_id", SITE_ID)
    .is("deleted_at", null)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data || []).map((row, index) => ({
    id: typeof row.legacy_id === "number" ? row.legacy_id : index + 1,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order ?? 0,
  }));
}
