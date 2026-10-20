import type { Metadata } from "next";
import { BlogDetailsContent } from "@/components/pages/BlogDetailsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Blog — M Sohaib Ishaque",
  description: "Blog article — M Sohaib Ishaque. Full Stack Web Developer.",
};

export default function Page() {
  return (
    <PortfolioPage route="blog-details">
      <BlogDetailsContent />
    </PortfolioPage>
  );
}
