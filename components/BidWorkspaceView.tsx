
import React, { useState, useMemo } from 'react';
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
  // Added missing CalendarDays import
  CalendarDays
} from 'lucide-react';
import { BiddingTask, StaffUser, Personnel } from '../types';

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

// Fixed person scope errors and div syntax errors by moving PersonnelFullDocumentMerged outside and defining it clearly
const PersonnelFullDocumentMerged: React.FC<{ person: Personnel }> = ({ person }) => (
  <div className="flex flex-col items-center space-y-12 mb-32 animate-in fade-in duration-700">
    
    {/* SECTION 1: 个人简历表页 (A4) */}
    <div className="relative bg-white shadow-2xl text-left font-serif p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="absolute top-10 right-10 px-4 py-1 border-2 border-slate-900 rounded text-[10px] font-black text-slate-900 italic uppercase">Section: Resume</div>
      <h2 className="text-xl font-black text-center mb-8 tracking-wider">{person.name} 个人简历表</h2>
      <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] leading-[1.6]">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">姓 名</td>
            <td className="border border-black p-2 text-center w-[120px]">{person.name}</td>
            <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">年 龄</td>
            <td className="border border-black p-2 text-center w-[80px]">{person.age}</td>
            <td className="border border-black p-2 bg-slate-50 w-[120px] font-bold text-center">执业证书名称</td>
            <td className="border border-black p-2 align-top text-xs">{person.certs.map((c, i) => <div key={i}>{c.name}</div>)}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">职 称</td>
            <td className="border border-black p-2 text-center">{person.title}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">学 历</td>
            <td className="border border-black p-2 text-center">{person.education}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">本项目拟任</td>
            <td className="border border-black p-2 text-center font-bold text-blue-600">{person.proposedPosition}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">总工龄</td>
            <td className="border border-black p-2 text-center">{person.years}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center" colSpan={2}>从事类似工作年限</td>
            <td className="border border-black p-2 text-center font-bold" colSpan={2}>{person.similarYears}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">毕业学校</td>
            <td className="border border-black p-3 text-center" colSpan={5}>{person.gradDate}年毕业于{person.school}{person.major}专业</td>
          </tr>
          <tr><td className="border border-black p-2 bg-slate-100 font-bold text-center" colSpan={6}>主要工作经历</td></tr>
          {person.projects.map((proj, idx) => (
            <tr key={idx}>
              <td className="border border-black p-2 text-center text-xs">{proj.time}</td>
              <td className="border border-black p-2 text-xs leading-relaxed" colSpan={3}>{proj.projectName}</td>
              <td className="border border-black p-2 text-center text-xs font-bold">{proj.role}</td>
              <td className="border border-black p-2 text-center text-[9pt]">
                <div>{proj.contact}</div><div className="font-mono mt-1 text-slate-500">{proj.phone}</div>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 8 - person.projects.length) }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black p-2"></td><td className="border border-black p-2" colSpan={3}></td><td className="border border-black p-2"></td><td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 italic">
         <span className="text-[8pt] font-sans">成员资历证明合成件 · 档案 ID: {person.id}</span>
         <span className="text-[8pt] font-sans underline underline-offset-4">投标附件第 1 页 (简历表)</span>
      </div>
    </div>

    {/* SECTION 2: 学历证书扫描件附件页 (A4) */}
    {person.educations.some(e => e.gradCertUrl || e.degreeCertUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-4 mb-10">附件一：学历及学位证书</h3>
         <div className="grid grid-cols-1 gap-12">
            {person.educations.map((edu, i) => (
              <div key={i} className="space-y-8">
                 <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <School size={20} className="text-blue-600" />
                    <p className="text-sm font-bold text-slate-700">教育背景：{edu.school} · {edu.level}（{edu.major}）</p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {edu.gradCertUrl && (
                      <div className="space-y-3">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">毕业证书扫描件</p>
                         <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm group">
                            <img src={edu.gradCertUrl} className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all" alt="grad cert" />
                         </div>
                      </div>
                    )}
                    {edu.degreeCertUrl && (
                      <div className="space-y-3">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">学位证书扫描件</p>
                         <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm group">
                            <img src={edu.degreeCertUrl} className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all" alt="degree cert" />
                         </div>
                      </div>
                    )}
                 </div>
              </div>
            ))}
         </div>
         <div className="mt-auto pt-8 border-t border-slate-100 text-right opacity-40 text-[8pt] italic">
           附件 1 - 教育资历扫描件
         </div>
      </div>
    )}

    {/* SECTION 3: 职称及执业资格证书附件页 (A4) */}
    {person.certs.some(c => c.fileUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-amber-500 pl-4 mb-10">附件二：专业技术职称及岗位证书</h3>
         <div className="grid grid-cols-2 gap-10">
            {person.certs.filter(c => c.fileUrl).map((cert, i) => (
              <div key={i} className="flex flex-col space-y-4">
                 <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-[11px] font-black text-amber-700 uppercase tracking-tight">{cert.name}</p>
                    <p className="text-[9px] text-amber-600 mt-1 font-mono">证书号：{cert.number}</p>
                 </div>
                 <div className="border-4 border-slate-50 rounded-2xl overflow-hidden shadow-lg transform rotate-[-1deg] hover:rotate-0 transition-transform">
                    <img src={cert.fileUrl} className="w-full h-auto" alt="cert scan" />
                 </div>
              </div>
            ))}
         </div>
         <div className="mt-auto pt-8 border-t border-slate-100 text-right opacity-40 text-[8pt] italic">
           附件 2 - 职称及执业资格扫描件
         </div>
      </div>
    )}

    {/* SECTION 4: 项目业绩证明材料页 (A4) */}
    {person.projects.some(p => p.workCertUrl) && (
      <div className="relative bg-white shadow-2xl p-[20mm] flex flex-col shrink-0" style={{ width: '210mm', minHeight: '297mm' }}>
         <h3 className="text-lg font-bold border-l-4 border-emerald-600 pl-4 mb-10">附件三：个人项目业绩支撑材料</h3>
         <div className="space-y-12">
            {person.projects.filter(p => p.workCertUrl).map((proj, i) => (
              <div key={i} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="border-l-4 border-emerald-500 pl-6 bg-emerald-50/30 p-4 rounded-r-xl">
                    <p className="text-sm font-black text-slate-800 italic">{proj.projectName}</p>
                    <div className="flex items-center space-x-4 mt-2">
                       <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center"><Layers size={12} className="mr-1"/> 岗位：{proj.role}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center"><CalendarDays size={12} className="mr-1"/> 时间：{proj.time}</span>
                    </div>
                 </div>
                 <div className="flex justify-center">
                    <div className="relative w-[75%] group">
                       <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors rounded-2xl pointer-events-none" />
                       <img src={proj.workCertUrl} className="w-full h-auto border border-slate-200 shadow-2xl rounded-2xl" alt="performance proof" />
                       <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-slate-200 shadow-sm opacity-60">
                          <p className="text-[8px] font-black text-slate-400 italic">OFFICIAL EVIDENTIAL COPY</p>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
         <div className="mt-auto pt-8 border-t border-slate-100 text-right opacity-40 text-[8pt] italic">
           附件 3 - 历史类似项目业绩扫描件
         </div>
      </div>
    )}
  </div>
);

const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser }) => {
  // 核心数据模型
  const activeTask = useMemo(() => {
    if (currentTask) return currentTask;
    return {
      id: 'demo-task-001',
      projectId: 'SGCC-PJ-2024',
      title: '国家电网2024年数字化转型支撑服务项目',
      lotName: '包1：智能分析引擎研发',
      purchaser: '国家电网有限公司',
      category: '服务类',
      type: '服务',
      publishDate: '2024-10-25',
      deadline: '2024-12-30',
      openingTime: '2024-12-31 10:00:00',
      openingLocation: '北京国网办公大楼',
      budget: '850.00万元',
      status: 'analyzed',
      progress: 45,
      currentStage: 'drafting',
      priority: 'high',
      projectLeader: { id: 'ADMIN-001', name: '系统管理员', role: '总指挥', years: 15, majorProject: '国网云平台', tags: ['管理'] },
      expSelectionLeader: { id: 'gt4', name: '孙经理', role: '商务总监', years: 14, majorProject: '物资集采', tags: ['商务'] },
      memberDraftingLeader: { id: 'm2', name: '李专家', role: '技术负责人', years: 12, majorProject: '架构设计', tags: ['技术'] },
      techProposalLeader: { id: 'ADMIN-001', name: '系统管理员', role: '总指挥', years: 15, majorProject: '国网云平台', tags: ['管理'] },
      submissionLeader: { id: 'gt6', name: '陈工', role: '商务助理', years: 5, majorProject: '投标上传', tags: ['商务'] }
    } as BiddingTask;
  }, [currentTask]);

  // 完整人才库数据（同步自 PersonnelBaseView，包含全部附件占位符）
  const fullPersonnelPool: Personnel[] = [
    {
      id: 's-huang', name: '黄石亮', age: 40, education: '本科', title: '高级顾问', proposedPosition: '咨询顾问', years: 17, similarYears: 15, school: '中山大学', major: '计算机科学与技术', gradDate: '2013', currentLoad: 0.6,
      educations: [{ level: '本科', school: '中山大学', major: '计算机科学与技术', gradDate: '2013', gradCertUrl: 'https://placehold.co/800x600?text=Graduation+Cert', degreeCertUrl: 'https://placehold.co/800x600?text=Degree+Cert' }],
      certs: [
        { name: 'PMP证书', level: '高级', authority: 'PMI', number: 'PMP-123', validity: '2027-12', fileUrl: 'https://placehold.co/600x800?text=PMP+Cert' },
        { name: 'CMC证书', level: '国际', authority: 'ICMCI', number: 'CMC-99', validity: '2026', fileUrl: 'https://placehold.co/600x800?text=CMC+Cert' }
      ],
      projects: [{ time: '2022', projectName: '南网数字化转型咨询', role: '负责人', client: '南网', contact: '游XX', phone: '156...', serviceType: '咨询', workCertUrl: 'https://placehold.co/600x800?text=Project+Proof+Huang' }]
    },
    {
      id: 's-zhang-wei', name: '张维国', age: 45, education: '博士', title: '教授级高工', proposedPosition: '技术总监', years: 22, similarYears: 18, school: '清华大学', major: '电力系统自动化', gradDate: '2008', currentLoad: 0.4,
      educations: [{ level: '博士', school: '清华大学', major: '电力系统自动化', gradDate: '2008', gradCertUrl: 'https://placehold.co/800x600?text=Tsinghua+PhD+Cert' }],
      certs: [
        { name: '注册电气工程师', level: '执业资格', authority: '人社部', number: 'DG-001', validity: '2028', fileUrl: 'https://placehold.co/600x800?text=Engineer+Cert' },
        { name: '特高压专家认证', level: '专家', authority: '国家电网', number: 'SG-99', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=UHV+Expert' }
      ],
      projects: [{ time: '2021', projectName: '±800kV特高压运维系统', role: '总监', client: '国网', contact: '王主任', phone: '010...', serviceType: '研发', workCertUrl: 'https://placehold.co/600x800?text=UHV+Proof+Zhang' }]
    },
    {
      id: 's-li-ming', name: '李明', age: 38, education: '硕士', title: '高级架构师', proposedPosition: '系统架构负责人', years: 15, similarYears: 12, school: '西安交通大学', major: '软件工程', gradDate: '2012', currentLoad: 0.3,
      educations: [{ level: '硕士', school: '西安交大', major: '软件工程', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=Master+Grad+Cert' }],
      certs: [{ name: 'AWS 架构师', level: '专家', authority: 'Amazon', number: 'AWS-123', validity: '2025', fileUrl: 'https://placehold.co/600x800?text=AWS+Solution+Arch' }],
      projects: [{ time: '2023', projectName: '数字化审计平台', role: '首席架构', client: '国网新源', contact: '李工', phone: '138...', serviceType: '研发', workCertUrl: 'https://placehold.co/600x800?text=Audit+Project+Proof' }]
    },
    {
      id: 's-wang-fang', name: '王芳', age: 34, education: '本科', title: '注册造价师', proposedPosition: '造价经理', years: 12, similarYears: 10, school: '华北电力大学', major: '工程造价', gradDate: '2012', currentLoad: 0.5,
      educations: [{ level: '本科', school: '华北电力', major: '工程造价', gradDate: '2012', gradCertUrl: 'https://placehold.co/800x600?text=NCEPU+Grad' }],
      certs: [{ name: '一级造价工程师', level: '执业资格', authority: '住建部', number: 'ZJ-120', validity: '2026', fileUrl: 'https://placehold.co/600x800?text=Cost+Engineer+Cert' }],
      projects: [{ time: '2022', projectName: '蒙东电力造价咨询', role: '商务总负责人', client: '内蒙古电力', contact: '赵科', phone: '0471...', serviceType: '咨询', workCertUrl: 'https://placehold.co/600x800?text=Cost+Project+Proof' }]
    },
    {
      id: 's-zhao-chen', name: '赵晨', age: 41, education: '本科', title: '高级安全评价师', proposedPosition: '安质负责人', years: 18, similarYears: 16, school: '武汉大学', major: '安全工程', gradDate: '2006', currentLoad: 0.2,
      educations: [{ level: '本科', school: '武汉大学', major: '安全工程', gradDate: '2006', gradCertUrl: 'https://placehold.co/800x600?text=Wuhan+Univ+Grad' }],
      certs: [{ name: '注册安全工程师', level: '执业资格', authority: '应急部', number: 'AQ-045', validity: '2027', fileUrl: 'https://placehold.co/600x800?text=Safety+Cert' }],
      projects: [{ time: '2022', projectName: '江苏电力安全评价', role: '安全总监', client: '江苏电力', contact: '孙处', phone: '135...', serviceType: '安全', workCertUrl: 'https://placehold.co/600x800?text=Safety+Project+Proof' }]
    },
    {
      id: 's-liu-yang', name: '刘洋', age: 31, education: '本科', title: '中级工程师', proposedPosition: '现场实施组长', years: 8, similarYears: 6, school: '电子科技大学', major: '通信工程', gradDate: '2016', currentLoad: 0.8,
      educations: [{ level: '本科', school: '电子科大', major: '通信工程', gradDate: '2016', gradCertUrl: 'https://placehold.co/800x600?text=UESTC+Grad+Cert' }],
      certs: [{ name: '通信工程师', level: '中级', authority: '工信部', number: 'TX-033', validity: '永久', fileUrl: 'https://placehold.co/600x800?text=Comm+Engineer+Cert' }],
      projects: [{ time: '2024', projectName: '海南输电视频覆盖', role: '实施组长', client: '海南电网', contact: '林经理', phone: '133...', serviceType: '实施', workCertUrl: 'https://placehold.co/600x800?text=Field+Project+Proof' }]
    }
  ];

  // 状态管理
  const [phase, setPhase] = useState<'hub' | 'task' | 'team_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  // 权限校验逻辑
  const checkEditPermission = (taskId: string | null) => {
    if (!currentUser || !activeTask) return false;
    if (currentUser.id === activeTask.projectLeader?.id) return true;
    switch(taskId) {
      case 'team': return currentUser.id === activeTask.memberDraftingLeader?.id;
      case 'exp': return currentUser.id === activeTask.expSelectionLeader?.id;
      case 'content': return currentUser.id === activeTask.techProposalLeader?.id;
      default: return false;
    }
  };

  const isCurrentStageEditable = useMemo(() => checkEditPermission(activeTaskId), [activeTaskId, currentUser, activeTask]);

  const handleAiRecommend = () => {
    if (!isCurrentStageEditable) return;
    setIsAiRecommending(true);
    setAiRecommendations([]);
    setTimeout(() => {
      const recs = [
        { person: fullPersonnelPool[1], reason: '教授级高工及清华博士，具备18年类似项目经验，完美匹配研发总监要求。', matchScore: 99 },
        { person: fullPersonnelPool[2], reason: '高级架构师职称，软件工程背景，曾负责同类数字化平台研发。', matchScore: 96 }
      ];
      setAiRecommendations(recs);
      setIsAiRecommending(false);
    }, 1500);
  };

  const togglePerson = (p: Personnel) => {
    if (!isCurrentStageEditable) return;
    setSelectedPersonnel(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);
  };

  const handleStartTask = (taskId: 'team' | 'exp' | 'content') => {
    setActiveTaskId(taskId);
    setPhase('task');
    if (checkEditPermission(taskId)) {
       setTasks(prev => prev.map(t => t.id === taskId && t.status === 'pending' ? { ...t, status: 'processing', progress: 10 } : t));
    }
  };

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    if (!isCurrentStageEditable) return;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));
    setPhase('hub');
    setActiveTaskId(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6 text-left">
      
      {/* 顶部工作导航 */}
      <div className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg"><Layers size={24} /></div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase italic leading-none">Bidding Workshop V2.6</h3>
            <div className="flex items-center space-x-2 mt-1.5">
               <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase italic">{activeTask.projectId}</span>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{activeTask.lotName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
           <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">{currentUser?.name[0]}</div>
              <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Current Operative</p><p className="text-[11px] font-black text-slate-800">{currentUser?.name}</p></div>
           </div>
           {phase !== 'hub' && (
             <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors"><Trash2 size={18} className="mr-2" /> 退出环节</button>
           )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* 枢纽视图 */}
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in duration-700">
             {tasks.map(task => {
               const hasEdit = checkEditPermission(task.id);
               return (
                 <div key={task.id} className={`relative h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 'border-slate-50 shadow-sm'}`}>
                    <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 ${task.status === 'completed' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>
                      <task.icon size={48} />
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                       {!hasEdit && <Lock size={14} className="text-amber-500" />}
                       <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8 shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <button onClick={() => handleStartTask(task.id)} className={`px-12 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center ${hasEdit ? 'bg-slate-900 text-white hover:bg-black' : 'bg-white border-2 border-slate-200 text-slate-400 hover:bg-slate-50'}`}>
                      {hasEdit ? (task.status === 'completed' ? '重新校阅' : '进入环节') : <><Eye size={14} className="mr-2" /> 只读查看</>}
                    </button>
                 </div>
               );
             })}
          </div>
        )}

        {/* 成员拟定环节 */}
        {phase === 'task' && activeTaskId === 'team' && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className={`px-12 py-8 border-b border-slate-100 flex items-center justify-between shrink-0 ${!isCurrentStageEditable ? 'bg-amber-50/30' : 'bg-slate-50'}`}>
                <div className="flex items-center space-x-6">
                   <div className={`w-12 h-12 text-white rounded-2xl flex items-center justify-center font-black shadow-lg ${!isCurrentStageEditable ? 'bg-slate-400' : 'bg-indigo-600'}`}><Users size={24}/></div>
                   <div>
                     <div className="flex items-center space-x-3">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">拟定团队成员名单</h3>
                        {!isCurrentStageEditable && <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[9px] font-black uppercase flex items-center shadow-sm border border-amber-200 animate-pulse"><ShieldAlert size={12} className="mr-1.5" /> 只读模式</span>}
                     </div>
                   </div>
                </div>
                <div className="flex space-x-4">
                  {selectedPersonnel.length > 0 && (
                    <button onClick={() => setPhase('team_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">生成并预览成员简历全案 ({selectedPersonnel.length} 人)</button>
                  )}
                  {isCurrentStageEditable && <button onClick={() => markTaskCompleted('team')} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl"><CheckCircle2 size={18} className="mr-3 inline" /> 提交锁定名单</button>}
                </div>
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main bg-white">
                <div className="grid grid-cols-5 gap-12">
                   <div className="col-span-3 space-y-12">
                      <section>
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center"><Bot size={28} className="text-blue-600 mr-4" /><div><h4 className="text-sm font-black text-slate-900 uppercase italic">GridGPT 智能匹配引擎</h4></div></div>
                            {isCurrentStageEditable && (
                              <button onClick={handleAiRecommend} disabled={isAiRecommending} className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50">
                                {isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}启动辅助选人
                              </button>
                            )}
                         </div>
                         <div className="space-y-4">
                            {aiRecommendations.map((rec, idx) => {
                              const p = rec.person;
                              const isSelected = selectedPersonnel.find(i => i.id === p.id);
                              return (
                                <div key={p.id} className="p-6 rounded-[40px] border-2 bg-slate-50/50 transition-all flex flex-col relative overflow-hidden group animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                                   <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase rounded-bl-[24px] italic tracking-widest shadow-lg flex items-center">
                                      <Zap size={12} className="mr-2 text-amber-300" /> AI 匹配度 {rec.matchScore}%
                                   </div>
                                   <div className="flex items-center space-x-5 mb-6"><div className="w-16 h-16 rounded-3xl flex items-center justify-center font-black text-2xl bg-white shadow-xl text-blue-600 border border-blue-50">{p.name[0]}</div><div><p className="text-xl font-black text-slate-900 italic tracking-tighter leading-none mb-2">{p.name}</p><span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase italic">{p.title}</span></div></div>
                                   <div className="grid grid-cols-3 gap-4 mb-6">
                                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">类似工龄</p><p className="text-xs font-black text-emerald-600">{p.similarYears} 年</p></div>
                                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">专业背景</p><p className="text-xs font-black text-slate-800 truncate">{p.major}</p></div>
                                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">证书储备</p><p className="text-xs font-black text-blue-600">{p.certs.length} 项</p></div>
                                   </div>
                                   {isCurrentStageEditable && <button onClick={() => togglePerson(p)} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>{isSelected ? '已指派' : '指派至项目'}</button>}
                                </div>
                              );
                            })}
                         </div>
                      </section>

                      <section>
                         <div className="flex items-center space-x-4 mb-8"><div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg"><Search size={20} /></div><h4 className="text-sm font-black text-slate-900 uppercase italic">全人才库手动精选</h4></div>
                         <div className="relative mb-6"><Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} /><input value={staffSearchQuery} onChange={e => setStaffSearchQuery(e.target.value)} placeholder="快速检索姓名、证书、专业..." className="w-full pl-12 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none rounded-[28px] font-bold text-lg shadow-inner focus:bg-white transition-all" /></div>
                         <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto p-2 custom-scrollbar-main">
                            {fullPersonnelPool.filter(p => !staffSearchQuery || p.name.includes(staffSearchQuery) || p.major.includes(staffSearchQuery)).map(p => {
                              const isSelected = selectedPersonnel.find(i => i.id === p.id);
                              return (
                                <div key={p.id} onClick={() => isCurrentStageEditable && togglePerson(p)} className={`p-6 rounded-[32px] border-2 transition-all flex flex-col group ${isSelected ? 'border-indigo-600 bg-indigo-50/20 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-white'} ${!isCurrentStageEditable ? 'cursor-default' : 'cursor-pointer'}`}>
                                   <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center space-x-4"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>{p.name[0]}</div><div className="text-left"><p className="text-sm font-black text-slate-900 italic leading-none mb-1.5">{p.name}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.title} · {p.years}年工龄</p></div></div>
                                      {isCurrentStageEditable && (isSelected ? <div className="p-2 bg-indigo-600 text-white rounded-full"><Check size={14} strokeWidth={4}/></div> : <Plus size={18} className="text-slate-200 group-hover:text-indigo-400" />)}
                                   </div>
                                   <div className="grid grid-cols-4 gap-4">
                                      <div className="flex flex-col"><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">最高学历</span><span className="text-[10px] font-black text-slate-700">{p.education}</span></div>
                                      <div className="flex flex-col"><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">类似工龄</span><span className="text-[10px] font-black text-emerald-600">{p.similarYears}年</span></div>
                                      <div className="flex flex-col col-span-2"><span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">毕业院校</span><span className="text-[10px] font-black text-slate-700 truncate">{p.school} · {p.major}</span></div>
                                   </div>
                                </div>
                              );
                            })}
                         </div>
                      </section>
                   </div>

                   <div className="col-span-2">
                      <div className="bg-slate-950 p-8 rounded-[56px] min-h-[800px] flex flex-col shadow-2xl relative overflow-hidden border border-white/10">
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent pointer-events-none" />
                         <div className="flex items-center justify-between mb-10 relative z-10 text-white"><div className="flex items-center space-x-3 italic"><UserPlus size={20} className="text-indigo-400" /><h4 className="text-sm font-black uppercase tracking-tighter">已选定项目团队</h4></div><span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-indigo-400 border border-white/10 italic">{selectedPersonnel.length} 人</span></div>
                         <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar-dark pr-2 relative z-10">
                            {selectedPersonnel.map((p, idx) => (
                              <div key={p.id} className="p-5 bg-white/5 border border-white/5 rounded-[32px] flex items-center justify-between group hover:bg-white/10 transition-all animate-in slide-in-from-right">
                                 <div className="flex items-center space-x-4"><div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xs shadow-lg">{idx + 1}</div><div className="text-left"><p className="text-sm font-black text-white italic">{p.name}</p><div className="flex items-center space-x-2 mt-1"><span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest italic">{p.proposedPosition}</span></div></div></div>
                                 {isCurrentStageEditable && <button onClick={() => togglePerson(p)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-50/10 rounded-xl transition-all"><Trash2 size={16} /></button>}
                              </div>
                            ))}
                         </div>
                         <div className="pt-8 border-t border-white/5 mt-auto text-[9px] text-slate-500 font-bold text-center italic leading-relaxed">系统将自动从库中提取成员的毕业证、学位证、职称证及业绩证明。</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 全案 A4 预览：文书合成渲染大厅 */}
        {phase === 'team_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 relative">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">缩小</button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl">放大</button>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs font-bold text-blue-400 flex items-center mt-1 uppercase tracking-widest"><ShieldCheck size={18} className="mr-3" /> 团队成员简历及配套资历证明附件 - 文书全案合并预览</span>
                   </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回调整名单</button>
                  <button className="flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-blue-900/40 transition-all">
                    <FileDown size={18} className="mr-3" /> 导出成员简历及证书全案 (PDF/Word)
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark scroll-smooth">
                  <div className="origin-top transition-all space-y-24" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedPersonnel.map((person) => (
                      <PersonnelFullDocumentMerged key={person.id} person={person} />
                    ))}
                    {selectedPersonnel.length === 0 && (
                       <div className="text-white opacity-20 flex flex-col items-center justify-center mt-40">
                          <Users size={120} strokeWidth={1} />
                          <p className="text-3xl font-black uppercase tracking-[0.5em] mt-10 italic">Empty Team Registry</p>
                       </div>
                    )}
                  </div>
              </div>
          </div>
        )}
      </div>

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
