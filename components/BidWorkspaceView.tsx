
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
  Bot, Settings, BookOpen, Sparkle, Cpu
} from 'lucide-react';
import { StaffMember, BiddingTask, ProjectExperience } from '../types';

interface BidWorkspaceViewProps {
  currentTask?: BiddingTask;
}

interface TaskStatus {
  id: 'team' | 'exp' | 'content';
  name: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  icon: any;
  color: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const BidWorkspaceView: React.FC<BidWorkspaceViewProps> = ({ currentTask }) => {
  // 核心数据模型
  const activeTask = currentTask || {
    id: 'demo-task',
    title: '国网浙江电力2024年第二次配网物资协议库存招标项目',
    lotName: '包1：10kV柱上变压器',
    projectLeader: { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['高压资质'] },
  } as BiddingTask;

  const pm = activeTask.projectLeader;

  // 1. 状态管理
  const [phase, setPhase] = useState<'hub' | 'task' | 'preview'>('hub');
  const [activeTaskId, setActiveTaskId] = useState<'team' | 'exp' | 'content' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isExporting, setIsExporting] = useState<'pdf' | 'word' | null>(null);

  // 2. 弹出式搜索状态
  const [showSearchOverlay, setShowSearchOverlay] = useState<'staff' | 'exp' | 'template' | null>(null);
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [expSearchQuery, setExpSearchQuery] = useState('');

  // 3. 编撰过程中的临时选择数据
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [selectedExpIds, setSelectedExpIds] = useState<string[]>([]);
  const [aiDraft, setAiDraft] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // 4. 智能体对话状态
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '您好，我是技术方案编撰助手。我已经根据本项目招标文件提取了核心技术要点。您可以选择一个“撰写模板”开始，或者直接告诉我您的特殊编写需求。', timestamp: '14:20' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // 5. 任务进度状态
  const [tasks, setTasks] = useState<TaskStatus[]>([
    { id: 'team', name: '成员拟定', status: 'pending', progress: 0, icon: Users, color: 'blue' },
    { id: 'exp', name: '业绩遴选', status: 'pending', progress: 0, icon: Award, color: 'emerald' },
    { id: 'content', name: '技术方案编撰', status: 'pending', progress: 0, icon: FileText, color: 'purple' },
  ]);

  // 全量模拟库数据
  const allStaffPool: StaffMember[] = [
    { id: 's1', name: '王工', role: '高级工程师', years: 12, majorProject: '变电站改造', tags: ['变电', '二次'], score: 95 },
    { id: 's2', name: '李工', role: '技术专家', years: 8, majorProject: '信通平台', tags: ['信通', '云原生'], score: 88 },
    { id: 's3', name: '周工', role: '安全主管', years: 15, majorProject: '施工安全管理', tags: ['安全', '资质'], score: 92 },
    { id: 's4', name: '郑博', role: '首席架构师', years: 20, majorProject: '数字化电网底座', tags: ['数字化', 'AI'], score: 99 },
    { id: 's5', name: '孙工', role: '通信专家', years: 10, majorProject: '5G电力专用切片', tags: ['5G', '通信'], score: 91 },
  ];

