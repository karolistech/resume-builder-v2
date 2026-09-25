import { useEffect, useState } from "react";

import type { Design } from "@/types/design";

const defaultDesign: Design = {
  layout: "top",
  font: "sans",
  titleBackground: "#0e374e",
  titleText: "#eef1f2",
  headingBackground: "#eef1f2",
  headingText: "#0e374e",
  dividerLine: "#eef1f2"
};

export function useDesign() {
  const [design, setDesign] = useState<Design>(defaultDesign);

  const { titleBackground, titleText, headingBackground, headingText, dividerLine } = design;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-title-background", titleBackground);
    root.style.setProperty("--color-title-text", titleText);
    root.style.setProperty("--color-heading-background", headingBackground);
    root.style.setProperty("--color-heading-text", headingText);
    root.style.setProperty("--color-divider-line", dividerLine);
  }, [titleBackground, titleText, headingBackground, headingText, dividerLine ]);

  function updateDesign(updates: Partial<Design>) {
    setDesign(design => ({ ...design, ...updates }));
  }

  return { design, updateDesign };
}
