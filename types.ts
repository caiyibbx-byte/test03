
export enum AppView {
  DASHBOARD = 'dashboard',
  MANAGER_VIEW = 'manager_view',
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

export type PermissionType = 
  | 'DATA_VIEW'        
  | 'BID_DRAFT'        
  | 'CRAWLER_CTRL'     
  | 'ASSET_MANAGE'     
  | 'SYSTEM_LOG'       
  | 'USER_ADMIN'       
  | 'AI_TUNING';       

export interface SubPackage {
  id: string;
  name: string;
  budget?: string;
  requirement?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  score?: number; // AI 匹配分
  years: number;
  majorProject: string;
  tags: string[];
  dept?: string;
  certs?: string[];
}

export interface Tender {
  id: string;
  projectId: string; 
  title: string;
  category: string;
  type: '服务' | '物资' | '施工'; 
  publishDate: string;
  deadline: string; 
  openingTime: string; 
  openingLocation: string; 
  purchaser: string; 
  status: '正在采购' | '已结束' | '待发布' | 'analyzed' | 'new';
  summary?: string;
  budget?: string;
  subPackages?: SubPackage[];
}

export interface BiddingTask extends Tender {
  projectLeader?: StaffMember;
  commercialTeam?: StaffMember[]; // 新增：商务组
  technicalTeam?: StaffMember[];  // 新增：技术组
  assignDate?: string;
  priority: 'high' | 'medium' | 'low';
  source?: 'crawler' | 'ai';
  lotName?: string;
  progress?: number; // 0 - 100
  currentStage?: 'scanned' | 'team_assigned' | 'drafting' | 'reviewing' | 'submitted';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  category: 'system' | 'user' | 'ai' | 'crawler';
  operator: string;
  action: string;
  details: string;
  ip?: string;
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
  currentLoad: number; 
}

export interface UserRole {
  id: string;
  name: string;
  permissions: PermissionType[];
  description: string;
}

export interface StaffUser {
  id: string;       
  name: string;
  dept: string;
  roleId: string;   
  status: 'active' | 'suspended';
  lastLogin?: string;
}
