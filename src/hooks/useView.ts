import { useEffect, useState } from "react";

import type { View } from "@/types/view";

export function useView() {
  const [view, setView] = useState<View>("content");

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");

    function syncView(e: MediaQueryListEvent) {
      if (e.matches) {
        setView(view => view === "preview" ? "content" : view);
      }
    }

    mql.addEventListener("change", syncView);

    return () => mql.removeEventListener("change", syncView);
  }, []);

  return { view, setView };
}
