import { type ChangeEvent, useState } from "react";

import type { Personal, Resume } from "@/types/resume";

import "./Personal.css";
import icons from "@/assets/icons/icons.svg";

type PersonalProps = {
  personal: Personal;
  updateResume: (updates: Partial<Resume>) => void;
};

const fields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "location", label: "Location", type: "text" }
] as const;

export default function Personal({ personal, updateResume }: PersonalProps) {
  const [sectionOpen, setSectionOpen] = useState(true);

  function toggleSection() {
    setSectionOpen(open => !open);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateResume({ personal: { ...personal, [name]: value } });
  }

  return (
    <div className="personal">
      <button className="personal__toggle-button" onClick={toggleSection}>
        <div className="personal__title-group">
          <svg className="personal__icon">
            <use href={`${icons}#person`} />
          </svg>

          <span className="personal__title">Personal Details</span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen && (
        <form className="personal__form">
          {fields.map(field => (
            <div key={field.name} className="personal__field">
              <label htmlFor={`personal-${field.name}`} className="personal__label">
                {field.label}:
              </label>

              <input
                type={field.type} id={`personal-${field.name}`} name={field.name}
                className="personal__input" value={personal[field.name]} onChange={handleInput}
              />
            </div>
          ))}
        </form>
      )}
    </div>
  );
}

function getChevronClassName(sectionOpen: boolean): string {
  const base = "personal__chevron-icon";
  const open = sectionOpen && "personal__chevron-icon--open";

  return [base, open].filter(Boolean).join(" ");
}
