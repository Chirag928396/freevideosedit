"use client";

import { useEffect } from "react";

export default function ScrollToTool() {
  useEffect(() => {
    const el = document.getElementById("tool");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return null;
}
