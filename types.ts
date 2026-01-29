
export enum AppView {
  DASHBOARD = 'dashboard',
  CRAWLER = 'crawler',
  AI_SELECTOR = 'ai_selector',
  KNOWLEDGE_BASE = 'knowledge_base',
  BID_WORKSPACE = 'bid_workspace',
  ADMIN = 'admin'
}

export interface Tender {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  deadline: string;
  status: 'new' | 'analyzed' | 'processed';
  summary?: string;
  budget?: string;
}

export interface ProjectExperience {
  id: string;
  projectName: string;
  client: string;
  completionDate: string;
  scale: string;
  description: string;
  tags: string[];
}

export interface Personnel {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  certifications: string[];
  skills: string[];
  currentLoad: number; // 0-100
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}
