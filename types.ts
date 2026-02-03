
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

export interface SubPackage {
  id: string;
  name: string;
  budget?: string;
  requirement?: string;
}

export interface Tender {
  id: string;
  projectId: string; // 采购项目编号
  title: string;
  category: string;
  type: '服务' | '物资' | '施工'; // 采购类型
  publishDate: string;
  deadline: string; // 文件获取截止
  openingTime: string; // 开启应答文件时间
  openingLocation: string; // 开启地点
  purchaser: string; // 采购人
  // Fix: Added 'analyzed' and 'new' to status union to match component usage
  status: '正在采购' | '已结束' | '待发布' | 'analyzed' | 'new';
  summary?: string;
  budget?: string;
  subPackages?: SubPackage[];
}

export interface BiddingTask extends Tender {
  manager?: string;
  assignDate?: string;
  priority: 'high' | 'medium' | 'low';
  source?: 'crawler' | 'ai';
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
  currentLoad: number; // 0-100
}

export interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}