  /* Updated allExpPool to match ProjectExperience interface and added missing properties clientAddress, quality */
  const allExpPool: ProjectExperience[] = [
    { id: 'e1', projectName: '2023年国网江苏500kV配网升级', clientName: '国网江苏', clientAddress: '江苏省南京市鼓楼区', quality: '优', endDate: '2023-12', amount: '1200万', content: '全生命周期运维...', keywords: ['变电', '核心业绩'], contractYear: '2023', index: 1, projectType: '变电', extendedKeywords: [], signingDate: '2023-01', contact: '', phone: '', remarks: '', location: '', contractStatus: '', leader: '', leaderExperience: '', members: '', memberExperience: '' },
    { id: 'e2', projectName: '杭州亚运会供电保障工程', clientName: '国网浙江', clientAddress: '浙江省杭州市西湖区', quality: '优', endDate: '2022-09', amount: '2500万', content: '零闪络供电保障...', keywords: ['保电', '重大项目'], contractYear: '2022', index: 2, projectType: '保电', extendedKeywords: [], signingDate: '2022-01', contact: '', phone: '', remarks: '', location: '', contractStatus: '', leader: '', leaderExperience: '', members: '', memberExperience: '' },
    { id: 'e3', projectName: '苏州工业园智能配网试点', clientName: '国网江苏', clientAddress: '江苏省苏州市园区', quality: '优', endDate: '2024-01', amount: '800万', content: '数字孪生应用...', keywords: ['智能配网', '新技术'], contractYear: '2024', index: 3, projectType: '智能配网', extendedKeywords: [], signingDate: '2024-01', contact: '', phone: '', remarks: '', location: '', contractStatus: '', leader: '', leaderExperience: '', members: '', memberExperience: '' },
    { id: 'e4', projectName: '四川超高压巡检服务', clientName: '国网四川', clientAddress: '四川省成都市高新区', quality: '优', endDate: '2024-03', amount: '3200万', content: '无人机自动化巡检...', keywords: ['无人机', '超高压'], contractYear: '2024', index: 4, projectType: '巡检', extendedKeywords: [], signingDate: '2024-01', contact: '', phone: '', remarks: '', location: '', contractStatus: '', leader: '', leaderExperience: '', members: '', memberExperience: '' },
    { id: 'e5', projectName: '青海绿电交易平台开发', clientName: '国网青海', clientAddress: '青海省西宁市城中区', quality: '优', endDate: '2023-08', amount: '500万', content: '区块链技术应用...', keywords: ['软件开发', '区块链'], contractYear: '2023', index: 5, projectType: '软件', extendedKeywords: [], signingDate: '2023-01', contact: '', phone: '', remarks: '', location: '', contractStatus: '', leader: '', leaderExperience: '', members: '', memberExperience: '' },
  ];

  const mockTemplates = [
    { id: 't1', name: '标准变电站运维方案模板', desc: '包含设备巡检、故障响应、预防性维护等标准章节。', icon: BookOpen },
    { id: 't2', name: '数字化配网集成方案模板', desc: '侧重于边缘计算、DTU接入、规约转换等内容。', icon: Cpu },
    { id: 't3', name: '应急抢修与安全保障模板', desc: '特种作业流程、安全准则、应急预案专项。', icon: ShieldCheck },
  ];

