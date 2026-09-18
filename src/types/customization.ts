export type Layout = "top" | "left" | "right";

export type Font = "sans" | "serif" | "mono";

export type Customization = {
  layout: Layout;
  font: Font;
  titleBackground: string;
  titleText: string;
  headingBackground: string;
  headingText: string;
};
