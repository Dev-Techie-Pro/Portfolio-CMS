import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";
import { PortfolioPage } from "@/components/portfolio/PortfolioPage";
export const revalidate = 120;

export const metadata: Metadata = {
  title: "Contact — M Sohaib Ishaque",
  description: "Contact M Sohaib Ishaque — Full Stack Web Developer. Let",
};

export default function Page() {
  return (
    <PortfolioPage route="contact">
      <ContactContent />
    </PortfolioPage>
  );
}
