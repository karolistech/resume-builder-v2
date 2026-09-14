import { useEffect, useRef } from "react";

import type { Resume } from "@/types/resume";
import type { Customization } from "@/types/customization";

import "./Resume.css";

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

  const { personal, education } = resume;

  return (
    <div ref={containerRef} className={`resume resume--${layout} resume--font-${font}`}>
      <div ref={resumeRef} className="resume__content">
        <div className="resume__personal">
          <h1 className="resume__name">{personal.name}</h1>

          <div className="resume__contact">
            <span className="resume__email">{personal.email}</span>
            <span className="resume__phone">{personal.phone}</span>
            <span className="resume__location">{personal.location}</span>
          </div>
        </div>

        <div className="resume__main">
          <div className="resume__education">
            <h2 className="resume__education-title">Education</h2>

            {education.filter(entry => entry.visible).map(entry => (
              <div key={entry.id} className="resume__education-entry">
                <span>{entry.school}</span>
                <span>{entry.degree}</span>
                <p>{entry.startDate} - {entry.endDate}</p>
                <p>{entry.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
