import { addChipsFromText, splitChipInputItems } from "./chips.js";
function bindCommaSeparatedChipInput(input, chipsEl, options = {}) {
  if (!input || !chipsEl) return null;
  const commit = () => {
    const raw = input.value;
    if (!raw.trim()) return;
    addChipsFromText(chipsEl, raw);
    input.value = "";
    options.onCommit?.();
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
      return;
    }
    if (e.key === ",") {
      e.preventDefault();
      const piece = input.value.trim();
      if (piece) {
        addChipsFromText(chipsEl, piece);
        input.value = "";
        options.onCommit?.();
      }
    }
  };
  const onPaste = (e) => {
    const pasted = e.clipboardData?.getData("text/plain") ?? "";
    if (!pasted.includes(",")) return;
    e.preventDefault();
    const combined = `${input.value}${pasted}`;
    addChipsFromText(chipsEl, combined);
    input.value = "";
    options.onCommit?.();
  };
  input.addEventListener("keydown", onKeyDown);
  input.addEventListener("paste", onPaste);
  return {
    commit,
    destroy: () => {
      input.removeEventListener("keydown", onKeyDown);
      input.removeEventListener("paste", onPaste);
    }
  };
}
export {
  bindCommaSeparatedChipInput,
  splitChipInputItems
};
//# sourceMappingURL=chipInput.js.map
