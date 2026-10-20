import type { Metadata } from "next";
import { SkillsContent } from "@/components/pages/SkillsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Skills — M Sohaib Ishaque",
  description: "Skills — M Sohaib Ishaque. Technologies I work with to build scalable, performant and user-friendly web applications.",
};

export default function Page() {
  return (
    <PortfolioPage route="skills">
      <SkillsContent />
    </PortfolioPage>
  );
}
