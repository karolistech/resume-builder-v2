import "./Toolbar.css";

type ToolbarProps = {
  clearResume: () => void;
  loadExample: () => void;
};

export default function Toolbar({ clearResume, loadExample }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button onClick={clearResume}>
        <span>Clear Resume</span>
      </button>

      <button onClick={loadExample}>
        <span>Load Example</span>
      </button>

      <button onClick={() => window.print()}>
        <span>Export Resume</span>
      </button>
    </div>
  );
}
