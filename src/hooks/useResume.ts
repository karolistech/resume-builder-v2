import { useState } from "react";

import type { Resume } from "@/types/resume";

import { emptyResume, exampleResume } from "@/data/resumes";

export function useResume() {
  const [resume, setResume] = useState<Resume>(exampleResume);

  function updateResume(updates: Partial<Resume>) {
    setResume(resume => ({ ...resume, ...updates }));
  }

  function clearResume() {
    setResume(emptyResume);
  }

  function loadExample() {
    setResume(exampleResume);
  }

  return { resume, updateResume, clearResume, loadExample };
}
