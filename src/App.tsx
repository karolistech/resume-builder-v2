import { useView } from "./hooks/useView";
import { useResume } from "./hooks/useResume";
import { useDesign } from "./hooks/useDesign";

import Navbar from "./components/Navbar/Navbar";
import Editor from "./components/Editor/Editor";
import Design from "./components/Design/Design";
import Resume from "./components/Resume/Resume";

import "./App.css";

export default function App() {
  const { view, setView } = useView();
  const { resume, updateResume, clearResume, loadResume } = useResume();
  const { design, updateDesign } = useDesign();

  return (
    <div className={`app app--${view}`}>
      <div className="app__navbar">
        <Navbar view={view} setView={setView} />
      </div>

      <div className="app__panel app__panel--editor">
        <Editor resume={resume} updateResume={updateResume} clearResume={clearResume} loadResume={loadResume} />
      </div>

      <div className="app__panel app__panel--design">
        <Design design={design} updateDesign={updateDesign} />
      </div>

      <div className="app__panel app__panel--resume">
        <Resume resume={resume} design={design} />
      </div>
    </div>
  );
}
