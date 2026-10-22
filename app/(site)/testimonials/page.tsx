import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/pages/TestimonialsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Testimonials — M Sohaib Ishaque",
  description: "Client testimonials for M Sohaib Ishaque — Full Stack Web Developer. Kind words from amazing people.",
};

export default function Page() {
  return (
    <PortfolioPage route="testimonials">
      <TestimonialsContent />
    </PortfolioPage>
  );
}
