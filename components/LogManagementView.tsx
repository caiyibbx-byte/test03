
import React, { useState } from 'react';
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

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  category: 'system' | 'user' | 'ai' | 'crawler';
  operator: string;
  action: string;
  details: string;
  ip?: string;
}

const LogManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const mockLogs: SystemLog[] = [
    { id: 'L1', timestamp: '2024-10-24 14:35:21', level: 'info', category: 'ai', operator: 'Agent_v2.4', action: '模板生成', details: '成功生成项目 [SGCC-2024-X] 的技术标模板', ip: '10.0.4.12' },
    { id: 'L2', timestamp: '2024-10-24 14:32:05', level: 'warning', category: 'crawler', operator: 'System_Scheduler', action: '抓取延迟', details: '南网招标平台响应缓慢，重试第 2 次成功', ip: '127.0.0.1' },
    { id: 'L3', timestamp: '2024-10-24 14:30:10', level: 'info', category: 'user', operator: '张工', action: '登录成功', details: '用户通过 OA 认证登录系统', ip: '192.168.1.105' },
    { id: 'L4', timestamp: '2024-10-24 14:28:45', level: 'error', category: 'system', operator: 'DB_Master', action: '连接中断', details: '尝试连接业绩数据库失败，自动切换至备份节点', ip: '10.0.2.1' },
    { id: 'L5', timestamp: '2024-10-24 14:25:00', level: 'info', category: 'ai', operator: 'Agent_v2.4', action: '需求提取', details: '解析招标文件核心指标 12 项', ip: '10.0.4.12' },
    { id: 'L6', timestamp: '2024-10-24 14:20:12', level: 'info', category: 'user', operator: '李经理', action: '计划指派', details: '将项目 [智慧变电站] 指派给王工', ip: '192.168.1.112' },
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info': return <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><Info size={12} className="mr-1" /> Info</span>;
      case 'warning': return <span className="flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><AlertTriangle size={12} className="mr-1" /> Warning</span>;
      case 'error': return <span className="flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"><AlertCircle size={12} className="mr-1" /> Error</span>;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    // Lucide icons do not accept 'title' directly, wrapping in span to provide tooltip
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
            <Download size={16} className="mr-2" /> 导出日志
          </button>
          <button className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-sm font-medium flex items-center hover:bg-red-100">
            <Trash2 size={16} className="mr-2" /> 清除旧日志
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '今日日志总数', value: '14,284', icon: Clock, color: 'text-slate-600' },
          { label: 'AI 处理日志', value: '3,120', icon: Cpu, color: 'text-blue-600' },
          { label: '警告级别', value: '12', icon: AlertTriangle, color: 'text-amber-600' },
          { label: '异常错误', value: '2', icon: AlertCircle, color: 'text-red-600' },
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

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索日志消息、操作员或详细内容..." 
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">时间戳</th>
                <th className="px-6 py-4">级别</th>
                <th className="px-6 py-4">分类</th>
                <th className="px-6 py-4">操作员/来源</th>
                <th className="px-6 py-4">操作动作</th>
                <th className="px-6 py-4">详细详情</th>
                <th className="px-6 py-4">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-500">
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
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-600">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-slate-600 truncate group-hover:text-slate-900 transition-colors" title={log.details}>
                      {log.details}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-xs text-slate-400">
          <span>显示 1 到 6 条，共 14,284 条记录</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
            <button className="px-2 py-1 border border-blue-200 rounded bg-blue-50 text-blue-600 font-bold">1</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">2</button>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">3</button>
            <span className="px-2 py-1">...</span>
            <button className="px-2 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogManagementView;
