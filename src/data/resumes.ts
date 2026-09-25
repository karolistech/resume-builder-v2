import type { Resume } from "@/types/resume";

export const emptyResume: Resume = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: ""
  },

  education: [],
  experience: []
};

export const exampleResume: Resume = {
  personal: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "555-123-4567",
    location: "Silicon Valley, CA"
  },

  education: [
    {
      id: crypto.randomUUID(),
      school: "New York University",
      degree: "B.S. in Computer Science",
      startDate: "2018-09",
      endDate: "2022-06",
      location: "New York, NY",
      visible: true
    },

    {
      id: crypto.randomUUID(),
      school: "Harvard University",
      degree: "M.S. in Artificial Intelligence",
      startDate: "2022-09",
      endDate: "2024-06",
      location: "Cambridge, MA",
      visible: true
    }
  ],

  experience: [
    {
      id: crypto.randomUUID(),
      company: "Tech Innovations",
      position: "Frontend Developer",
      startDate: "2020-06",
      endDate: "2024-06",
      location: "Remote",
      description: "Developed responsive web interfaces using modern frontend technologies.",
      visible: true
    },

    {
      id: crypto.randomUUID(),
      company: "Tessera Labs",
      position: "Software Engineer",
      startDate: "2024-07",
      endDate: "Present",
      location: "Silicon Valley, CA",
      description: "Designed and implemented software solutions based on business and technical requirements.",
      visible: true
    },
  ]
};
