import { useView } from "./hooks/useView";
import { useResume } from "./hooks/useResume";
import { useCustomization } from "./hooks/useCustomization";

import Nav from "./components/Nav/Nav";
import Toolbar from "./components/Toolbar/Toolbar";
import Personal from "./components/Personal/Personal";
import Education from "./components/Education/Education";
import Customize from "./components/Customize/Customize";
import Resume from "./components/Resume/Resume";

import "./App.css";

export default function App() {
  const { view, setView } = useView();
  const { resume, updateResume, clearResume, loadExample } = useResume();
  const { customization, updateCustomization } = useCustomization();

  return (
    <div className={`app app--${view}`}>
      <Nav view={view} setView={setView} />

      <div className="panel panel--content">
        <Toolbar clearResume={clearResume} loadExample={loadExample} />
        <Personal personal={resume.personal} updateResume={updateResume} />
        <Education education={resume.education} updateResume={updateResume} />
      </div>

      <div className="panel panel--customize">
        <Customize customization={customization} updateCustomization={updateCustomization} />
      </div>

      <div className="panel panel--resume">
        <Resume resume={resume} customization={customization} />
      </div>
    </div>
  );
}
