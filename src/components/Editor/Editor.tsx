import type { Resume } from "@/types/resume";

import Toolbar from "./Toolbar/Toolbar";
import Personal from "./Personal/Personal";
import Education from "./Education/Education";
import Experience from "./Experience/Experience";

type EditorProps = {
  resume: Resume;
  updateResume: (updates: Partial<Resume>) => void;
  clearResume: () => void;
  loadResume: () => void;
};

export default function Editor({ resume, updateResume, clearResume, loadResume }: EditorProps) {
  return (
    <>
      <Toolbar clearResume={clearResume} loadResume={loadResume} />
      <Personal personal={resume.personal} updateResume={updateResume} />
      <Education education={resume.education} updateResume={updateResume} />
      <Experience experience={resume.experience} updateResume={updateResume} />
    </>
  );
}
