import type { Metadata } from "next";
import { BlogsContent } from "@/components/pages/BlogsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Blog — M Sohaib Ishaque",
  description: "Blog — M Sohaib Ishaque. Articles on web development, .NET, Angular, WordPress, and software architecture.",
};

export default function Page() {
  return (
    <PortfolioPage route="blogs">
      <BlogsContent />
    </PortfolioPage>
  );
}
