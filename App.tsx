
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
  Activity
} from 'lucide-react';
import { AppView, BiddingTask, Tender } from './types';
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
  
  // Shared state for bidding tasks across views with initial mock data
  const [plannedTasks, setPlannedTasks] = useState<BiddingTask[]>([
    {
      id: 'plan-001',
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
    },
    {
      id: 'plan-002',
      title: '智慧变电站在线监测系统研发与部署（AI 深度匹配）',
      category: '智能设备',
      publishDate: '2024-10-18',
      deadline: '2024-11-12',
      status: 'analyzed',
      budget: '860万元',
      priority: 'medium',
      source: 'ai',
      manager: '李经理',
      assignDate: '2024-10-19'
    }
  ]);

  const addToPlan = (tender: Tender | any, source: 'crawler' | 'ai' = 'crawler') => {
    if (plannedTasks.find(t => t.id === tender.id)) return;
    const newTask: BiddingTask = {
      ...tender,
      priority: 'medium',
      source,
    };
    setPlannedTasks([...plannedTasks, newTask]);
  };

  const removeFromPlan = (id: string) => {
    setPlannedTasks(plannedTasks.filter(t => t.id !== id));
  };

  const updateTask = (updatedTask: BiddingTask) => {
    setPlannedTasks(plannedTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const navItems = [
    { id: AppView.DASHBOARD, label: '系统仪表盘', icon: LayoutDashboard },
    { id: AppView.CRAWLER, label: '招标抓取解析', icon: Search },
    { id: AppView.AI_SELECTOR, label: '智能投标筛选', icon: Target },
    { id: AppView.BID_PLAN, label: '投标计划管理', icon: CalendarDays },
    { id: AppView.TEMPLATE_CONFIG, label: '投标文档模板配置', icon: LayoutTemplate },
    { id: AppView.KNOWLEDGE_BASE, label: '业绩人员库', icon: Database },
    { id: AppView.BID_WORKSPACE, label: '智能文书编撰', icon: FileText },
    { id: AppView.LOG_MANAGEMENT, label: '系统日志管理', icon: Activity },
    { id: AppView.AGENT_CONFIG, label: '智能体参数配置', icon: Settings2 },
    { id: AppView.ADMIN, label: '权限角色管理', icon: ShieldCheck },
  ];

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView />;
      case AppView.CRAWLER: return (
        <CrawlerView 
          plannedIds={plannedTasks.map(t => t.id)} 
          onTogglePlan={(t) => plannedTasks.find(p => p.id === t.id) ? removeFromPlan(t.id) : addToPlan(t, 'crawler')} 
        />
      );
      case AppView.AI_SELECTOR: return (
        <AISelectorView 
          plannedIds={plannedTasks.map(t => t.id)} 
          onTogglePlan={(t) => addToPlan(t, 'ai')} 
        />
      );
      case AppView.BID_PLAN: return <BiddingPlanView tasks={plannedTasks} onUpdateTask={updateTask} onRemoveTask={removeFromPlan} />;
      case AppView.TEMPLATE_CONFIG: return <TemplateConfigView />;
      case AppView.KNOWLEDGE_BASE: return <KnowledgeBaseView />;
      case AppView.BID_WORKSPACE: return <BidWorkspaceView />;
      case AppView.LOG_MANAGEMENT: return <LogManagementView />;
      case AppView.AGENT_CONFIG: return <AgentConfigView />;
      case AppView.ADMIN: return <AdminView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-white flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-tight text-blue-400">GridBid AI</h1>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                currentView === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
            <UserCircle size={32} className="text-slate-400" />
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-semibold whitespace-nowrap">超级管理员</p>
                <p className="text-xs text-slate-500">网省级中心</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center text-slate-500">
            <span>首页</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-slate-900 font-medium">
              {navItems.find(i => i.id === currentView)?.label}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-sm font-medium text-slate-700">2024年10月24日</div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto grid-bg p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
