import { type ChangeEvent, useState } from "react";

import type { Personal, Resume } from "@/types/resume";

import "./Personal.css";
import icons from "@/assets/icons/icons.svg";

type PersonalProps = {
  personal: Personal;
  updateResume: (updates: Partial<Resume>) => void;
};

const personalFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "location", label: "Location", type: "text" }
] as const;

export default function Personal({ personal, updateResume }: PersonalProps) {
  const [sectionOpen, setSectionOpen] = useState(false);

  function toggleSection() {
    setSectionOpen(open => !open);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    updateResume({ personal: { ...personal, [name]: value } });
  }

  return (
    <div className="personal-section">
      <button className="personal-section__toggle-button" onClick={toggleSection}>
        <div className="personal-section__toggle-left">
          <svg className="personal-section__person-icon">
            <use href={`${icons}#person`} />
          </svg>

          <span className="personal-section__title">
            Personal Details
          </span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen === true && (
        <form className="personal-section__form">
          {personalFields.map(field => (
            <div key={field.name} className="personal-section__field">
              <label htmlFor={field.name} className="personal-section__label">
                {field.label}:
              </label>

              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="personal-section__input"
                value={personal[field.name]}
                onChange={handleInput}
              />
            </div>
          ))}
        </form>
      )}
    </div>
  );
}

function getChevronClassName(sectionOpen: boolean): string {
  const base = "personal-section__chevron-icon";
  const open = sectionOpen && "personal-section__chevron-icon--open";

  return [base, open].filter(Boolean).join(" ");
}
