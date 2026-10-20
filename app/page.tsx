import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "M Sohaib Ishaque — Full Stack Web Developer",
  description: "M Sohaib Ishaque — Full Stack Web Developer. Angular, .NET Core, React, Node.js, TypeScript. Building digital experiences from Rawalpindi, Pakistan.",
};

export default function Page() {
  return (
    <PortfolioPage route="home">
      <HomeContent />
    </PortfolioPage>
  );
}
