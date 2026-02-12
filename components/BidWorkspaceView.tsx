import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  UserSearch,
  Type,
  List,
  ListOrdered,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  MessageSquarePlus,
  Paperclip,
  Send,
  Wand2,
  FileUp,
  FileStack,
  Medal,
  Activity,
  UserCheck,
  ChevronLeft,
  LockKeyhole,
  UnlockKeyhole,
  ShieldHalf,
  Filter,
  UserPlus2,
  SearchCode,
  Maximize2,
  FileArchive,
  FileCheck,
  Layout,
  Star
} from 'lucide-react';
import { BiddingTask, StaffUser, Personnel, ProjectExperience } from '../types';

interface BidWorkspaceViewProps {
  currentTask?: BiddingTask;
  currentUser: StaffUser | null;
  onUpdateTask?: (task: BiddingTask) => void;
}

interface TaskStatus {
  id: 'team' | 'exp' | 'content';
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  icon: any;
  color: string;
}

interface ReferenceFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadTime: string;
}

// --------------------------------------------------------------------------------
// 极致 Word 仿真组件：项目业绩全案 (A4 布局)
// --------------------------------------------------------------------------------
const ProjectFullDocumentMerged: React.FC<{ project: ProjectExperience }> = ({ project }) => (
  <div className="flex flex-col items-center space-y-16 mb-40 animate-in fade-in duration-700">
    <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[25.4mm] flex flex-col shrink-0 overflow-hidden" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
      <div className="absolute top-[15mm] right-[20mm] px-4 py-1 border border-slate-400 text-[9pt] text-slate-400 italic font-sans uppercase tracking-widest">Archive Copy - GridBid AI</div>
      <h2 className="text-[18pt] font-bold text-center mb-[15mm] tracking-[4pt] underline underline-offset-[12px] decoration-slate-900">项目基本情况表</h2>
      <table className="w-full border-collapse border-[1.5pt] border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr><td className="border border-black p-3 bg-slate-50 w-[140px] font-bold text-center">项目名称</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.projectName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目所在地</td><td className="border border-black p-3" colSpan={3}>{project.location}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人名称</td><td className="border border-black p-3" colSpan={3}>{project.clientName}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人地址</td><td className="border border-black p-3" colSpan={3}>{project.clientAddress}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">发包人电话</td><td className="border border-black p-3" colSpan={3}>{project.contact} / {project.phone}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">合同价格</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.amount} 万元</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">开工日期</td><td className="border border-black p-3 font-mono" colSpan={3}>{project.signingDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">竣工日期</td><td className="border border-black p-3 font-mono" colSpan={3}>{project.endDate}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[120px]">承担的工作</td><td className="border border-black p-3 align-top italic leading-relaxed" colSpan={3}>{project.leaderExperience}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">工程质量</td><td className="border border-black p-3" colSpan={3}>{project.quality}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">项目负责人</td><td className="border border-black p-3 font-bold" colSpan={3}>{project.leader}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center h-[200px]">项目描述</td><td className="border border-black p-3 text-justify align-top font-serif leading-relaxed" colSpan={3}>{project.content}</td></tr>
          <tr><td className="border border-black p-3 bg-slate-50 font-bold text-center">其他说明</td><td className="border border-black p-3 italic text-slate-500" colSpan={3}>{project.remarks || '无'}</td></tr>
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40">
        <span className="text-[9pt] font-sans">导出日期：{new Date().toLocaleDateString()}</span>
        <span className="text-[9pt] font-sans">Page 1</span>
      </div>
    </div>
    {project.contractScanUrls?.map((url, i) => (
      <div key={`contract-${i}`} className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[20mm] transition-all flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
        <h3 className="text-[14pt] font-bold border-l-[6pt] border-black pl-4 mb-10 tracking-wider">附件一：项目合同关键页扫描件 ({i + 1})</h3>
        <div className="flex-1 flex flex-col items-center justify-center border-[0.5pt] border-slate-100 bg-slate-50/30 p-4">
          <img src={url} alt="contract" className="max-w-full max-h-full object-contain shadow-lg" />
        </div>
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 人员资历仿真组件 (A4 布局)
// --------------------------------------------------------------------------------
const PersonnelFullDocumentMerged: React.FC<{ person: Personnel; isLeader?: boolean }> = ({ person, isLeader }) => (
  <div className="flex flex-col items-center space-y-16 mb-40 animate-in fade-in duration-700">
    <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left font-serif p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm', border: '1px solid #e2e8f0' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border border-slate-300 text-[8pt] text-slate-300 uppercase">Registry Personnel Form V3.1</div>
      {isLeader && (
        <div className="absolute top-10 left-10 text-blue-600 flex items-center space-x-2 animate-pulse">
          <Star size={18} fill="currentColor" />
          <span className="text-[10pt] font-black uppercase tracking-widest font-sans italic">Project Leader</span>
        </div>
      )}
      <h2 className="text-[18pt] font-black text-center mb-10 tracking-[6pt] underline underline-offset-[12px] decoration-slate-900">拟任本项目主要人员简历表</h2>
      <table className="w-full border-collapse border-[1.5pt] border-black text-[10.5pt] leading-[1.8]">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">姓 名</td>
            <td className="border border-black p-2 text-center w-[120px] font-bold">{person.name}</td>
            <td className="border border-black p-2 bg-slate-50 w-[90px] font-bold text-center italic">年 龄</td>
            <td className="border border-black p-2 text-center w-[80px]">{person.age}</td>
            <td className="border border-black p-2 bg-slate-50 w-[130px] font-bold text-center leading-tight italic">执业资格/岗位证书</td>
            <td className="border border-black p-2 align-top text-[9.5pt]">
              {person.certs.map((c, i) => <div key={i}>● {c.name}</div>)}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">职 称</td>
            <td className="border border-black p-2 text-center">{person.title}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">学 历</td>
            <td className="border border-black p-2 text-center">{person.education}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center leading-tight italic">拟在本项目任职</td>
            <td className="border border-black p-2 text-center font-bold text-blue-800">{person.proposedPosition}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">总工龄</td>
            <td className="border border-black p-2 text-center font-bold">{person.years} 年</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic" colSpan={2}>从事类似工作年限</td>
            <td className="border border-black p-2 text-center font-bold text-emerald-800" colSpan={2}>{person.similarYears} 年</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center italic">毕业学校</td>
            <td className="border border-black p-3 text-center" colSpan={5}>
              <span className="font-bold">{person.gradDate}</span> 年毕业于 <span className="font-bold underline">{person.school}</span> {person.major} 专业
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-100 font-bold text-center uppercase tracking-[4pt]" colSpan={6}>主 要 工 正 经 历</td>
          </tr>
          <tr className="bg-slate-50 text-[9.5pt] font-bold">
            <td className="border border-black p-2 text-center">时间周期</td>
            <td className="border border-black p-2 text-center" colSpan={3}>参加过的类似项目名称</td>
            <td className="border border-black p-2 text-center">担任职务</td>
            <td className="border border-black p-2 text-center">证明人及电话</td>
          </tr>
          {person.projects.map((proj, idx) => (
            <tr key={idx}>
              <td className="border border-black p-2 text-center text-[9pt] font-mono">{proj.time}</td>
              <td className="border border-black p-2 text-[10pt] leading-relaxed italic" colSpan={3}>{proj.projectName}</td>
              <td className="border border-black p-2 text-center text-[9.5pt] font-bold">{proj.role}</td>
              <td className="border border-black p-2 text-center text-[9pt]">
                <div className="font-bold">{proj.contact}</div>
                <div className="text-slate-500 mt-1 font-mono">{proj.phone}</div>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 10 - person.projects.length) }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" colSpan={3}></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 text-[9pt]">
        <span>GridBid AI 资历归档中心</span>
        <span className="italic">Page 1</span>
      </div>
    </div>
    
    {person.educations.some(e => e.gradCertUrl || e.degreeCertUrl) && (
      <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件：学历及学位证书扫描件</h3>
         <div className="grid grid-cols-2 gap-8">
            {person.educations.map((edu, i) => (
              <div key={i} className="space-y-4">
                 <p className="text-xs font-bold text-slate-500 uppercase">{edu.level} - {edu.school}</p>
                 {edu.gradCertUrl && <img src={edu.gradCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />}
                 {edu.degreeCertUrl && <img src={edu.degreeCertUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />}
              </div>
            ))}
         </div>
      </div>
    )}

    {person.certs.filter(c => c.fileUrl).map((c, i) => (
      <div key={`cert-${i}`} className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-[20mm] mb-10 shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-black pl-4 mb-10">附件：执业资格证书 ({c.name})</h3>
         <img src={c.fileUrl} className="w-full border border-slate-100 shadow-sm rounded-lg" />
      </div>
    ))}
  </div>
);

// --------------------------------------------------------------------------------
// 主工作空间组件
// --------------------------------------------------------------------------------
const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser, onUpdateTask }) => {
  // 权限核心逻辑
  const isSysAdmin = currentUser?.id === 'ADMIN-001';
  const canEditTeam = isSysAdmin || (currentTask?.memberDraftingLeader?.id === currentUser?.id);
  const canEditExp = isSysAdmin || (currentTask?.expSelectionLeader?.id === currentUser?.id);
  const canEditContent = isSysAdmin || (currentTask?.techProposalLeader?.id === currentUser?.id);

  const getActiveCanEdit = () => {
    if (activeTaskId === 'team') return canEditTeam;
    if (activeTaskId === 'exp') return canEditExp;
    if (activeTaskId === 'content') return canEditContent;
    return false;
  };

  // 全量模拟数据
  const fullPersonnelPool: Personnel[] = [
    { id: 's-huang', name: '黄石亮', age: 40, education: '本科', title: '高级顾问', proposedPosition: '咨询顾问', years: 17, similarYears: 15, school: '中山大学', major: '计算机', gradDate: '2013', currentLoad: 0.6, educations: [{ level: '本科', school: '中山大学', major: '计算机', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=Grad+Cert', degreeCertUrl: 'https://placehold.co/800x600?text=Degree+Cert' }], certs: [{ name: 'PMP证书', level: '高级', authority: 'PMI', number: 'PMP-123', validity: '2027', fileUrl: 'https://placehold.co/600x800?text=PMP+Cert' }], projects: [{ time: '2022', projectName: '南网科技成果转化咨询', role: '负责人', client: '南网', contact: '游X', phone: '156...', serviceType: '咨询' }] },
    { id: 's-zhang-wei', name: '张维国', age: 45, education: '博士', title: '教授级高级工程师', proposedPosition: '技术总监', years: 22, similarYears: 18, school: '清华大学', major: '电力自动化', gradDate: '2008', currentLoad: 0.4, educations: [{ level: '博士', school: '清华大学', major: '电力系统及其自动化', gradDate: '2008', gradCertUrl: 'https://placehold.co/800x600?text=Tsinghua+PhD+Grad' }], certs: [{ name: '注册电气工程师', level: '执业', authority: '人社', number: 'DG-001', validity: '2028', fileUrl: 'https://placehold.co/600x800?text=Electrical+Cert' }], projects: [{ time: '2021', projectName: '±800kV特高压运维项目', role: '总监', client: '国网', contact: '王主任', phone: '010...', serviceType: '运维' }] },
    { id: 's-li-ming', name: '李明', age: 38, education: '硕士', title: '高级架构师', proposedPosition: '架构负责人', years: 15, similarYears: 12, school: '西安交大', major: '软件工程', gradDate: '2012', currentLoad: 0.3, educations: [{ level: '硕士', school: '西安交通大学', major: '软件工程', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=XJTU+Master+Grad' }], certs: [{ name: 'AWS 解决方案架构师认证', level: '专家级', authority: 'Amazon', number: 'AWS-SA-123', validity: '2025-10', fileUrl: 'https://placehold.co/600x800?text=AWS+Arch+Cert' }, { name: '系统分析师', level: '高级', authority: '工信部', number: 'SA-999', validity: '永久', fileUrl: '' }], projects: [{ time: '2023', projectName: '国网新源数字化审计平台', role: '架构师', client: '新源', contact: '李工', phone: '138...', serviceType: '开发' }] }
  ];

  const fullProjectPool: ProjectExperience[] = [
    { id: 'p1', contractYear: '2021', index: 1, projectType: '营销服务', projectName: '海口局2021客服宣传项目', keywords: ['宣传', '营商环境'], amount: '61.0', signingDate: '2021-10', endDate: '2021-12', clientName: '海口局', clientAddress: '海口', location: '海南', quality: '优', leader: '黄石亮', leaderExperience: '总负责', content: '设计海报、编制故事。', contractScanUrls: ['https://placehold.co/800x1200?text=P1+Contract'], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '策划组', memberExperience: '', phone: '186...', contact: '张主任', remarks: '' },
    { id: 'p2', contractYear: '2022', index: 2, projectType: '变电类', projectName: '广州局220kV天河站数字化改造', keywords: ['变电', 'EPC', '数字化'], amount: '1280.5', signingDate: '2022-03', endDate: '2022-12', clientName: '广州局', clientAddress: '广州', location: '广东', quality: '优', leader: '王志强', leaderExperience: '项目经理', content: '全站数字化升级调试。', contractScanUrls: ['https://placehold.co/800x1200?text=P2+Contract'], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '技术组', memberExperience: '', phone: '139...', contact: '陈经理', remarks: '' },
    { id: 'p3', contractYear: '2023', index: 3, projectType: '技术服务类', projectName: '深圳局2023无人机巡检算法服务', keywords: ['无人机', 'AI', '算法'], amount: '185.0', signingDate: '2023-01', endDate: '2023-12', clientName: '深圳局', clientAddress: '深圳', location: '广东', quality: '合格', leader: '刘思源', leaderExperience: '技术负责人', content: '开发缺陷识别AI模型。', contractScanUrls: ['https://placehold.co/800x1200?text=P3+Contract'], invoiceUrls: [], invoiceVerifyUrls: [], contractStatus: '已完成', extendedKeywords: [], members: '算法组', memberExperience: '', phone: '137...', contact: '林主管', remarks: '' }
  ];

  const [phase, setPhase] = useState<'hub' | 'task' | 'team_preview' | 'exp_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<ProjectExperience[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  
  // 新增：技术文件中的项目负责人 ID
  const [projectLeaderId, setProjectLeaderId] = useState<string | null>(null);

  // 深度详情模态框状态
  const [detailPerson, setDetailPerson] = useState<Personnel | null>(null);
  const [detailProject, setDetailProject] = useState<ProjectExperience | null>(null);

  // 搜索与判定状态
  const [personnelSearch, setPersonnelSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [expAiRecommendations, setExpAiRecommendations] = useState<any[]>([]);
  
  const [zoomLevel, setZoomLevel] = useState(100);
  const [draftContent, setDraftContent] = useState<string>(`# 技术响应方案预览\n\n## 第一章：项目实施整体思路\n针对本项目，我们将充分利用 GridGPT 引擎实现电网资产的智能化管理...`);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([
    { id: 'ref-1', name: '国网江苏电力2023同类项目技术方案.pdf', size: '4.2MB', type: 'PDF', uploadTime: '2024-10-24 14:00' }
  ]);
  const [isFilesProcessing, setIsFilesProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: '您好！我是 GridGPT 文档编撰助理。建议先上传相关的行业标准或以往标书作为 AI 语境参考。' }
  ]);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  useEffect(() => {
    if (currentTask) {
      setTasks(prev => prev.map(t => {
        if (t.id === 'team' && currentTask.isTeamDone) return { ...t, status: 'completed', progress: 100 };
        if (t.id === 'exp' && currentTask.isExpDone) return { ...t, status: 'completed', progress: 100 };
        if (t.id === 'content' && currentTask.isContentDone) return { ...t, status: 'completed', progress: 100 };
        return t;
      }));
    }
  }, [currentTask]);

  // 关键增强：为预览模式生成的已排序成员列表（负责人排在第一位）
  const previewPersonnelList = useMemo(() => {
    if (!projectLeaderId) return selectedPersonnel;
    const sorted = [...selectedPersonnel].sort((a, b) => {
      if (a.id === projectLeaderId) return -1;
      if (b.id === projectLeaderId) return 1;
      return 0;
    });
    return sorted;
  }, [selectedPersonnel, projectLeaderId]);

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    if (!getActiveCanEdit()) {
       alert("抱歉，您不是该环节的负责人，无法锁定归档。");
       return;
    }
    if (taskId === 'team' && selectedPersonnel.length > 0 && !projectLeaderId) {
      alert("请在已选团队池中指定一名“项目负责人”，这将决定标书资历文件的排版顺序。");
      return;
    }
    if (!currentTask || !onUpdateTask) return;

    setPhase('hub');
    setActiveTaskId(null);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));

    const updatedTask = { ...currentTask };
    if (taskId === 'team') updatedTask.isTeamDone = true;
    if (taskId === 'exp') updatedTask.isExpDone = true;
    if (taskId === 'content') updatedTask.isContentDone = true;

    const doneCount = [updatedTask.isTeamDone, updatedTask.isExpDone, updatedTask.isContentDone].filter(Boolean).length;
    updatedTask.progress = Math.round((doneCount / 3) * 100);
    onUpdateTask(updatedTask);
  };

  const handleTeamAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiRecommendations([
        { person: fullPersonnelPool[1], reason: '具备18年特高压研发背景，匹配本项目高级架构师要求。', matchScore: 99 },
        { person: fullPersonnelPool[0], reason: '南网科技成果转化经验丰富，适合做咨询支撑。', matchScore: 92 }
      ]);
      setIsAiRecommending(false);
    }, 1000);
  };

  const handleExpAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      setExpAiRecommendations([
        { project: fullProjectPool[1], reason: '数字化 EPC 业绩与本次招标 220kV 改造需求完美契合。', matchScore: 98 },
        { project: fullProjectPool[2], reason: '无人机 AI 算法案例可支撑技术响应章节中的“智能巡检”要求。', matchScore: 89 }
      ]);
      setIsAiRecommending(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;
    setReferenceFiles(prev => [...prev, ...files.map(f => ({ id: Math.random().toString(), name: f.name, size: '2MB', type: 'PDF', uploadTime: new Date().toLocaleTimeString() }))]);
    setIsFilesProcessing(true);
    setTimeout(() => {
      setIsFilesProcessing(false);
      setAiChatMessages(prev => [...prev, { role: 'assistant', text: `已成功接收并消化了参考资料。我将结合这些资料对方案内容进行对齐。` }]);
    }, 1500);
  };

  const handleAiChatSend = () => {
    if (!aiChatInput.trim()) return;
    const newMsgs = [...aiChatMessages, { role: 'user', text: aiChatInput } as const];
    setAiChatMessages(newMsgs);
    setAiChatInput('');
    setIsAiRecommending(true);
    setTimeout(() => {
      setAiChatMessages([...newMsgs, { role: 'assistant', text: '已根据要求及参考资料优化了技术方案。' }]);
      setIsAiRecommending(false);
    }, 800);
  };

  // Fix: Use React.FC to allow 'key' prop in JSX when rendering lists
  const PersonnelCard: React.FC<{
    person: Personnel;
    isRecommended?: boolean;
    reason?: string;
    score?: number;
  }> = ({ person, isRecommended = false, reason = '', score = 0 }) => (
    <div className={`p-6 rounded-[32px] border-2 transition-all relative overflow-hidden group animate-in slide-in-from-left text-left ${isRecommended ? 'bg-indigo-50/20 border-indigo-100 shadow-sm' : 'bg-white border-slate-100 hover:border-indigo-300'}`}>
      {isRecommended && <div className="absolute top-0 right-0 px-6 py-1.5 bg-indigo-600 text-white text-[9px] font-black italic tracking-widest shadow-lg">匹配 {score}%</div>}
      <div className="flex items-start space-x-5 mb-5 text-left">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">{person.name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h5 className="text-lg font-black text-slate-900 truncate italic">{person.name}</h5>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase">{person.age}岁</span>
          </div>
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-tighter truncate">{person.title} · {person.education}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/50 p-2.5 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">总工龄 / 同类项目</p>
           <p className="text-xs font-black text-slate-800">{person.years}年 / <span className="text-emerald-600">{person.similarYears}年</span></p>
        </div>
        <div className="bg-white/50 p-2.5 rounded-2xl border border-slate-100">
           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">当前任务负载</p>
           <div className="flex items-center space-x-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner"><div className={`h-full ${person.currentLoad > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${person.currentLoad * 100}%` }}></div></div>
              <span className="text-[10px] font-black text-slate-600">{(person.currentLoad * 100).toFixed(0)}%</span>
           </div>
        </div>
      </div>
      {reason && <p className="text-[10px] text-slate-500 font-bold mb-5 italic border-l-2 border-indigo-200 pl-3 leading-relaxed">判定：{reason}</p>}
      <div className="flex space-x-2">
        <button onClick={() => setDetailPerson(person)} className="flex-1 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-center"><Eye size={12} className="mr-1.5" /> 资历全案</button>
        {canEditTeam && <button onClick={() => setSelectedPersonnel(prev => prev.find(p => p.id === person.id) ? prev : [...prev, person])} className="flex-[1.5] py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all">指派</button>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 text-left">
      {/* 深度详情模态框 (A4仿真) */}
      {detailPerson && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <div className="px-6 border-r border-white/10 text-white font-black text-[10px] uppercase tracking-widest italic flex items-center"><ShieldCheck size={16} className="text-indigo-400 mr-2" /> 专家详细资历档案</div>
              <button onClick={() => setDetailPerson(null)} className="flex items-center px-8 py-2.5 bg-slate-100 text-slate-900 hover:bg-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">关闭预览</button>
           </div>
           <div className="mt-16 flex flex-col items-center"><PersonnelFullDocumentMerged person={detailPerson} isLeader={detailPerson.id === projectLeaderId} /></div>
        </div>
      )}
      {detailProject && (
        <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center py-12 overflow-y-auto animate-in fade-in duration-500 custom-scrollbar-main text-left">
           <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[20] flex items-center space-x-4 bg-slate-900/80 p-2 rounded-2xl border border-white/10 backdrop-blur shadow-2xl">
              <div className="px-6 border-r border-white/10 text-white font-black text-[10px] uppercase tracking-widest italic flex items-center"><ShieldCheck size={16} className="text-emerald-400 mr-2" /> 项目业绩深度详情</div>
              <button onClick={() => setDetailProject(null)} className="flex items-center px-8 py-2.5 bg-slate-100 text-slate-900 hover:bg-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">关闭阅览</button>
           </div>
           <div className="mt-16 flex flex-col items-center"><ProjectFullDocumentMerged project={detailProject} /></div>
        </div>
      )}

      <header className="bg-white px-10 py-6 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-8 text-left min-w-0 flex-1">
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-lg shrink-0"><Layers size={26} /></div>
          <div className="min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] italic leading-none">Bidding Authoring Workshop V3.1</h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded border border-blue-100 uppercase italic">Active Engine</span>
            </div>
            <div className="flex items-center space-x-4 min-w-0">
               <h2 className="text-xl font-black text-slate-900 truncate tracking-tight leading-none uppercase italic" title={currentTask?.title}>
                 {currentTask?.title || "未选择投标项目"}
               </h2>
               {currentTask?.lotName && (
                 <>
                   <ChevronRight size={20} className="text-slate-300 shrink-0" />
                   <h2 className="text-xl font-bold text-blue-600 truncate italic tracking-tighter leading-none shrink-0">
                     {currentTask.lotName}
                   </h2>
                 </>
               )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6 shrink-0 ml-10">
           {phase !== 'hub' && (
             <div className={`flex items-center px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest italic ${getActiveCanEdit() ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {getActiveCanEdit() ? <><UnlockKeyhole size={14} className="mr-2"/> 编辑授权模式</> : <><LockKeyhole size={14} className="mr-2"/> 只读监控模式</>}
             </div>
           )}
           {phase !== 'hub' && <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors"><ChevronLeft size={18} className="mr-2" /> 返回枢纽</button>}
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in duration-700">
             {tasks.map(task => {
               const canEditThis = (task.id === 'team' && canEditTeam) || (task.id === 'exp' && canEditExp) || (task.id === 'content' && canEditContent);
               return (
                <div key={task.id} className={`relative h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 'border-slate-50 shadow-sm'}`}>
                    <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 shadow-lg ${task.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}><task.icon size={48} /></div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8 shadow-inner"><div className={`h-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div></div>
                    <button onClick={() => { setActiveTaskId(task.id); setPhase('task'); }} className="px-12 py-4 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">{task.status === 'completed' ? '重新校阅' : '立即进入'}</button>
                    <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest mt-4 italic">{canEditThis ? '编辑权' : '只读'}</p>
                    {task.status === 'completed' && <div className="absolute top-10 right-10 text-emerald-500 animate-in zoom-in duration-500"><BadgeCheck size={40} /></div>}
                </div>
               );
             })}
          </div>
        )}

        {/* 成员拟定环节 */}
        {phase === 'task' && activeTaskId === 'team' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-indigo-600 shadow-indigo-100"><Users size={24}/></div>
                   <div><h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">拟定项目实施团队成员名单</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1.5">Expert matching & Team Composition Factory</p></div>
                </div>
                <div className="flex space-x-4"><button onClick={() => setPhase('team_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 shadow-sm">资历全案 A4 预览</button>{canEditTeam && (<button onClick={() => markTaskCompleted('team')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl"><CheckCircle2 size={18} className="mr-3 inline" /> 确认并锁定环节</button>)}</div>
             </div>
             <div className="flex-1 overflow-hidden flex bg-white text-left">
                <div className="flex-1 flex flex-col border-r border-slate-100 p-8 space-y-8 overflow-y-auto custom-scrollbar-main">
                   <section className="text-left">
                      <div className="flex items-center justify-between mb-6 text-left">
                         <div className="flex items-center italic text-left"><Bot size={24} className="text-indigo-600 mr-3" /><h4 className="text-xs font-black text-slate-900 uppercase">GridGPT 专家智能推荐轨道</h4></div>
                         <button disabled={isAiRecommending || !canEditTeam} onClick={handleTeamAiRecommend} className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl disabled:opacity-30 transition-all">{isAiRecommending ? <RefreshCw className="mr-2 animate-spin" size={12}/> : <BrainCircuit size={12} className="mr-2" />} 启动画像匹配</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">{aiRecommendations.map((rec, idx) => <PersonnelCard key={idx} person={rec.person} isRecommended reason={rec.reason} score={rec.matchScore} />)}</div>
                   </section>
                   <div className="h-px bg-slate-100 w-full"></div>
                   <section className="text-left pb-10">
                      <div className="flex items-center justify-between mb-6 text-left">
                         <div className="flex items-center italic text-left"><SearchCode size={24} className="text-slate-400 mr-3" /><h4 className="text-xs font-black text-slate-900 uppercase">全库专家人工检索轨道</h4></div>
                         <div className="relative group"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={14} /><input disabled={!canEditTeam} value={personnelSearch} onChange={e => setPersonnelSearch(e.target.value)} placeholder="检索姓名/院校/岗位..." className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl outline-none text-[11px] font-bold text-slate-700 w-64 focus:bg-white focus:border-indigo-500 transition-all" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">{fullPersonnelPool.filter(p => p.name.includes(personnelSearch)).map(p => <PersonnelCard key={p.id} person={p} />)}</div>
                   </section>
                </div>
                <div className="w-[420px] bg-slate-950 flex flex-col p-8 text-left shrink-0">
                   <div className="flex items-center justify-between mb-10 text-white italic text-left">
                      <div className="flex items-center italic">
                        <UserPlus2 size={20} className="text-indigo-400 mr-3" />
                        <h4 className="text-sm font-black uppercase tracking-tighter">标书拟定团队池</h4>
                      </div>
                      <span className="text-slate-500 text-[10px] font-black italic tracking-widest">{selectedPersonnel.length} / 12 人</span>
                   </div>
                   <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 text-left">
                      {selectedPersonnel.map((p, idx) => {
                        const isLeader = p.id === projectLeaderId;
                        return (
                          <div key={idx} className={`p-5 border transition-all rounded-[32px] flex items-center justify-between group text-white text-left animate-in slide-in-from-bottom-4 ${isLeader ? 'bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'bg-white/5 border-white/5'}`}>
                             <div className="flex items-center space-x-4 min-w-0 flex-1 text-left">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg transition-colors ${isLeader ? 'bg-indigo-600 text-white ring-4 ring-indigo-600/20' : 'bg-slate-800 text-slate-400'}`}>
                                  {isLeader ? <Medal size={20} /> : idx + 1}
                                </div>
                                <div className="text-left min-w-0">
                                   <div className="flex items-center space-x-2">
                                      <p className="text-base font-black italic truncate">{p.name}</p>
                                      {isLeader && <span className="px-2 py-0.5 bg-indigo-600 text-[8px] font-black uppercase rounded italic tracking-widest">负责人</span>}
                                   </div>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic truncate">{p.proposedPosition}</p>
                                </div>
                             </div>
                             <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {canEditTeam && (
                                  <button 
                                    onClick={() => setProjectLeaderId(isLeader ? null : p.id)} 
                                    className={`p-2 rounded-lg transition-all ${isLeader ? 'text-blue-400 bg-blue-400/10' : 'text-slate-500 hover:text-blue-400 hover:bg-white/5'}`}
                                    title={isLeader ? "取消负责人身份" : "设为项目负责人"}
                                  >
                                    <Star size={16} fill={isLeader ? "currentColor" : "none"} />
                                  </button>
                                )}
                                <button onClick={() => setDetailPerson(p)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"><Maximize2 size={16}/></button>
                                {canEditTeam && <button onClick={() => { setSelectedPersonnel(selectedPersonnel.filter((_, i) => i !== idx)); if(isLeader) setProjectLeaderId(null); }} className="p-2 text-slate-600 hover:text-red-400 transition-all rounded-lg hover:bg-white/5"><Trash2 size={18} /></button>}
                             </div>
                          </div>
                        );
                      })}
                      {selectedPersonnel.length === 0 && (<div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-30 border-2 border-dashed border-white/5 rounded-[40px]"><UserSearch size={48} strokeWidth={1} /><p className="text-[10px] font-black uppercase tracking-[0.3em] mt-6 italic">Personnel Pool Empty</p></div>)}
                   </div>
                   {projectLeaderId && (
                     <div className="mt-6 p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-2xl animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center italic">
                           <CheckCircle2 size={12} className="mr-2" /> 预览优化已就绪
                        </p>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                          负责人 <span className="text-white font-bold">{selectedPersonnel.find(p => p.id === projectLeaderId)?.name}</span> 的资历将自动排在标书文件的首页。
                        </p>
                     </div>
                   )}
                </div>
             </div>
          </div>
        )}

        {/* 业绩遴选环节 */}
        {phase === 'task' && activeTaskId === 'exp' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-emerald-600 shadow-emerald-100"><Award size={24}/></div>
                   <div><h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">支撑项目业绩池遴选</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1.5">Registry precision selection factory</p></div>
                </div>
                <div className="flex space-x-4"><button onClick={() => setPhase('exp_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all border border-slate-200 shadow-sm flex items-center"><History size={16} className="mr-2" /> 业绩全案预览 (仿真)</button>{canEditExp && (<button onClick={() => markTaskCompleted('exp')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95"><CheckCircle2 size={18} className="mr-3 inline" /> 锁定所选业绩</button>)}</div>
             </div>
             <div className="flex-1 overflow-hidden flex bg-white text-left">
                <div className="flex-1 flex flex-col border-r border-slate-100 p-8 space-y-10 overflow-y-auto custom-scrollbar-main bg-slate-50/20">
                   <section className="text-left">
                      <div className="flex items-center justify-between mb-6 text-left"><div className="flex items-center italic text-left"><Bot size={24} className="text-emerald-600 mr-3" /><h4 className="text-xs font-black text-slate-900 uppercase">GridGPT 语义契合推荐</h4></div><button disabled={isAiRecommending || !canEditExp} onClick={handleExpAiRecommend} className="flex items-center px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl disabled:opacity-30 transition-all">{isAiRecommending ? <RefreshCw className="mr-2 animate-spin" size={12}/> : <BrainCircuit size={12} className="mr-2" />} 启动智能匹配</button></div>
                      <div className="grid grid-cols-2 gap-4">
                         {expAiRecommendations.map((rec, idx) => (
                            <div key={idx} className="p-6 rounded-[32px] border-2 border-emerald-100 bg-emerald-50/30 relative overflow-hidden group animate-in slide-in-from-left text-left">
                               <div className="absolute top-0 right-0 px-6 py-1.5 bg-emerald-600 text-white text-[9px] font-black italic tracking-widest shadow-lg">匹配 {rec.matchScore}%</div>
                               <div className="flex items-start space-x-4 mb-5 text-left"><div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm"><Trophy size={24} className="text-emerald-500" /></div><div className="flex-1 min-w-0 text-left"><h5 className="text-sm font-black text-slate-900 leading-tight mb-2 truncate pr-16 italic">{rec.project.projectName}</h5><div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400"><span>{rec.project.contractYear}年</span><span>·</span><span>{rec.project.amount}W</span></div></div></div>
                               <p className="text-[10px] text-emerald-800 font-bold mb-5 italic border-l-2 border-emerald-300 pl-3 line-clamp-2 leading-relaxed">判定：{rec.reason}</p>
                               <div className="flex space-x-2"><button onClick={() => setDetailProject(rec.project)} className="flex-1 py-3 bg-white text-slate-500 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-center"><Eye size={12} className="mr-1.5" /> 详情</button>{canEditExp && (<button onClick={() => setSelectedProjects(prev => prev.find(p => p.id === rec.project.id) ? prev : [...prev, rec.project])} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">引用</button>)}</div>
                            </div>
                         ))}
                      </div>
                   </section>
                   <div className="h-px bg-slate-100 w-full"></div>
                   <section className="text-left pb-10">
                      <div className="flex items-center justify-between mb-6 text-left"><div className="flex items-center italic text-left"><SearchCode size={24} className="text-slate-400 mr-3" /><h4 className="text-xs font-black text-slate-900 uppercase">全库业绩人工检索</h4></div><div className="relative group"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} /><input disabled={!canEditExp} value={projectSearch} onChange={e => setProjectSearch(e.target.value)} placeholder="检索名称/年份/建设单位..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none text-[11px] font-bold text-slate-700 w-80 focus:border-emerald-500 transition-all shadow-sm" /></div></div>
                      <div className="grid grid-cols-2 gap-6">
                         {fullProjectPool.filter(p => p.projectName.includes(projectSearch)).map(p => (
                            <div key={p.id} className="p-6 bg-white border border-slate-100 rounded-[32px] hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col text-left group">
                               <div className="flex items-center justify-between mb-4"><div className="flex items-center space-x-2"><span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded uppercase italic">{p.contractYear}</span><span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded uppercase border border-blue-100">{p.amount}W</span></div><BadgeCheck size={16} className="text-emerald-500 opacity-20 group-hover:opacity-100" /></div>
                               <h5 className="text-[13px] font-black text-slate-800 leading-tight mb-2 italic line-clamp-2 min-h-[32px]">{p.projectName}</h5>
                               <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase mb-5 italic truncate"><Building2 size={12} className="mr-1.5" /> {p.clientName}</div>
                               <div className="flex items-center space-x-2 mt-auto"><button onClick={() => setDetailProject(p)} className="flex-1 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 flex items-center justify-center"><Eye size={12} className="mr-1.5" /> 详情</button>{canEditExp && (<button onClick={() => setSelectedProjects(prev => prev.find(i => i.id === p.id) ? prev : [...prev, p])} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center">选用</button>)}</div>
                            </div>
                         ))}
                      </div>
                   </section>
                </div>
                <div className="w-[400px] bg-slate-950 flex flex-col p-8 text-left relative overflow-hidden shrink-0">
                   <div className="flex items-center justify-between mb-10 text-white italic relative z-10 text-left"><div className="flex items-center italic"><DatabaseZap size={22} className="text-emerald-400 mr-3" /><div><h4 className="text-sm font-black uppercase tracking-tighter">本工程支撑业绩池</h4></div></div><span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[10px] font-black italic tracking-widest">{selectedProjects.length} 项已入选</span></div>
                   <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 relative z-10 text-left">
                      {selectedProjects.map((p, idx) => (
                        <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-between group text-white text-left animate-in slide-in-from-right-4 transition-all">
                           <div className="flex items-center space-x-4 min-w-0 flex-1 text-left"><div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg">{idx + 1}</div><div className="text-left min-w-0"><p className="text-sm font-black italic truncate leading-none mb-2">{p.projectName}</p><p className="text-[9px] text-slate-500 font-black uppercase italic tracking-tighter">{p.amount}W · {p.contractYear}年</p></div></div>
                           <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => setDetailProject(p)} className="p-2.5 text-slate-500 hover:text-white"><Maximize2 size={16}/></button>{canEditExp && (<button onClick={() => setSelectedProjects(selectedProjects.filter((_, i) => i !== idx))} className="p-2.5 text-slate-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>)}</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 技术方案编撰环节 */}
        {phase === 'task' && activeTaskId === 'content' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-left">
                <div className="flex items-center space-x-6 text-left">
                   <div className="w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg bg-purple-600 shadow-purple-100"><FileText size={24}/></div>
                   <div><h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic leading-none">技术方案智能深度编撰</h3><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic mt-1.5">Agent-assisted technical drafting workflow</p></div>
                </div>
                <div className="flex space-x-4">{canEditContent && (<button onClick={() => markTaskCompleted('content')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl active:scale-95"><CheckCircle2 size={18} className="mr-3 inline" /> 完成并锁定环节</button>)}</div>
             </div>
             <div className="flex-1 flex overflow-hidden">
                <div className="flex-[3] flex flex-col border-r border-slate-100 bg-white relative">
                   <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center space-x-4 shrink-0 text-left">
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Bold size={18}/></button><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><Italic size={18}/></button></div>
                      <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm"><button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><List size={18}/></button></div>
                   </div>
                   <div className="flex-1 p-16 overflow-y-auto custom-scrollbar-main font-serif bg-white text-left relative">
                      {!canEditContent && (<div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] pointer-events-none"><div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl flex items-center space-x-3 text-slate-400"><LockKeyhole size={20}/><span className="text-xs font-black uppercase tracking-widest italic">文档受控</span></div></div>)}
                      <textarea readOnly={!canEditContent} className="w-full h-full min-h-[600px] text-xl leading-relaxed text-slate-800 bg-transparent border-none outline-none resize-none font-serif tracking-tight text-left" value={draftContent} onChange={(e) => setDraftContent(e.target.value)} />
                   </div>
                </div>
                <div className="flex-[1.5] flex flex-col bg-slate-950 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none" />
                   <div className="px-8 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col space-y-4 relative z-10 text-white italic text-left">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-3 text-left"><Bot size={20} className="text-purple-400"/><h4 className="text-xs font-black uppercase tracking-widest text-left">GridGPT 文档编写助理</h4></div>{isFilesProcessing && <div className="flex items-center space-x-2 animate-pulse"><span className="w-2 h-2 bg-purple-400 rounded-full"></span><span className="text-[9px] font-black uppercase text-purple-400">分析参考资料中...</span></div>}</div>
                   </div>
                   <div className="p-6 border-b border-white/5 bg-white/[0.02] relative z-10">
                      <div className="flex items-center justify-between mb-4"><div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest"><FileArchive size={14} className="mr-2"/> 多维参考资料库</div><button disabled={!canEditContent} onClick={() => fileInputRef.current?.click()} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all"><Plus size={16}/></button><input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" /></div>
                      <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar-dark pr-1">
                         {referenceFiles.map(file => (<div key={file.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group animate-in slide-in-from-right-2 text-left text-white"><div className="flex items-center space-x-3 min-w-0"><div className="p-2 bg-purple-600/20 text-purple-400 rounded-xl"><FileText size={14}/></div><div className="min-w-0"><p className="text-[10px] font-bold text-slate-200 truncate">{file.name}</p><p className="text-[8px] text-slate-500 font-black uppercase mt-0.5">{file.type} · {file.size}</p></div></div>{canEditContent && <button onClick={() => setReferenceFiles(prev => prev.filter(f => f.id !== file.id))} className="p-1.5 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14}/></button>}</div>))}
                         {referenceFiles.length === 0 && <div className="py-4 text-center border-2 border-dashed border-white/5 rounded-2xl text-[9px] font-black text-slate-700 uppercase tracking-widest italic">暂无外部参考资料</div>}
                      </div>
                   </div>
                   <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-dark relative z-10 text-left">
                      {aiChatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}><div className={`max-w-[85%] p-5 rounded-3xl text-[11px] leading-relaxed shadow-2xl relative ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none font-bold' : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none italic font-medium'}`}>{msg.text}</div></div>
                      ))}
                      {isAiRecommending && <div className="flex justify-start animate-pulse"><div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none"><Wand2 size={20} className="text-purple-400 animate-spin" /></div></div>}
                   </div>
                   <div className="p-8 bg-slate-900/80 border-t border-white/5 relative z-10 text-left">
                      <div className={`flex items-center space-x-3 bg-white/5 border border-white/10 rounded-2xl p-2 transition-all text-left ${!canEditContent ? 'opacity-30' : ''}`}><button disabled={!canEditContent} onClick={() => fileInputRef.current?.click()} className="p-3 text-slate-500 hover:text-purple-400 transition-colors"><Paperclip size={18} /></button><textarea disabled={!canEditContent} value={aiChatInput} onChange={e => setAiChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAiChatSend())} placeholder={canEditContent ? "输入指令..." : "只读模式..." } className="flex-1 bg-transparent border-none outline-none text-white text-[11px] px-3 font-medium placeholder:text-slate-700 resize-none h-12 py-2 text-left" /><button disabled={!canEditContent} onClick={handleAiChatSend} className="bg-purple-600 p-3 text-white rounded-xl hover:bg-purple-500 shadow-xl transition-all active:scale-90 text-left disabled:opacity-50"><Send size={18} /></button></div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 极致仿真预览大视图 (业绩/人员) */}
        {(phase === 'exp_preview' || phase === 'team_preview') && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 text-left">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white z-10 shrink-0 text-left">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10 text-left">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl italic font-black uppercase tracking-tighter">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl italic font-black uppercase tracking-tighter">放大</button>
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-emerald-400 flex items-center uppercase tracking-widest">
                        <BadgeCheck size={18} className="mr-3" /> {phase === 'exp_preview' ? '标书项目业绩全案 1:1 仿真预览 (对齐 Word 标准)' : '拟任人员资历全案 1:1 仿真预览'}
                      </span>
                      {phase === 'team_preview' && projectLeaderId && (
                        <span className="text-[10px] text-blue-400 font-black mt-1 uppercase tracking-widest italic animate-pulse">
                          Auto-Sorted: 负责人 {selectedPersonnel.find(p => p.id === projectLeaderId)?.name} 已置于首页
                        </span>
                      )}
                   </div>
                </div>
                <div className="flex space-x-4">
                  <button className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] shadow-lg hover:bg-blue-700 transition-all flex items-center">
                    <Download size={16} className="mr-2" /> 下载最终生成的 Word
                  </button>
                  <button onClick={() => setPhase('task')} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all text-left">返回控制台</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth text-left">
                  <div className="origin-top transition-all space-y-24 text-left" style={{ transform: `scale(${zoomLevel / 100})` }}>
                    {phase === 'exp_preview' 
                      ? selectedProjects.map((p) => <ProjectFullDocumentMerged key={p.id} project={p} />) 
                      : previewPersonnelList.map((p) => <PersonnelFullDocumentMerged key={p.id} person={p} isLeader={p.id === projectLeaderId} />)}
                    {(phase === 'exp_preview' ? selectedProjects : selectedPersonnel).length === 0 && (
                      <div className="text-slate-600 italic uppercase tracking-[0.4em] mt-40 flex flex-col items-center">
                        <Layout size={64} strokeWidth={1} className="mb-6 opacity-30" />
                        No assets selected for preview
                      </div>
                    )}
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