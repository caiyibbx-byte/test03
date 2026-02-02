
import React, { useState } from 'react';
import { FileSpreadsheet, UserPlus, Trash2, CheckCircle2, AlertCircle, ChevronDown, Download, Users } from 'lucide-react';
import { BiddingTask } from '../types';

interface BiddingPlanViewProps {
  tasks: BiddingTask[];
  onUpdateTask: (task: BiddingTask) => void;
  onRemoveTask: (id: string) => void;
}

const biddingManagers = ['张经理', '李经理', '王经理', '赵经理', '孙经理'];

const BiddingPlanView: React.FC<BiddingPlanViewProps> = ({ tasks, onUpdateTask, onRemoveTask }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('投标计划已导出为 Excel 文件！');
    }, 1500);
  };

  const handleAssign = (id: string, manager: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      onUpdateTask({
        ...task,
        manager,
        assignDate: new Date().toLocaleDateString('zh-CN'),
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">投标计划管理</h2>
          <p className="text-slate-500">集中管理已确认的投标项目，分派人员并跟踪任务进度。</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={exporting || tasks.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-all disabled:opacity-50 shadow-sm"
        >
          {exporting ? <Download size={18} className="mr-2 animate-bounce" /> : <FileSpreadsheet size={18} className="mr-2" />}
          导出 Excel 计划表
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 flex flex-col items-center justify-center text-slate-400">
          <CalendarIcon size={64} className="mb-4 opacity-20" />
          <p className="text-lg">暂无投标计划，请先在“招标抓取”或“智能筛选”页面添加项目</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">计划中项目</p>
              <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">已分派任务</p>
              <p className="text-3xl font-bold text-emerald-600">{tasks.filter(t => t.manager).length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">待处理节点</p>
              <p className="text-3xl font-bold text-amber-500">{tasks.filter(t => !t.manager).length}</p>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="text-sm font-semibold text-slate-600 bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">投标项目名称</th>
                  <th className="px-6 py-4">预算/分类</th>
                  <th className="px-6 py-4">开标日期</th>
                  <th className="px-6 py-4">投标经理</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{task.title}</p>
                      <p className="text-xs text-slate-400 mt-1">ID: {task.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{task.budget}</p>
                      <span className="text-xs text-slate-500">{task.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-red-500 font-medium">
                        <AlertCircle size={14} className="mr-1.5" />
                        {task.deadline}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {task.manager ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                            {task.manager[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{task.manager}</p>
                            <p className="text-[10px] text-slate-400">分派于 {task.assignDate}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group w-40">
                          <div className="flex items-center px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-400 cursor-pointer group-hover:border-blue-400 group-hover:text-blue-600 transition-colors">
                            <UserPlus size={14} className="mr-1.5" />
                            选择经理分派
                            <ChevronDown size={12} className="ml-auto" />
                          </div>
                          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-100 rounded-lg shadow-xl z-50 hidden group-hover:block overflow-hidden">
                            {biddingManagers.map(m => (
                              <div 
                                key={m}
                                onClick={() => handleAssign(task.id, m)}
                                className="px-4 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                              >
                                {m}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onRemoveTask(task.id)}
                        className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="移出计划"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Personnel Workload Preview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Users size={20} className="mr-2 text-blue-600" />
              团队负载实时看板
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biddingManagers.map((m, i) => {
                const assignedCount = tasks.filter(t => t.manager === m).length;
                const load = (assignedCount / 5) * 100; // Mock calculation
                return (
                  <div key={m} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700">{m}</span>
                      <span className="text-xs text-slate-500">进行中任务: {assignedCount}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-red-500' : load > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.max(5, load)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

export default BiddingPlanView;
