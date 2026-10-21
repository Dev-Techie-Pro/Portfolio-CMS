function markAppReady() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("is-ready");
}
function resetAppReady() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("is-ready");
}
export {
  markAppReady,
  resetAppReady
};
//# sourceMappingURL=app-ready.js.map
