import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "About — M Sohaib Ishaque",
  description: "About M Sohaib Ishaque — Full Stack Web Developer. My journey, values, education and certifications.",
};

export default function Page() {
  return (
    <PortfolioPage route="about">
      <AboutContent />
    </PortfolioPage>
  );
}
