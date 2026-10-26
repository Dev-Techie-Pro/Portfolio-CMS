// @ts-nocheck
import StaffLegacyBody from '@/components/StaffLegacyBody';
import { ICON_PICKER_PANEL_HTML } from '@/app/admin/iconPickerPanelHtml';
import { MEDIA_PICKER_PANEL_HTML } from '@/app/admin/mediaPickerPanelHtml';
import { BODY_HTML } from './bodyHtml';

export const metadata = { title: 'Portfolio Admin — Icon Manager' };

export default function Page() {
  return (
    <StaffLegacyBody
      html={BODY_HTML + ICON_PICKER_PANEL_HTML + MEDIA_PICKER_PANEL_HTML}
      includeAddUserPanel
      authBody={false}
      needsCanvasJs={false}
    />
  );
}
