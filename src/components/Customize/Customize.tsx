import type { Customization } from "@/types/customization";

import "./Customize.css";

type CustomizeProps = {
  customization: Customization;
  updateCustomization: (updates: Partial<Customization>) => void;
};

export default function Customize({ customization, updateCustomization }: CustomizeProps) {
  const { primaryColor, secondaryColor } = customization;

  return (
    <>
      <div className="layout">
        <h2 className="layout__title">Layout</h2>

        <div className="layout__options">
          <button className="layout__btn layout__btn--top" onClick={() => updateCustomization({ layout: "top" })}>
            Top
          </button>

          <button className="layout__btn layout__btn--left" onClick={() => updateCustomization({ layout: "left" })}>
            Left
          </button>

          <button className="layout__btn layout__btn--right" onClick={() => updateCustomization({ layout: "right"})}>
            Right
          </button>
        </div>
      </div>

      <div className="color">
        <h2 className="color__title">Color</h2>

        <div className="color__options">
          <div className="color__options--primary">
            <span>Primary Color</span>
            <input
              type="color"
              className="color__input"
              value={primaryColor}
              onChange={e => updateCustomization({ primaryColor: e.target.value })}
            />
          </div>

          <div className="color__options--secondary">
            <span>Secondary Color</span>
            <input
              type="color"
              className="color__input"
              value={secondaryColor}
              onChange={e => updateCustomization({ secondaryColor: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="font">
        <h2 className="font__title">Font</h2>

        <div className="font__options">
          <button onClick={() => updateCustomization({ font: "serif" })}>
            Serif
          </button>

          <button onClick={() => updateCustomization({ font: "sans" })}>
            Sans
          </button>

          <button onClick={() => updateCustomization({ font: "mono" })}>
            Mono
          </button>
        </div>
      </div>
    </>
  );
}
