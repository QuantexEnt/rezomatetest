export interface CanonicalWork {
  jobTitle: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentJob?: boolean;
  responsibilities: string[];
  summary?: string;       // added summary here
}

export interface CanonicalEducation {
  degree: string;
  school: string;
  institution?: string;    // optional alias
  location?: string;
  graduationDate?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  honors?: string;
  relevantCourses?: string[];
  summary?: string;        // added summary here
}

export interface CanonicalCertification {
  name: string;
  issuer: string;
  date?: string;
  expirationDate?: string;
  credentialId?: string;
}

export interface CanonicalProject {
  name: string;
  description?: string;
  technologies?: string;
  link?: string;
}

export interface CanonicalSkills {
  technical: string[];
  soft: string[];
  languages: string[];
  projects: CanonicalProject[];
}

export interface CanonicalResume {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  professionalSummary?: string;
  summary?: string;          // added summary here
  jobDescription?: string;

  work: CanonicalWork[];
  education: CanonicalEducation[];
  certifications: CanonicalCertification[];
  skills: CanonicalSkills;

  template: string;
}

export function normalizeResume(data: any): CanonicalResume {
  return {
    name: data.personalInfo?.fullName || data.fullName || "",
    email: data.personalInfo?.email || data.email || "",
    phone: data.personalInfo?.phone || data.phone || "",
    location: data.personalInfo?.location || data.location || "",
    linkedin: data.personalInfo?.linkedin || data.linkedin || "",
    portfolio: data.personalInfo?.portfolio || data.portfolio || "",
    professionalSummary: data.personalInfo?.professionalSummary || data.professionalSummary || "",
    summary: data.summary || "",                   // add top-level summary if any
    jobDescription: data.personalInfo?.jobDescription || data.jobDescription || "",

    work: (data.workExperience || []).map((job: any) => ({
      jobTitle: job.jobTitle || "",
      company: job.company || "",
      location: job.location || "",
      startDate: job.startDate || "",
      endDate: job.endDate || "",
      currentJob: job.currentJob || false,
      responsibilities: job.responsibilities || [],
      summary: job.summary || "",                  // add here
    })),

    education: (data.education || []).map((edu: any) => ({
      degree: edu.degree || "",
      school: edu.school || edu.institution || "",
      institution: edu.institution || "",          // alias fallback
      location: edu.location || "",
      graduationDate: edu.graduationDate || edu.endDate || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
      gpa: edu.gpa || "",
      honors: edu.honors || "",
      relevantCourses: edu.relevantCourses || [],
      summary: edu.summary || "",                   // add here
    })),

    certifications: (data.certifications || []).map((cert: any) => ({
      name: cert.name || "",
      issuer: cert.issuer || "",
      date: cert.date || "",
      expirationDate: cert.expirationDate || "",
      credentialId: cert.credentialId || "",
    })),

    skills: {
      technical: data.technicalSkills || data.skills?.technical || [],
      soft: data.softSkills || data.skills?.soft || [],
      languages: data.languages || data.skills?.languages || [],
      projects: (data.projects || data.skills?.projects || []).map((proj: any) => ({
        name: proj.name || "",
        description: proj.description || "",
        technologies: proj.technologies || "",
        link: proj.link || "",
      })),
    },

    template: data.template || "default",
  };
}
