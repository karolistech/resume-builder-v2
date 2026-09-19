import { useEffect, useRef } from "react";

import type { Resume } from "@/types/resume";
import type { Customization } from "@/types/customization";

import "./Resume.css";
import icons from "@/assets/icons/icons.svg";

type ResumeProps = {
  resume: Resume;
  customization: Customization;
};

export default function Resume({ resume, customization }: ResumeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const { layout, font } = customization;

  useEffect(() => {
    const container = containerRef.current;
    const resume = resumeRef.current;

    if (!container || !resume) return;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      const resumeWidth = resume.offsetWidth;
      const resumeHeight = resume.offsetHeight;

      const scale = Math.min(1, availableWidth / resumeWidth);

      container.style.height = `${resumeHeight * scale}px`;
      resume.style.transform = `scale(${scale})`;
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const { personal, education, experience } = resume;

  return (
    <div ref={containerRef} className={`resume resume--${layout} resume--font-${font}`}>
      <div ref={resumeRef} className="resume__content">

        <div className="resume__personal">
          <h1 className="resume__name">{personal.name}</h1>

          <div className="resume__contact">
            {personal.email && (
              <div className="resume__contact-group">
                <svg className="resume__icon">
                  <use href={`${icons}#envelope`} />
                </svg>

                <span className="resume__email">
                  {personal.email}
                </span>
              </div>
            )}

            {personal.phone && (
              <div className="resume__contact-group">

                <svg className="resume__icon">
                  <use href={`${icons}#phone`} />
                </svg>

                <span className="resume__phone">
                  {personal.phone}
                </span>
              </div>
            )}

            {personal.location && (
              <div className="resume__contact-group">
                <svg className="resume__icon">
                  <use href={`${icons}#location`} />
                </svg>

                <span className="resume__location">
                  {personal.location}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="resume__main">
          {education.some(entry => entry.visible) && (
            <div className="resume__education">
              <h2 className="resume__education-title">Education</h2>

              {education.filter(entry => entry.visible).map(entry => (
                <div key={entry.id} className="resume__education-entry">
                  <div className="resume__education-info-group-1">
                    <p className="resume__education-dates">
                      {entry.startDate} – {entry.endDate}
                    </p>

                    <p className="">{entry.location}</p>
                  </div>

                  <div className="resume__education-info-group-2">
                    <p className="resume__school">{entry.school}</p>
                    <p>{entry.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {experience.some(entry => entry.visible) && (
            <div className="resume__experience">
              <h2 className="resume__experience-title">Professional Experience</h2>

              {experience.filter(entry => entry.visible).map(entry => (
                <div key={entry.id} className="resume__experience-entry">
                  <div className="resume__experience-info-group-1">
                    <p className="resume__experience-dates">
                      {entry.startDate} – {entry.endDate}
                    </p>

                    <p className="">{entry.location}</p>
                  </div>

                  <div className="resume__experience-info-group-2">
                    <p className="resume__experience-company">
                      {entry.company}
                    </p>

                    <p className="resume__experience-position">
                      {entry.position}
                    </p>

                    <p className="resume__experience-description">
                      {entry.description}
                    </p>
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
