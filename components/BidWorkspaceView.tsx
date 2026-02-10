
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Users, Award, FileText, ChevronRight, BrainCircuit, 
  RefreshCw, WandSparkles, Download, Save, 
  Search, X, Sparkles, Check,
  Printer, ShieldCheck, ZoomIn, ZoomOut,
  LayoutGrid, ArrowLeft, Clock, Activity,
  BadgeCheck, Zap, History, Briefcase, Building2, Layers,
  UserPlus, Star, Filter, MessageSquare, Send, CheckCircle2,
  Plus, MousePointerClick, DatabaseZap, FileCode, FileType,
  Bot, Settings, BookOpen, Sparkle, Cpu,
  Eye,
  Lock,
  User,
  ShieldAlert,
  FileCheck,
  UserSearch,
  GraduationCap,
  Scale,
  FileDown,
  // Fix: Added missing icon Trash2
  Trash2
} from 'lucide-react';
import { StaffMember, BiddingTask, ProjectExperience, StaffUser, Personnel } from '../types';

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

const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask, currentUser }) => {
  // 核心数据模型
  const activeTask = useMemo(() => {
    if (currentTask) return currentTask;
    return {
      id: 'demo-task-001',
      projectId: 'SGCC-DEMO-2024',
      title: '国家电网2024年数字化转型支撑服务项目',
      lotName: '包1：智能分析引擎研发',
      purchaser: '国家电网有限公司',
      projectLeader: { id: 'ADMIN-001', name: '系统管理员', role: '总指挥' },
      expSelectionLeader: { id: 'gt4', name: '孙经理', role: '商务总监' },
      memberDraftingLeader: { id: 'gt5', name: '刘工', role: '造价专家' },
      techProposalLeader: { id: 'm2', name: '李专家', role: '技术负责人' },
      submissionLeader: { id: 'gt6', name: '陈工', role: '商务助理' }
    } as BiddingTask;
  }, [currentTask]);

  // 1. 模拟人员全库数据 (丰富字段)
  const allPersonnelPool: Personnel[] = [
    {
      id: 'p-1', name: '王志远', age: 42, education: '博士', title: '高级工程师', proposedPosition: '项目经理', years: 18, similarYears: 12, school: '清华大学', major: '电气自动化', gradDate: '2006', currentLoad: 0.3,
      educations: [{ level: '博士', school: '清华大学', major: '电气自动化', gradDate: '2006' }],
      certs: [{ name: '一级建造师', level: '高级', authority: '住建部', number: '京12345', validity: '2026-12' }],
      projects: [{ time: '2022', projectName: '国网总部调度云平台', role: '技术总监', client: '国网', contact: '张工', phone: '138...', serviceType: '研发' }]
    },
    {
      id: 'p-2', name: '李晓萌', age: 35, education: '硕士', title: '高级架构师', proposedPosition: '技术负责人', years: 12, similarYears: 9, school: '西安交通大学', major: '软件工程', gradDate: '2012', currentLoad: 0.5,
      educations: [{ level: '硕士', school: '西安交大', major: '软件工程', gradDate: '2012' }],
      certs: [{ name: 'PMP', level: '国际', authority: 'PMI', number: 'PMP-888', validity: '2027-01' }],
      projects: [{ time: '2023', projectName: '南网数字化转型一期', role: '核心架构', client: '南网', contact: '李经理', phone: '139...', serviceType: '咨询' }]
    },
    {
      id: 'p-3', name: '陈思宇', age: 29, education: '本科', title: '中级工程师', proposedPosition: '实施工程师', years: 6, similarYears: 5, school: '华中科技大学', major: '通信工程', gradDate: '2017', currentLoad: 0.1,
      educations: [{ level: '本科', school: '华中科技', major: '通信工程', gradDate: '2017' }],
      certs: [{ name: '通信工程师中级', level: '中级', authority: '工信部', number: 'TX-009', validity: '永久' }],
      projects: [{ time: '2024', projectName: '雄安智慧配网', role: '实施组长', client: '河北电力', contact: '赵工', phone: '135...', serviceType: '工程' }]
    }
  ];

  // 权限判断
  const checkEditPermission = (taskId: 'team' | 'exp' | 'content' | 'submission') => {
    if (!currentUser) return false;
    if (activeTask.projectLeader?.id === currentUser.id || currentUser.id === 'ADMIN-001') return true;
    switch (taskId) {
      case 'team': return activeTask.memberDraftingLeader?.id === currentUser.id;
      case 'exp': return activeTask.expSelectionLeader?.id === currentUser.id;
      case 'content': return activeTask.techProposalLeader?.id === currentUser.id;
      case 'submission': return activeTask.submissionLeader?.id === currentUser.id;
      default: return false;
    }
  };

  // 状态管理
  const [phase, setPhase] = useState<'hub' | 'task' | 'preview' | 'team_preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState<'staff' | 'exp' | null>(null);
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel[]>([]);
  const [isAiRecommending, setIsAiRecommending] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Personnel[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  const allTasksCompleted = useMemo(() => tasks.every(t => t.status === 'completed'), [tasks]);

  // AI 推荐逻辑
  const handleAiRecommend = () => {
    setIsAiRecommending(true);
    setTimeout(() => {
      // 模拟 AI 逻辑：根据“数字化转型”关键字推荐
      setAiRecommendations([allPersonnelPool[0], allPersonnelPool[1]]);
      setIsAiRecommending(false);
    }, 1500);
  };

  const togglePerson = (p: Personnel) => {
    if (!checkEditPermission('team')) return;
    setSelectedPersonnel(prev => prev.find(item => item.id === p.id) ? prev.filter(item => item.id !== p.id) : [...prev, p]);
  };

  const handleStartTask = (taskId: 'team' | 'exp' | 'content') => {
    setActiveTaskId(taskId);
    setPhase('task');
    setTasks(prev => prev.map(t => t.id === taskId && t.status === 'pending' ? { ...t, status: 'processing', progress: 10 } : t));
  };

  const markTaskCompleted = (taskId: 'team' | 'exp' | 'content') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));
    setPhase('hub');
    setActiveTaskId(null);
  };

  // 搜索过滤
  const filteredPersonnel = useMemo(() => {
    const q = staffSearchQuery.toLowerCase();
    return allPersonnelPool.filter(p => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.major.toLowerCase().includes(q));
  }, [staffSearchQuery]);

  // 团队简历单页渲染 (A4)
  // Fix: Explicitly typed as React.FC to properly handle the key prop in JSX maps
  const PersonnelA4Page: React.FC<{ person: Personnel, index: number }> = ({ person, index }) => (
    <div className="relative bg-white shadow-2xl text-left font-serif p-[20mm] transition-all flex flex-col mb-10 shrink-0 mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      <h2 className="text-xl font-black text-center mb-8 tracking-wider">{person.name} 个人简历及相关证书</h2>
      
      <table className="w-full border-collapse border-[1.5px] border-black text-[10.5pt] leading-[1.6]">
        <tbody>
          <tr>
            <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">姓 名</td>
            <td className="border border-black p-2 text-center w-[120px]">{person.name}</td>
            <td className="border border-black p-2 bg-slate-50 w-[80px] font-bold text-center">年 龄</td>
            <td className="border border-black p-2 text-center w-[80px]">{person.age}</td>
            <td className="border border-black p-2 bg-slate-50 w-[120px] font-bold text-center">执业资格证书名称</td>
            <td className="border border-black p-2 align-top text-xs">
              {person.certs.map((c, i) => <div key={i}>{c.name}</div>)}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">职 称</td>
            <td className="border border-black p-2 text-center">{person.title}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">学 历</td>
            <td className="border border-black p-2 text-center">{person.education}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">拟在本项目任职</td>
            <td className="border border-black p-2 text-center font-bold text-blue-600">{person.proposedPosition}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">工作年限</td>
            <td className="border border-black p-2 text-center">{person.years}</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center" colSpan={2}>从事类似工作年限</td>
            <td className="border border-black p-2 text-center font-bold" colSpan={2}>{person.similarYears}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">毕业学校</td>
            <td className="border border-black p-3 text-center" colSpan={5}>
              {person.gradDate}年毕业于{person.school}{person.major}专业
            </td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-100 font-bold text-center" colSpan={6}>主要工作经历</td>
          </tr>
          <tr>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">时 间</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center" colSpan={3}>参加过的类似项目</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">担任职务</td>
            <td className="border border-black p-2 bg-slate-50 font-bold text-center">委托人及联系电话</td>
          </tr>
          {person.projects.map((proj, idx) => (
            <tr key={idx}>
              <td className="border border-black p-2 text-center text-xs">{proj.time}</td>
              <td className="border border-black p-2 text-xs leading-relaxed" colSpan={3}>{proj.projectName}</td>
              <td className="border border-black p-2 text-center text-xs font-bold">{proj.role}</td>
              <td className="border border-black p-2 text-center text-[9pt]">
                <div>{proj.contact}</div>
                <div className="font-mono mt-1 text-slate-500">{proj.phone}</div>
              </td>
            </tr>
          ))}
          {/* 补充空白行 */}
          {Array.from({ length: 8 - person.projects.length }).map((_, i) => (
            <tr key={`empty-${i}`} className="h-10">
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2" colSpan={3}></td>
              <td className="border border-black p-2"></td>
              <td className="border border-black p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-auto pt-8 flex justify-between items-center opacity-40 italic">
        <span className="text-[8pt] font-sans">GridBid AI 资质系统 · 第 {index + 1} 页</span>
        <span className="text-[8pt] font-sans uppercase">Personnel Document Flow</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      {/* 搜索遮罩层 */}
      {showSearchOverlay === 'staff' && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowSearchOverlay(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col h-[80vh] border border-white/20">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl"><UserSearch size={24} /></div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic">从人才库中精准筛选</h3>
              </div>
              <button onClick={() => setShowSearchOverlay(null)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><X size={24}/></button>
            </div>
            <div className="p-8 border-b border-slate-50">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  autoFocus value={staffSearchQuery} onChange={e => setStaffSearchQuery(e.target.value)}
                  placeholder="检索姓名、职称、专业、毕业院校..." 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none rounded-2xl font-bold text-lg transition-all" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-4 custom-scrollbar-main">
              {filteredPersonnel.map(p => {
                const isSelected = selectedPersonnel.find(i => i.id === p.id);
                return (
                  <div key={p.id} onClick={() => togglePerson(p)} className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer flex items-center justify-between ${isSelected ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-50 hover:border-slate-200 bg-white'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{p.name[0]}</div>
                      <div className="text-left">
                        <p className="text-sm font-black text-slate-900 leading-none">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{p.title} · {p.years}年工龄</p>
                      </div>
                    </div>
                    {isSelected ? <Check size={20} className="text-indigo-600" strokeWidth={4} /> : <Plus size={18} className="text-slate-200" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 顶部状态栏 */}
      <div className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6 text-left">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-lg"><LayoutGrid size={24} /></div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase italic leading-none tracking-tighter">GridBid Workspace V2.6</h3>
            <div className="flex items-center space-x-2 mt-1.5">
               <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[9px] font-black rounded uppercase italic">{activeTask.projectId}</span>
               <p className="text-[10px] text-slate-400 font-black uppercase">{activeTask.lotName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
           <div className="flex items-center bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-200 shadow-inner">
              <div className="w-8 h-8 bg-slate-800 text-white rounded-lg flex items-center justify-center font-black text-sm mr-3 shadow-sm">{currentUser?.name[0]}</div>
              <div className="text-left">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                 <p className="text-xs font-black text-slate-800 leading-none">{currentUser?.name} <span className="text-blue-500 italic opacity-60">(@{currentUser?.id})</span></p>
              </div>
           </div>
           {phase !== 'hub' && (
             <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-4 py-2 uppercase tracking-widest transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 返回
             </button>
           )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
             {tasks.map(task => {
               const canEdit = checkEditPermission(task.id);
               return (
                 <div key={task.id} className={`relative h-[420px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${
                   task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 
                   task.status === 'processing' ? 'border-blue-500 shadow-2xl scale-105 z-10' : 'border-slate-50 shadow-sm'
                 }`}>
                    {!canEdit ? (
                      <div className="absolute top-8 right-10 flex items-center px-3 py-1.5 bg-slate-100 text-slate-400 rounded-full border border-slate-200">
                         <Lock size={12} className="mr-1.5" />
                         <span className="text-[9px] font-black uppercase italic tracking-widest">查看权</span>
                      </div>
                    ) : (
                       <div className="absolute top-8 right-10 flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-sm">
                         <BadgeCheck size={12} className="mr-1.5" />
                         <span className="text-[9px] font-black uppercase italic tracking-widest">负责人</span>
                      </div>
                    )}

                    <div className={`p-8 rounded-[40px] mb-8 transition-transform group-hover:scale-110 ${
                      task.status === 'completed' ? 'bg-emerald-500 text-white shadow-lg' : 
                      task.status === 'processing' ? 'bg-blue-600 text-white shadow-2xl rotate-6' : 'bg-slate-50 text-slate-300'
                    }`}>
                      <task.icon size={48} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase italic mt-4">指派人：{
                        task.id === 'team' ? activeTask.memberDraftingLeader?.name : 
                        task.id === 'exp' ? activeTask.expSelectionLeader?.name : 
                        activeTask.techProposalLeader?.name
                    }</p>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-8 shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                    </div>

                    <button 
                      onClick={() => handleStartTask(task.id)}
                      className={`px-12 py-4 rounded-[24px] text-[10px] font-black tracking-widest uppercase transition-all shadow-xl ${
                        canEdit ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {canEdit ? (task.status === 'completed' ? '重新校阅' : '开始编撰') : '查看内容'}
                    </button>
                 </div>
               );
             })}

             <div className="col-span-3 mt-8 flex flex-col items-center">
                <button 
                  disabled={!allTasksCompleted || !checkEditPermission('submission')}
                  onClick={() => setPhase('preview')}
                  className={`px-20 py-6 rounded-[32px] font-black text-sm tracking-[0.2em] uppercase flex items-center transition-all ${
                    allTasksCompleted && checkEditPermission('submission') ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl scale-105' : 'bg-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {checkEditPermission('submission') ? <Sparkles className="mr-4 text-amber-400" /> : <Lock className="mr-4 text-slate-500" />}
                  全案预览与合规打印
                </button>
                <div className="mt-4 flex items-center space-x-2">
                   <ShieldAlert size={14} className={checkEditPermission('submission') ? "text-blue-500" : "text-amber-500"} />
                   <p className="text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                     {checkEditPermission('submission') ? `已授权：您是本次投标任务负责人 (${activeTask.submissionLeader?.name})` : `受限：仅投标上传负责人 (${activeTask.submissionLeader?.name}) 拥有导出权`}
                   </p>
                </div>
             </div>
          </div>
        )}

        {phase === 'task' && activeTaskId && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500 text-left">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg"><Activity size={24}/></div>
                   <div>
                     <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">{tasks.find(t => t.id === activeTaskId)?.name}</h3>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic mt-1">
                        {checkEditPermission(activeTaskId) ? '本人负责环节 · 拥有全量编撰权' : '非负责人 · 仅限查看同步数据'}
                     </p>
                   </div>
                </div>
                {checkEditPermission(activeTaskId) ? (
                   <div className="flex items-center space-x-4">
                      {activeTaskId === 'team' && selectedPersonnel.length > 0 && (
                        <button onClick={() => setPhase('team_preview')} className="px-8 py-4 bg-slate-100 text-slate-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                           团队预览 ({selectedPersonnel.length})
                        </button>
                      )}
                      <button onClick={() => markTaskCompleted(activeTaskId)} className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl">
                        <CheckCircle2 size={18} className="mr-3 inline" /> 提交审核并锁定
                      </button>
                   </div>
                ) : (
                  <div className="px-10 py-4 bg-slate-100 text-slate-400 rounded-[24px] text-[10px] font-black uppercase tracking-widest border border-slate-200 flex items-center">
                    <Lock size={16} className="mr-2" /> 环节受限 (只读)
                  </div>
                )}
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main">
                {/* 成员拟定具体逻辑 */}
                {activeTaskId === 'team' && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     {/* AI 推荐区 */}
                     <section>
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center">
                              <Bot size={24} className="text-blue-600 mr-3" />
                              <div>
                                 <h4 className="text-sm font-black text-slate-900 uppercase italic">GridGPT 智能人岗匹配推荐</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Based on bid requirements & member track records</p>
                              </div>
                           </div>
                           <button 
                             onClick={handleAiRecommend} disabled={isAiRecommending}
                             className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
                           >
                             {isAiRecommending ? <RefreshCw className="mr-3 animate-spin" size={16}/> : <BrainCircuit size={16} className="mr-3" />}
                             启动 AI 辅助选人
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                           {aiRecommendations.length > 0 ? aiRecommendations.map(p => {
                             const isSelected = selectedPersonnel.find(item => item.id === p.id);
                             return (
                               <div key={p.id} className={`p-6 rounded-[40px] border-2 bg-slate-50/50 transition-all flex flex-col relative overflow-hidden group ${isSelected ? 'border-indigo-600' : 'border-blue-100'}`}>
                                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-black uppercase rounded-bl-2xl italic tracking-widest">AI 高度匹配</div>
                                  <div className="flex items-center space-x-4 mb-6">
                                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl bg-white shadow-sm text-blue-600 border border-blue-50`}>{p.name[0]}</div>
                                     <div className="text-left">
                                        <p className="text-lg font-black text-slate-900 italic">{p.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.title}</p>
                                     </div>
                                  </div>
                                  <div className="space-y-2 mb-6 flex-1">
                                     <div className="flex items-center text-[10px] text-slate-500"><GraduationCap size={12} className="mr-2"/> {p.school} · {p.education}</div>
                                     <div className="flex items-center text-[10px] text-slate-500"><Scale size={12} className="mr-2"/> 工龄 {p.years}年 / 类似 {p.similarYears}年</div>
                                  </div>
                                  <button 
                                    onClick={() => togglePerson(p)}
                                    className={`w-full py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                  >
                                    {isSelected ? '取消选中' : '加入团队'}
                                  </button>
                               </div>
                             );
                           }) : (
                             <div className="col-span-3 py-10 text-center border-2 border-dashed border-slate-100 rounded-[40px]">
                                <p className="text-xs font-bold text-slate-300 uppercase italic">等待 AI 指令或手动添加成员</p>
                             </div>
                           )}
                        </div>
                     </section>

                     {/* 已选团队列表 */}
                     <section>
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center">
                              <Users size={24} className="text-slate-900 mr-3" />
                              <div>
                                 <h4 className="text-sm font-black text-slate-900 uppercase italic">拟定团队成员名单</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Order of selection defines the document sequence</p>
                              </div>
                           </div>
                           <button onClick={() => setShowSearchOverlay('staff')} className="flex items-center px-8 py-4 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                              <Plus size={16} className="mr-2" /> 从库中手动添加
                           </button>
                        </div>
                        
                        <div className="space-y-4">
                           {selectedPersonnel.map((p, idx) => (
                             <div key={p.id} className="p-6 bg-white border border-slate-100 rounded-[32px] flex items-center justify-between group shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center space-x-6">
                                   <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xs">{idx + 1}</div>
                                   <div className="text-left">
                                      <p className="text-sm font-black text-slate-900 italic">{p.name}</p>
                                      <div className="flex items-center space-x-3 mt-1">
                                         <span className="text-[9px] font-black text-blue-600 uppercase italic bg-blue-50 px-2 py-0.5 rounded">{p.proposedPosition}</span>
                                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.title} · {p.major}</span>
                                      </div>
                                   </div>
                                </div>
                                <button onClick={() => togglePerson(p)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                             </div>
                           ))}
                           {selectedPersonnel.length === 0 && (
                             <div className="py-20 flex flex-col items-center justify-center opacity-20 italic">
                                <UserPlus size={64} strokeWidth={1} />
                                <p className="text-sm font-black uppercase tracking-widest mt-4">未指派任何成员</p>
                             </div>
                           )}
                        </div>
                     </section>
                  </div>
                )}

                {activeTaskId === 'exp' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                     <div className="flex items-center justify-between mb-8">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic flex items-center"><Award size={16} className="mr-2 text-emerald-500"/> 项目核心业绩匹配</h4>
                     </div>
                     <p className="text-sm italic text-slate-400">业绩遴选模块内容正在加载...</p>
                  </div>
                )}

                {activeTaskId === 'content' && (
                  <p className="text-sm italic text-slate-400">方案编撰模块内容正在加载...</p>
                )}
             </div>
          </div>
        )}

        {/* 团队简历合案预览 - 核心功能升级 */}
        {phase === 'team_preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 relative text-left">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10 shadow-inner">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomOut size={20}/></button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomIn size={20}/></button>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs font-bold text-blue-400 flex items-center mt-1 uppercase tracking-widest">
                       <ShieldCheck size={18} className="mr-3" /> 团队成员简历全案合并生成
                     </span>
                   </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => setPhase('task')} className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 transition-all">返回编辑</button>
                  <button className="flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-blue-900/40 transition-all">
                    <FileDown size={18} className="mr-3" /> 导出成员简历合规包 (Word)
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark">
                  {/* 按选择顺序循环渲染每一页简历 */}
                  <div className="origin-top transition-all" style={{ scale: `${zoomLevel / 100}` }}>
                    {selectedPersonnel.map((person, idx) => (
                      <PersonnelA4Page key={person.id} person={person} index={idx} />
                    ))}
                  </div>
              </div>
          </div>
        )}

        {phase === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 relative text-left">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10 shadow-inner">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomOut size={20}/></button>
                      <span className="px-8 text-sm font-black w-24 text-center tracking-tighter">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomIn size={20}/></button>
                   </div>
                </div>
                <button className="flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] shadow-xl shadow-blue-900/40 transition-all">导出最终版标书</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark">
                   <div className="bg-white shadow-[0_50px_100px_rgba(0,0,0,0.8)] origin-top transition-all p-24 text-left font-serif mb-20 relative" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: '1160px' }}>
                      <div className="h-full border-[16px] border-double border-slate-900 p-20 flex flex-col relative overflow-hidden">
                         <h1 className="text-6xl font-black text-center mb-24 uppercase italic tracking-tighter text-slate-900 leading-none">投标文件</h1>
                         <div className="space-y-16 relative z-10 text-left">
                            <div className="p-10 bg-slate-50 border-l-[12px] border-slate-900 shadow-sm">
                               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Project Entity</p>
                               <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-tight">{activeTask.title}</p>
                               <p className="text-xl font-bold text-blue-600 mt-4 underline decoration-blue-200 underline-offset-8">{activeTask.lotName}</p>
                            </div>
                         </div>
                      </div>
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
