export type Layout = "top" | "left" | "right";

export type Font = "sans" | "serif" | "mono";

export type Color = "titleBackground" | "titleText" | "headingBackground" | "headingText" | "dividerLine";

export type Design = {
  layout: Layout;
  font: Font;
  titleBackground: string;
  titleText: string;
  headingBackground: string;
  headingText: string;
  dividerLine: string;
};
