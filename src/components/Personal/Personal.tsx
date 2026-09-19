import { type ChangeEvent, useState } from "react";

import type { Personal, Resume } from "@/types/resume";

import "./Personal.css";
import icons from "@/assets/icons/icons.svg";

type PersonalProps = {
  personal: Personal;
  updateResume: (updates: Partial<Resume>) => void;
};

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
    <div className="personal">
      <button className="personal__toggle-button" onClick={toggleSection}>
        <div className="personal__toggle-left">
          <svg className="personal__person-icon">
            <use href={`${icons}#person`} />
          </svg>

          <span className="personal__title">
            Personal Details
          </span>
        </div>

        <svg className={getChevronClassName(sectionOpen)}>
          <use href={`${icons}#chevron`} />
        </svg>
      </button>

      {sectionOpen && (
        <form className="personal__form">
          <div className="personal__field">
            <label htmlFor="personal-name" className="personal__label">
              Name:
            </label>

            <input
              type="text" id="personal-name" name="name" className="personal__input"
              value={personal["name"]} onChange={handleInput}
            />
          </div>

          <div className="personal__field">
            <label htmlFor="personal-email" className="personal__label">
              Email:
            </label>

            <input
              type="email" id="personal-email" name="email" className="personal__input"
              value={personal["email"]} onChange={handleInput}
            />
          </div>

          <div className="personal__field">
            <label htmlFor="personal-phone" className="personal__label">
              Phone:
            </label>

            <input
              type="tel" id="personal-phone" name="phone" className="personal__input"
              value={personal["phone"]} onChange={handleInput}
            />
          </div>

          <div className="personal__field">
            <label htmlFor="personal-location" className="personal__label">
              Location:
            </label>

            <input
              type="text" id="personal-location" name="location" className="personal__input"
              value={personal["location"]} onChange={handleInput}
            />
          </div>
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
