
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
  ChevronDown,
  LogOut,
  MonitorPlay,
  Briefcase,
  Users
} from 'lucide-react';
import { AppView, BiddingTask, Tender, SystemLog, StaffUser } from './types';
import DashboardView from './components/DashboardView';
import CrawlerView from './components/CrawlerView';
import AISelectorView from './components/AISelectorView';
import BiddingPlanView from './components/BiddingPlanView';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import PersonnelBaseView from './components/PersonnelBaseView';
import BidWorkspaceView from './components/BidWorkspaceView';
import AgentConfigView from './components/AgentConfigView';
import AdminView from './components/AdminView';
import TemplateConfigView from './components/TemplateConfigView';
import LogManagementView from './components/LogManagementView';
import ManagerView from './components/ManagerView';
import LoginView from './components/LoginView';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<StaffUser | null>({
    id: 'ADMIN-001',
    name: '系统管理员',
    dept: '数字化指挥中心',
    roleId: 'r1',
    status: 'active',
    lastLogin: new Date().toLocaleString()
  });
  
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    '智慧驾驶舱': true,
    '投标全生命周期': true,
    '核心业务数据库': true,
    '系统运维与配置': false
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const toggleGroup = (title: string) => {
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
        { id: AppView.MANAGER_VIEW, label: '项目投标监控', icon: MonitorPlay },
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
      title: '核心业务数据库',
      icon: Database,
      items: [
        { id: AppView.PROJECT_BASE, label: '项目业绩库', icon: Briefcase },
        { id: AppView.STAFF_BASE, label: '人员资质库', icon: Users },
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
      id: 'plan-001_lot_1',
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
      budget: '850万元',
      priority: 'high',
      source: 'crawler',
      assignDate: '2024-10-16',
      lotName: '包1：10kV柱上变压器',
      progress: 65,
      currentStage: 'drafting',
      projectLeader: { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['高压资质'] }
    },
    {
      id: 'plan-002',
      projectId: 'SGCC-2024-PJ02',
      type: '服务',
      openingTime: '2024-12-01 10:00:00',
      openingLocation: '远程开标',
      purchaser: '国网江苏电力',
      title: '2024年信通运维框架采购',
      category: '信通类',
      publishDate: '2024-11-01',
      deadline: '2024-11-28',
      status: 'analyzed',
      budget: '2400万元',
      priority: 'medium',
      progress: 20,
      currentStage: 'team_assigned'
    }
  ]);

  const addToPlan = (tender: any, source: 'crawler' | 'ai' = 'crawler') => {
    if (plannedTasks.find(t => t.id === tender.id)) return;
    const newTask: BiddingTask = { ...tender, priority: 'medium', source, progress: 10, currentStage: 'scanned' };
    setPlannedTasks([...plannedTasks, newTask]);
  };

  const removeFromPlan = (id: string) => {
    setPlannedTasks(plannedTasks.filter(t => t.id !== id));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const updateTask = (updatedTask: BiddingTask) => {
    setPlannedTasks(plannedTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleEnterWorkspace = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentView(AppView.BID_WORKSPACE);
  };

  const renderView = () => {
    const selectedTask = plannedTasks.find(t => t.id === selectedTaskId);

    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView />;
      case AppView.MANAGER_VIEW: return <ManagerView activeTasks={plannedTasks} />;
      case AppView.CRAWLER: return <CrawlerView plannedIds={plannedTasks.map(t => t.id)} onTogglePlan={(t) => plannedTasks.find(p => p.id === t.id) ? removeFromPlan(t.id) : addToPlan(t, 'crawler')} onAddLog={addLog} />;
      case AppView.AI_SELECTOR: return <AISelectorView plannedIds={plannedTasks.map(t => t.id)} onTogglePlan={(t) => addToPlan(t, 'ai')} />;
      case AppView.BID_PLAN: return <BiddingPlanView tasks={plannedTasks} onUpdateTask={updateTask} onRemoveTask={removeFromPlan} onEnterWorkspace={handleEnterWorkspace} />;
      case AppView.TEMPLATE_CONFIG: return <TemplateConfigView />;
      case AppView.PROJECT_BASE: return <KnowledgeBaseView mode="projects" />;
      case AppView.STAFF_BASE: return <PersonnelBaseView />;
      case AppView.BID_WORKSPACE: return <BidWorkspaceView currentTask={selectedTask} />;
      case AppView.LOG_MANAGEMENT: return <LogManagementView logs={logs} onClearLogs={() => setLogs([])} />;
      case AppView.AGENT_CONFIG: return <AgentConfigView />;
      case AppView.ADMIN: return <AdminView />;
      default: return <DashboardView />;
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginView 
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-left">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-slate-900 text-white flex flex-col shadow-2xl z-50 shrink-0`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5 shrink-0">
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-tight text-blue-400">GridBid AI</h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2 overflow-y-auto custom-scrollbar-nav">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
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
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-black/20 shrink-0">
          <div className={`flex items-center group relative ${!isSidebarOpen ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <UserCircle size={22} />
              </div>
              {isSidebarOpen && (
                <div className="ml-3 overflow-hidden text-left">
                  <p className="text-xs font-bold text-white truncate">{currentUser?.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black truncate tracking-tighter">ID: {currentUser?.id}</p>
                </div>
              )}
            </div>
            {isSidebarOpen && (
              <button onClick={handleLogout} className="p-1.5 text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

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
    </div>
  );
};

export default App;
