"use client";

import { useEffect } from "react";

/** Marks the document so public portfolio CSS (if ever linked) cannot target admin chrome. */
export function AdminDocumentScope() {
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.paApp = "admin";
    return () => {
      delete html.dataset.paApp;
    };
  }, []);
  return null;
}
