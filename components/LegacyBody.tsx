'use client';

import dynamic from 'next/dynamic';
import LegacyHtml from './LegacyHtml';

/** Admin-only legacy runtime — kept out of the public Next.js graph. */
const LegacyBoot = dynamic(() => import('./LegacyBoot'), { ssr: false });

/**
 * LegacyBody — renders one page's original body markup on the server, then
 * boots the vanilla module system via LegacyBoot (client-only).
 */

type LegacyBodyProps = {
  html: string;
  authBody?: boolean;
  standaloneBody?: boolean;
  needsCanvasJs?: boolean;
};

export default function LegacyBody({
  html,
  authBody = false,
  standaloneBody = false,
  needsCanvasJs = false,
}: LegacyBodyProps) {
  return (
    <>
      <LegacyHtml html={html} />
      <LegacyBoot authBody={authBody} standaloneBody={standaloneBody} needsCanvasJs={needsCanvasJs} />
    </>
  );
}
