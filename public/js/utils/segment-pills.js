function stripAdminSegmentPills(root = document) {
  root.querySelectorAll(".pa-view-toggle .seg__pill").forEach((el) => el.remove());
  root.querySelectorAll(".pa-view-toggle.seg").forEach((track) => {
    track.classList.remove("seg");
    track.removeAttribute("data-pa-seg-pill-bound");
    track.querySelectorAll(".pa-view-btn").forEach((btn) => {
      btn.style.removeProperty("clip-path");
    });
  });
}
export {
  stripAdminSegmentPills
};
