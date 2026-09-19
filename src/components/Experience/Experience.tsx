import { type ChangeEvent, useEffect, useState } from "react";

import type { Experience, Resume } from "@/types/resume";

import "./Experience.css";
import icons from "@/assets/icons/icons.svg";

type ExperienceProps = {
  experience: Experience[];
  updateResume: (updates: Partial<Resume>) => void;
};

type Editor =
  | { mode: null; entryId: null; snapshot: null }
  | { mode: "create" | "edit"; entryId: string; snapshot: Experience[] };

export default function Experience({ experience, updateResume }: ExperienceProps) {
  const [sectionOpen, setSectionOpen] = useState(true);
  const [editor, setEditor] = useState<Editor>({ mode: null, entryId: null, snapshot: null });

  const entry = experience.find(entry => entry.id === editor.entryId);

  useEffect(() => {
    if (editor.mode !== null && entry === undefined) closeEditor();
  }, [editor.mode, entry]);

  function toggleSection() {
    setSectionOpen(open => !open);
  }

  function closeEditor() {
    setEditor({ mode: null, entryId: null, snapshot: null });
  }

  function editEntry(id: string) {
    setEditor({ mode: "edit", entryId: id, snapshot: experience });
  }

  function createEntry() {
    const draft: Experience = {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      visible: true
    };

    setEditor({ mode: "create", entryId: draft.id, snapshot: experience });
    updateResume({ experience: [...experience, draft] });
  }

  function deleteEntry(id: string) {
    updateResume({ experience: experience.filter(entry => entry.id !== id) });
    closeEditor();
  }

  function cancelEntry(snapshot: Experience[]) {
    updateResume({ experience: snapshot });
    closeEditor();
  }

  function toggleEntry(id: string) {
    const updated = experience.map(entry =>
      entry.id === id ? { ...entry, visible: !entry.visible } : entry
    );

    updateResume({ experience: updated });
  }

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) {
    const { name, value } = e.target;

    const updated = experience.map(entry =>
      entry.id === id ? { ...entry, [name]: value } : entry);

    updateResume({ experience: updated });
  }

  return (
    <div className="experience">
      <button className="experience__toggle-button" onClick={toggleSection}>
        <div className="experience__toggle-left">
          <svg className="experience__briefcase-icon">
            <use href={`${icons}#briefcase`} />
          </svg>

          <span className="experience__title">
            Experience
          </span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen && editor.mode === null && (
        <>
          <ul className="experience__entries">
            {experience.map(entry => (
              <li key={entry.id} className="experience__entry" onClick={() => editEntry(entry.id)}>
                <span className="experience__company">
                  {entry.company}
                </span>

                <button
                  className="experience__visibility-button"
                  onClick={e => { e.stopPropagation(); toggleEntry(entry.id); }}
                >
                  <svg className="experience__visibility-icon">
                    <use href={`${icons}#${entry.visible ? "eye" : "eye-slash"}`} />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <button className="experience__add-button" onClick={createEntry}>
            + Experience
          </button>
        </>
      )}

      {sectionOpen && editor.mode !== null && entry !== undefined && (
        <form className="experience__form" onSubmit={e => { e.preventDefault(); closeEditor(); }}>
          <div className="experience__fields">
            <div className="experience__field">
              <label htmlFor="experience-position" className="experience__label">
                Position:
              </label>

              <input
                type="text" id="experience-position" name="position" className="experience__input"
                value={entry.position} onChange={e => handleInput(e, entry.id)}
              />
            </div>

            <div className="experience__field">
              <label htmlFor="experience-company" className="experience__label">
                Company:
              </label>

              <input
                type="text" id="experience-company" name="company" className="experience__input"
                value={entry.company} onChange={e => handleInput(e, entry.id)}
              />
            </div>

            <div className="experience__field-group">
              <div className="experience__field">
                <label htmlFor="experience-start-date" className="experience__label">
                  Start Date:
                </label>

                <input
                  type="text" id="experience-start-date" name="startDate" className="experience__input"
                  value={entry.startDate} onChange={e => handleInput(e, entry.id)}
                />
              </div>

              <div className="experience__field">
                <label htmlFor="experience-end-date" className="experience__label">
                  End Date:
                </label>

                <input
                  type="text" id="experience-end-date" name="endDate" className="experience__input"
                  value={entry.endDate} onChange={e => handleInput(e, entry.id)}
                />
              </div>
            </div>

            <div className="experience__field">
              <label htmlFor="experience-location" className="experience__label">
                Location:
              </label>

              <input
                type="text" id="experience-location" name="location" className="experience__input"
                value={entry.location} onChange={e => handleInput(e, entry.id)}
              />
            </div>

            <div className="experience__field">
              <label htmlFor="experience-description" className="experience__label">
                Description:
              </label>

              <textarea
                id="experience-description" name="description" className="experience__textarea"
                value={entry.description} onChange={e => handleInput(e, entry.id)}
              />
            </div>
          </div>

          <div className="experience__actions">
            {editor.mode === "edit" && (
              <button
                type="button"
                className="experience__btn experience__btn--delete"
                onClick={() => deleteEntry(editor.entryId)}
              >
                Delete
              </button>
            )}

            <button
              type="button" className="experience__btn experience__btn--cancel"
              onClick={() => cancelEntry(editor.snapshot)}
            >
              Cancel
            </button>

            <button type="submit" className="experience__btn experience__btn--submit">
              {editor.mode === "create" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function getChevronClassName(sectionOpen: boolean): string {
  const base = "experience__chevron-icon";
  const open = sectionOpen && "experience__chevron-icon--open";

  return [base, open].filter(Boolean).join(" ");
}
