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
    location: "New York, NY"
  },

  education: [
    {
      id: crypto.randomUUID(),
      school: "State University",
      degree: "B.S. Computer Science",
      startDate: "2018-09",
      endDate: "2022-05",
      location: "New York, NY",
      visible: true
    },

    {
      id: crypto.randomUUID(),
      school: "MIT",
      degree: "B.S. Computer Science",
      startDate: "2018-09",
      endDate: "2022-05",
      location: "New York, NY",
      visible: true
    }
  ],

  experience: [
    {
      id: crypto.randomUUID(),
      company: "Tech Corp",
      position: "Frontend Developer",
      startDate: "2022-06",
      endDate: "2024-08",
      location: "Remote",
      description: "Built and maintained React-based user interfaces.",
      visible: true
    }
  ]
};
