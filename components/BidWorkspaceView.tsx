
import React, { useState, useMemo } from 'react';
import { 
  Users, Award, FileText, CircleCheck, ChevronRight, BrainCircuit, 
  RefreshCw, WandSparkles, Download, Save, MessageSquare, 
  UserPlus, AlertCircle, RefreshCcw,
  Search, X, ListFilter, Sparkles, Check,
  Printer, FileType, ShieldCheck, ZoomIn, ZoomOut, FileCheck,
  LayoutGrid, ArrowLeft, Clock, UserCheck, Activity, Terminal,
  Plus, MoreVertical, BadgeCheck, Zap, Trash2, Send, Filter,
  History, UserSearch, Briefcase, Database, Building2, Layers, SearchCode,
  // Fix: Added missing CheckCircle2 import
  CheckCircle2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  certs: string[];
  load: number;
  match: number;
  dept?: string;
  years?: number;
}

interface ProjectExp {
  id: string;
  name: string;
  client: string;
  amount: string;
  date: string;
  match: number;
}

interface Manager {
  id: string;
  name: string;
  role: string;
  score: number;
  years: number;
  majorProject: string;
  tags: string[];
}

interface TaskStatus {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  assignee: string;
  icon: any;
}

const BidWorkspaceView: React.FC = () => {
  const [phase, setPhase] = useState<'init' | 'hub' | 'task' | 'preview'>('init');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pm, setPm] = useState<Manager | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // 模态框状态
  const [showTalentPool, setShowTalentPool] = useState(false);
  const [showExpPool, setShowExpPool] = useState(false);
  const [talentPoolMode, setTalentPoolMode] = useState<'pm' | 'staff'>('pm');
  const [talentSearchQuery, setTalentSearchQuery] = useState('');
  const [expSearchQuery, setExpSearchQuery] = useState('');

  // 业务数据
  const [selectedStaff, setSelectedStaff] = useState<TeamMember[]>([]);
  const [selectedExp, setSelectedExp] = useState<ProjectExp[]>([]);
  const [aiDraft, setAiDraft] = useState('');
  const [chatInput, setChatInput] = useState('');

  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '团队资质匹配', status: 'pending', progress: 0, assignee: '投标经理 A', icon: Users },
    { id: 'exp', name: '业绩成果筛选', status: 'pending', progress: 0, assignee: '投标经理 B', icon: Award },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, assignee: 'AI 协同助理', icon: FileText },
  ]);

  const allTasksCompleted = useMemo(() => tasks.every(t => t.status === 'completed'), [tasks]);

  const mockManagers: Manager[] = [
    { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['高压资质', '江苏专家', '注册电气'] },
    { id: 'm2', name: '李经理', role: '技术中心主管', score: 94, years: 10, majorProject: '客服中心云平台二期', tags: ['信通专家', '跨省经验', 'PMP'] },
  ];

  const globalTalentPool: TeamMember[] = [
    { id: 'gt1', name: '周博', role: '系统架构师', certs: ['高级职称', '博士'], load: 10, match: 85, dept: '省级科研院', years: 12 },
    { id: 'gt2', name: '吴工', role: '通信专家', certs: ['注册咨询师'], load: 30, match: 80, dept: '信通分公司', years: 8 },
    { id: 'gt3', name: '郑工', role: '安全主管', certs: ['注册安全工程师'], load: 15, match: 75, dept: '安监部', years: 18 },
    { id: 'gt4', name: '陈工', role: '项目总监', certs: ['二级建造师', '一级造价师'], load: 40, match: 82, dept: '工程一部', years: 20 },
    { id: 'gt5', name: '林技术', role: '电气工程师', certs: ['注册电气工程师'], load: 5, match: 94, dept: '设计分院', years: 6 },
  ];

  const globalExpPool: ProjectExp[] = [
    { id: 'ge1', name: '2023年南方电网某数字配电网工程', client: '南方电网', amount: '1800万', date: '2024-01', match: 70 },
    { id: 'ge2', name: '国网北京电力智慧大脑一期', client: '国网北京', amount: '2200万', date: '2023-10', match: 65 },
    { id: 'ge3', name: '±800kV 换流站精细化巡检项目', client: '国网特高压公司', amount: '950万', date: '2022-11', match: 92 },
  ];

  const filteredTalent = useMemo(() => {
    const q = talentSearchQuery.toLowerCase();
    return globalTalentPool.filter(t => t.name.toLowerCase().includes(q) || (t.dept && t.dept.toLowerCase().includes(q)));
  }, [talentSearchQuery]);

  const filteredExp = useMemo(() => {
    const q = expSearchQuery.toLowerCase();
    return globalExpPool.filter(e => e.name.toLowerCase().includes(q) || e.client.toLowerCase().includes(q));
  }, [expSearchQuery]);

  const handleStartTask = (taskId: string) => {
    setActiveTaskId(taskId);
    setPhase('task');
    setTasks(prev => prev.map(t => t.id === taskId && t.status === 'pending' ? { ...t, status: 'processing', progress: 10 } : t));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t));
    setPhase('hub');
    setActiveTaskId(null);
  };

  const handleAggregate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setPhase('preview');
    }, 2000);
  };

  const renderTaskDetail = () => {
    switch (activeTaskId) {
      case 'team':
        return (
          <div className="flex h-full animate-in slide-in-from-right-12 duration-500">
            <div className="flex-1 p-10 overflow-y-auto space-y-8">
              <div className="flex justify-between items-end mb-4">
                <div className="text-left">
                  <h4 className="text-xl font-black text-slate-800 flex items-center">
                    <BadgeCheck size={24} className="mr-2 text-blue-600" /> AI 建议适配班子人选
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">系统已根据本项目“高压资质”及“特高压运维经验”初筛最优班子</p>
                </div>
                <button 
                  onClick={() => { setTalentPoolMode('staff'); setTalentSearchQuery(''); setShowTalentPool(true); }}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-blue-600 hover:border-blue-500 transition-all flex items-center shadow-sm"
                >
                  <UserPlus size={16} className="mr-2" /> 从全量人才库手动添加
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {globalTalentPool.slice(0, 3).map(staff => (
                  <div key={staff.id} className={`bg-white border p-5 rounded-3xl hover:border-blue-400 transition-all group flex items-center justify-between shadow-sm ${selectedStaff.some(s => s.id === staff.id) ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-100'}`}>
                    <div className="flex items-center text-left">
                      <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xl mr-6 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                        {staff.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-bold text-slate-800 text-lg">{staff.name}</p>
                          <span className="ml-3 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{staff.role}</span>
                        </div>
                        <div className="flex gap-4 mt-2">
                          {staff.certs.map(c => <span key={c} className="text-[10px] text-slate-400 font-bold flex items-center"><CheckCircle2 size={10} className="mr-1 text-emerald-500" /> {c}</span>)}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStaff(prev => prev.some(s => s.id === staff.id) ? prev.filter(s => s.id !== staff.id) : [...prev, staff])}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        selectedStaff.some(s => s.id === staff.id) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {selectedStaff.some(s => s.id === staff.id) ? <Check size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-80 bg-slate-50 border-l border-slate-200 p-8 flex flex-col shadow-inner">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center">
                <Users size={16} className="mr-2" /> 已选班子成员 ({selectedStaff.length})
              </h4>
              <div className="flex-1 overflow-y-auto space-y-4">
                 {selectedStaff.map(s => (
                   <div key={s.id} className="bg-white p-4 rounded-2xl border border-blue-100 flex items-center justify-between shadow-sm group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-sm font-black mr-4">{s.name[0]}</div>
                        <div className="text-left">
                          <span className="text-sm font-bold text-slate-700 block">{s.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{s.role}</span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedStaff(prev => prev.filter(x => x.id !== s.id))} className="text-slate-300 hover:text-red-500 transition-colors"><X size={16}/></button>
                   </div>
                 ))}
                 {selectedStaff.length === 0 && <div className="text-center py-20 text-slate-300 text-xs font-bold">暂无成员</div>}
              </div>
            </div>
          </div>
        );
      case 'exp':
        return (
          <div className="flex h-full animate-in slide-in-from-right-12 duration-500">
            <div className="flex-1 p-10 overflow-y-auto">
              <div className="flex justify-between items-end mb-8 text-left">
                <div>
                  <h4 className="text-xl font-black text-slate-800 flex items-center"><History size={24} className="mr-2 text-blue-600" /> 适配业绩抓取与关联</h4>
                  <p className="text-xs text-slate-400 mt-1">优先为您列出过往在电网系统中的高匹配度中标案例</p>
                </div>
                <button 
                  onClick={() => { setExpSearchQuery(''); setShowExpPool(true); }}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-blue-600 hover:border-blue-500 transition-all flex items-center shadow-sm"
                >
                  <Database size={16} className="mr-2" /> 检索全量业绩库
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {globalExpPool.map(exp => (
                  <div key={exp.id} className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer group flex items-center justify-between ${
                    selectedExp.some(e => e.id === exp.id) ? 'border-blue-600 bg-blue-50/30 shadow-xl' : 'border-slate-100 bg-white hover:border-blue-200'
                  }`} onClick={() => setSelectedExp(prev => prev.some(e => e.id === exp.id) ? prev.filter(e => e.id !== exp.id) : [...prev, exp])}>
                    <div className="flex items-center text-left">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 transition-all ${selectedExp.some(e => e.id === exp.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Briefcase size={28} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                           <p className="font-black text-slate-800 text-lg">{exp.name}</p>
                           {exp.match > 90 && <span className="flex items-center text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-black italic tracking-widest uppercase"><Zap size={10} className="mr-1"/> High Match</span>}
                        </div>
                        <div className="flex space-x-6 mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center"><Building2 size={14} className="mr-1.5" /> {exp.client}</span>
                          <span className="flex items-center"><Layers size={14} className="mr-1.5" /> {exp.amount}</span>
                          <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{exp.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedExp.some(e => e.id === exp.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-transparent'}`}>
                      <Check size={20} strokeWidth={4} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="flex h-full animate-in slide-in-from-right-12 duration-500">
            <div className="w-80 bg-slate-900 flex flex-col shrink-0 shadow-2xl z-10">
               <div className="p-6 border-b border-slate-800 flex items-center">
                  <BrainCircuit size={20} className="text-blue-400 mr-2" />
                  <span className="text-xs font-black text-white tracking-widest uppercase italic">AI Co-Author Assistant</span>
               </div>
               <div className="flex-1 p-6 overflow-y-auto space-y-6 text-left">
                  <div className="bg-slate-800/50 p-6 rounded-[24px] border border-slate-700 text-blue-100 leading-relaxed shadow-inner">
                     <p className="font-black mb-3 flex items-center text-blue-400 text-xs uppercase tracking-widest"><Sparkles size={14} className="mr-2"/> Strategy Advice</p>
                     <p className="text-xs text-slate-300">系统已基于项目负责人【{pm?.name}】及其核心业绩集构建了响应大纲。建议在“技术保障措施”章节重点突出±800kV换流站的成功巡检经验，这能提升20%的专家评分权重。</p>
                  </div>
                  <div className="pt-6 border-t border-slate-800 mt-auto flex flex-col gap-4">
                    <textarea 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="发送指令给 AI：扩充第二章、调整文字风格、插入资质引用..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-5 text-slate-200 text-xs h-40 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600 transition-all font-medium"
                    />
                    <button className="py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-900/40">
                      <Send size={14} className="mr-2" /> 确认发送指令
                    </button>
                  </div>
               </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-100/50">
               <div className="h-16 border-b border-slate-200 bg-white flex items-center px-10 justify-between shadow-sm shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Drafting Workspace</span>
                  <button 
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        setAiDraft(`## 第四章：技术响应方案 (适配项目: ${pm?.majorProject})\n\n针对本项目采购人【${pm?.majorProject.includes('国网') ? '国家电网' : '南方电网'}】的严格资质要求，我司特别委派了由资深项目经理【${pm?.name}】领衔的专家团队，核心成员包括【${selectedStaff.map(s => s.name).join('、')}】。全组成员均具备深厚的电网服务背景。\n\n在过往实施的【${selectedExp[0]?.name || '同类历史项目'}】中，我司积累了深厚的技术底蕴，能够完美覆盖本次招标的所有技术细节...`);
                        setIsGenerating(false);
                      }, 1500);
                    }}
                    className="flex items-center px-8 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95"
                  >
                    {isGenerating ? <RefreshCw size={16} className="animate-spin mr-2"/> : <WandSparkles size={16} className="mr-2"/>}
                    AI 动态填充全文草案
                  </button>
               </div>
               <div className="flex-1 p-12 overflow-y-auto custom-scrollbar-dark scroll-smooth text-left">
                  <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-sm min-h-[1000px] p-24 font-serif leading-[2.2] whitespace-pre-wrap text-slate-800 border border-slate-100 relative">
                     {/* 页面指示器 */}
                     <div className="absolute top-10 right-10 text-[10px] font-black text-slate-300 tracking-widest">PAGE 01 / DRAFT</div>
                     {aiDraft || (
                       <div className="h-full flex flex-col items-center justify-center text-slate-300 py-48">
                         <FileText size={100} strokeWidth={1} className="mb-8 opacity-20" />
                         <p className="text-lg font-black uppercase tracking-tighter">Document Empty</p>
                         <p className="text-xs mt-3 text-slate-400 text-center max-w-sm">点击上方“AI 动态填充”按钮，系统将自动聚合当前选定的项目班子、核心业绩并生成高合规性的技术响应初稿。</p>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      {/* 全量人才库模态框 (用于手动指派 PM 或 班子成员) */}
      {showTalentPool && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowTalentPool(false)} />
          <div className="relative w-full max-w-5xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="text-left">
                <h3 className="text-3xl font-black flex items-center text-slate-900 tracking-tighter uppercase italic">
                  <UserSearch size={32} className="mr-4 text-blue-600" /> 全量企业人才资产库
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Searching across 2,400+ certified specialists</p>
              </div>
              <button onClick={() => setShowTalentPool(false)} className="p-3 hover:bg-white hover:shadow-md rounded-full text-slate-400 transition-all border border-transparent hover:border-slate-100"><X size={32}/></button>
            </div>
            <div className="px-10 py-8 bg-white border-b border-slate-100">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
                <input 
                  autoFocus
                  value={talentSearchQuery}
                  onChange={(e) => setTalentSearchQuery(e.target.value)}
                  placeholder="检索姓名、所属部门、核心资质证书（如：注册电气、PMP、高级职称）..." 
                  className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-100 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all text-lg font-medium shadow-inner" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 gap-8 bg-slate-50/30 custom-scrollbar-dark">
               {filteredTalent.length > 0 ? filteredTalent.map((staff) => (
                 <div key={staff.id} className="p-8 bg-white border border-slate-100 rounded-[32px] hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-between group cursor-default">
                    <div className="flex items-center text-left">
                      <div className="w-16 h-16 bg-slate-100 rounded-[20px] flex items-center justify-center font-black text-slate-400 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all mr-6 border border-slate-100 group-hover:border-blue-600">
                        {staff.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-xl tracking-tight">{staff.name}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{staff.dept}</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                           <span className="text-[10px] text-blue-600 font-black">EXP {staff.years}Y</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (talentPoolMode === 'pm') {
                          setPm({ id: staff.id, name: staff.name, role: staff.role, score: 90, years: staff.years || 10, majorProject: '手动指派项目负责人', tags: staff.certs });
                          setPhase('hub');
                        } else {
                          if (!selectedStaff.some(s => s.id === staff.id)) setSelectedStaff(prev => [...prev, staff]);
                        }
                        setShowTalentPool(false);
                      }}
                      className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl shadow-slate-200 hover:bg-blue-600 active:scale-95"
                    >
                      {talentPoolMode === 'pm' ? '指派为负责人' : '选入班子'}
                    </button>
                 </div>
               )) : <div className="col-span-2 text-center py-32 text-slate-300 text-lg font-black uppercase tracking-widest">No matching talent found</div>}
            </div>
          </div>
        </div>
      )}

      {/* 历史业绩检索模态框 */}
      {showExpPool && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowExpPool(false)} />
          <div className="relative w-full max-w-5xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-left">
              <div>
                <h3 className="text-3xl font-black flex items-center text-slate-900 tracking-tighter uppercase italic">
                  <Database size={32} className="mr-4 text-emerald-600" /> 企业历史中标业绩库
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Archived success stories and references</p>
              </div>
              <button onClick={() => setShowExpPool(false)} className="p-3 hover:bg-white hover:shadow-md rounded-full text-slate-400 transition-all border border-transparent hover:border-slate-100"><X size={32}/></button>
            </div>
            <div className="p-10 bg-white border-b border-slate-100">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={24} />
                <input 
                  autoFocus
                  value={expSearchQuery}
                  onChange={(e) => setExpSearchQuery(e.target.value)}
                  placeholder="根据关键词、项目名、业主单位快速搜索..." 
                  className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-100 border-2 border-transparent focus:border-emerald-600 focus:bg-white outline-none transition-all text-lg font-medium shadow-inner" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-6 bg-slate-50/30 custom-scrollbar-dark">
               {filteredExp.length > 0 ? filteredExp.map((exp) => (
                 <div key={exp.id} className="p-8 bg-white border border-slate-100 rounded-[32px] hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-between group">
                    <div className="flex-1 pr-12 text-left">
                      <p className="font-black text-slate-900 text-xl tracking-tight leading-tight">{exp.name}</p>
                      <div className="flex gap-8 mt-4 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                        <span className="flex items-center"><Building2 size={16} className="mr-2 text-slate-300" /> {exp.client}</span>
                        <span className="flex items-center"><Layers size={16} className="mr-2 text-slate-300" /> {exp.amount}</span>
                        <span className="text-slate-400">Date: {exp.date}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (!selectedExp.some(e => e.id === exp.id)) setSelectedExp(prev => [...prev, exp]);
                        setShowExpPool(false);
                      }}
                      className="px-8 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-xl shadow-emerald-100 active:scale-95"
                    >
                      选入当前支撑
                    </button>
                 </div>
               )) : <div className="text-center py-32 text-slate-300 text-lg font-black uppercase tracking-widest">No matching experience found</div>}
            </div>
          </div>
        </div>
      )}

      {/* 顶部状态栏 */}
      <div className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6 text-left">
          <div className={`p-3 rounded-2xl transition-all ${phase === 'init' ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-xl shadow-blue-100 animate-pulse'}`}>
             <LayoutGrid size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tighter uppercase italic">Smart Bidding Workspace</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
              Current: {
                phase === 'init' ? 'Phase 01 / Assign Lead' : 
                phase === 'hub' ? 'Phase 02 / Collaborative Hub' : 
                phase === 'task' ? 'Phase 03 / Expert Drafting' : 'Phase 04 / Final Preview'
              }
            </p>
          </div>
        </div>

        {pm && phase !== 'init' && (
          <div className="flex items-center bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 animate-in slide-in-from-right shadow-sm">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg mr-4 shadow-lg shadow-blue-200">
              {pm.name[0]}
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-slate-900 leading-tight">{pm.name} <span className="text-blue-600 ml-1 text-[10px] uppercase font-black">Project Lead</span></p>
              <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">{pm.role}</p>
            </div>
            <div className="w-px h-8 bg-blue-200 mx-6 opacity-30"></div>
            <button onClick={() => { setPm(null); setPhase('init'); }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100" title="更换负责人">
              <RefreshCcw size={16} />
            </button>
          </div>
        )}

        {phase === 'preview' && (
          <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 transition-colors px-6 py-3 hover:bg-slate-50 rounded-2xl uppercase tracking-widest">
             <ArrowLeft size={18} className="mr-3" /> Back to Hub
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Phase 0: 初始化指派负责人 */}
        {phase === 'init' && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[56px] border-4 border-dashed border-slate-100 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center max-w-5xl w-full px-16">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-[0_25px_50px_-12px_rgba(37,99,235,0.15)] border border-blue-100">
                <UserCheck size={48} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Designate Bid Leader</h3>
              <p className="text-sm text-slate-400 mb-16 font-bold uppercase tracking-widest">Assign a primary lead to unlock the collaborative workspace and AI writing modules</p>
              
              <div className="grid grid-cols-2 gap-10 mb-16">
                {mockManagers.map(m => (
                  <div 
                    key={m.id}
                    className="p-10 bg-white border-2 border-slate-100 rounded-[40px] hover:border-blue-600 hover:shadow-2xl transition-all text-left relative group cursor-pointer hover:-translate-y-1"
                    onClick={() => { setPm(m); setPhase('hub'); }}
                  >
                    <div className="absolute top-8 right-8 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm uppercase tracking-widest italic">AI Recommend {m.score}%</div>
                    <div className="flex items-center mb-8">
                       <div className="w-20 h-20 bg-slate-900 rounded-[24px] flex items-center justify-center font-black text-white text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500">{m.name[0]}</div>
                       <div className="ml-6">
                          <p className="font-black text-slate-900 text-2xl tracking-tight">{m.name}</p>
                          <p className="text-[11px] text-slate-400 font-black mt-1.5 uppercase tracking-widest">{m.role} · {m.years}Y Industry Exp</p>
                       </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left">
                       <p className="text-[10px] uppercase text-slate-400 font-black mb-2 tracking-widest flex items-center"><History size={12} className="mr-2"/> Relevant Success Story</p>
                       <p className="text-xs font-bold text-slate-700 leading-relaxed italic truncate">{m.majorProject}</p>
                    </div>
                    <div className="mt-8 flex justify-end">
                       <div className="px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center">
                         Confirm Lead <ChevronRight size={14} className="ml-2" />
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-10 justify-center">
                 <div className="h-px bg-slate-100 w-32"></div>
                 <span className="text-xs text-slate-400 font-black uppercase tracking-[0.4em] italic">Or Manual Selection</span>
                 <div className="h-px bg-slate-100 w-32"></div>
              </div>

              {/* 此处即为修复回归的：手动从全量库指派负责人按钮 */}
              <button 
                onClick={() => { setTalentPoolMode('pm'); setTalentSearchQuery(''); setShowTalentPool(true); }}
                className="mt-12 px-14 py-5 bg-slate-900 text-white rounded-[28px] text-xs font-black uppercase tracking-widest hover:bg-black transition-all flex items-center mx-auto shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)] group active:scale-95"
              >
                <UserSearch size={22} className="mr-4 group-hover:scale-110 transition-transform" />
                从全量人才库手动检索并指派负责人
              </button>
            </div>
          </div>
        )}

        {/* Phase 1: 协作大厅 (Hub) */}
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             {tasks.map(task => (
               <div key={task.id} className={`relative bg-white h-[450px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group ${
                 task.status === 'completed' ? 'border-emerald-100 shadow-2xl shadow-emerald-500/5' : 
                 task.status === 'processing' ? 'border-blue-500 shadow-2xl shadow-blue-500/10 scale-105' : 'border-slate-50 shadow-sm hover:border-slate-200'
               }`}>
                  <div className={`p-8 rounded-[40px] mb-10 transition-all duration-1000 ${
                    task.status === 'completed' ? 'bg-emerald-500 text-white shadow-2xl shadow-emerald-200' : 
                    task.status === 'processing' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20 rotate-6' : 'bg-slate-50 text-slate-300'
                  }`}>
                    <task.icon size={48} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-3 mb-10 font-black uppercase tracking-widest leading-loose">Assigned To: {task.assignee}</p>
                  
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-10 shadow-inner p-0.5 border border-slate-200">
                    <div className={`h-full rounded-full transition-all duration-[2000ms] ease-out shadow-sm ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                  </div>

                  {task.status === 'completed' ? (
                    <div className="flex items-center text-emerald-600 text-[11px] font-black tracking-[0.2em] uppercase bg-emerald-50 px-8 py-3 rounded-2xl border border-emerald-100 animate-in zoom-in-95">
                       <Check size={20} className="mr-3" strokeWidth={5} /> Locked & Ready
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartTask(task.id)}
                      className={`px-12 py-4 rounded-[24px] text-[10px] font-black tracking-widest uppercase transition-all active:scale-95 ${
                        task.status === 'processing' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-200'
                      }`}
                    >
                      {task.status === 'processing' ? 'Continue Execution' : 'Enter Workspace'}
                    </button>
                  )}
               </div>
             ))}

             {/* 此处即为最终全文预览定稿触发入口 */}
             <div className="col-span-3 mt-16 flex justify-center">
                <div className="bg-slate-900 p-12 rounded-[64px] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.6)] flex items-center justify-between w-full max-w-6xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]"></div>
                  <div className="flex items-center space-x-12 text-left relative z-10">
                    <div className="flex -space-x-6">
                      {tasks.map(t => (
                        <div key={t.id} className={`w-16 h-16 rounded-full border-[6px] border-slate-900 flex items-center justify-center transition-all duration-1000 ${t.status === 'completed' ? 'bg-emerald-500 scale-110 z-10 shadow-2xl shadow-emerald-500/40' : 'bg-slate-800'}`}>
                           {t.status === 'completed' ? <Check size={28} strokeWidth={5} className="text-white" /> : <Activity size={28} className="text-slate-600 animate-pulse" />}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white text-2xl font-black tracking-tighter uppercase italic">Synthesis Engine <span className="text-blue-500 font-mono text-sm ml-2">v4.0</span></p>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{allTasksCompleted ? 'All modules validated · ready for final aggregation' : 'Waiting for parallel drafting modules to reach 100%...'}</p>
                    </div>
                  </div>
                  <button 
                    disabled={!allTasksCompleted || isGenerating}
                    onClick={handleAggregate}
                    className={`px-16 py-6 rounded-[32px] font-black text-sm tracking-[0.2em] uppercase flex items-center transition-all relative z-10 ${
                      allTasksCompleted ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-500/50 cursor-pointer active:scale-95 translate-x-0' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
                    }`}
                  >
                    {isGenerating ? <RefreshCw className="animate-spin mr-4" size={20} /> : <Sparkles className="mr-4 text-amber-400" size={20} />}
                    {isGenerating ? 'Synthesizing Data...' : '生成第四步：最终预览定稿'}
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* Phase 2: 具体工作站 (子任务细节) */}
        {phase === 'task' && activeTaskId && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] animate-in slide-in-from-right-20 duration-700">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between z-10 shadow-sm shrink-0">
                <div className="flex items-center space-x-8 text-left">
                   <button onClick={() => setPhase('hub')} className="p-4 hover:bg-white hover:shadow-xl text-slate-400 hover:text-slate-900 rounded-[20px] transition-all border border-transparent hover:border-slate-100"><ArrowLeft size={24}/></button>
                   <div>
                     <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic italic">{tasks.find(t => t.id === activeTaskId)?.name}</h3>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5 flex items-center">
                       <Clock size={12} className="mr-2" /> Module Lead: {tasks.find(t => t.id === activeTaskId)?.assignee}
                     </p>
                   </div>
                </div>
                <button 
                  onClick={() => handleCompleteTask(activeTaskId)}
                  className="px-12 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black tracking-widest uppercase hover:bg-emerald-700 shadow-2xl shadow-emerald-500/30 transition-all flex items-center active:scale-95"
                >
                  <Check size={20} className="mr-3" strokeWidth={5} /> 确认模块已就绪
                </button>
             </div>
             <div className="flex-1 overflow-hidden relative">
                {renderTaskDetail()}
             </div>
          </div>
        )}

        {/* Phase 3: 全文预览与定稿 (Preview) */}
        {phase === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden animate-in zoom-in-95 duration-700 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] border border-white/5 relative">
             {/* 预览控制条 */}
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-16">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10 shadow-inner">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 hover:bg-slate-700 rounded-2xl transition-all text-slate-500 hover:text-white"><ZoomOut size={20}/></button>
                      <span className="px-8 text-sm font-black w-20 text-center tabular-nums">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 hover:bg-slate-700 rounded-2xl transition-all text-slate-500 hover:text-white"><ZoomIn size={20}/></button>
                   </div>
                   <div className="h-8 w-px bg-white/10 opacity-30"></div>
                   <div className="flex flex-col text-left">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 opacity-60 italic">Bid Integrity Check</span>
                     <span className="text-xs font-bold text-emerald-400 flex items-center tracking-tight">
                       <ShieldCheck size={18} className="mr-3" /> 深度合规审计与逻辑闭环验证已通过
                     </span>
                   </div>
                </div>
                <div className="flex space-x-6">
                   <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/10 transition-all flex items-center"><Printer size={18} className="mr-3" /> Quick Print</button>
                   <button className="flex items-center px-12 py-4 bg-blue-600 hover:bg-blue-500 text-[10px] font-black tracking-[0.2em] uppercase rounded-3xl transition-all shadow-2xl shadow-blue-500/40 active:scale-95">
                      <Download size={20} className="mr-4" /> 导出最终定稿 PDF
                   </button>
                </div>
              </div>

              {/* 拟真 A4 渲染区域 */}
              <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center custom-scrollbar-dark bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black relative">
                   {/* 背景防伪水印 */}
                   <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] select-none flex flex-wrap gap-24 p-24 justify-center">
                      {[...Array(24)].map((_, i) => <div key={i} className="-rotate-45 text-5xl font-black text-white whitespace-nowrap tracking-[1em] uppercase">GRIDBID AI - SECURE DRAFT</div>)}
                   </div>

                   {/* A4 容器 */}
                   <div className="bg-white shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] origin-top transition-transform duration-500 relative border border-slate-100 group/page" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: `${1160 * (zoomLevel/100)}px`, padding: '100px' }}>
                      <div className="h-full border-[16px] border-double border-slate-900 p-24 flex flex-col items-center text-center relative overflow-hidden">
                         <div className="w-32 h-2 bg-slate-900 mb-12"></div>
                         <h1 className="text-7xl font-serif font-black mb-16 tracking-[0.3em] text-slate-900 uppercase italic leading-tight">投标文件</h1>
                         <div className="w-64 h-3 bg-slate-900 mb-32"></div>
                         
                         <div className="w-full text-left space-y-20 mt-12 relative z-10">
                            <section>
                               <h3 className="text-lg font-black border-b-[6px] border-slate-900 pb-5 mb-10 uppercase tracking-widest text-slate-900 italic flex justify-between items-end">
                                 I. 项目负责人及班子构成 
                                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest not-italic">Team Assets</span>
                               </h3>
                               <div className="grid grid-cols-2 gap-y-6 gap-x-16 text-sm text-left">
                                  <div className="flex justify-between border-b-2 border-slate-100 pb-4">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">Project Lead</span>
                                    <span className="font-black text-slate-900">{pm?.name || 'TBD'}</span>
                                  </div>
                                  {selectedStaff.map(s => (
                                    <div key={s.id} className="flex justify-between border-b-2 border-slate-100 pb-4">
                                      <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">{s.role}</span>
                                      <span className="font-black text-slate-900">{s.name}</span>
                                    </div>
                                  ))}
                               </div>
                            </section>
                            
                            <section>
                               <h3 className="text-lg font-black border-b-[6px] border-slate-900 pb-5 mb-10 uppercase tracking-widest text-slate-900 italic flex justify-between items-end">
                                 II. 企业历史业绩深度支撑
                                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest not-italic">Success Evidence</span>
                               </h3>
                               <div className="space-y-8 text-left">
                                  {selectedExp.length > 0 ? selectedExp.map(e => (
                                    <div key={e.id} className="text-xs bg-slate-50 p-8 border-2 border-slate-100 rounded-[32px] shadow-inner flex justify-between items-center group/exp">
                                      <div>
                                        <p className="font-black text-slate-900 text-base mb-3 uppercase tracking-tight leading-tight italic">{e.name}</p>
                                        <div className="flex space-x-8">
                                          <p className="text-slate-500 font-bold tracking-widest text-[10px] uppercase">业主: {e.client}</p>
                                          <p className="text-slate-500 font-bold tracking-widest text-[10px] uppercase">中标额: {e.amount}</p>
                                        </div>
                                      </div>
                                      <div className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-300">
                                         <ShieldCheck size={24} />
                                      </div>
                                    </div>
                                  )) : <p className="text-slate-300 italic text-sm py-10 text-center border-2 border-dashed border-slate-100 rounded-3xl">未关联支撑业绩</p>}
                               </div>
                            </section>
                            
                            <section className="flex-1 text-left">
                               <h3 className="text-lg font-black border-b-[6px] border-slate-900 pb-5 mb-10 uppercase tracking-widest text-slate-900 italic flex justify-between items-end">
                                 III. 技术方案响应逻辑摘要
                                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest not-italic">Executive Summary</span>
                               </h3>
                               <p className="text-xs text-slate-600 font-serif leading-[2.6] italic indent-14 text-justify line-clamp-[15] p-2">
                                  {aiDraft || "系统正在通过行业大模型 (GridGPT-4.0) 对上述团队背景、专家资质与历史业绩进行全文深度编排。当前的预览状态展示了基于负责人【"+(pm?.name||'未指定')+"】核心优势生成的逻辑摘要。正式定稿将自动扩展为符合国网/南网规范的24个核心章节，总计约45,000字，涵盖技术、商务及服务承诺全部维度。"}
                               </p>
                            </section>
                         </div>

                         {/* 签章栏 */}
                         <div className="mt-auto pt-32 w-full flex justify-between items-end border-t-4 border-slate-900/5">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 opacity-60">Lead Authorization Signature</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{pm?.name || 'Authorized Lead'}</p>
                                <p className="text-[11px] font-bold text-slate-500 uppercase mt-4 tracking-widest tabular-nums opacity-60">
                                  {new Date().toLocaleDateString('zh-CN', {year:'numeric', month:'long', day:'numeric'})}
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="p-8 bg-slate-950 text-white rounded-[40px] mb-8 shadow-2xl rotate-6 border border-white/20">
                                  <ShieldCheck size={56} strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.5em] opacity-40">System UID: {Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
                            </div>
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
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;
