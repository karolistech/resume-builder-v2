import type { Customization, Font, Layout } from "@/types/customization";

import "./Customize.css";

type CustomizeProps = {
  customization: Customization;
  updateCustomization: (updates: Partial<Customization>) => void;
};

const layouts: Layout[] = ["top", "left", "right"];
const fonts: Font[] = ["serif", "sans", "mono"];

export default function Customize({ customization, updateCustomization }: CustomizeProps) {
  const { layout, titleBackground, titleText, headingBackground, headingText, font } = customization;

  return (
    <>
      <div className="layout">
        <h2 className="layout__title">Layout</h2>

        <div className="layout__options">
          {layouts.map(l => (
            <button
              key={l}
              className={getLayoutButtonClass(l, layout)}
              onClick={() => updateCustomization({ layout: l})}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="color">
        <h2 className="color__title">Color</h2>

        <div className="color__options">
          <div className="color__options--primary">
            <span>Title Background</span>

            <input
              type="color"
              className="color__input"
              value={titleBackground}
              onChange={e => updateCustomization({ titleBackground: e.target.value })}
            />
          </div>

          <div className="color__options--secondary">
            <span>Title Text</span>

            <input
              type="color"
              className="color__input"
              value={titleText}
              onChange={e => updateCustomization({ titleText: e.target.value })}
            />
          </div>

          <div className="color__options--secondary">
            <span>Heading Background</span>

            <input
              type="color"
              className="color__input"
              value={headingBackground}
              onChange={e => updateCustomization({ headingBackground: e.target.value })}
            />
          </div>

          <div className="color__options--secondary">
            <span>Heading Text</span>

            <input
              type="color"
              className="color__input"
              value={headingText}
              onChange={e => updateCustomization({ headingText: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="font">
        <h2 className="font__title">Font</h2>

        <div className="font__options">
          {fonts.map(f => (
            <button
              key={f}
              className={getFontButtonClass(f, font)}
              onClick={() => updateCustomization({ font: f })}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function getLayoutButtonClass(layout: Layout, selectedLayout: Layout): string {
  const base = "layout__btn";
  const position = `layout__btn--${layout}`;
  const selected = layout === selectedLayout && "layout__btn--selected";

  return [base, position, selected].filter(Boolean).join(" ");
}

function getFontButtonClass(font: Font, selectedFont: Font): string {
  const base = "font__btn";
  const variant = `font__btn--${font}`;
  const selected = font === selectedFont && "font__btn--selected";

  return [base, variant, selected].filter(Boolean).join(" ");
}
