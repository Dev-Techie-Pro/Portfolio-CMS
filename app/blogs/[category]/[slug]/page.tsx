import type { Metadata } from "next";
import { BlogDetailsContent } from "@/components/pages/BlogDetailsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
import { fetchPublishedBlogBySlug } from "@/lib/blog/catalog";
import { parseBlogSlug } from "@/lib/blog/slug";
export const revalidate = 120;

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = parseBlogSlug(rawSlug);
  if (!slug) {
    return {
      title: "Blog — M Sohaib Ishaque",
      description: "Blog article — M Sohaib Ishaque. Full Stack Web Developer.",
    };
  }
  const post = await fetchPublishedBlogBySlug(slug);
  if (!post) {
    return {
      title: "Blog — M Sohaib Ishaque",
      description: "Blog article — M Sohaib Ishaque. Full Stack Web Developer.",
    };
  }
  return {
    title: `${post.title} — M Sohaib Ishaque`,
    description: post.excerpt || undefined,
  };
}

export default function Page() {
  return (
    <PortfolioPage route="blog-details">
      <BlogDetailsContent />
    </PortfolioPage>
  );
}
