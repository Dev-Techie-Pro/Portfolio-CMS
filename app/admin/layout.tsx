import './globals.css';
import { AdminDocumentScope } from '@/components/admin/AdminDocumentScope';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portfolio Admin',
  icons: {
    icon: [{ url: '/images/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Self-hosted Remix Icon — reliable with CSP font-src 'self' (dev + prod). */}
      <link rel="stylesheet" href="/vendor/remixicon/remixicon.css" precedence="high" />
      <AdminDocumentScope />
      {children}
    </>
  );
}
