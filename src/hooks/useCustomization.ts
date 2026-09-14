import { useEffect, useState } from "react";

import type { Customization } from "@/types/customization";

const defaultCustomization: Customization = {
  layout: "top",
  font: "sans",
  primaryColor: "#0e374e",
  secondaryColor: "#eef1f2"
};

export function useCustomization() {
  const [customization, setCustomization] = useState<Customization>(defaultCustomization);

  const { primaryColor, secondaryColor } = customization;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", primaryColor);
    root.style.setProperty("--color-secondary", secondaryColor);
  }, [primaryColor, secondaryColor]);

  function updateCustomization(updates: Partial<Customization>) {
    setCustomization(customization => ({ ...customization, ...updates }));
  }

  return { customization, updateCustomization };
}
