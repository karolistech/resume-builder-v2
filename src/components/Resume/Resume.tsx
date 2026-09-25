import { useEffect, useRef } from "react";

import type { Resume } from "@/types/resume";
import type { Design } from "@/types/design";

import "./Resume.css";
import icons from "@/assets/icons/icons.svg";

type ResumeProps = {
  resume: Resume;
  design: Design;
};

export default function Resume({ resume, design }: ResumeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const { personal, education, experience } = resume;
  const { layout, font } = design;

  useEffect(() => {
    const container = containerRef.current;
    const resume = resumeRef.current;

    if (container === null || resume === null) return;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      const resumeWidth = resume.offsetWidth;
      const resumeHeight = resume.offsetHeight;

      const scale = availableWidth / resumeWidth;

      container.style.height = `${resumeHeight * scale}px`;
      resume.style.transform = `scale(${scale})`;
    };

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`resume resume--${layout} resume--font-${font}`}>
      <div ref={resumeRef} className="resume__content">

        <div className="resume__header">
          <h1 className="resume__name">{personal.name}</h1>

          <div className="resume__contacts">
            {personal.email && (
              <div className="resume__contact">
                <svg className="resume__icon">
                  <use href={`${icons}#envelope`} />
                </svg>

                <p>{personal.email}</p>
              </div>
            )}

            {personal.phone && (
              <div className="resume__contact">
                <svg className="resume__icon">
                  <use href={`${icons}#phone`} />
                </svg>

                <p>{personal.phone}</p>
              </div>
            )}

            {personal.location && (
              <div className="resume__contact">
                <svg className="resume__icon">
                  <use href={`${icons}#location`} />
                </svg>

                <p>{personal.location}</p>
              </div>
            )}
          </div>
        </div>

        <div className="resume__body">
          {education.some(entry => entry.visible) && (
            <div className="resume__section">
              <h2 className="resume__section-title">Education</h2>

              {education.filter(entry => entry.visible).map(entry => (
                <div key={entry.id} className="resume__entry">
                  <div className="resume__entry-aside">
                    <p>{entry.startDate} – {entry.endDate}</p>
                    <p>{entry.location}</p>
                  </div>

                  <div className="resume__entry-body">
                    <p className="resume__school">{entry.school}</p>
                    <p>{entry.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {experience.some(entry => entry.visible) && (
            <div className="resume__section">
              <h2 className="resume__section-title">Professional Experience</h2>

              {experience.filter(entry => entry.visible).map(entry => (
                <div key={entry.id} className="resume__entry">
                  <div className="resume__entry-aside">
                    <p>{entry.startDate} – {entry.endDate}</p>
                    <p>{entry.location}</p>
                  </div>

                  <div className="resume__entry-body">
                    <p className="resume__company">{entry.company}</p>
                    <p className="resume__position">{entry.position}</p>
                    <p className="resume__description">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
