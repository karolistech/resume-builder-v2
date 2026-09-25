import { useEffect, useState } from "react";

import type { View } from "@/types/view";

export function useView() {
  const [view, setView] = useState<View>("editor");

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setView(view => view === "resume" ? "editor" : view);
      }
    };

    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return { view, setView };
}
