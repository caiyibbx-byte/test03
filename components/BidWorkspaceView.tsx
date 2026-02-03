
import React, { useState, useMemo } from 'react';
import { 
  Users, Award, FileText, CircleCheck, ChevronRight, BrainCircuit, 
  RefreshCw, WandSparkles, Download, Save, MessageSquare, 
  UserPlus, AlertCircle, RefreshCcw,
  Search, X, ListFilter, Sparkles, Check,
  Printer, FileType, ShieldCheck, ZoomIn, ZoomOut, FileCheck,
  LayoutGrid, ArrowLeft, Clock, UserCheck, Activity, Terminal,
  Plus, MoreVertical, BadgeCheck, Zap, Trash2, Send, Filter,
  History, UserSearch, Briefcase, Database, Building2, Layers, SearchCode
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
  
  // 弹窗与搜索状态
  const [showTalentPool, setShowTalentPool] = useState(false);
  const [showExpPool, setShowExpPool] = useState(false);
  const [talentPoolMode, setTalentPoolMode] = useState<'pm' | 'staff'>('staff');
  const [talentSearchQuery, setTalentSearchQuery] = useState('');
  const [expSearchQuery, setExpSearchQuery] = useState('');

  // 业务选择状态
  const [selectedStaff, setSelectedStaff] = useState<TeamMember[]>([]);
  const [selectedExp, setSelectedExp] = useState<ProjectExp[]>([]);
  const [aiDraft, setAiDraft] = useState('');
  const [chatInput, setChatInput] = useState('');

  // 任务状态追踪
  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '团队资质匹配', status: 'pending', progress: 0, assignee: '投标经理 A', icon: Users },
    { id: 'exp', name: '业绩成果筛选', status: 'pending', progress: 0, assignee: '投标经理 B', icon: Award },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, assignee: 'AI 协同助理', icon: FileText },
  ]);

  const allTasksCompleted = useMemo(() => tasks.every(t => t.status === 'completed'), [tasks]);

  // 模拟数据
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

  // 搜索逻辑
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
    // 模拟编撰生成过程
    setTimeout(() => {
      setIsGenerating(false);
      setPhase('preview');
    }, 2000);
  };

  const renderTaskDetail = () => {
    switch (activeTaskId) {
      case 'team':
        return (
          <div className="flex h-full">
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-lg font-bold text-slate-800 flex items-center">
                  <BadgeCheck size={20} className="mr-2 text-blue-600" /> AI 建议匹配人选
                </h4>
                <button 
                  onClick={() => { setTalentPoolMode('staff'); setTalentSearchQuery(''); setShowTalentPool(true); }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-blue-600 hover:border-blue-500 transition-all flex items-center"
                >
                  <UserPlus size={14} className="mr-2" /> 从全量人才库添加
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {globalTalentPool.slice(0, 2).map(staff => (
                  <div key={staff.id} className="bg-white border border-slate-200 p-4 rounded-2xl hover:border-blue-400 transition-all group flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-slate-500 mr-4 border border-blue-100">
                        {staff.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-bold text-slate-800">{staff.name}</p>
                          <span className="ml-2 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">{staff.role}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          {staff.certs.map(c => <span key={c} className="text-[10px] text-slate-400 font-medium">· {c}</span>)}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStaff(prev => prev.some(s => s.id === staff.id) ? prev.filter(s => s.id !== staff.id) : [...prev, staff])}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        selectedStaff.some(s => s.id === staff.id) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {selectedStaff.some(s => s.id === staff.id) ? <Check size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col shadow-inner">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                <Users size={14} className="mr-2" /> 已选班子成员 ({selectedStaff.length})
              </h4>
              <div className="flex-1 overflow-y-auto space-y-3 text-left">
                 {selectedStaff.map(s => (
                   <div key={s.id} className="bg-white p-3 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold mr-3">{s.name[0]}</div>
                        <span className="text-sm font-medium text-slate-700">{s.name}</span>
                      </div>
                      <button onClick={() => setSelectedStaff(prev => prev.filter(x => x.id !== s.id))} className="text-slate-300 hover:text-red-500 transition-colors"><X size={14}/></button>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      case 'exp':
        return (
          <div className="flex h-full">
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex justify-between items-end mb-6 text-left">
                <h4 className="text-lg font-bold text-slate-800 flex items-center"><History size={20} className="mr-2 text-blue-600" /> 相关业绩成果自动抓取</h4>
                <button 
                  onClick={() => { setExpSearchQuery(''); setShowExpPool(true); }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-blue-600 hover:border-blue-500 transition-all flex items-center shadow-sm"
                >
                  <Database size={14} className="mr-2" /> 检索全量业绩库
                </button>
              </div>
              <div className="space-y-4">
                {globalExpPool.slice(0, 2).map(exp => (
                  <div key={exp.id} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedExp.some(e => e.id === exp.id) ? 'border-blue-500 bg-blue-50/30 shadow-lg' : 'border-slate-100 bg-white hover:border-blue-200'
                  }`} onClick={() => setSelectedExp(prev => prev.some(e => e.id === exp.id) ? prev.filter(e => e.id !== exp.id) : [...prev, exp])}>
                    <div className="flex justify-between items-start text-left">
                      <div>
                        <div className="flex items-center space-x-2">
                           <p className="font-bold text-slate-800">{exp.name}</p>
                           {exp.match > 90 && <span className="flex items-center text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-bold"><Zap size={10} className="mr-1"/> 核心建议</span>}
                        </div>
                        <div className="flex space-x-4 mt-2 text-[11px] text-slate-500">
                          <span className="flex items-center"><Building2 size={12} className="mr-1" /> {exp.client}</span>
                          <span className="flex items-center"><Layers size={12} className="mr-1" /> {exp.amount}</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedExp.some(e => e.id === exp.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-transparent'}`}><Check size={14} strokeWidth={4} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="flex h-full bg-slate-50/20">
            <div className="w-80 bg-slate-900 flex flex-col shrink-0 shadow-2xl z-10">
               <div className="p-4 border-b border-slate-800 flex items-center">
                  <BrainCircuit size={18} className="text-blue-400 mr-2" />
                  <span className="text-sm font-bold text-white tracking-wide uppercase">AI 文书增强助手</span>
               </div>
               <div className="flex-1 p-4 overflow-y-auto space-y-4 text-left text-xs">
                  <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 text-blue-200 leading-relaxed shadow-inner">
                     <p className="font-bold mb-2 flex items-center text-blue-400"><Sparkles size={14} className="mr-2"/> 智能编排建议</p>
                     已基于您的负责人【{pm?.name}】及其核心业绩库构建了响应逻辑。建议针对技术评分点，进一步强化“安全围蔽”部分的描述。
                  </div>
                  <div className="pt-4 border-t border-slate-800 mt-auto flex flex-col gap-2">
                    <textarea 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="要求 AI 针对特定的招标文件章节进行扩充润色..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 text-[11px] h-32 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600 transition-all"
                    />
                    <button className="py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center">
                      <Send size={14} className="mr-2" /> 确认发送
                    </button>
                  </div>
               </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
               <div className="h-14 border-b border-slate-200 bg-white flex items-center px-8 justify-between shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">技术响应方案编辑器 (Draft)</span>
                  <button 
                    onClick={() => {
                      setIsGenerating(true);
                      setTimeout(() => {
                        setAiDraft(`## 第四章：技术响应方案 (适配项目: ${pm?.majorProject})\n\n针对本项目采购人【电网系统】的严格资质要求，我司特别委派了由资深项目经理【${pm?.name}】领衔的专家团队，成员包括【${selectedStaff.map(s => s.name).join('、')}】。全组成员均具备深厚的电网服务背景。\n\n在过往实施的【${selectedExp[0]?.name || '同类历史项目'}】中，我司积累了深厚的技术底蕴，能够完美覆盖本次招标的所有技术细节...`);
                        setIsGenerating(false);
                      }, 1500);
                    }}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                  >
                    {isGenerating ? <RefreshCw size={14} className="animate-spin mr-2"/> : <WandSparkles size={14} className="mr-2"/>}
                    AI 动态填充全文草案
                  </button>
               </div>
               <div className="flex-1 p-10 overflow-y-auto bg-slate-200/20 custom-scrollbar-dark scroll-smooth text-left">
                  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-sm min-h-[1000px] p-24 font-serif leading-loose whitespace-pre-wrap text-slate-800 border border-slate-100">
                     {aiDraft || (
                       <div className="h-full flex flex-col items-center justify-center text-slate-300 py-40">
                         <FileText size={80} strokeWidth={1} className="mb-6 opacity-40" />
                         <p className="text-sm font-bold">文稿暂无内容</p>
                         <p className="text-xs mt-2 text-slate-400 text-center">点击上方按钮，系统将根据当前选定的班子与业绩生成响应方案全文</p>
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
      {/* 全量人才库模态框 */}
      {showTalentPool && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setShowTalentPool(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center text-slate-800">
                <UserSearch size={24} className="mr-4 text-blue-600" /> 全量人才资产库
              </h3>
              <button onClick={() => setShowTalentPool(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>
            <div className="px-8 py-6 bg-white border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  value={talentSearchQuery}
                  onChange={(e) => setTalentSearchQuery(e.target.value)}
                  placeholder="搜索姓名、核心资质、部门..." 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-2 gap-6 bg-slate-50/20">
               {filteredTalent.length > 0 ? filteredTalent.map((staff) => (
                 <div key={staff.id} className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-500 transition-all flex items-center justify-between group">
                    <div className="flex items-center text-left">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all mr-6">
                        {staff.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{staff.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{staff.dept} · 从业 {staff.years} 年</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (talentPoolMode === 'pm') {
                          setPm({ id: staff.id, name: staff.name, role: staff.role, score: 90, years: staff.years || 10, majorProject: '全局人才库匹配指派项目', tags: staff.certs });
                          setPhase('hub');
                        } else {
                          if (!selectedStaff.some(s => s.id === staff.id)) setSelectedStaff(prev => [...prev, staff]);
                        }
                        setShowTalentPool(false);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      {talentPoolMode === 'pm' ? '指派为负责人' : '选入项目组'}
                    </button>
                 </div>
               )) : <div className="col-span-2 text-center py-20 text-slate-300">无搜索结果</div>}
            </div>
          </div>
        </div>
      )}

      {/* 历史业绩检索模态框 */}
      {showExpPool && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setShowExpPool(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[80vh] animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center text-slate-800">
                <Database size={24} className="mr-4 text-emerald-600" /> 企业历史中标业绩库
              </h3>
              <button onClick={() => setShowExpPool(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
            </div>
            <div className="p-8 bg-white border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  value={expSearchQuery}
                  onChange={(e) => setExpSearchQuery(e.target.value)}
                  placeholder="搜索项目名称、业主单位..." 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-slate-50/20">
               {filteredExp.length > 0 ? filteredExp.map((exp) => (
                 <div key={exp.id} className="p-6 bg-white border border-slate-100 rounded-3xl hover:border-emerald-500 transition-all flex items-center justify-between group">
                    <div className="flex-1 pr-10 text-left">
                      <p className="font-bold text-slate-900 text-lg">{exp.name}</p>
                      <div className="flex gap-6 mt-3 text-xs text-slate-500 font-medium">
                        <span className="flex items-center"><Building2 size={14} className="mr-2 text-slate-400" /> {exp.client}</span>
                        <span className="flex items-center"><Layers size={14} className="mr-2 text-slate-400" /> {exp.amount}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (!selectedExp.some(e => e.id === exp.id)) setSelectedExp(prev => [...prev, exp]);
                        setShowExpPool(false);
                      }}
                      className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      选入当前投标支撑
                    </button>
                 </div>
               )) : <div className="text-center py-20 text-slate-300">无匹配业绩</div>}
            </div>
          </div>
        </div>
      )}

      {/* 顶部导航与状态 */}
      <div className="bg-white px-8 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className={`p-2.5 rounded-xl ${phase === 'init' ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'}`}>
             <LayoutGrid size={22} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase italic">智能编撰协同流程 (Smart Bidding Hub)</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{
              phase === 'init' ? '第一步: 指派负责人' : 
              phase === 'hub' ? '第二步: 模块化并行编撰' : 
              phase === 'task' ? '第三步: 专家子系统处理' : '第四步: 最终定稿预览'
            }</p>
          </div>
        </div>

        {pm && phase !== 'init' && (
          <div className="flex items-center bg-blue-50 px-5 py-2.5 rounded-2xl border border-blue-100 animate-in slide-in-from-right shadow-sm">
            <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm mr-4 shadow-lg shadow-blue-200">
              {pm.name[0]}
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-slate-900 leading-tight">{pm.name} <span className="text-blue-600 ml-1">PM</span></p>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">{pm.role}</p>
            </div>
            <div className="w-px h-6 bg-blue-200 mx-5 opacity-50"></div>
            <button onClick={() => { setPm(null); setPhase('init'); }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100" title="更换负责人">
              <RefreshCcw size={14} />
            </button>
          </div>
        )}

        {phase === 'preview' && (
          <button onClick={() => setPhase('hub')} className="text-xs font-bold text-slate-400 flex items-center hover:text-blue-600 transition-colors px-4 py-2 hover:bg-slate-50 rounded-xl">
             <ArrowLeft size={16} className="mr-2" /> 返回协作中心 (Hub)
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Phase 0: 初始化选择 PM */}
        {phase === 'init' && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-[40px] border-2 border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center max-w-5xl w-full px-16">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/5 border border-blue-100">
                <UserCheck size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter uppercase italic text-center">Assign Project Lead</h3>
              <p className="text-sm text-slate-500 mb-12 font-medium text-center">请首先指定本项目投标负责人。系统将基于负责人权限及资质匹配程度开启定制化的协同工作空间。</p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                {mockManagers.map(m => (
                  <div 
                    key={m.id}
                    className="p-8 bg-white border-2 border-slate-100 rounded-[32px] hover:border-blue-600 hover:shadow-2xl transition-all text-left relative group cursor-pointer"
                    onClick={() => { setPm(m); setPhase('hub'); }}
                  >
                    <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm">AI 核心适配 {m.score}%</div>
                    <div className="flex items-center mb-6">
                       <div className="w-16 h-16 bg-slate-900 rounded-[20px] flex items-center justify-center font-black text-white text-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">{m.name[0]}</div>
                       <div className="ml-5">
                          <p className="font-black text-slate-900 text-xl tracking-tight">{m.name}</p>
                          <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{m.role} · {m.years}y Exp</p>
                       </div>
                    </div>
                    <div className="space-y-4 text-left">
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[10px] uppercase text-slate-400 font-black mb-1.5 tracking-widest flex items-center"><History size={10} className="mr-1.5"/> 历史同类业绩匹配</p>
                          <p className="text-xs font-bold text-slate-700 leading-relaxed truncate">{m.majorProject}</p>
                       </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                       <div className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-black opacity-0 group-hover:opacity-100 transition-all flex items-center">
                         确认并指派负责人 <ChevronRight size={14} className="ml-1" />
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6 justify-center">
                 <div className="h-px bg-slate-100 w-24"></div>
                 <span className="text-xs text-slate-400 font-black uppercase tracking-widest italic">or</span>
                 <div className="h-px bg-slate-100 w-24"></div>
              </div>

              {/* 手动搜索负责人的显性按钮 */}
              <button 
                onClick={() => { setTalentPoolMode('pm'); setTalentSearchQuery(''); setShowTalentPool(true); }}
                className="mt-8 px-12 py-4 bg-slate-900 text-white rounded-[24px] text-sm font-black hover:bg-black transition-all flex items-center mx-auto shadow-xl shadow-slate-200 group active:scale-95"
              >
                <UserSearch size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                从全量人才库手动检索并指派负责人
              </button>
            </div>
          </div>
        )}

        {/* Phase 1: 协作大厅 (Hub) */}
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-8 items-center p-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
             {tasks.map(task => (
               <div key={task.id} className={`relative bg-white h-96 rounded-[48px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group ${
                 task.status === 'completed' ? 'border-emerald-100 shadow-2xl shadow-emerald-500/5' : 
                 task.status === 'processing' ? 'border-blue-500 shadow-2xl shadow-blue-500/10 scale-105' : 'border-slate-50 shadow-sm hover:border-slate-200'
               }`}>
                  <div className={`p-7 rounded-[32px] mb-8 transition-all duration-700 ${
                    task.status === 'completed' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200' : 
                    task.status === 'processing' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20 rotate-3' : 'bg-slate-50 text-slate-300'
                  }`}>
                    <task.icon size={40} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">{task.name}</h4>
                  <p className="text-xs text-slate-400 mt-2 mb-8 font-bold uppercase tracking-wider">执行角色: {task.assignee}</p>
                  
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 shadow-inner">
                    <div className={`h-full transition-all duration-[1000ms] ease-out ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                  </div>

                  {task.status === 'completed' ? (
                    <div className="flex items-center text-emerald-600 text-[11px] font-black tracking-widest uppercase bg-emerald-50 px-5 py-2.5 rounded-2xl animate-in zoom-in-95">
                       <Check size={18} className="mr-2" strokeWidth={4} /> 子模块数据已就绪
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartTask(task.id)}
                      className={`px-10 py-3.5 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all active:scale-95 ${
                        task.status === 'processing' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200'
                      }`}
                    >
                      {task.status === 'processing' ? '继续处理任务' : '进入工作站'}
                    </button>
                  )}
               </div>
             ))}

             {/* 全文预览定稿触发按钮 */}
             <div className="col-span-3 mt-16 flex justify-center">
                <div className="bg-slate-900 p-10 rounded-[48px] shadow-[0_40px_80px_-15px_rgba(15,23,42,0.4)] flex items-center justify-between w-full max-w-5xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <div className="flex items-center space-x-8 text-left relative z-10">
                    <div className="flex -space-x-4">
                      {tasks.map(t => (
                        <div key={t.id} className={`w-14 h-14 rounded-full border-4 border-slate-900 flex items-center justify-center transition-all duration-700 ${t.status === 'completed' ? 'bg-emerald-500 scale-110 z-10 shadow-lg shadow-emerald-500/20' : 'bg-slate-800'}`}>
                           {t.status === 'completed' ? <Check size={24} strokeWidth={4} className="text-white" /> : <Activity size={24} className="text-slate-600 animate-pulse" />}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white text-lg font-black tracking-tight uppercase">智能聚合引擎 (Synthesis Engine)</p>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{allTasksCompleted ? '全部编撰任务已锁定 · 可执行预览' : '请先完成上方三个子模块的编撰确认...'}</p>
                    </div>
                  </div>
                  <button 
                    disabled={!allTasksCompleted || isGenerating}
                    onClick={handleAggregate}
                    className={`px-12 py-5 rounded-[24px] font-black text-sm tracking-widest uppercase flex items-center transition-all relative z-10 ${
                      allTasksCompleted ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-500/40 cursor-pointer active:scale-95' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5 opacity-50'
                    }`}
                  >
                    {isGenerating ? <RefreshCw className="animate-spin mr-3" /> : <Sparkles className="mr-3" />}
                    {isGenerating ? '正在执行定稿聚合...' : '生成第四步：最终预览定稿'}
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* Phase 2: 具体工作站 (Task View) */}
        {phase === 'task' && activeTaskId && (
          <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500">
             <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between z-10 shadow-sm shrink-0">
                <div className="flex items-center space-x-5 text-left">
                   <button onClick={() => setPhase('hub')} className="p-3 hover:bg-white hover:shadow-md text-slate-400 hover:text-slate-900 rounded-2xl transition-all border border-transparent hover:border-slate-100"><ArrowLeft size={20}/></button>
                   <div>
                     <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic">{tasks.find(t => t.id === activeTaskId)?.name}</h3>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">负责人员: {tasks.find(t => t.id === activeTaskId)?.assignee}</p>
                   </div>
                </div>
                <button 
                  onClick={() => handleCompleteTask(activeTaskId)}
                  className="px-10 py-3.5 bg-emerald-600 text-white rounded-2xl text-[11px] font-black tracking-widest uppercase hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all flex items-center active:scale-95"
                >
                  <Check size={18} className="mr-2" strokeWidth={4} /> 确认模块已就绪
                </button>
             </div>
             <div className="flex-1 overflow-hidden">
                {renderTaskDetail()}
             </div>
          </div>
        )}

        {/* Phase 3: 全文预览与定稿 (Preview) */}
        {phase === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[48px] overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl border border-white/5 relative">
             <div className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-2xl p-1.5 border border-white/10 shadow-inner">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-2.5 hover:bg-slate-700 rounded-xl transition-all text-slate-400 hover:text-white"><ZoomOut size={16}/></button>
                      <span className="px-5 text-xs font-black w-14 text-center tabular-nums">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-2.5 hover:bg-slate-700 rounded-xl transition-all text-slate-400 hover:text-white"><ZoomIn size={16}/></button>
                   </div>
                   <div className="h-6 w-px bg-white/10"></div>
                   <div className="flex flex-col text-left">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Engine Audit Status</span>
                     <span className="text-xs font-bold text-emerald-400 flex items-center tracking-tight">
                       <ShieldCheck size={14} className="mr-2" /> 深度合规审计及逻辑性校验已通过
                     </span>
                   </div>
                </div>
                <div className="flex space-x-4">
                   <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-xl border border-white/10 transition-all flex items-center"><Printer size={14} className="mr-2" /> 快速打印</button>
                   <button className="flex items-center px-10 py-3 bg-blue-600 hover:bg-blue-500 text-xs font-black tracking-widest uppercase rounded-2xl transition-all shadow-2xl shadow-blue-500/40 active:scale-95">
                      <Download size={16} className="mr-3" /> 导出最终定稿 PDF
                   </button>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto p-20 flex flex-col items-center custom-scrollbar-dark bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black relative">
                   <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] select-none flex flex-wrap gap-20 p-20 justify-center">
                      {[...Array(20)].map((_, i) => <div key={i} className="-rotate-45 text-4xl font-black text-white whitespace-nowrap">GRIDBID AI - OFFICIAL DRAFT</div>)}
                   </div>
                   <div className="bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] origin-top transition-transform duration-300 relative border border-slate-100" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: `${1160 * (zoomLevel/100)}px`, padding: '80px' }}>
                      <div className="h-full border-[12px] border-double border-slate-900 p-20 flex flex-col items-center text-center">
                         <div className="w-24 h-1.5 bg-slate-900 mb-10"></div>
                         <h1 className="text-6xl font-serif font-black mb-12 tracking-[0.25em] text-slate-900 uppercase italic">投标文件</h1>
                         <div className="w-48 h-2.5 bg-slate-900 mb-24"></div>
                         
                         <div className="w-full text-left space-y-16 mt-10">
                            <section>
                               <h3 className="text-base font-black border-b-4 border-slate-900 pb-4 mb-8 uppercase tracking-widest text-slate-900 italic">I. 项目负责人及班子构成 (Core Team Assets)</h3>
                               <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-sm text-left">
                                  <div className="flex justify-between border-b border-slate-100 pb-3">
                                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Project Manager</span>
                                    <span className="font-black text-slate-900">{pm?.name || '未指定'}</span>
                                  </div>
                                  {selectedStaff.map(s => (
                                    <div key={s.id} className="flex justify-between border-b border-slate-100 pb-3">
                                      <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{s.role}</span>
                                      <span className="font-black text-slate-900">{s.name}</span>
                                    </div>
                                  ))}
                               </div>
                            </section>
                            
                            <section>
                               <h3 className="text-base font-black border-b-4 border-slate-900 pb-4 mb-8 uppercase tracking-widest text-slate-900 italic">II. 企业关键历史业绩支撑 (Experience Evidence)</h3>
                               <div className="space-y-6 text-left">
                                  {selectedExp.length > 0 ? selectedExp.map(e => (
                                    <div key={e.id} className="text-xs bg-slate-50 p-6 border border-slate-100 rounded-2xl shadow-sm">
                                      <p className="font-black text-slate-900 text-sm mb-2 uppercase tracking-tight leading-tight">{e.name}</p>
                                      <p className="text-slate-500 font-bold tracking-widest text-[9px] uppercase">业主单位: {e.client} · 中标金额: {e.amount} · 完成日期: {e.date}</p>
                                    </div>
                                  )) : <p className="text-slate-300 italic text-xs">未关联外部支撑业绩，建议在子工作站中添加以增强响应力度。</p>}
                               </div>
                            </section>
                            
                            <section className="flex-1 text-left">
                               <h3 className="text-base font-black border-b-4 border-slate-900 pb-4 mb-8 uppercase tracking-widest text-slate-900 italic">III. 全文技术方案逻辑摘要 (Executive Summary)</h3>
                               <p className="text-xs text-slate-600 font-serif leading-[2.2] italic indent-12 text-justify line-clamp-[12]">
                                  {aiDraft || "系统正在通过多智能体协作框架 (Multi-Agent framework) 对上述团队背景、资质证书与历史业绩进行全文逻辑编织。全文技术方案预计生成 42,500 字，涵盖 24 个深度响应章节。当前预览状态仅展示由负责人指派后生成的逻辑核心摘要..."}
                               </p>
                            </section>
                         </div>

                         <div className="mt-auto pt-24 w-full flex justify-between items-end border-t border-slate-100">
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Authorized Lead Signature</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{pm?.name || 'TBD'}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1.5 tracking-widest">{new Date().toLocaleDateString('zh-CN', {year:'numeric', month:'long', day:'numeric'})}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="p-5 bg-slate-900 text-white rounded-[24px] mb-5 shadow-2xl rotate-3">
                                  <ShieldCheck size={40} />
                                </div>
                                <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-[0.3em] opacity-60">Verified Hash: {Math.random().toString(36).substring(2, 14).toUpperCase()}</span>
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
        .custom-scrollbar-dark::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;