  // 过滤逻辑
  const filteredStaff = useMemo(() => {
    const q = staffSearchQuery.toLowerCase();
    return allStaffPool.filter(s => s.name.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q)));
  }, [staffSearchQuery]);

  const filteredExp = useMemo(() => {
    const q = expSearchQuery.toLowerCase();
    /* Changed e.client to e.clientName to match ProjectExperience interface */
    return allExpPool.filter(e => e.projectName.toLowerCase().includes(q) || e.clientName.toLowerCase().includes(q));
  }, [expSearchQuery]);

  const allTasksCompleted = useMemo(() => tasks.every(t => t.status === 'completed'), [tasks]);

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

  const toggleStaff = (id: string) => {
    setSelectedStaffIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleExp = (id: string) => {
    setSelectedExpIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = { role: 'user', content: chatInput, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    
    // 模拟 AI 回复
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `收到。我将针对“${chatInput}”这一要求调整生成策略。如果您已经选择了“${selectedTemplate || '默认'}”模板，我会将此要求融入相应的技术章节中。`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  const generateAIDraft = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const staffNames = allStaffPool.filter(s => selectedStaffIds.includes(s.id)).map(s => s.name).join('、');
      const expTitles = allExpPool.filter(e => selectedExpIds.includes(e.id)).map(e => e.projectName).join('\n* ');
      const templateName = selectedTemplate || '标准通用';
      setAiDraft(`## 第四章：技术响应方案 (基于模板: ${templateName})\n\n### 1. 团队保障能力\n本项目由资深负责人：${pm?.name} 领衔。核心骨干包括：${staffNames || '待定'}。所有成员均具备电力系统行业 5 年以上从业经验，通过了内部 AI 匹配分 ${pm?.score}% 的严格筛选。\n\n### 2. 施工/运维历史业绩引用\n根据招标文件中对“类似业绩”的要求，我们筛选并引用了以下核心案例：\n* ${expTitles || '待完善'}\n\n### 3. 技术路线及详细响应内容\n基于本项目的特定需求及选定模板，我们将采用最新一代智慧配网架构... (此处由 AI 根据上下文继续扩充生成)`);
      setIsGenerating(false);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `文书草稿已根据模板 [${templateName}] 及相关资产库成功合成。您可以点击预览查看全文效果。`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 2000);
  };

  const handleExport = (type: 'pdf' | 'word') => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      alert(`${type.toUpperCase()} 导出成功！文件已保存至您的本地。`);
    }, 2000);
  };

  // 搜索遮罩层组件 (扩展支持模板选择)
  const SearchOverlay = () => {
    if (!showSearchOverlay) return null;
    const isStaff = showSearchOverlay === 'staff';
    const isExp = showSearchOverlay === 'exp';
    const isTemplate = showSearchOverlay === 'template';
    
    return (
      <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[10vh] px-6">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSearchOverlay(null)} />
        <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden animate-in slide-in-from-top-12 duration-500 text-left">
           <div className="p-8 border-b border-slate-100 flex items-center bg-slate-50/50">
              <Search className="text-blue-600 mr-4" size={24} />
              <input 
                autoFocus
                type="text" 
                placeholder={
                  isStaff ? "全量人才库检索..." : 
                  isExp ? "全量业绩库检索..." : "撰写模板库检索..."
                }
                value={isStaff ? staffSearchQuery : isExp ? expSearchQuery : ''}
                onChange={(e) => isStaff ? setStaffSearchQuery(e.target.value) : isExp ? setExpSearchQuery(e.target.value) : null}
                className="flex-1 bg-transparent outline-none text-xl font-black text-slate-800 placeholder:text-slate-300 italic"
              />
              <button onClick={() => setShowSearchOverlay(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
           </div>
           <div className="max-h-[50vh] overflow-y-auto p-6 custom-scrollbar-main space-y-2">
              {isTemplate ? (
                mockTemplates.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => { setSelectedTemplate(t.name); setShowSearchOverlay(null); }}
                    className={`p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                      selectedTemplate === t.name ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-5">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${selectedTemplate === t.name ? 'bg-white/20' : 'bg-slate-100'}`}>
                         <t.icon size={24}/>
                       </div>
                       <div className="text-left">
                         <p className="text-sm font-black italic">{t.name}</p>
                         <p className={`text-[10px] font-bold mt-1 ${selectedTemplate === t.name ? 'text-purple-100' : 'text-slate-400'}`}>
                           {t.desc}
                         </p>
                       </div>
                    </div>
                    {selectedTemplate === t.name && <CheckCircle2 size={24} strokeWidth={3}/>}
                  </div>
                ))
              ) : (
                (isStaff ? filteredStaff : filteredExp).map((item: any) => {
                  const isSelected = isStaff ? selectedStaffIds.includes(item.id) : selectedExpIds.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      onClick={() => isStaff ? toggleStaff(item.id) : toggleExp(item.id)}
                      className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                        isSelected ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                           {isStaff ? <Users size={18}/> : <Briefcase size={18}/>}
                         </div>
                         <div className="text-left">
                           <p className="text-sm font-black italic">{isStaff ? item.name : item.projectName}</p>
                           <p className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                             {/* Changed item.client to item.clientName to match ProjectExperience interface */}
                             {isStaff ? item.role : item.clientName}
                           </p>
                         </div>
                      </div>
                      {isSelected && <Check size={20} strokeWidth={4}/>}
                    </div>
                  )
                })
              )}
           </div>
           <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-8">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Esc to Close / Select to Sync</span>
              <button onClick={() => setShowSearchOverlay(null)} className="text-xs font-black text-blue-600 uppercase italic">完成选择并返回</button>
           </div>
        </div>
      </div>
    );
  };

  if (!pm) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-8 animate-in fade-in duration-700 bg-white rounded-[40px] border-4 border-dashed border-slate-100 p-20 text-center">
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[32px] flex items-center justify-center shadow-xl border border-amber-100"><UserPlus size={48} /></div>
        <div className="max-w-lg text-center">
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic text-center">未指派负责人</h3>
          <p className="text-slate-400 mt-4 font-bold text-sm leading-relaxed">请先完成计划指派，AI 才能启动协同编撰流程。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-6">
      <SearchOverlay />

      {/* 顶部状态栏 */}
      <div className="bg-white px-10 py-5 rounded-[28px] border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-6">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-100"><LayoutGrid size={24} /></div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900 tracking-tighter uppercase italic leading-none">GridBid Workspace V2.5</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">{activeTask.lotName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-8">
           <div className="flex items-center bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
             <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg mr-4 shadow-lg">{pm.name[0]}</div>
             <div className="text-left">
               <p className="text-sm font-black text-slate-900 leading-tight">{pm.name} <span className="text-blue-600 ml-1 text-[10px] italic font-black uppercase">Leader</span></p>
               <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic tracking-widest">{pm.role}</p>
             </div>
           </div>
           {phase !== 'hub' && (
             <button onClick={() => setPhase('hub')} className="text-xs font-black text-slate-400 flex items-center hover:text-blue-600 px-6 py-3 uppercase tracking-widest transition-colors group">
                <ArrowLeft size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" /> 返回控制台
             </button>
           )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Hub: 三大入口卡片 */}
        {phase === 'hub' && (
          <div className="flex-1 grid grid-cols-3 gap-10 items-center p-10 animate-in fade-in slide-in-from-bottom-12 duration-700">
             {tasks.map(task => (
               <div key={task.id} className={`relative h-[440px] rounded-[64px] border-2 transition-all flex flex-col items-center justify-center p-12 text-center group bg-white ${
                 task.status === 'completed' ? 'border-emerald-100 shadow-xl' : 
                 task.status === 'processing' ? 'border-blue-500 shadow-2xl scale-105 z-10' : 'border-slate-50 shadow-sm hover:border-slate-200'
               }`}>
                  <div className={`p-8 rounded-[40px] mb-10 transition-transform group-hover:scale-110 ${
                    task.status === 'completed' ? 'bg-emerald-500 text-white shadow-lg' : 
                    task.status === 'processing' ? 'bg-blue-600 text-white shadow-2xl rotate-6' : 'bg-slate-50 text-slate-300'
                  }`}>
                    <task.icon size={48} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">{task.name}</h4>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden my-10 shadow-inner">
                    <div className={`h-full rounded-full transition-all duration-1000 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <button 
                    onClick={() => handleStartTask(task.id)}
                    className="px-12 py-4 rounded-[24px] text-[10px] font-black tracking-widest uppercase bg-slate-900 text-white hover:bg-black transition-all shadow-xl shadow-slate-200"
                  >
                    {task.status === 'completed' ? '重新校验' : task.status === 'processing' ? '继续处理' : '进入模块'}
                  </button>
               </div>
             ))}
             <div className="col-span-3 mt-12 flex justify-center">
                <button 
                  disabled={!allTasksCompleted}
                  onClick={() => setPhase('preview')}
                  className={`px-16 py-6 rounded-[32px] font-black text-sm tracking-[0.2em] uppercase flex items-center transition-all ${
                    allTasksCompleted ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl' : 'bg-slate-800 text-slate-600 opacity-50'
                  }`}
                >
                  <Sparkles className="mr-4 text-amber-400" /> 全案预览与合规打印
                </button>
             </div>
          </div>
        )}

        {/* Task View: 具体编撰任务 */}
        {phase === 'task' && activeTaskId && (
          <div className="flex-1 flex flex-col bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-2xl animate-in slide-in-from-right-12 duration-500">
             <div className="px-12 py-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black"><Activity size={24}/></div>
                   <div className="text-left">
                     <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">{tasks.find(t => t.id === activeTaskId)?.name}</h3>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic mt-1">Asset Orchestration Room</p>
                   </div>
                </div>
                <button 
                  onClick={() => markTaskCompleted(activeTaskId)}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-[24px] text-[10px] font-black tracking-widest uppercase hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
                >
                  <CheckCircle2 size={18} className="mr-3 inline" /> 确认锁定本章
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-main text-left">
                {/* 1. 成员拟定 */}
                {activeTaskId === 'team' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic flex items-center"><Star size={16} className="mr-2 text-amber-500"/> AI 筛选建议团队成员</h4>
                           <p className="text-[11px] text-slate-400 mt-1 font-bold italic">基于历史项目契合度与当前任务量计算得出</p>
                        </div>
                        <button 
                          onClick={() => setShowSearchOverlay('staff')}
                          className="flex items-center px-8 py-4 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all group shadow-sm"
                        >
                           <Search size={16} className="mr-3 group-hover:scale-125 transition-transform" /> 
                           从人才库中搜索并指定指定专家
                        </button>
                     </div>

                     <div className="grid grid-cols-3 gap-8">
                        {allStaffPool.slice(0, 3).map(staff => (
                          <div 
                            key={staff.id} 
                            onClick={() => toggleStaff(staff.id)}
                            className={`p-8 rounded-[40px] border-2 transition-all cursor-pointer relative group ${
                              selectedStaffIds.includes(staff.id) ? 'border-blue-600 bg-blue-50/30 shadow-xl shadow-blue-50' : 'border-slate-50 hover:border-slate-100 bg-white'
                            }`}
                          >
                             <div className="absolute top-8 right-8 text-blue-600">
                                {selectedStaffIds.includes(staff.id) ? <CheckCircle2 size={24} /> : <Plus size={24} className="text-slate-100 group-hover:text-slate-200" />}
                             </div>
                             <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center font-black text-2xl mb-6 shadow-xl">{staff.name[0]}</div>
                             <p className="text-xl font-black text-slate-900">{staff.name}</p>
                             <p className="text-[10px] text-slate-400 font-black uppercase italic tracking-widest mt-1">{staff.role}</p>
                             <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {staff.tags.map(t => <span key={t} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black italic">{t}</span>)}
                                </div>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* 2. 业绩遴选 */}
                {activeTaskId === 'exp' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                     <div className="flex items-center justify-between mb-8 text-left">
                        <div>
                           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic flex items-center"><Award size={16} className="mr-2 text-emerald-500"/> 企业核心业绩关联</h4>
                           <p className="text-[11px] text-slate-400 mt-1 font-bold italic">已根据项目类型自动匹配近三年优质合同业绩</p>
                        </div>
                        <button 
                          onClick={() => setShowSearchOverlay('exp')}
                          className="flex items-center px-8 py-4 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all group shadow-sm"
                        >
                           <Search size={16} className="mr-3 group-hover:scale-125 transition-transform" /> 
                           从业绩库中检索并指定相关项目
                        </button>
                     </div>

                     <div className="space-y-4">
                        {allExpPool.slice(0, 3).map(exp => (
                          <div 
                            key={exp.id} 
                            onClick={() => toggleExp(exp.id)}
                            className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer flex items-center justify-between group ${
                              selectedExpIds.includes(exp.id) ? 'border-emerald-500 bg-emerald-50/30 shadow-lg' : 'border-slate-50 hover:border-slate-100 bg-white'
                            }`}
                          >
                             <div className="flex items-center space-x-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black ${selectedExpIds.includes(exp.id) ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-200'}`}>
                                  <DatabaseZap size={24} />
                                </div>
                                <div className="text-left">
                                  <p className="text-lg font-black text-slate-800">{exp.projectName}</p>
                                  {/* Changed exp.client to exp.clientName and exp.scale to exp.amount to match ProjectExperience interface */}
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">{exp.clientName} · {exp.amount}</p>
                                </div>
                             </div>
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedExpIds.includes(exp.id) ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-100'}`}>
                                {selectedExpIds.includes(exp.id) ? <Check size={20} strokeWidth={4}/> : <Plus size={20}/>}
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* 3. 技术方案编撰 (重构增加智能体对话与模板) */}
                {activeTaskId === 'content' && (
                  <div className="h-full flex space-x-12 animate-in fade-in duration-500">
                     <div className="flex-1 flex flex-col space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Adaptive Technical Proposal Draft</h4>
                           <div className="flex items-center space-x-3">
                              {selectedTemplate && (
                                <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 uppercase tracking-widest italic animate-in fade-in slide-in-from-right-2">
                                  <BookOpen size={12} className="inline mr-1.5" /> 模板: {selectedTemplate}
                                </span>
                              )}
                              <button onClick={() => setShowSearchOverlay('template')} className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all">
                                 <Plus size={14} className="mr-2" /> 选用撰写模板库
                              </button>
                              <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all"><Save size={18} className="text-slate-400"/></button>
                           </div>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-[56px] border-2 border-slate-100 p-12 shadow-inner overflow-hidden relative group/draft">
                           <textarea 
                             value={aiDraft}
                             onChange={(e) => setAiDraft(e.target.value)}
                             placeholder="等待 AI 灵感编排助手生成内容..."
                             className="w-full h-full bg-transparent resize-none outline-none font-serif text-xl leading-[2] text-slate-800 placeholder:text-slate-200 italic relative z-10"
                           />
                           {!aiDraft && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 pointer-events-none">
                               <FileText size={80} strokeWidth={1} />
                               <p className="text-sm font-black uppercase tracking-[0.5em] italic mt-6">Void Manuscript</p>
                             </div>
                           )}
                           {isGenerating && (
                             <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
                               <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6 shadow-xl" />
                               <p className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">AI 推理引擎合成中...</p>
                             </div>
                           )}
                        </div>
                     </div>
                     
                     <div className="w-[420px] shrink-0 flex flex-col space-y-6 text-left h-full">
                        {/* 智能体对话窗口 */}
                        <div className="flex-1 bg-slate-950 rounded-[48px] overflow-hidden flex flex-col shadow-2xl border border-white/5 relative">
                           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
                           <div className="p-6 border-b border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center justify-between relative z-10">
                              <div className="flex items-center text-blue-400">
                                 <Bot size={22} className="mr-3" />
                                 <span className="text-xs font-black uppercase tracking-widest italic">GridGPT 实时编排对话</span>
                              </div>
                              <button className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5"><Settings size={16}/></button>
                           </div>
                           
                           <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar-dark relative z-10">
                              {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                   <div className={`max-w-[85%] p-4 rounded-[24px] text-xs leading-relaxed ${
                                     msg.role === 'user' 
                                       ? 'bg-blue-600 text-white rounded-tr-none font-bold' 
                                       : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none italic'
                                   }`}>
                                      {msg.content}
                                      <div className={`text-[8px] mt-2 opacity-40 font-mono ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</div>
                                   </div>
                                </div>
                              ))}
                              <div ref={chatEndRef} />
                           </div>

                           <div className="p-6 bg-slate-900/80 border-t border-white/10 relative z-10">
                              <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-2xl p-1.5 focus-within:border-blue-500/50 transition-all">
                                <input 
                                  value={chatInput}
                                  onChange={(e) => setChatInput(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                  placeholder="在此输入您的编撰修正需求..." 
                                  className="flex-1 bg-transparent border-none outline-none text-white text-xs px-3 font-medium placeholder:text-slate-600"
                                />
                                <button onClick={handleSendMessage} className="bg-blue-600 p-2.5 text-white rounded-xl hover:bg-blue-500 transition-all shadow-lg active:scale-90">
                                  <Send size={16} />
                                </button>
                              </div>
                           </div>
                        </div>
                        
                        {/* 元数据与资产卡片 */}
                        <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm h-64 overflow-y-auto custom-scrollbar-main">
                           <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">实时文书资产状态</h5>
                              <span className="text-[10px] font-black text-emerald-500 flex items-center"><Zap size={10} className="mr-1"/> 合规扫描中</span>
                           </div>
                           <div className="space-y-5">
                              <div className="flex items-center justify-between text-[11px] font-bold italic">
                                 <span className="text-slate-400">已加载成员</span>
                                 <span className="text-slate-900">{selectedStaffIds.length} 人</span>
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-bold italic">
                                 <span className="text-slate-400">已引用业绩</span>
                                 <span className="text-slate-900">{selectedExpIds.length} 项</span>
                              </div>
                              <button 
                                onClick={generateAIDraft}
                                disabled={isGenerating}
                                className="w-full py-4 mt-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center hover:bg-black shadow-xl shadow-slate-200 disabled:opacity-50"
                              >
                                {isGenerating ? <RefreshCw className="animate-spin mr-3" size={14}/> : <Sparkle className="mr-3 text-amber-400 animate-pulse" size={14}/>}
                                启动 AI 文书响应合成
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* Preview: 最终定稿预览 */}
        {phase === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-700 border border-white/5 relative">
             <div className="h-24 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 flex items-center px-16 justify-between text-white shrink-0 z-10">
                <div className="flex items-center space-x-12">
                   <div className="flex items-center bg-slate-800 rounded-3xl p-2 border border-white/10">
                      <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomOut size={20}/></button>
                      <span className="px-8 text-sm font-black w-24 text-center">{zoomLevel}%</span>
                      <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))} className="p-3 text-slate-500 hover:text-white transition-colors hover:bg-slate-700 rounded-xl"><ZoomIn size={20}/></button>
                   </div>
                   <div className="flex flex-col text-left">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic opacity-50">Document Registry</span>
                     <span className="text-xs font-bold text-emerald-400 flex items-center mt-1"><ShieldCheck size={18} className="mr-3" /> 全案逻辑一致性及合规性校验通过</span>
                   </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5"><Printer size={20} className="mr-3" /> 打印</button>
                  <button 
                    disabled={!!isExporting}
                    onClick={() => handleExport('word')}
                    className="flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-[20px] border border-white/5 disabled:opacity-50"
                  >
                    {isExporting === 'word' ? <RefreshCw className="animate-spin mr-3" size={18}/> : <FileType size={18} className="mr-3 text-blue-400" />}
                    {isExporting === 'word' ? '正在封装 Word...' : '导出 Word 文档'}
                  </button>
                  <button 
                    disabled={!!isExporting}
                    onClick={() => handleExport('pdf')}
                    className="flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-[20px] shadow-2xl shadow-blue-500/40 disabled:opacity-50"
                  >
                    {isExporting === 'pdf' ? <RefreshCw className="animate-spin mr-3" size={18}/> : <Download size={20} className="mr-4" />}
                    {isExporting === 'pdf' ? '正在渲染 PDF...' : '导出最终 PDF'}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-24 flex flex-col items-center bg-black relative custom-scrollbar-dark">
                   <div className="bg-white shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] origin-top transition-all p-24 text-left font-serif mb-20" style={{ width: `${820 * (zoomLevel/100)}px`, minHeight: '1160px' }}>
                      <div className="h-full border-[20px] border-double border-slate-900 p-20 flex flex-col relative overflow-hidden">
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-35deg] text-[120px] font-black uppercase italic whitespace-nowrap">GRIDBID CONFIDENTIAL</div>
                         
                         <h1 className="text-6xl font-black text-center mb-24 uppercase italic tracking-tighter text-slate-900">投标文件</h1>
                         
                         <div className="space-y-16 relative z-10">
                            <div className="p-10 bg-slate-50 border-l-[12px] border-slate-900">
                               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Project Title</p>
                               <p className="text-2xl font-black text-slate-900 italic">{activeTask.title}</p>
                            </div>
                            
                            <section>
                               <h3 className="text-2xl font-black border-b-[8px] border-slate-900 pb-4 mb-8 uppercase italic tracking-tighter">一、 项目保障团队</h3>
                               <div className="flex items-start space-x-10 mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100 italic">
                                  <div className="w-24 h-24 bg-slate-900 text-white flex items-center justify-center text-4xl font-black rounded-3xl shadow-xl">{pm.name[0]}</div>
                                  <div>
                                     <p className="text-xl font-black text-slate-900 flex items-center">{pm.name} <span className="ml-4 text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-lg uppercase tracking-widest italic">Leader</span></p>
                                     <p className="text-sm text-slate-500 mt-2 font-bold italic">{pm.role} / {pm.years}年从业经验</p>
                                  </div>
                               </div>
                               <div className="grid grid-cols-2 gap-6 pl-8">
                                  {allStaffPool.filter(s => selectedStaffIds.includes(s.id)).map(s => (
                                    <div key={s.id} className="p-4 border border-slate-100 rounded-2xl flex items-center italic">
                                       <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black mr-4 text-slate-400">{s.name[0]}</div>
                                       <div>
                                          <p className="text-sm font-black text-slate-800">{s.name}</p>
                                          <p className="text-[10px] text-slate-400 font-bold uppercase">{s.role}</p>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </section>

                            <section>
                               <h3 className="text-2xl font-black border-b-[8px] border-slate-900 pb-4 mb-8 uppercase italic tracking-tighter">二、 相关核心业绩</h3>
                               <div className="space-y-6 pl-8">
                                  {allExpPool.filter(e => selectedExpIds.includes(e.id)).map(e => (
                                    <div key={e.id} className="py-5 border-b-2 border-slate-100 flex justify-between items-center italic">
                                       <div>
                                          {/* Changed e.client to e.clientName to match ProjectExperience interface */}
                                          <span className="text-lg font-black text-slate-800">{e.projectName}</span>
                                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest italic">{e.clientName}</p>
                                       </div>
                                       {/* Changed e.completionDate to e.endDate to match ProjectExperience interface */}
                                       <span className="text-xs font-black text-slate-300 font-mono tracking-widest">{e.endDate}</span>
                                    </div>
                                  ))}
                               </div>
                            </section>

                            <section className="flex-1">
                               <h3 className="text-2xl font-black border-b-[8px] border-slate-900 pb-4 mb-8 uppercase italic tracking-tighter">三、 技术响应方案</h3>
                               <div className="text-sm text-slate-700 leading-[2.6] italic whitespace-pre-wrap pl-8 font-medium">
                                  {aiDraft || "文书内容生成引擎已就绪。请返回编撰空间，启动 AI 灵感助手。"}
                               </div>
                            </section>
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
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; border: 2px solid rgba(255,255,255,0.05); }
        .custom-scrollbar-main::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BidWorkspaceView;
