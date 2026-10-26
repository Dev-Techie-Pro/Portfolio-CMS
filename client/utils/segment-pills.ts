// @ts-nocheck
/** Remove legacy GSAP segment pills from admin view toggles (use native .pa-view-btn.active styles). */
export function stripAdminSegmentPills(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('.pa-view-toggle .seg__pill').forEach((el) => el.remove());
  root.querySelectorAll<HTMLElement>('.pa-view-toggle.seg').forEach((track) => {
    track.classList.remove('seg');
    track.removeAttribute('data-pa-seg-pill-bound');
    track.querySelectorAll<HTMLElement>('.pa-view-btn').forEach((btn) => {
      btn.style.removeProperty('clip-path');
    });
  });
}
