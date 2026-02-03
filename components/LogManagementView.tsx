
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  RefreshCw, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  Clock, 
  Database, 
  User, 
  Cpu, 
  Terminal,
  Settings,
  Plus,
  Calendar,
  Zap,
  CheckCircle2,
  X,
  Clock3
} from 'lucide-react';
import { SystemLog } from '../types';

interface LogManagementViewProps {
  logs: SystemLog[];
  onClearLogs: () => void;
}

const LogManagementView: React.FC<LogManagementViewProps> = ({ logs, onClearLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // 爬虫调度配置状态
  const [syncMode, setSyncMode] = useState<'daily' | 'intervals'>('daily');
  const [dailyTime, setDailyTime] = useState('09:00');
  const [intervalTimes, setIntervalTimes] = useState<string[]>(['09:00', '14:00', '20:00']);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = 
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [logs, searchTerm, selectedLevel]);

  const stats = useMemo(() => {
    return {
      total: logs.length,
      ai: logs.filter(l => l.category === 'ai').length,
      warning: logs.filter(l => l.level === 'warning').length,
      error: logs.filter(l => l.level === 'error').length
    };
  }, [logs]);

  const handleSaveConfig = () => {
    setIsSavingConfig(true);
    setTimeout(() => {
      setIsSavingConfig(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }, 1000);
  };

  const addTimeSlot = () => {
    const lastTime = intervalTimes[intervalTimes.length - 1] || '08:00';
    const [h, m] = lastTime.split(':').map(Number);
    const nextH = (h + 4) % 24;
    const newTime = `${nextH.toString().padStart(2, '0')}:00`;
    setIntervalTimes([...intervalTimes, newTime]);
  };

  const removeTimeSlot = (index: number) => {
    setIntervalTimes(intervalTimes.filter((_, i) => i !== index));
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info': return <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><Info size={12} className="mr-1" /> Info</span>;
      case 'warning': return <span className="flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><AlertTriangle size={12} className="mr-1" /> Warning</span>;
      case 'error': return <span className="flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><AlertCircle size={12} className="mr-1" /> Error</span>;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return <span title="系统"><Database size={14} className="text-slate-400" /></span>;
      case 'user': return <span title="用户"><User size={14} className="text-slate-400" /></span>;
      case 'ai': return <span title="AI 智能体"><Cpu size={14} className="text-slate-400" /></span>;
      case 'crawler': return <span title="爬虫脚本"><Terminal size={14} className="text-slate-400" /></span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">系统运维与审计</h2>
          <p className="text-slate-500 text-sm">管理全平台同步策略，审计 AI 智能体及爬虫脚本的运行足迹。</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-slate-50 transition-colors">
            <RefreshCw size={16} className="mr-2" /> 强制刷新
          </button>
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-slate-50 transition-colors">
            <Download size={16} className="mr-2" /> 导出审计包
          </button>
          <button 
            onClick={onClearLogs}
            className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} className="mr-2" /> 清空历史
          </button>
        </div>
      </div>

      {/* 爬虫调度配置控制面板 (New Section) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-blue-600 animate-in slide-in-from-top-4 duration-700">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl mr-4 shadow-lg shadow-blue-200">
              <Settings size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 uppercase italic">数据采集引擎调度配置</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Scheduler strategy for electric power bidding data sources</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             {showSaveSuccess && (
               <span className="text-xs font-bold text-emerald-500 flex items-center animate-in fade-in zoom-in-95">
                 <CheckCircle2 size={16} className="mr-1.5" /> 配置已生效
               </span>
             )}
             <button 
               onClick={handleSaveConfig}
               disabled={isSavingConfig}
               className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center disabled:opacity-50"
             >
               {isSavingConfig ? <RefreshCw size={14} className="mr-2 animate-spin" /> : <Zap size={14} className="mr-2 text-amber-400" />}
               保存采集计划
             </button>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start text-left">
           <div className="space-y-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">1. 选择执行频率模式</label>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200">
                  <button 
                    onClick={() => setSyncMode('daily')}
                    className={`flex items-center px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${syncMode === 'daily' ? 'bg-white text-blue-600 shadow-md translate-x-0' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <Calendar size={14} className="mr-2" /> 每日固定同步
                  </button>
                  <button 
                    onClick={() => setSyncMode('intervals')}
                    className={`flex items-center px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${syncMode === 'intervals' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <Clock3 size={14} className="mr-2" /> 多时段周期同步
                  </button>
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
                 <p className="text-[10px] text-blue-500 font-bold uppercase flex items-center mb-2 tracking-widest">
                    <Zap size={12} className="mr-2" /> 策略说明 (Engine Logic)
                 </p>
                 <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {syncMode === 'daily' 
                      ? "引擎将在每天指定时间启动全量爬取任务。适合招标更新频率较低的稳定期。" 
                      : "引擎将在全天多个关键时刻点并发启动增量抓取任务。适合项目发布密集期或抢抓即时标书文件。"}
                 </p>
              </div>
           </div>

           <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">2. 设定具体时间点</label>
              
              {syncMode === 'daily' ? (
                <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-4">
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                      type="time" 
                      value={dailyTime}
                      onChange={(e) => setDailyTime(e.target.value)}
                      className="pl-12 pr-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-mono font-bold text-lg text-slate-700 shadow-inner" 
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-bold italic">每天自动启动</span>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                   <div className="flex flex-wrap gap-3">
                      {intervalTimes.map((time, idx) => (
                        <div key={idx} className="flex items-center bg-white border-2 border-slate-100 p-1 pl-4 rounded-2xl hover:border-blue-300 transition-all group shadow-sm">
                          <span className="font-mono font-bold text-slate-700">{time}</span>
                          <button 
                            onClick={() => removeTimeSlot(idx)}
                            className="ml-3 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={addTimeSlot}
                        className="flex items-center px-4 py-2 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        <Plus size={14} className="mr-2" /> 新增时段
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase italic tracking-wider">注：多时段任务将采用异步并发抓取，请确保目标平台频率限制正常</p>
                </div>
              )}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '累计运行日志', value: stats.total, icon: Clock, color: 'text-slate-600' },
          { label: 'AI 引擎活跃度', value: stats.ai, icon: Cpu, color: 'text-blue-600' },
          { label: '高优先级警告', value: stats.warning, icon: AlertTriangle, color: 'text-amber-600' },
          { label: '关键异常拦截', value: stats.error, icon: AlertCircle, color: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <div className={`p-2 rounded-xl bg-slate-50 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索审计条目、操作员或 IP 地址..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            />
          </div>
          <div className="flex space-x-2">
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white border border-slate-200 rounded-2xl px-5 py-2.5 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 uppercase tracking-wider"
            >
              <option value="all">所有日志级别</option>
              <option value="info">INFO</option>
              <option value="warning">WARNING</option>
              <option value="error">ERROR</option>
            </select>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1 custom-scrollbar-main">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/80 border-b border-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">时间点 (UTC+8)</th>
                <th className="px-6 py-4">等级</th>
                <th className="px-6 py-4">引擎</th>
                <th className="px-6 py-4">操作者</th>
                <th className="px-6 py-4">行为动作</th>
                <th className="px-6 py-4">同步详情</th>
                <th className="px-6 py-4">源 IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                <tr key={log.id} className={`hover:bg-slate-50/80 transition-all group animate-in slide-in-from-top-1 duration-300 ${log.level === 'error' ? 'bg-red-50/20' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-[11px] text-slate-500 font-medium">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    {getLevelBadge(log.level)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-all shadow-sm">
                      {getCategoryIcon(log.category)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{log.operator}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2.5 py-1 bg-slate-100 rounded-lg font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all uppercase tracking-widest">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <p className={`text-xs truncate group-hover:whitespace-normal transition-all leading-relaxed ${log.level === 'error' ? 'text-red-600 font-bold' : 'text-slate-600 font-medium'}`} title={log.details}>
                      {log.details}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400 font-bold">
                    {log.ip}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Search size={64} strokeWidth={1} className="mb-6 opacity-20" />
                      <p className="text-sm font-black uppercase tracking-widest">No matching logs found</p>
                      <p className="text-xs mt-2 opacity-60 uppercase font-bold tracking-widest italic">Try adjusting filters or search terms</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogManagementView;
