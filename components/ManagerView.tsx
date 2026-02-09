
import React, { useState, useMemo } from 'react';
import { 
  MonitorPlay, 
  Search, 
  Filter, 
  ChevronRight, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  CalendarDays,
  Coins,
  ArrowUpRight,
  History,
  Info,
  Layers,
  UserCheck,
  X,
  ExternalLink,
  Target,
  Users2,
  DatabaseZap,
  FileEdit,
  ShieldCheck,
  Send
} from 'lucide-react';
import { BiddingTask, Tender } from '../types';

interface ManagerViewProps {
  activeTasks: BiddingTask[];
}

// 1. 根据需求重定义 6 个核心业务阶段
const STAGES = [
  { key: 'leader_assigned', label: '负责人指定', icon: UserCheck, color: 'text-blue-500' },
  { key: 'team_matched', label: '团队匹配', icon: Users2, color: 'text-indigo-500' },
  { key: 'experience_linked', label: '业绩匹配', icon: DatabaseZap, color: 'text-emerald-500' },
  { key: 'tech_drafting', label: '文档撰写', icon: FileEdit, color: 'text-amber-500' },
  { key: 'compliance_review', label: '合规内审', icon: ShieldCheck, color: 'text-purple-500' },
  { key: 'bid_submitted', label: '完成投标', icon: Send, color: 'text-slate-900' },
];

