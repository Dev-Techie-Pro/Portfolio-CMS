// @ts-nocheck
import StaffLegacyBody from '@/components/StaffLegacyBody';
import SettingsHydration from '@/components/settings/SettingsHydration';
import { buildSettingsBodyHtml } from '../buildBodyHtml';
import { SOCIAL_PLATFORM_PICKER_HTML } from '../socialPlatformPickerHtml';
import { CHANGE_EMAIL_MODAL_HTML } from '../changeEmailModalHtml';
import { getSettingsPageMeta, resolveSettingsTab, SETTINGS_TABS } from '@/lib/settings/page-meta';

export async function generateMetadata({ params }) {
  const resolved = await params;
  const tab = resolveSettingsTab(resolved?.tab);
  const meta = getSettingsPageMeta(tab);
  return { title: `Portfolio Admin — ${meta.title}` };
}

export function generateStaticParams() {
  return SETTINGS_TABS.map((tab) => ({ tab }));
}

export default async function SettingsTabPage({ params }) {
  const resolved = await params;
  const tab = resolveSettingsTab(resolved?.tab);
  const html = buildSettingsBodyHtml(tab) + SOCIAL_PLATFORM_PICKER_HTML + CHANGE_EMAIL_MODAL_HTML;

  return (
    <>
      <SettingsHydration />
      <StaffLegacyBody
        html={html}
        includeAddUserPanel
        requireAdmin={tab === 'system'}
        settingsTab={tab}
        authBody={false}
      />
    </>
  );
}
