import type { View } from "@/types/view";

import "./Nav.css";

type NavProps = {
  view: View;
  setView: (view: View) => void;
};

export default function Nav({ view, setView }: NavProps) {
  return (
    <nav className="nav">
      <button
        className={view === "content" ? "is-active" : ""}
        onClick={() => setView("content")}
      >
        Content
      </button>
      <button
        className={view === "customize" ? "is-active" : ""}
        onClick={() => setView("customize")}
      >
        Customize
      </button>
      <button
        className={`nav__preview ${view === "preview" ? "is-active" : ""}`}
        onClick={() => setView("preview")}
      >
        Preview
      </button>
    </nav>
  );
}
