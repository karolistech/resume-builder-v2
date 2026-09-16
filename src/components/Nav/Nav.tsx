import type { View } from "@/types/view";

import "./Nav.css";
import icons from "@/assets/icons/icons.svg";

type NavProps = {
  view: View;
  setView: (view: View) => void;
};

const views: View[] = ["content", "customize", "preview"];

export default function Nav({ view, setView }: NavProps) {
  return (
    <nav className="nav">
      {views.map(v => (
        <button key={v} className={getNavButtonClass(v, view)} onClick={() => setView(v)}>
          <svg className={getNavIconClass(v, view)}>
            <use href={`${icons}#${v}`} />
          </svg>

          <span className="nav__label">{v}</span>
        </button>
      ))}
    </nav>
  );
}

function getNavButtonClass(view: View, currentView: View): string {
  const base = "nav__btn";
  const preview = view === "preview" && "nav__preview";
  const selected = view === currentView && "nav__btn--selected";

  return [base, preview, selected].filter(Boolean).join(" ");
}

function getNavIconClass(view: View, currentView: View): string {
  const base = "nav__icon";
  const selected = view === currentView && "nav__icon--selected";

  return [base, selected].filter(Boolean).join(" ");
}
