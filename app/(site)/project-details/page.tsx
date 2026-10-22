import type { Metadata } from "next";
import { ProjectDetailsContent } from "@/components/pages/ProjectDetailsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "",
  description: "Al Tahaluf Enterprise Admin Platform — M Sohaib Ishaque. Full Stack Web Developer. Case study of a robust enterprise platform built with Angular and .NET Core.",
};

export default function Page() {
  return (
    <PortfolioPage route="project-details">
      <ProjectDetailsContent />
    </PortfolioPage>
  );
}
