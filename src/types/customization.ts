export type Layout = "top" | "left" | "right";

export type Font = "sans" | "serif" | "mono";

export type Customization = {
  layout: Layout;
  font: Font;
  primaryColor: string;
  secondaryColor: string;
};
