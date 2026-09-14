import { type ChangeEvent, useState } from "react";

import type { Education, Resume } from "@/types/resume";

import "./Education.css";
import icons from "@/assets/icons/icons.svg";

type EducationProps = {
  education: Education[];
  updateResume: (updates: Partial<Resume>) => void;
};

type Editor =
  | { mode: null; activeId: null; snapshot: null }
  | { mode: "create" | "edit"; activeId: string; snapshot: Education[] };

const educationFields = [
  { name: "school", label: "School", type: "text" },
  { name: "degree", label: "Degree", type: "text" },
  { name: "startDate", label: "Start Date", type: "month" },
  { name: "endDate", label: "End Date", type: "month" },
  { name: "location", label: "Location", type: "text" }
] as const;

export default function Education({ education, updateResume }: EducationProps) {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [editor, setEditor] = useState<Editor>({ mode: null, activeId: null, snapshot: null });

  const activeEntry = education.find(entry => entry.id === editor.activeId);

  function toggleSection() {
    setSectionOpen(open => !open);
  }

  function closeEditor() {
    setEditor({ mode: null, activeId: null, snapshot: null });
  }

  function editEntry(id: string) {
    setEditor({ mode: "edit", activeId: id, snapshot: education });
  }

  function createEntry() {
    const draft: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
      visible: true
    };

    setEditor({ mode: "create", activeId: draft.id, snapshot: education });
    updateResume({ education: [...education, draft] });
  }

  function deleteEntry() {
    updateResume({ education: education.filter(entry => entry.id !== editor.activeId) });
    closeEditor();
  }

  function cancelEntry() {
    if (editor.mode === null) return;

    updateResume({ education: editor.snapshot });
    closeEditor();
  }

  function toggleEntry(id: string) {
    updateResume({ education: education.map(entry => entry.id === id ? { ...entry, visible: !entry.visible } : entry) });
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateResume({ education: education.map(entry => entry.id === editor.activeId ? { ...entry, [name]: value } : entry) });
  }

  return (
    <div className="education">
      <button className="education__toggle-button" onClick={toggleSection}>
        <div className="education__toggle-left">
          <svg className="education__cap-icon">
            <use href={`${icons}#cap`} />
          </svg>

          <span className="education__title">
            Education
          </span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen === true && (
        <>
          {editor.mode === null && (
            <>
              <ul className="education__entries">
                {education.map(entry => (
                  <li key={entry.id} className="education__entry" onClick={() => editEntry(entry.id)}>
                    <span className="education__school">
                      {entry.school}
                    </span>

                    <button
                      className="education__visibility-button"
                      onClick={e => { e.stopPropagation(); toggleEntry(entry.id); }}
                    >
                      <svg className="education__visibility-icon">
                        <use href={`${icons}#${entry.visible ? "eye" : "eye-slash"}`} />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              <button className="education__add-button" onClick={createEntry}>
                + Education
              </button>
            </>
          )}

          {(editor.mode === "create" || editor.mode === "edit") && activeEntry && (
            <form className="education__form">
              <div className="education__fields">
                {educationFields.map(field => (
                  <div key={field.name} className="education__field">
                    <label htmlFor={field.name} className="education__label">
                      {field.label}:
                    </label>

                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      className="education__input"
                      value={activeEntry[field.name]}
                      onChange={handleInput}
                    />
                  </div>
                ))}
              </div>

              <div className="education__actions">
                {editor.mode === "edit" && (
                  <button type="button" className="education__button" onClick={deleteEntry}>
                    Delete
                  </button>
                )}

                <button type="button" className="education__button" onClick={cancelEntry}>
                  Cancel
                </button>

                <button type="button" className="education__button" onClick={closeEditor}>
                  {editor.mode === "create" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}

function getChevronClassName(sectionOpen: boolean): string {
  const base = "education__chevron-icon";
  const open = sectionOpen && "education__chevron-icon--open";

  return [base, open].filter(Boolean).join(" ");
}