const ManagerView: React.FC<ManagerViewProps> = ({ activeTasks }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // 映射旧状态到新阶段（为了演示兼容性）
  const getMappedStage = (task: BiddingTask) => {
    if (task.currentStage === 'submitted') return 'bid_submitted';
    if (task.currentStage === 'reviewing') return 'compliance_review';
    if (task.currentStage === 'drafting') return 'tech_drafting';
    // 默认映射
    return task.currentStage || 'leader_assigned';
  };

  const allProjects = useMemo(() => {
    // 总经理视图下，每个 activeTask 已经是一个原子化的标包 (Lot)
    return activeTasks.map(t => ({ 
      ...t, 
      isArchived: false,
      stageKey: getMappedStage(t)
    }));
  }, [activeTasks]);

  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return allProjects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.lotName?.toLowerCase().includes(q) ||
      p.projectId.toLowerCase().includes(q)
    );
  }, [allProjects, searchQuery]);

  const stats = {
    totalLots: activeTasks.length,
    urgent: activeTasks.filter(t => t.priority === 'high').length,
    avgProgress: Math.round(activeTasks.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (activeTasks.length || 1)),
    totalValue: activeTasks.reduce((acc, curr) => {
      const b = parseInt(curr.budget?.replace(/[^0-9]/g, '') || '0');
      return acc + b;
    }, 0)
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      {/* 标包详情钻取弹窗 */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center font-black shadow-xl shrink-0">
                   <span className="text-[10px] uppercase opacity-50 tracking-tighter">PROGRESS</span>
                   <span className="text-xl">{selectedProject.progress}%</span>
                </div>
                <div>
                   <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded italic">{selectedProject.projectId}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{selectedProject.purchaser}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">{selectedProject.lotName}</h3>
                   <p className="text-sm font-bold text-slate-400 mt-1 italic">{selectedProject.title}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-3 hover:bg-white rounded-full transition-colors shadow-sm"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar-main">
               {/* 阶段大图 */}
               <section>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center italic">
                    <Activity size={16} className="mr-2 text-blue-500" /> 标包全生命周期监控 (Bidding Trace)
                  </h4>
                  <div className="relative flex justify-between items-start px-2">
                     <div className="absolute top-[30px] left-0 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
                     <div 
                       className="absolute top-[30px] left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                       style={{ width: `${selectedProject.progress}%` }}
                     ></div>

                     {STAGES.map((stage, idx) => {
                       const stageIdx = STAGES.findIndex(s => s.key === selectedProject.stageKey);
                       const isPast = idx < stageIdx;
                       const isCurrent = idx === stageIdx;
                       const Icon = stage.icon;
                       return (
                         <div key={stage.key} className="flex flex-col items-center group w-24">
                            <div className={`w-14 h-14 rounded-2xl border-4 flex items-center justify-center transition-all duration-500 ${
                              isPast ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 
                              isCurrent ? 'bg-white border-blue-600 text-blue-600 shadow-2xl scale-125 z-10' : 'bg-white border-slate-100 text-slate-200'
                            }`}>
                               <Icon size={24} strokeWidth={isCurrent ? 3 : 2} />
                            </div>
                            <span className={`mt-6 text-[10px] font-black uppercase tracking-tighter text-center leading-tight ${
                              isCurrent ? 'text-blue-600 scale-110' : isPast ? 'text-slate-900' : 'text-slate-300'
                            }`}>{stage.label}</span>
                         </div>
                       );
                     })}
                  </div>
               </section>

               <div className="grid grid-cols-2 gap-10">
                  <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center italic">
                      <Users2 size={16} className="mr-2 text-indigo-500" /> 团队与资质配置
                    </h4>
                    {selectedProject.projectLeader ? (
                      <div className="space-y-4">
                        <div className="flex items-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                           <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black mr-4">{selectedProject.projectLeader.name[0]}</div>
                           <div className="text-left">
                              <p className="text-sm font-black text-slate-900 leading-none">{selectedProject.projectLeader.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">项目负责人 (Director)</p>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {(selectedProject.technicalTeam || []).map((s: any) => (
                             <span key={s.id} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">技术: {s.name}</span>
                           ))}
                           {(selectedProject.commercialTeam || []).map((s: any) => (
                             <span key={s.id} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">商务: {s.name}</span>
                           ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">团队资源正在智能匹配中...</p>
                    )}
                  </section>

                  <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center italic">
                      <Coins size={16} className="mr-2 text-amber-500" /> 财务与合规摘要
                    </h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-400">预估标的额</span>
                          <span className="font-black text-slate-900">{selectedProject.budget}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="font-bold text-slate-400">投标保证金</span>
                          <span className="font-black text-slate-900">需确认</span>
                       </div>
                       <div className="pt-4 border-t border-slate-200">
                          <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase italic">
                             <ShieldCheck size={14} className="mr-2"/> AI 风险扫描：未发现废标项
                          </div>
                       </div>
                    </div>
                  </section>
               </div>
            </div>

            <div className="p-8 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">System Trace ID: {selectedProject.id}</span>
               <div className="flex space-x-4">
                 <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center">
                    穿透进入编撰大厅 <ArrowUpRight size={16} className="ml-2" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 顶部标题栏 */}
      <div className="flex justify-between items-end">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
            <MonitorPlay size={28} className="mr-3 text-blue-600" /> 总经理投标全局视窗 (Manager Dashboard)
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">以“标包”为单位穿透式监控，实时同步 6 大核心业务节点进度。</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索项目名称或指定标包..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-[20px] outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-sm shadow-inner"
            />
            {searchQuery && (
              <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in slide-in-from-top-2">
                 <div className="max-h-80 overflow-y-auto custom-scrollbar-main space-y-2">
                    {filteredResults.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => { setSelectedProject(p); setSearchQuery(''); }}
                        className="p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                         <div className="flex items-center min-w-0 pr-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mr-3 text-white bg-blue-600">
                               <Target size={14}/>
                            </div>
                            <div className="min-w-0">
                               <p className="text-xs font-black text-slate-900 truncate italic">{p.lotName}</p>
                               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{p.projectId} · {p.title}</p>
                            </div>
                         </div>
                         <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-all" />
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: '在投活跃标包', value: stats.totalLots, unit: 'LOTS', icon: Target, color: 'text-blue-600' },
          { label: '高优先级警告', value: stats.urgent, unit: 'ALERTS', icon: AlertCircle, color: 'text-red-500' },
          { label: '全案平均进度', value: `${stats.avgProgress}%`, unit: 'AVG', icon: Activity, color: 'text-emerald-500' },
          { label: '预计标的价值', value: `${stats.totalValue}W`, unit: 'CNY', icon: Coins, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-500 transition-all text-left">
             <div className="absolute -top-6 -right-6 text-slate-50 group-hover:text-blue-50 transition-colors pointer-events-none">
                <stat.icon size={100} strokeWidth={1} />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center relative z-10">
               <stat.icon size={12} className={`mr-2 ${stat.color}`} /> {stat.label}
             </p>
             <div className="flex items-baseline space-x-2 relative z-10">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{stat.unit}</span>
             </div>
          </div>
        ))}
      </div>

      {/* 活跃标包进度看板 */}
      <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-12 py-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-slate-950 text-white rounded-2xl shadow-lg"><MonitorPlay size={20} /></div>
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight">活跃标包业务流看板 (Bidding Stream Board)</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Real-time status tracking per individual lot units</p>
              </div>
           </div>
           <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">GridGPT 数据同步中</span>
           </div>
        </div>

        <div className="p-12">
          <div className="space-y-8">
            {allProjects.map(lot => (
              <div 
                key={lot.id} 
                onClick={() => setSelectedProject(lot)}
                className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 flex flex-col space-y-8 hover:bg-white hover:shadow-2xl hover:border-blue-200 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* 装饰条 */}
                <div className={`absolute top-0 left-0 w-2 h-full ${lot.priority === 'high' ? 'bg-red-500' : 'bg-slate-900'}`} />

                <div className="flex items-center justify-between relative z-10">
                   <div className="flex items-center space-x-6 min-w-0 flex-1">
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg shrink-0 text-white ${lot.priority === 'high' ? 'bg-red-500' : 'bg-slate-900'}`}>
                         <span className="text-[9px] uppercase opacity-50 tracking-tighter">LOT</span>
                         <span className="text-lg">#{lot.id.slice(-2)}</span>
                      </div>
                      <div className="min-w-0 text-left">
                         <div className="flex items-center space-x-2 mb-2">
                            <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-3 py-0.5 rounded-full uppercase tracking-widest italic">{lot.projectId}</span>
                            <p className="text-xs font-bold text-slate-400 uppercase italic truncate">{lot.purchaser}</p>
                         </div>
                         <h4 className="text-2xl font-black text-slate-900 truncate italic leading-none tracking-tight">{lot.lotName}</h4>
                      </div>
                   </div>

                   <div className="flex items-center space-x-12 shrink-0">
                      <div className="flex items-center space-x-4">
                         {lot.projectLeader ? (
                            <div className="flex items-center space-x-3 bg-white p-2 pr-4 rounded-2xl border border-slate-100 shadow-sm">
                               <div className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm">{lot.projectLeader.name[0]}</div>
                               <div className="text-left">
                                  <p className="text-xs font-black text-slate-900 leading-none">{lot.projectLeader.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase italic tracking-widest mt-1">负责人</p>
                               </div>
                            </div>
                         ) : (
                            <span className="text-[10px] font-black text-red-500 uppercase italic animate-pulse">待指派负责人</span>
                         )}
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-end italic"><Clock size={12} className="mr-1.5"/> 投标截止</p>
                         <p className="text-sm font-black text-red-500 tracking-tighter italic">{lot.deadline}</p>
                      </div>
                   </div>
                </div>

                {/* 6 阶段进度轴 */}
                <div className="relative pt-4">
                   <div className="flex justify-between items-center mb-4 px-2">
                      {STAGES.map((s, i) => {
                        const currentIdx = STAGES.findIndex(st => st.key === lot.stageKey);
                        const isDone = i <= currentIdx;
                        const StageIcon = s.icon;
                        return (
                          <div key={s.key} className="flex flex-col items-center space-y-2 group/stage relative">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              isDone ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
                            }`}>
                               <StageIcon size={16} strokeWidth={3} />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-tighter italic ${isDone ? 'text-blue-600' : 'text-slate-300'}`}>
                               {s.label}
                            </span>
                          </div>
                        );
                      })}
                   </div>
                   {/* 进度条底层 */}
                   <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.4)] relative"
                        style={{ width: `${lot.progress}%` }}
                      >
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
};

export default ManagerView;
