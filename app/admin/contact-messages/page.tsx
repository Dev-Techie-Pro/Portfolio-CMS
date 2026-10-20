// @ts-nocheck
import StaffLegacyBody from '@/components/StaffLegacyBody';
import { MEDIA_PICKER_PANEL_HTML } from '@/app/admin/mediaPickerPanelHtml';
import { BODY_HTML } from './bodyHtml';

export const metadata = { title: 'Portfolio Admin — Contact Messages' };

export default function Page() {
  return (
    <StaffLegacyBody
      html={BODY_HTML + MEDIA_PICKER_PANEL_HTML}
      includeAddUserPanel
      authBody={false}
      needsCanvasJs={false}
    />
  );
}
