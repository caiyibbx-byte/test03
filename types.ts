
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
  | 'DATA_VIEW'        
  | 'BID_DRAFT'        
  | 'CRAWLER_CTRL'     
  | 'ASSET_MANAGE'     
  | 'SYSTEM_LOG'       
  | 'USER_ADMIN'       
  | 'AI_TUNING';       

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

export interface BiddingTask extends Tender {
  projectLeader?: StaffMember;
  commercialTeam?: StaffMember[]; 
  technicalTeam?: StaffMember[];  
  assignDate?: string;
  priority: 'high' | 'medium' | 'low';
  source?: 'crawler' | 'ai';
  lotName?: string;
  progress?: number; 
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
  contractYear: string;      // 签订合同年份
  index: number;            // 序号
  projectType: string;      // 项目类型
  projectName: string;      // 1. 项目名称
  location: string;         // 2. 项目所在地
  clientName: string;       // 3. 发包人名称
  clientAddress: string;    // 4. 发包人地址
  contact: string;          // 5. 联系人
  phone: string;            // 5. 发包人电话
  amount: string;           // 6. 合同价格（万元）
  signingDate: string;      // 7. 开工日期
  endDate: string;          // 8. 竣工日期
  leaderExperience: string; // 9. 承担的工作
  quality: string;          // 10. 工程质量
  leader: string;           // 11. 项目负责人
  content: string;          // 12. 项目描述
  remarks: string;          // 13. 其他说明
  
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
