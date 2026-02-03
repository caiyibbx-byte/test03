
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
  Terminal
} from 'lucide-react';
import { SystemLog } from '../types';

interface LogManagementViewProps {
  logs: SystemLog[];
  onClearLogs: () => void;
}

const LogManagementView: React.FC<LogManagementViewProps> = ({ logs, onClearLogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

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
          <h2 className="text-2xl font-bold text-slate-900">系统日志管理</h2>
          <p className="text-slate-500">实时监控并审计系统操作、AI 运行状态及底层接口调用。</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-slate-50">
            <RefreshCw size={16} className="mr-2" /> 刷新
          </button>
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-slate-50">
            <Download size={16} className="mr-2" /> 导出日志集
          </button>
          <button 
            onClick={onClearLogs}
            className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-red-100"
          >
            <Trash2 size={16} className="mr-2" /> 清除
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '累计日志', value: stats.total, icon: Clock, color: 'text-slate-600' },
          { label: 'AI 处理记录', value: stats.ai, icon: Cpu, color: 'text-blue-600' },
          { label: '警告级别', value: stats.warning, icon: AlertTriangle, color: 'text-amber-600' },
          { label: '异常错误', value: stats.error, icon: AlertCircle, color: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索操作员、动作或内容..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部级别</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">时间戳</th>
                <th className="px-6 py-4">级别</th>
                <th className="px-6 py-4">分类</th>
                <th className="px-6 py-4">操作员</th>
                <th className="px-6 py-4">动作</th>
                <th className="px-6 py-4">详情</th>
                <th className="px-6 py-4">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                <tr key={log.id} className={`hover:bg-slate-50/80 transition-colors group animate-in slide-in-from-top-1 duration-300 ${log.level === 'error' ? 'bg-red-50/20' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-[11px] text-slate-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    {getLevelBadge(log.level)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-all">
                      {getCategoryIcon(log.category)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">{log.operator}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] px-2 py-1 bg-slate-100 rounded font-medium text-slate-600">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className={`text-sm truncate group-hover:whitespace-normal transition-all ${log.level === 'error' ? 'text-red-600 font-medium' : 'text-slate-600'}`} title={log.details}>
                      {log.details}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                    {log.ip}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <Search size={48} className="mb-4 opacity-20" />
                      <p className="text-sm font-medium">暂无匹配的日志记录</p>
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
