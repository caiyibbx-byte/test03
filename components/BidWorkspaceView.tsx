
import React, { useState, useMemo, useRef } from 'react';
import { 
  Users, Award, FileText, ChevronRight, BrainCircuit, 
  RefreshCw, Download, Save, 
  Search, X, Sparkles, Check,
  BadgeCheck, Zap, Layers,
  UserPlus, CheckCircle2,
  Plus, DatabaseZap,
  Bot, GraduationCap,
  Scale,
  FileDown,
  Trash2,
  ShieldCheck,
  Briefcase,
  Trophy,
  BookOpen,
  Image as ImageIcon,
  School,
  FileImage,
  Lock,
  Eye,
  ShieldAlert,
  CalendarDays,
  Coins,
  Building2,
  MapPin,
  ClipboardList,
  Info,
  ExternalLink,
  Target,
  History,
  FileCheck2,
  UserSearch
} from 'lucide-react';
import { BiddingTask, StaffUser, Personnel, ProjectExperience } from '../types';

interface BidWorkspaceViewProps {
  currentTask?: BiddingTask;
  currentUser: StaffUser | null;
}

interface TaskStatus {
  id: 'team' | 'exp' | 'content';
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  icon: any;
  color: string;
}

// --------------------------------------------------------------------------------
// 深度预览组件：每一个业绩项目的完整文书（A4格式，用于最终生成）
// --------------------------------------------------------------------------------
const ProjectFullDocumentMerged: React.FC<{ project: ProjectExperience }> = ({ project }) => (
  <div className="flex flex-col items-center space-y-12 mb-32 animate-in fade-in duration-700">
    <div className="relative bg-white shadow-2xl text-left font-serif p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border-2 border-slate-900 rounded text-[10px] font-black text-slate-900 italic uppercase">Attachment: Experience Table</div>
      <h2 className="text-xl font-bold text-center mb-10 underline underline-offset-[12px] decoration-slate-900">项目基本情况表</h2>
      <table className="w-full border-collapse border border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr><td className="border border-black p-3 bg-slate-50 w-[140px] font-bold text-center">项目名称</td><td className="border border-black p-3" colSpan={3}>{project.projectName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目所在地</td><td className="border border-black p-3" colSpan={3}>{project.location}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人名称</td><td className="border border-black p-3" colSpan={3}>{project.clientName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">合同价格</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.amount} 万元</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">执行周期</td><td className="border border-black p-3" colSpan={3}>{project.signingDate} 至 {project.endDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[100px]">主要承担的工作</td><td className="border border-black p-3 align-top italic" colSpan={3}>{project.leaderExperience}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目负责人</td><td className="border border-black p-3" colSpan={3}>{project.leader}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[180px]">项目内容描述</td><td className="border border-black p-3 text-justify align-top" colSpan={3}>{project.content}</td></tr>
        </tbody>
      </table>
    </div>
    {project.contractScanUrls?.map((url, i) => (
      <div key={i} className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
        <h3 className="text-lg font-bold border-l-4 border-slate-900 pl-4 mb-8">附件：项目合同扫描件 ({i + 1})</h3>
        <div className="flex-1 flex items-center justify-center"><img src={url} className="max-w-full max-h-full object-contain" alt="contract" /></div>
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 深度详情模态框：展示业绩库中的“全部信息和图片”
// --------------------------------------------------------------------------------
const ProjectDetailModal: React.FC<{ project: ProjectExperience; onClose: () => void }> = ({ project, onClose }) => {
  const Section = ({ icon: Icon, title, children }: any) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
        <Icon size={16} className="text-blue-400" />
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, color = "text-slate-300" }: any) => (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</p>
      <p className={`font-bold ${color}`}>{value || '--'}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/20 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500 text-left">
        {/* 头部 */}
        <div className="px-10 py-8 border-b border-white/5 flex items-start justify-between bg-white/5 shrink-0">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 shrink-0">
              <Trophy size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-500/30">ID: {project.id}</span>
                <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-widest">{project.projectType}</span>
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">{project.projectName}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-dark">
          <Section icon={ClipboardList} title="档案目录与身份 (Registry)">
             <InfoItem label="签订年份" value={project.contractYear} />
             <InfoItem label="合同金额" value={`${project.amount} 万元`} color="text-emerald-400" />
             <InfoItem label="验收质量" value={project.quality} color="text-amber-400" />
             <InfoItem label="当前状态" value={project.contractStatus} />
          </Section>

          <Section icon={Building2} title="发包单位与实施地 (Entity)">
             <InfoItem label="建设单位 (发包人)" value={project.clientName} />
             <InfoItem label="发包人地址" value={project.clientAddress} />
             <InfoItem label="联系人 / 电话" value={`${project.contact} (${project.phone})`} />
             <InfoItem label="实施所在地" value={project.location} />
          </Section>

          <Section icon={CalendarDays} title="时间维度 (Timeline)">
             <InfoItem label="合同签订时间" value={project.signingDate} />
             <InfoItem label="竣工验收时间" value={project.endDate} />
          </Section>

          <Section icon={UserPlus} title="执行团队 (Team)">
             <InfoItem label="项目负责人" value={project.leader} />
             <div className="col-span-1 md:col-span-2 space-y-1.5 mt-2">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">负责人具体承担工作</p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 italic text-sm text-slate-300 leading-relaxed">{project.leaderExperience}</div>
             </div>
             <InfoItem label="团队成员构成" value={project.members} />
             <div className="col-span-1 md:col-span-2 space-y-1.5 mt-2">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">项目整体描述</p>
                <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-sm text-slate-300 leading-relaxed">{project.content}</div>
             </div>
          </Section>

          {/* 图像凭证区 */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
              <ImageIcon size={16} className="text-emerald-400" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-widest">全量原始图档凭证 (Evidences)</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 合同 */}
              {project.contractScanUrls?.map((url, i) => (
                <div key={`c-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">合同扫描件 #{i+1}</p>
                   <div className="aspect-[3/4] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="contract" />
                   </div>
                </div>
              ))}
              {/* 发票 */}
              {project.invoiceUrls?.map((url, i) => (
                <div key={`i-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">结算发票凭证</p>
                   <div className="aspect-[4/3] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="invoice" />
                   </div>
                </div>
              ))}
              {/* 查验 */}
              {project.invoiceVerifyUrls?.map((url, i) => (
                <div key={`v-${i}`} className="space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase text-center tracking-widest">税务查验截图</p>
                   <div className="aspect-[4/3] bg-black/40 rounded-3xl overflow-hidden border border-white/10 group cursor-zoom-in">
                      <img src={url} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="verify" />
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="p-8 bg-white/5 border-t border-white/5 flex justify-end shrink-0">
          <button onClick={onClose} className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">关闭预览</button>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// 主工作空间组件
// --------------------------------------------------------------------------------
const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser }) => {
  // 模拟全量数据库同步 (保持原样)
  const fullPersonnelPool: Personnel[] = [
    { id: 's-huang', name: '黄石亮', age: 40, education: '本科', title: '高级顾问', proposedPosition: '咨询顾问', years: 17, similarYears: 15, school: '中山大学', major: '计算机科学与技术', gradDate: '2013', currentLoad: 0.6, educations: [{ level: '本科', school: '中山大学', major: '计算机科学与技术', gradDate: '2013' }], certs: [{ name: 'PMP证书', level: '高级', authority: 'PMI', number: 'PMP-123', validity: '2027' }], projects: [{ time: '2022', projectName: '南网科技创新管理咨询', serviceType: '管理咨询', role: '负责人', client: '南网', contact: '游XX', phone: '156...' }] },
    { id: 's-zhang-wei', name: '张维国', age: 45, education: '博士', title: '教授级高工', proposedPosition: '技术总监', years: 22, similarYears: 18, school: '清华大学', major: '电力系统自动化', gradDate: '2008', currentLoad: 0.4, educations: [{ level: '博士', school: '清华大学', major: '电力系统自动化', gradDate: '2008' }], certs: [{ name: '注册电气工程师', level: '执业资格', authority: '人社部', number: 'DG-001', validity: '2028' }], projects: [{ time: '2021', projectName: '±800kV特高压运维系统', serviceType: '运维', role: '总监', client: '国网', contact: '王主任', phone: '010...' }] },
    { id: 's-li-ming', name: '李明', age: 38, education: '硕士', title: '高级架构师', proposedPosition: '架构负责人', years: 15, similarYears: 12, school: '西安交通大学', major: '软件工程', gradDate: '2012', currentLoad: 0.3, educations: [{ level: '硕士', school: '西安交大', major: '软件工程', gradDate: '2012' }], certs: [{ name: 'AWS 架构师', level: '专家', authority: 'Amazon', number: 'AWS-123', validity: '2025' }], projects: [{ time: '2023', projectName: '数字化审计平台', serviceType: '软件研发', role: '首席架构', client: '国网新源', contact: '李工', phone: '138...' }] },
    { id: 's-wang-fang', name: '王芳', age: 34, education: '本科', title: '注册造价师', proposedPosition: '造价经理', years: 12, similarYears: 10, school: '华北电力大学', major: '工程造价', gradDate: '2012', currentLoad: 0.5, educations: [{ level: '本科', school: '华北电力', major: '工程造价', gradDate: '2012' }], certs: [{ name: '一级造价工程师', level: '执业资格', authority: '住建部', number: 'ZJ-120', validity: '2026' }], projects: [{ time: '2022', projectName: '蒙东电力造价咨询', serviceType: '造价咨询', role: '负责人', client: '内蒙古电力', contact: '赵科', phone: '0471...' }] },
    { id: 's-zhao-chen', name: '赵晨', age: 41, education: '本科', title: '高级安评师', proposedPosition: '安质负责人', years: 18, similarYears: 16, school: '武汉大学', major: '安全工程', gradDate: '2006', currentLoad: 0.2, educations: [{ level: '本科', school: '武汉大学', major: '安全工程', gradDate: '2006' }], certs: [{ name: '注册安全工程师', level: '执业资格', authority: '应急部', number: 'AQ-045', validity: '2027' }], projects: [{ time: '2022', projectName: '江苏电力安全评价', serviceType: '安全评估', role: '总监', client: '江苏电力', contact: '孙处', phone: '135...' }] },
    { id: 's-liu-yang', name: '刘洋', age: 31, education: '本科', title: '中级工程师', proposedPosition: '实施组长', years: 8, similarYears: 6, school: '电子科技大学', major: '通信工程', gradDate: '2016', currentLoad: 0.8, educations: [{ level: '本科', school: '电子科大', major: '通信工程', gradDate: '2016' }], certs: [{ name: '通信工程师', level: '中级', authority: '工信部', number: 'TX-033', validity: '永久' }], projects: [{ time: '2024', projectName: '海南输电视频覆盖', serviceType: '工程实施', role: '组长', client: '海南电网', contact: '林经理', phone: '133...' }] }
  ];

  const fullProjectPool: ProjectExperience[] = [
    { id: 'p1', contractYear: '2021', index: 1, projectType: '营销服务类', projectName: '海口供电局2021年客服满意度及优化营商环境宣传项目', keywords: ['营商环境', '满意度'], amount: '61.0', signingDate: '2021-10', endDate: '2021-12', clientName: '海口供电局', clientAddress: '海南省海口市海甸岛五西路', location: '海南省海口市', quality: '优', leader: '黄石亮', leaderExperience: '项目总负责，统筹创意策划与成片交付，对接供电局营销部。', content: '设计24节气海报、编制10期优化营商环境故事漫画、拍摄主题微电影及电力人宣传片。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P1'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P1'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P1'], contractStatus: '已完成', extendedKeywords: [], members: '策划组、摄影组', memberExperience: '', phone: '186-XXXX-6460', contact: '张主任', remarks: '' },
    { id: 'p2', contractYear: '2022', index: 2, projectType: '变电站工程类', projectName: '广州供电局220kV天河站数字化改造EPC总承包项目', keywords: ['变电站', '数字化改造'], amount: '1280.5', signingDate: '2022-03', endDate: '2022-12', clientName: '广州供电局', clientAddress: '广州市天河区华穗路', location: '广东省广州市', quality: '优', leader: '王志强', leaderExperience: 'EPC项目经理，全盘协调设计、采购及施工进度，攻克不停电改造技术难题。', content: '对天河变电站全站二次设备数字化升级，涵盖保护监控系统、智能辅助监控系统安装调试。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P2'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P2'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P2'], contractStatus: '已完成', extendedKeywords: [], members: '二次保护组、通信调试组', memberExperience: '', phone: '139-XXXX-XXXX', contact: '陈经理', remarks: '' },
    { id: 'p3', contractYear: '2023', index: 3, projectType: '技术服务类', projectName: '深圳供电局2023年输电线路无人机巡检算法外包服务', keywords: ['无人机', 'AI巡检'], amount: '185.0', signingDate: '2023-01', endDate: '2023-12', clientName: '深圳供电局', clientAddress: '深圳市罗湖区深南东路', location: '广东省深圳市', quality: '合格', leader: '刘思源', leaderExperience: '技术负责人，主持深度学习模型训练与部署，实现识别准确率由80%提升至92%。', content: '针对输电鸟巢、销钉脱落、绝缘子破损的AI自动识别模型开发，并提供年度巡检数据处理。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P3'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P3'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P3'], contractStatus: '履行中', extendedKeywords: [], members: '算法小组', memberExperience: '', phone: '137-XXXX-XXXX', contact: '林主管', remarks: '' },
    { id: 'p4', contractYear: '2020', index: 4, projectType: '营销服务类', projectName: '海南电网三亚供电局2020年智慧营业厅建设及运营项目', keywords: ['智慧营业厅', '办电终端'], amount: '320.0', signingDate: '2020-05', endDate: '2020-11', clientName: '三亚供电局', clientAddress: '三亚市吉阳区迎宾路', location: '海南省三亚市', quality: '优', leader: '吴海洋', leaderExperience: '项目总监，负责空间设计审核、硬件集成管理及交互流程优化，获评南网年度示范。', content: '对三亚核心营业厅数字化改造，部署智能导览机器人、VR互动区及全自助办电终端。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P4'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P4'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P4'], contractStatus: '已完成', extendedKeywords: [], members: '设计室、集成部', memberExperience: '', phone: '189-XXXX-XXXX', contact: '赵科长', remarks: '' },
    { id: 'p5', contractYear: '2021', index: 5, projectType: '技术服务类', projectName: '海南电网公司电力调度中心网络安全态势感知运维', keywords: ['网络安全', '态势感知'], amount: '145.0', signingDate: '2021-06', endDate: '2022-06', clientName: '海南电网', clientAddress: '海口市海府路', location: '海南省海口市', quality: '优', leader: '李明伟', leaderExperience: '安全运维总长，建立主动防御体系，圆满完成重大保电期间的网络安全保障任务。', content: '提供7x24小时网络安全监控、漏洞扫描、基线核查及应急演练，保障调度大楼内网资产安全。', contractScanUrls: ['https://placehold.co/800x1200?text=Contract+P5'], invoiceUrls: ['https://placehold.co/1000x600?text=Invoice+P5'], invoiceVerifyUrls: ['https://placehold.co/800x600?text=Verify+P5'], contractStatus: '已完成', extendedKeywords: [], members: 'SOC团队', memberExperience: '', phone: '150-XXXX-XXXX', contact: '孙工', remarks: '' }
  ];

  // 状态
  const [phase, setPhase] = useState<'hub' | 'task' | 'team_preview' | 'exp_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<ProjectExperience[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [expAiRecommendations, setExpAiRecommendations] = useState<any[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // 详情查看状态
  const [viewDetailProject, setViewDetailProject] = useState<ProjectExperience | null>(null);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  const checkEditPermission = (taskId: string | null) => {
    if (!currentUser || !currentTask) return true; // Demo mode
    return true;
  };
  const isCurrentStageEditable = useMemo(() => checkEditPermission(activeTaskId), [activeTaskId, currentUser]);

  const handleExpAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setExpAiRecommendations([
        { project: fullProjectPool[2], reason: '该项目包含“无人机AI巡检”与本项目“分析引擎”属于同类型信通技术服务，且匹配度极高。', matchScore: 98 },
        { project: fullProjectPool[4], reason: '态势感知运维业绩可有力证明我司在电网生产数字化系统稳定性保障方面的综合实力。', matchScore: 91 },
        { project: fullProjectPool[1], reason: '220kV数字化改造大型EPC经验，是本次投标包中“研发+实施”背景的强力补充。', matchScore: 86 }
      ]);
      setIsAiRecommending(false);
    }, 1500);
  };

  const handleTeamAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiRecommendations([
        { person: fullPersonnelPool[1], reason: '清华博士，具18年特高压研发经验，完美适配。', matchScore: 99 },
        { person: fullPersonnelPool[2], reason: '高级架构师，曾负责同类数字化审计平台。', matchScore: 96 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  const toggleProject = (p: ProjectExperience) => {
    setSelectedProjects(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);
  };

  const togglePerson = (p: Personnel) => {
    setSelectedPersonnel(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);
  };

  const handleStartTask = (taskId: 'team' | 'exp' | 'content') => {
    setActiveTaskId(taskId);
    setPhase('task');
    setTasks(prev => prev.map(t => t.id === taskId && t.status === 'pending' ? { ...t, status: 'processing', progress: 30 } : t));
  };

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));
    setPhase('hub');
    setActiveTaskId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 text-left">
      
      {/* 详情弹窗挂载 */}
      {viewDetailProject && <ProjectDetailModal project={viewDetailProject} onClose={() => setViewDetailProject(null)} />}

      <header className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg"><Layers size={24} /></div>
          <div><h3 className="text-sm font-black text-slate-900 uppercase italic leading-none">Bidding Authoring Workshop V2.9</h3><p className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest italic">Intelligent document composition system</p></div>
        </div>
        {phase !== 'hub' && <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors"><Trash2 size={18} className="mr-2" /> 退出环节</button>}
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in duration-700">
             {tasks.map(task => (
               <div key={task.id} className={`relative h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 'border-slate-50 shadow-sm'}`}>
                  <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 ${task.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'}`}><task.icon size={48} /></div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8"><div className={`h-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div></div>
                  <button onClick={() => handleStartTask(task.id)} className="px-12 py-4 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">{task.status === 'completed' ? '重新校阅' : '进入环节'}</button>
               </div>
             ))}
          </div>
        )}

        {/* 业绩遴选环节 */}
        {phase === 'task' && activeTaskId === 'exp' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-emerald-600 shadow-emerald-100"><Briefcase size={24}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">筛选支撑项目业绩</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic italic">Strategic matching of corporate performance assets</p></div>
                </div>
                <div className="flex space-x-4">
                  {selectedProjects.length > 0 && <button onClick={() => setPhase('exp_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">生成并预览业绩支撑全案 ({selectedProjects.length})</button>}
                  <button onClick={() => markTaskCompleted('exp')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"><CheckCircle2 size={18} className="mr-3 inline" /> 提交锁定业绩</button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main bg-white">
                <div className="grid grid-cols-5 gap-12">
                   <div className="col-span-3 space-y-12">
                      {/* AI 推荐区 - 极大增强字段丰富度 */}
                      <section>
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center italic"><Bot size={28} className="text-blue-600 mr-4" /><h4 className="text-sm font-black text-slate-900 uppercase">GridGPT 业绩匹配引擎推荐</h4></div>
                            <button onClick={handleExpAiRecommend} disabled={isAiRecommending} className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl disabled:opacity-50">
                               {isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}启动智能契合度分析
                            </button>
                         </div>
                         <div className="space-y-6">
                            {expAiRecommendations.map((rec, idx) => {
                              const p = rec.project;
                              const isSelected = selectedProjects.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className="p-8 rounded-[48px] border-2 border-blue-50 bg-blue-50/20 flex flex-col relative overflow-hidden group animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                                   <div className="absolute top-0 right-0 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-[32px] italic tracking-[0.2em] shadow-lg flex items-center">
                                      <Zap size={12} className="mr-2 text-amber-300 animate-pulse" /> 语义契合度 {rec.matchScore}%
                                   </div>
                                   <div className="flex items-start space-x-6 mb-8 text-left">
                                      <div className="w-16 h-16 rounded-[24px] bg-white shadow-xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform"><Trophy size={28} className="text-blue-600" /></div>
                                      <div className="flex-1 min-w-0">
                                         <p className="text-xl font-black text-slate-900 italic tracking-tighter leading-tight mb-2 pr-20 truncate">{p.projectName}</p>
                                         <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase italic">年份：{p.contractYear}</span>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[9px] font-black rounded uppercase italic">金额：{p.amount}W</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase italic">{p.projectType}</span>
                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[9px] font-black rounded uppercase italic">质量：{p.quality}</span>
                                         </div>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-8 mb-8">
                                      <div className="space-y-2">
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center"><Target size={12} className="mr-1.5" /> 核心实施内容</p>
                                         <p className="text-xs text-slate-600 leading-relaxed font-medium italic line-clamp-3">{p.content}</p>
                                      </div>
                                      <div className="space-y-2">
                                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center"><UserSearch size={12} className="mr-1.5" /> 负责人岗位职责</p>
                                         <p className="text-xs text-slate-600 leading-relaxed font-medium italic line-clamp-3">{p.leaderExperience}</p>
                                      </div>
                                   </div>
                                   <div className="bg-white/80 p-5 rounded-3xl border border-blue-100 mb-8">
                                      <p className="text-[10px] text-blue-700 font-bold italic leading-relaxed"><Sparkles size={14} className="inline mr-2" />推荐逻辑：{rec.reason}</p>
                                   </div>
                                   <div className="flex space-x-3">
                                      <button onClick={() => setViewDetailProject(p)} className="flex-1 py-4 bg-slate-50 text-slate-500 hover:bg-white hover:text-blue-600 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center"><Eye size={16} className="mr-2"/>查看库内完整档案及图档</button>
                                      <button onClick={() => toggleProject(p)} className={`flex-[1.5] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{isSelected ? '已加入标书业绩池' : '引用此项目至标书'}</button>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>

                      {/* 手动搜索列表 */}
                      <section>
                         <div className="flex items-center space-x-4 mb-8"><div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-100"><Search size={20} /></div><h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">全业绩资产库手动精选</h4></div>
                         <div className="relative mb-8"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} /><input value={projectSearchQuery} onChange={e => setProjectSearchQuery(e.target.value)} placeholder="搜索项目全称、发包人、负责人或关键字..." className="w-full pl-12 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-emerald-600 outline-none rounded-[28px] font-bold text-lg shadow-inner focus:bg-white transition-all" /></div>
                         <div className="space-y-4 max-h-[600px] overflow-y-auto p-2 custom-scrollbar-main">
                            {fullProjectPool.filter(p => !projectSearchQuery || p.projectName.includes(projectSearchQuery) || p.clientName.includes(projectSearchQuery)).map(p => {
                              const isSelected = selectedProjects.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className={`p-6 rounded-[32px] border-2 transition-all flex flex-col group ${isSelected ? 'border-emerald-600 bg-emerald-50/20 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-white'}`}>
                                   <div className="flex justify-between items-start mb-6">
                                      <div className="text-left pr-10">
                                         <p className="text-lg font-black text-slate-900 italic leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{p.projectName}</p>
                                         <div className="flex flex-wrap gap-2">{p.keywords.map((k, i) => <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-black rounded uppercase italic">{k}</span>)}</div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                         <button onClick={() => setViewDetailProject(p)} className="p-3 bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all" title="查看详情"><Info size={18}/></button>
                                         <button onClick={() => toggleProject(p)} className={`p-3 rounded-xl transition-all ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'}`}>{isSelected ? <Check size={18} strokeWidth={4}/> : <Plus size={18}/>}</button>
                                      </div>
                                   </div>
                                   <div className="grid grid-cols-4 gap-6 pt-6 border-t border-slate-50 text-left">
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">发包人 (单位)</span><span className="text-[11px] font-black text-slate-700 italic truncate block">{p.clientName}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">项目总额</span><span className="text-[11px] font-black text-emerald-600 block">{p.amount}W</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">负责人</span><span className="text-[11px] font-black text-slate-700 block">{p.leader}</span></div>
                                      <div><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-1 block">执行周期</span><span className="text-[11px] font-black text-slate-400 block">{p.contractYear}</span></div>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>
                   </div>

                   <div className="col-span-2">
                      <div className="bg-slate-950 p-8 rounded-[56px] min-h-[800px] flex flex-col shadow-2xl border border-white/10 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent pointer-events-none" />
                         <div className="flex items-center justify-between mb-10 relative z-10 text-white"><div className="flex items-center space-x-3 italic"><DatabaseZap size={20} className="text-emerald-400" /><h4 className="text-sm font-black uppercase tracking-tighter">标书支撑业绩池</h4></div><span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-emerald-400 border border-white/10 italic">已选 {selectedProjects.length} 项</span></div>
                         <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 relative z-10">
                            {selectedProjects.map((p, idx) => (
                              <div key={p.id} className="p-5 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all">
                                 <div className="flex items-center space-x-4 min-w-0 flex-1"><div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg shrink-0">{idx + 1}</div><div className="text-left min-w-0"><p className="text-sm font-black text-white italic truncate">{p.projectName}</p><div className="flex items-center space-x-2 mt-1"><span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest italic">{p.amount}W</span><span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate">· {p.clientName}</span></div></div></div>
                                 <button onClick={() => toggleProject(p)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 成员拟定环节 (逻辑保持不变) */}
        {phase === 'task' && activeTaskId === 'team' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-indigo-600 shadow-indigo-100"><Users size={24}/></div>
                   <div><h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">拟定团队成员名单</h3></div>
                </div>
                <div className="flex space-x-4">
                  {selectedPersonnel.length > 0 && <button onClick={() => setPhase('team_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">预览成员简历全案 ({selectedPersonnel.length})</button>}
                  <button onClick={() => markTaskCompleted('team')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"><CheckCircle2 size={18} className="mr-3 inline" /> 提交锁定名单</button>
                </div>
             </div>
             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main bg-white">
                <div className="grid grid-cols-5 gap-12">
                   <div className="col-span-3 space-y-12">
                      <section>
                         <div className="flex items-center justify-between mb-8"><div className="flex items-center italic"><Bot size={28} className="text-blue-600 mr-4" /><h4 className="text-sm font-black text-slate-900 uppercase">GridGPT 团队匹配引擎</h4></div><button onClick={handleTeamAiRecommend} disabled={isAiRecommending} className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl disabled:opacity-50">{isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}启动辅助选人</button></div>
                         <div className="space-y-4">{aiRecommendations.map(rec => (<div key={rec.person.id} className="p-6 rounded-[40px] border-2 bg-slate-50/50 flex flex-col relative overflow-hidden group animate-in slide-in-from-left"><div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-[24px] italic tracking-widest shadow-lg flex items-center"><Zap size={12} className="mr-2 text-amber-300" /> AI 匹配度 {rec.matchScore}%</div><div className="flex items-center space-x-5 mb-6"><div className="w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl bg-white shadow-xl text-blue-600 border border-blue-50">{rec.person.name[0]}</div><div><p className="text-xl font-black text-slate-900 italic tracking-tighter mb-2">{rec.person.name}</p><span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase italic">{rec.person.title}</span></div></div><div className="bg-blue-50/50 p-4 rounded-3xl border border-blue-100 mb-6"><p className="text-[10px] text-blue-600 font-bold italic"><Sparkles size={12} className="inline mr-2" /> {rec.reason}</p></div><button onClick={() => togglePerson(rec.person)} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ${selectedPersonnel.find(i=>i.id===rec.person.id) ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>{selectedPersonnel.find(i=>i.id===rec.person.id) ? '已指派' : '指派至项目'}</button></div>))}</div>
                      </section>
                   </div>
                   <div className="col-span-2"><div className="bg-slate-950 p-8 rounded-[56px] min-h-[600px] flex flex-col shadow-2xl border border-white/10"><div className="flex items-center justify-between mb-10 text-white"><div className="flex items-center space-x-3 italic"><UserPlus size={20} className="text-indigo-400" /><h4 className="text-sm font-black uppercase tracking-tighter">已选定项目团队</h4></div><span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-indigo-400 border border-white/10 italic">{selectedPersonnel.length} 人</span></div><div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2">{selectedPersonnel.map((p, idx) => (<div key={p.id} className="p-5 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all"><div className="flex items-center space-x-4"><div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg">{idx + 1}</div><div className="text-left"><p className="text-sm font-black text-white italic">{p.name}</p><span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic">{p.proposedPosition}</span></div></div><button onClick={() => togglePerson(p)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button></div>))}</div></div></div>
                </div>
             </div>
          </div>
        )}

        {/* 预览环节：业绩篇 */}
        {phase === 'exp_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">放大</button>
                   </div>
                   <span className="text-xs font-bold text-emerald-400 flex items-center uppercase tracking-widest"><BadgeCheck size={18} className="mr-3" /> 业绩全案长文档合并预览 (Project Batch)</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回修改</button>
                  <button className="flex items-center px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-emerald-900/40 transition-all">
                    <FileDown size={18} className="mr-3" /> 导出业绩合规全案 (.docx)
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth">
                  <div className="origin-top transition-all space-y-24" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedProjects.map((project) => <ProjectFullDocumentMerged key={project.id} project={project} />)}
                  </div>
              </div>
          </div>
        )}

        {/* 预览环节：人员篇 */}
        {phase === 'team_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">放大</button>
                   </div>
                   <span className="text-xs font-bold text-blue-400 flex items-center uppercase tracking-widest"><ShieldCheck size={18} className="mr-3" /> 团队成员简历及配套资历全案预览</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回修改</button>
                  <button className="flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-blue-900/40 transition-all"><FileDown size={18} className="mr-3" /> 导出简历证书包</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth">
                  <div className="origin-top transition-all space-y-24" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedPersonnel.map((person) => <div key={person.id} className="relative bg-white shadow-2xl p-[20mm] w-[210mm] min-h-[297mm] flex flex-col text-left font-serif">
                       <h2 className="text-xl font-black text-center mb-8">{person.name}个人简历表</h2>
                       <table className="w-full border-collapse border border-black text-sm">
                         <tbody>
                            <tr><td className="border border-black p-2 bg-slate-50 font-bold w-24 text-center">姓名</td><td className="border border-black p-2 text-center">{person.name}</td><td className="border border-black p-2 bg-slate-50 font-bold w-24 text-center">职称</td><td className="border border-black p-2 text-center">{person.title}</td></tr>
                            <tr><td className="border border-black p-2 bg-slate-50 font-bold text-center">学历</td><td className="border border-black p-2 text-center">{person.education}</td><td className="border border-black p-2 bg-slate-50 font-bold text-center">工龄</td><td className="border border-black p-2 text-center">{person.years}年</td></tr>
                            <tr><td className="border border-black p-2 bg-slate-50 font-bold text-center">毕业院校</td><td className="border border-black p-2 text-center" colSpan={3}>{person.school} · {person.major}</td></tr>
                         </tbody>
                       </table>
                    </div>)}
                  </div>
              </div>
          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; }
        .custom-scrollbar-main::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;
