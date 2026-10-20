import type { Metadata } from "next";
import { ProjectsContent } from "@/components/pages/ProjectsContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Projects — M Sohaib Ishaque",
  description: "Projects — M Sohaib Ishaque. Full Stack Web Developer portfolio showcasing Angular, .NET Core, React, Node.js and WordPress projects.",
};

export default function Page() {
  return (
    <PortfolioPage route="projects">
      <ProjectsContent />
    </PortfolioPage>
  );
}
