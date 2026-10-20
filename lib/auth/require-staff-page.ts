// @ts-nocheck
import { redirect } from 'next/navigation';
import { adminPath } from '@/lib/admin-paths';
import { guardStaff } from '@/lib/auth/guard';
import type { AccessCapabilities } from '@/lib/auth/capabilities';
import { getRequestStaffAccess } from '@/lib/auth/request-cache';

export type StaffPageContext = {
  userId: string;
  role: string;
  capabilities: AccessCapabilities;
};

/** Staff dashboard pages: resolve role from DB and redirect unauthenticated users. */
export async function requireStaffPageContext(): Promise<StaffPageContext> {
  const auth = await guardStaff();
  if (!auth.ok) {
    redirect(adminPath('/login'));
  }

  const role = auth.profile.role;
  const access = await getRequestStaffAccess(auth.user.id);
  return {
    userId: auth.user.id,
    role,
    capabilities: access.capabilities,
  };
}
