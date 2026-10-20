import type { Metadata } from "next";
import { ExperienceContent } from "@/components/pages/ExperienceContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Experience — M Sohaib Ishaque",
  description: "M Sohaib Ishaque — Experience. Full Stack Web Developer with 3+ years building Angular, .NET Core, and WordPress applications.",
};

export default function Page() {
  return (
    <PortfolioPage route="experience">
      <ExperienceContent />
    </PortfolioPage>
  );
}
