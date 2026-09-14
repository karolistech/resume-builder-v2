export type Personal = {
  name: string;
  email: string;
  phone: string;
  location: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
  visible: boolean;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  visible: boolean;
};

export type Resume = {
  personal: Personal;
  education: Education[];
  experience: Experience[];
};
