import { useEffect, useState } from "react";

import type { Customization } from "@/types/customization";

const defaultCustomization: Customization = {
  layout: "top",
  font: "sans",
  titleBackground: "#0e374e",
  titleText: "#eef1f2",
  headingBackground: "#eef1f2",
  headingText: "#0e374e"
};

export function useCustomization() {
  const [customization, setCustomization] = useState<Customization>(defaultCustomization);

  const { titleBackground, titleText, headingBackground, headingText } = customization;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-title-background", titleBackground);
    root.style.setProperty("--color-title-text", titleText);
    root.style.setProperty("--color-heading-background", headingBackground);
    root.style.setProperty("--color-heading-text", headingText);

  }, [titleBackground, titleText, headingBackground, headingText]);

  function updateCustomization(updates: Partial<Customization>) {
    setCustomization(customization => ({ ...customization, ...updates }));
  }

  return { customization, updateCustomization };
}
