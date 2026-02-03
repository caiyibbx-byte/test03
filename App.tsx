
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  Database, 
  FileText, 
  ShieldCheck, 
  Menu,
  ChevronRight,
  Bell,
  UserCircle,
  Settings2,
  CalendarDays,
  LayoutTemplate,
  Activity,
  Layers,
  ChevronDown
} from 'lucide-react';
import { AppView, BiddingTask, Tender, SystemLog } from './types';
import DashboardView from './components/DashboardView';
import CrawlerView from './components/CrawlerView';
import AISelectorView from './components/AISelectorView';
import BiddingPlanView from './components/BiddingPlanView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import BidWorkspaceView from './components/BidWorkspaceView';
import AgentConfigView from './components/AgentConfigView';
import AdminView from './components/AdminView';
import TemplateConfigView from './components/TemplateConfigView';
import LogManagementView from './components/LogManagementView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // 管理哪些分组是展开的
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '智慧驾驶舱': true,
    '投标全生命周期': true,
    '数字资产中心': false,
    '系统运维与配置': false
  });

  const toggleGroup = (title: string) => {
    // 如果侧边栏是收回的，点击时先展开侧边栏
    if (!isSidebarOpen) {
      setSidebarOpen(true);
      setOpenGroups(prev => ({ ...prev, [title]: true }));
      return;
    }
    setOpenGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuGroups = [
    {
      title: '智慧驾驶舱',
      icon: LayoutDashboard,
      items: [
        { id: AppView.DASHBOARD, label: '系统仪表盘', icon: Activity },
      ]
    },
    {
      title: '投标全生命周期',
      icon: Target,
      items: [
        { id: AppView.CRAWLER, label: '招标抓取解析', icon: Search },
        { id: AppView.AI_SELECTOR, label: '智能投标筛选', icon: Target },
        { id: AppView.BID_PLAN, label: '投标计划管理', icon: CalendarDays },
        { id: AppView.BID_WORKSPACE, label: '智能文书编撰', icon: FileText },
      ]
    },
    {
      title: '数字资产中心',
      icon: Database,
      items: [
        { id: AppView.KNOWLEDGE_BASE, label: '业绩人员库', icon: Database },
        { id: AppView.TEMPLATE_CONFIG, label: '投标文档模板配置', icon: LayoutTemplate },
      ]
    },
    {
      title: '系统运维与配置',
      icon: Settings2,
      items: [
        { id: AppView.AGENT_CONFIG, label: '智能体参数配置', icon: Settings2 },
        { id: AppView.LOG_MANAGEMENT, label: '系统日志管理', icon: Activity },
        { id: AppView.ADMIN, label: '权限角色管理', icon: ShieldCheck },
      ]
    }
  ];

  const [logs, setLogs] = useState<SystemLog[]>([
    { id: 'L1', timestamp: '2024-10-24 14:35:21', level: 'info', category: 'ai', operator: 'Agent_v2.4', action: '模板生成', details: '成功生成项目 [SGCC-2024-X] 的技术标模板', ip: '10.0.4.12' },
    { id: 'L2', timestamp: '2024-10-24 14:32:05', level: 'warning', category: 'crawler', operator: 'System_Scheduler', action: '抓取延迟', details: '南网招标平台响应缓慢，重试第 2 次成功', ip: '127.0.0.1' },
  ]);

  const addLog = (logData: Omit<SystemLog, 'id'>) => {
    const newLog: SystemLog = { ...logData, id: `L-${Date.now()}` };
    setLogs(prev => [newLog, ...prev]);
  };

  const [plannedTasks, setPlannedTasks] = useState<BiddingTask[]>([
    {
      id: 'plan-001',
      projectId: 'SGCC-2024-PJ01',
      type: '物资',
      openingTime: '2024-11-06 09:00:00',
      openingLocation: '浙江杭州招标大厅',
      purchaser: '国网浙江省电力有限公司',
      title: '国网浙江电力2024年第二次配网物资协议库存招标项目',
      category: '变电类',
      publishDate: '2024-10-15',
      deadline: '2024-11-05',
      status: 'analyzed',
      budget: '2,450万元',
      priority: 'high',
      source: 'crawler',
      manager: '张经理',
      assignDate: '2024-10-16'
    }
  ]);

  const addToPlan = (tender: Tender | any, source: 'crawler' | 'ai' = 'crawler') => {
    if (plannedTasks.find(t => t.id === tender.id)) return;
    const newTask: BiddingTask = { ...tender, priority: 'medium', source };
    setPlannedTasks([...plannedTasks, newTask]);
  };

  const removeFromPlan = (id: string) => {
    setPlannedTasks(plannedTasks.filter(t => t.id !== id));
  };

  const updateTask = (updatedTask: BiddingTask) => {
    setPlannedTasks(plannedTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView />;
      case AppView.CRAWLER: return <CrawlerView plannedIds={plannedTasks.map(t => t.id)} onTogglePlan={(t) => plannedTasks.find(p => p.id === t.id) ? removeFromPlan(t.id) : addToPlan(t, 'crawler')} onAddLog={addLog} />;
      case AppView.AI_SELECTOR: return <AISelectorView plannedIds={plannedTasks.map(t => t.id)} onTogglePlan={(t) => addToPlan(t, 'ai')} />;
      case AppView.BID_PLAN: return <BiddingPlanView tasks={plannedTasks} onUpdateTask={updateTask} onRemoveTask={removeFromPlan} />;
      case AppView.TEMPLATE_CONFIG: return <TemplateConfigView />;
      case AppView.KNOWLEDGE_BASE: return <KnowledgeBaseView />;
      case AppView.BID_WORKSPACE: return <BidWorkspaceView />;
      case AppView.LOG_MANAGEMENT: return <LogManagementView logs={logs} onClearLogs={() => setLogs([])} />;
      case AppView.AGENT_CONFIG: return <AgentConfigView />;
      case AppView.ADMIN: return <AdminView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* 侧边栏 */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-slate-900 text-white flex flex-col shadow-2xl z-50`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5 shrink-0">
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-tight text-blue-400">GridBid AI</h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto custom-scrollbar-nav">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {/* 一级菜单项 (分类头) */}
              <button
                onClick={() => toggleGroup(group.title)}
                className={`w-full flex items-center p-3 rounded-xl transition-all group ${
                  !isSidebarOpen ? 'justify-center' : 'justify-between'
                } ${openGroups[group.title] ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className="flex items-center">
                  <group.icon size={18} className={`${!isSidebarOpen ? '' : 'mr-3'}`} />
                  {isSidebarOpen && (
                    <span className="text-xs font-bold uppercase tracking-widest">{group.title}</span>
                  )}
                </div>
                {isSidebarOpen && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${openGroups[group.title] ? '' : '-rotate-90'}`} 
                  />
                )}
              </button>

              {/* 二级菜单项 (手风琴展开内容) */}
              {isSidebarOpen && openGroups[group.title] && (
                <div className="ml-4 pl-2 border-l border-white/5 space-y-1 animate-in slide-in-from-top-2 duration-300">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full flex items-center p-2.5 rounded-lg transition-all text-sm font-medium ${
                        currentView === item.id 
                          ? 'bg-blue-600/90 text-white shadow-md' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon size={16} className="mr-3" />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* 收缩态下的简易分割 */}
              {!isSidebarOpen && <div className="h-px bg-white/5 mx-4 my-2" />}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/20 shrink-0">
          <div className={`flex items-center ${!isSidebarOpen ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
               <UserCircle size={22} />
            </div>
            {isSidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">超级管理员</p>
                <p className="text-[10px] text-slate-500 uppercase font-black truncate tracking-tighter">SGCC-HQ-DEPT</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0 shadow-sm">
          <div className="flex items-center text-slate-500">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">System Path</span>
            <ChevronRight size={14} className="mx-3 opacity-20" />
            <div className="flex items-center">
               <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {menuGroups.find(g => g.items.some(i => i.id === currentView))?.title}
               </span>
               <ChevronRight size={14} className="mx-2 opacity-20" />
               <span className="text-slate-900 font-black text-sm uppercase italic">
                 {menuGroups.flatMap(g => g.items).find(i => i.id === currentView)?.label}
               </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest shadow-inner">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
               Cloud Sync Active
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto grid-bg p-8 custom-scrollbar-main">
          <div className="max-w-7xl mx-auto pb-12">
            {renderView()}
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar-nav::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-nav::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-nav::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        
        .custom-scrollbar-main::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar-main::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f1f5f9; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default App;
