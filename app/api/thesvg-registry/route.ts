// @ts-nocheck
import { withStaffGet } from '@/lib/api/with-staff-get';
import { loadThesvgRegistry } from '@/lib/thesvg/registry';

export async function GET() {
  return withStaffGet(async () => {
    const icons = await loadThesvgRegistry();
    return { icons };
  }, { maxAgeSec: 86400 });
}
