import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";

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
  const [sectionOpen, setSectionOpen] = useState(false);
  const [editor, setEditor] = useState<Editor>({ mode: null, entryId: null, snapshot: null });

  const entry = experience.find(entry => entry.id === editor.entryId);

  useEffect(() => {
    if (editor.entryId !== null && entry === undefined) closeEditor();
  }, [editor.entryId, entry]);

  function toggleSection() {
    setSectionOpen(open => !open);
  }

  function closeEditor() {
    setEditor({ mode: null, entryId: null, snapshot: null });
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

  function editEntry(id: string) {
    setEditor({ mode: "edit", entryId: id, snapshot: experience });
  }

  function deleteEntry(id: string) {
    updateResume({ experience: experience.filter(entry => entry.id !== id) });
    closeEditor();
  }

  function cancelEntry(snapshot: Experience[]) {
    updateResume({ experience: snapshot});
    closeEditor();
  }

  function toggleEntry(id: string) {
    const updated = experience.map(entry =>
      entry.id === id ? { ...entry, visible: !entry.visible } : entry
    );

    updateResume({ experience: updated });
  }

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    const updated = experience.map(entry =>
      entry.id === editor.entryId ? { ...entry, [name]: value } : entry
    );

    updateResume({ experience: updated });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    closeEditor();
  }

  return (
    <div className="experience">
      <button className="experience__section-button" onClick={toggleSection}>
        <div className="experience__title-group">
          <svg className="experience__icon">
            <use href={`${icons}#briefcase`} />
          </svg>

          <span className="experience__title">Experience</span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen && editor.mode === null && (
        <>
          <ul className="experience__entries">
            {experience.map(entry => (
              <li key={entry.id} className="experience__entry">
                <button className="experience__edit-button" onClick={() => editEntry(entry.id)}>
                  <span className="experience__company">
                    {entry.company}
                  </span>
                </button>

                <button className="experience__toggle-button" onClick={() => toggleEntry(entry.id)}>
                  <svg className="experience__visibility-icon">
                    <use href={`${icons}#${entry.visible ? "eye" : "eye-slash"}`} />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <button className="experience__create-button" onClick={createEntry}>
            + Experience
          </button>
        </>
      )}

      {sectionOpen && editor.mode !== null && entry !== undefined && (
        <form className="experience__form" onSubmit={handleSubmit}>
          <div className="experience__fields">
            <div className="experience__field">
              <label htmlFor="experience-position" className="experience__label">
                Position:
              </label>

              <input
                type="text" id="experience-position" name="position" className="experience__input"
                value={entry.position} onChange={handleInput}
              />
            </div>

            <div className="experience__field">
              <label htmlFor="experience-company" className="experience__label">
                Company:
              </label>

              <input
                type="text" id="experience-company" name="company" className="experience__input"
                value={entry.company} onChange={handleInput}
              />
            </div>

            <div className="experience__field-group">
              <div className="experience__field">
                <label htmlFor="experience-start-date" className="experience__label">
                  Start Date:
                </label>

                <input
                  type="text" id="experience-start-date" name="startDate" className="experience__input"
                  value={entry.startDate} onChange={handleInput}
                />
              </div>

              <div className="experience__field">
                <label htmlFor="experience-end-date" className="experience__label">
                  End Date:
                </label>

                <input
                  type="text" id="experience-end-date" name="endDate" className="experience__input"
                  value={entry.endDate} onChange={handleInput}
                />
              </div>
            </div>

            <div className="experience__field">
              <label htmlFor="experience-location" className="experience__label">
                Location:
              </label>

              <input
                type="text" id="experience-location" name="location" className="experience__input"
                value={entry.location} onChange={handleInput}
              />
            </div>

            <div className="experience__field">
              <label htmlFor="experience-description" className="experience__label">
                Description:
              </label>

              <textarea
                id="experience-description" name="description" className="experience__textarea"
                value={entry.description} onChange={handleInput}
              />
            </div>
          </div>

          <div className="experience__actions">
            {editor.mode === "edit" && (
              <button
                type="button"
                className="experience__action-button experience__action-button--delete"
                onClick={() => deleteEntry(entry.id)}
              >
                Delete
              </button>
            )}

            <button
              type="button"
              className="experience__action-button experience__action-button--cancel"
              onClick={() => cancelEntry(editor.snapshot)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="experience__action-button experience__action-button--submit"
            >
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
