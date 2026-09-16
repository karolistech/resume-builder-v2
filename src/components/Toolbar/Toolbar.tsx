import "./Toolbar.css";
import icons from "@/assets/icons/icons.svg";

type ToolbarProps = {
  clearResume: () => void;
  loadExample: () => void;
};

export default function Toolbar({ clearResume, loadExample }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button className="toolbar__btn toolbar__btn--clear" onClick={clearResume}>
        <svg className="toolbar__trash-icon">
          <use href={`${icons}#trash-can`} />
        </svg>

        <span>Clear Resume</span>
      </button>

      <button className="toolbar__btn" onClick={loadExample}>
        <svg className="toolbar__file-icon">
          <use href={`${icons}#file`} />
        </svg>

        <span>Load Example</span>
      </button>

      <button className="toolbar__btn" onClick={() => window.print()}>
        <svg className="toolbar__file-export-icon">
          <use href={`${icons}#file-export`} />
        </svg>

        <span>Export Resume</span>
      </button>
    </div>
  );
}
