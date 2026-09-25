import type { Color, Design, Font, Layout } from "@/types/design";

import "./Design.css";

type DesignProps = {
  design: Design;
  updateDesign: (updates: Partial<Design>) => void;
};

const layouts: Layout[] = ["top", "left", "right"];

const fonts: Font[] = ["sans", "serif", "mono"];

const colors: { label: string; key: Color }[] = [
  { label: "Title Background", key: "titleBackground" },
  { label: "Title Text", key: "titleText" },
  { label: "Heading Background", key: "headingBackground" },
  { label: "Heading Text", key: "headingText" },
  { label: "Divider Line", key: "dividerLine" }
];

export default function Design({ design, updateDesign }: DesignProps) {
  const { layout: currentLayout, font: currentFont } = design;

  return (
    <>
      <div className="layout">
        <h2 className="layout__title">Layout</h2>

        <div className="layout__options">
          {layouts.map(layout => (
            <button
              key={layout}
              className={getLayoutButtonClass(layout, currentLayout)}
              onClick={() => updateDesign({ layout: layout })}
            >
              <span className="layout__label">
                {layout}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="font">
        <h2 className="font__title">Font</h2>

        <div className="font__options">
          {fonts.map(font => (
            <button
              key={font}
              className={getFontButtonClass(font, currentFont)}
              onClick={() => updateDesign({ font: font })}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      <div className="color">
        <h2 className="color__title">Color</h2>

        <div className="color__options">
          {colors.map(color => (
            <div key={color.key} className="color__option">
              <span>{color.label}</span>

              <input
                type="color" className="color__input" value={design[color.key]}
                onChange={e => updateDesign({ [color.key]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function getLayoutButtonClass(layout: Layout, currentLayout: Layout): string {
  const base = "layout__button";
  const position = `layout__button--${layout}`;
  const selected = layout === currentLayout && "layout__button--selected";

  return [base, position, selected].filter(Boolean).join(" ");
}

function getFontButtonClass(font: Font, currentFont: Font): string {
  const base = "font__button";
  const variant = `font__button--${font}`;
  const selected = font === currentFont && "font__button--selected";

  return [base, variant, selected].filter(Boolean).join(" ");
}
