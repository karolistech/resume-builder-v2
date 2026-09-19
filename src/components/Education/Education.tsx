import { type ChangeEvent, useEffect, useState } from "react";

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

export default function Education({ education, updateResume }: EducationProps) {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [editor, setEditor] = useState<Editor>({ mode: null, activeId: null, snapshot: null });

  const entry = education.find(entry => entry.id === editor.activeId);

  useEffect(() => {
    if (editor.mode !== null && entry === undefined) closeEditor();
  }, [editor.mode, entry]);

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
    const updated = education.map(entry =>
      entry.id === id ? { ...entry, visible: !entry.visible } : entry
    );

    updateResume({ education: updated });
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const updated = education.map(entry =>
      entry.id === editor.activeId ? { ...entry, [name]: value } : entry
    );

    updateResume({ education: updated });
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

      {sectionOpen && editor.mode === null && (
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

      {sectionOpen && editor.mode !== null && entry !== undefined && (
        <form className="education__form" onSubmit={closeEditor}>
          <div className="education__fields">
            <div className="education__field">
              <label htmlFor="education-school" className="education__label">
                School:
              </label>

              <input
                type="text" id="education-school" name="school" className="education__input"
                value={entry.school} onChange={handleInput}
              />
            </div>

            <div className="education__field">
              <label htmlFor="education-degree" className="education__label">
                Degree:
              </label>

              <input
                type="text" id="education-degree" name="degree" className="education__input"
                value={entry.degree} onChange={handleInput}
              />
            </div>

            <div className="education__field-group">
              <div className="education__field">
                <label htmlFor="education-start-date" className="education__label">
                  Start Date:
                </label>

                <input
                  type="text" id="education-start-date" name="startDate" className="education__input"
                  value={entry.startDate} onChange={handleInput}
                />
              </div>

              <div className="education__field">
                <label htmlFor="education-end-date" className="education__label">
                  End Date:
                </label>

                <input
                  type="text" id="education-end-date" name="endDate" className="education__input"
                  value={entry.endDate} onChange={handleInput}
                />
              </div>
            </div>

            <div className="education__field">
              <label htmlFor="education-location" className="education__label">
                Location:
              </label>

              <input
                type="text" id="education-location" name="location" className="education__input"
                value={entry.location} onChange={handleInput}
              />
            </div>
          </div>

          <div className="education__actions">
            {editor.mode === "edit" && (
              <button type="button" className="education__btn education__btn--edit" onClick={deleteEntry}>
                Delete
              </button>
            )}

            <button type="button" className="education__btn education__btn--cancel" onClick={cancelEntry}>
              Cancel
            </button>

            <button type="submit" className="education__btn education__btn--submit">
              {editor.mode === "create" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function getChevronClassName(sectionOpen: boolean): string {
  const base = "education__chevron-icon";
  const open = sectionOpen && "education__chevron-icon--open";

  return [base, open].filter(Boolean).join(" ");
}
