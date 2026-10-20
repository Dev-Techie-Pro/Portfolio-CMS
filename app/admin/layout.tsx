import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portfolio Admin',
  icons: {
    icon: [{ url: '/images/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
