import "./Toolbar.css";
import icons from "@/assets/icons/icons.svg";

type ToolbarProps = {
  clearResume: () => void;
  loadResume: () => void;
};

export default function Toolbar({ clearResume, loadResume }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button className="toolbar__button toolbar__button--clear" onClick={clearResume}>
        <svg className="toolbar__icon">
          <use href={`${icons}#trash-can`} />
        </svg>

        <span className="toolbar__label">Clear Resume</span>
      </button>

      <button className="toolbar__button" onClick={loadResume}>
        <svg className="toolbar__icon">
          <use href={`${icons}#file`} />
        </svg>

        <span className="toolbar__label">Load Resume</span>
      </button>

      <button className="toolbar__button" onClick={() => window.print()}>
        <svg className="toolbar__icon">
          <use href={`${icons}#file-export`} />
        </svg>

        <span className="toolbar__label">Export Resume</span>
      </button>
    </div>
  );
}
