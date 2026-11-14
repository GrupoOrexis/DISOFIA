// Tipos del contenido del proyecto DISOFIA.
// Los DATOS viven ahora en ./content.json, que se edita de forma visual
// desde /editor. Este archivo solo define los tipos y re-exporta el
// contenido ya tipado, de modo que los componentes no cambian.

export interface ProjectMetadata {
  title: string;
  subtitle: string;
  acronym: string;
  reference: string;
  modality: string;
  period: string;
  startDate: string;
  endDate: string;
  area: string;
  executingEntity: string;
  faculty: string;
  department: string;
  fundingEntity: string;
  fundingCode: string;
  coFinancing: string;
  executiveSummary: string;
  plannedOutputs: {
    articles: string;
    monographs: string;
    collectiveVolume: string;
    translation: string;
  };
  indicators: {
    workTeamTotal: number;
    men: number;
    women: number;
    phdTheses: number;
    indexedPublications: number;
  };
}

export interface ResearchLine {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  keyConcepts: string[];
  philosophicalQuestions: string[];
}

export interface PrincipalInvestigator {
  name: string;
  title: string;
  academicPosition: string;
  orcid: string;
  orcidUrl: string;
  email: string;
  institution: string;
  institutionShort: string;
  role: string;
  location: string;
  specialty: string;
}

export interface ResearchTeamMember {
  name: string;
  institution: string;
  institutionShort: string;
  role: string;
  location: string;
  specialty?: string;
  orcid?: string;
  orcidUrl?: string;
}

export interface WorkTeamMember {
  name: string;
  institution: string;
  institutionShort: string;
  country: string;
  region: 'España' | 'Europa' | 'Norteamérica' | 'Latinoamérica' | 'Asia';
  category: 'Investigador en Formación / Predoc' | 'Colaborador Internacional';
  gender: 'M' | 'F';
  isPhdCandidate?: boolean;
  flag: string;
}

export interface SeminarSession {
  title: string;
  date: string;
  isoDate: string;
  durationHours: number;
  time: string;
  location: string;
  room: string;
  book: string;
  publisherYear: string;
  speaker: string;
  speakerAffiliation: string;
  description: string;
}

export interface ReadingItem {
  id: string;
  author: string;
  title: string;
  editorial: string;
  year: string;
  type: 'Monografía' | 'Estudio Exegético' | 'Clásico / Ejercicios' | 'Traducción y Seminario';
  notes: string;
}

export interface WorkshopItem {
  id: string;
  edition: string;
  title: string;
  topic: string;
  date: string;
  location: string;
  status: 'Confirmado' | 'En preparación';
}

// --- Carga del contenido editable ---
import content from '../content.json';

export const DISOFIA_METADATA = content.metadata as unknown as ProjectMetadata;
export const PRINCIPAL_INVESTIGATORS = content.principalInvestigators as unknown as PrincipalInvestigator[];
export const RESEARCH_TEAM = content.researchTeam as unknown as ResearchTeamMember[];
export const WORK_TEAM = content.workTeam as unknown as WorkTeamMember[];
export const RESEARCH_LINES = content.researchLines as unknown as ResearchLine[];
export const INAUGURAL_SESSION = content.inauguralSession as unknown as SeminarSession;
export const READING_LIST = content.readingList as unknown as ReadingItem[];
export const WORKSHOPS = content.workshops as unknown as WorkshopItem[];

export interface SeminarProgramItem {
  n: number;
  work: string;
  speaker: string;
  affiliation: string;
  date: string;
}

export interface SeminarInfo {
  course: string;
  location: string;
  contacts: string;
}

export const SEMINAR_PROGRAM = content.seminarProgram as unknown as SeminarProgramItem[];
export const SEMINAR_INFO = content.seminarInfo as unknown as SeminarInfo;
