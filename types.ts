
export enum AppView {
  DASHBOARD = 'dashboard',
  CRAWLER = 'crawler',
  AI_SELECTOR = 'ai_selector',
  BID_PLAN = 'bid_plan',
  TEMPLATE_CONFIG = 'template_config',
  KNOWLEDGE_BASE = 'knowledge_base',
  BID_WORKSPACE = 'bid_workspace',
  LOG_MANAGEMENT = 'log_management',
  AGENT_CONFIG = 'agent_config',
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

export interface BiddingTask extends Tender {
  manager?: string;
  assignDate?: string;
  priority: 'high' | 'medium' | 'low';
  source?: 'crawler' | 'ai';
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
