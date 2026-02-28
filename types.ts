
export enum AppView {
  DASHBOARD = 'dashboard',
  MANAGER_VIEW = 'manager_view',
  CRAWLER = 'crawler',
  AI_SELECTOR = 'ai_selector',
  BID_PLAN = 'bid_plan',
  TEMPLATE_CONFIG = 'template_config',
  PROJECT_BASE = 'project_base',
  STAFF_BASE = 'staff_base',
  BID_WORKSPACE = 'bid_workspace',
  LOG_MANAGEMENT = 'log_management',
  AGENT_CONFIG = 'agent_config',
  ADMIN = 'admin'
}

export type PermissionType = 
  | 'BID_EXP_SELECT'     // 标书业绩遴选
  | 'BID_MEMBER_DRAFT'   // 成员拟定
  | 'BID_TECH_DRAFT'     // 技术方案编撰
  | 'BID_SUBMISSION'     // 投标
  | 'BID_PLAN_MANAGE'    // 投标计划管理
  | 'DATA_VIEW'          // 数据查看
  | 'SYSTEM_LOG';        // 系统日志

export interface SubPackage {
  id: string;             
  index: number;          
  subBidNumber: string;   
  subBidName: string;     
  lotNumber: string;      
  lotName: string;        
  scope: string;          
  qualifications: string; 
  experience: string;     
  personnel: string;      
  duration: string;       
  location: string;       
  maxPrice: string;       
  estAmount: string;      
  quoteMethod: string;    
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  score?: number; 
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

export enum PhaseStatus {
  NOT_STARTED = '未开始',
  IN_PROGRESS = '进行中',
  COMPLETED = '已完成',
  SUBMITTED = '已提交'
}

export interface BiddingTask extends Tender {
  projectLeader?: StaffMember;
  expSelectionLeader?: StaffMember;    
  memberDraftingLeader?: StaffMember;  
  techProposalLeader?: StaffMember;    
  submissionLeader?: StaffMember;      
  
  assignDate?: string;
  priority: 'high' | 'medium' | 'low';
  source?: 'crawler' | 'ai';
  lotName?: string;
  progress?: number; 
  currentStage?: 'scanned' | 'team_assigned' | 'drafting' | 'reviewing' | 'submitted';

  // 子环节状态
  expStatus?: PhaseStatus;
  teamStatus?: PhaseStatus;
  contentStatus?: PhaseStatus;

  // 最后修改信息
  lastModifiedBy?: string;
  lastModifiedTime?: string;

  // 兼容旧代码的布尔值 (可选，建议逐步替换)
  isExpDone?: boolean;
  isTeamDone?: boolean;
  isContentDone?: boolean;
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
  contractYear: string;
  index: number;
  projectType: string;
  projectName: string;
  location: string;
  clientName: string;
  clientAddress: string;
  contact: string;
  phone: string;
  amount: string;
  signingDate: string;
  endDate: string;
  leaderExperience: string;
  quality: string;
  leader: string;
  content: string;
  remarks: string;
  keywords: string[];
  extendedKeywords: string[];
  members: string;
  memberExperience: string;
  contractStatus: string;
  contractScanUrls?: string[]; 
  invoiceUrls?: string[];      
  invoiceVerifyUrls?: string[];
}

export interface PersonnelCert {
  name: string;      
  level: string;     
  authority: string; 
  number: string;    
  validity: string;  
  fileUrl?: string;  
}

export interface EducationRecord {
  level: string;
  school: string;       
  major: string;        
  gradDate: string;     
  gradCertUrl?: string; 
  degreeCertUrl?: string; 
}

export interface PersonnelProject {
  time: string;         
  projectName: string;  
  serviceType: string;  
  role: string;         
  client: string;       
  contact: string;      
  phone: string;        
  workCertUrl?: string; 
}

export interface Personnel {
  id: string;
  name: string;             
  age: number;              
  education: string;        
  title: string;            
  proposedPosition: string; 
  years: number;            
  similarYears: number;     
  school: string;           
  major: string;            
  gradDate: string;         
  eduCertUrl?: string;      
  gradCertUrl?: string;     
  educations: EducationRecord[]; 
  certs: PersonnelCert[];
  projects: PersonnelProject[];
  currentLoad: number; 
}

export interface StaffUser {
  id: string;       
  name: string;
  dept: string;
  roleId: string;   
  status: 'active' | 'suspended';
  lastLogin?: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: PermissionType[];
}
