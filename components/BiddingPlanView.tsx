
import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  UserPlus, 
  Trash2, 
  AlertCircle, 
  ChevronDown, 
  Download, 
  Users, 
  Search,
  Filter,
  Bot,
  Zap,
  Calendar,
  MoreHorizontal,
  Briefcase
} from 'lucide-react';
import { BiddingTask } from '../types';

interface BiddingPlanViewProps {
  tasks: BiddingTask[];
  onUpdateTask: (task: BiddingTask) => void;
  onRemoveTask: (id: string) => void;
}

const biddingManagers = ['张经理', '李经理', '王经理', '赵经理', '孙经理'];

const BiddingPlanView: React.FC<BiddingPlanViewProps> = ({ tasks, onUpdateTask, onRemoveTask }) => {
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'crawler' | 'ai'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            task.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = filterSource === 'all' || task.source === filterSource;
      return matchesSearch && matchesSource;
    });
  }, [tasks, searchTerm, filterSource]);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('投标计划已成功导出为 Excel 文件！');
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
          <p className="text-slate-500">管理已加入计划的招标项目，来自：抓取解析 (Crawler) 与 智能筛选 (AI)。</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={exporting || tasks.length === 0}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center transition-all disabled:opacity-50 shadow-lg shadow-emerald-200"
        >
          {exporting ? <Download size={18} className="mr-2 animate-bounce" /> : <FileSpreadsheet size={18} className="mr-2" />}
          导出 Excel 计划表
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase size={14} className="mr-1.5" /> 总计划项目
          </div>
          <p className="text-3xl font-black text-slate-900">{tasks.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-blue-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Bot size={14} className="mr-1.5" /> AI 建议引入
          </div>
          <p className="text-3xl font-black text-blue-600">{tasks.filter(t => t.source === 'ai').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-emerald-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} className="mr-1.5" /> 抓取直接引入
          </div>
          <p className="text-3xl font-black text-emerald-600">{tasks.filter(t => t.source === 'crawler').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
            <Users size={14} className="mr-1.5" /> 待指派经理
          </div>
          <p className="text-3xl font-black text-amber-500">{tasks.filter(t => !t.manager).length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* 过滤栏 */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-4 items-center">
          <div className="flex-1 relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索计划内项目名称或编号..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
            <button 
              onClick={() => setFilterSource('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filterSource === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilterSource('ai')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center ${filterSource === 'ai' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Bot size={14} className="mr-1.5" /> AI 筛选
            </button>
            <button 
              onClick={() => setFilterSource('crawler')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center ${filterSource === 'crawler' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Zap size={14} className="mr-1.5" /> 抓取解析
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Filter size={32} className="opacity-20" />
            </div>
            <p className="text-lg font-medium">未找到匹配的计划项目</p>
            <p className="text-sm">尝试更换搜索词或筛选条件</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">来源与项目信息</th>
                  <th className="px-6 py-4">预算规模</th>
                  <th className="px-6 py-4">截止倒计时</th>
                  <th className="px-6 py-4">投标经理</th>
                  <th className="px-6 py-4 text-right">管理</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className={`mt-1 p-1.5 rounded-lg mr-3 ${task.source === 'ai' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`} title={task.source === 'ai' ? '来源: 智能筛选' : '来源: 抓取解析'}>
                          {task.source === 'ai' ? <Bot size={16} /> : <Zap size={16} />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{task.title}</p>
                          <div className="flex items-center mt-1 space-x-2">
                             <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 rounded uppercase">#{task.id}</span>
                             <span className="text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">{task.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-slate-700">{task.budget || '待核算'}</p>
                      <p className="text-[10px] text-slate-400">估值基准: AI 预测</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center text-xs font-bold ${new Date(task.deadline) < new Date() ? 'text-red-500' : 'text-amber-600'}`}>
                        <Calendar size={14} className="mr-1.5" />
                        {task.deadline}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">剩余时间不足 15 天</p>
                    </td>
                    <td className="px-6 py-4">
                      {task.manager ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-200">
                            {task.manager[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{task.manager}</p>
                            <p className="text-[10px] text-slate-400">指派于 {task.assignDate}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group/manager w-44">
                          <div className="flex items-center px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-400 cursor-pointer group-hover/manager:border-blue-400 group-hover/manager:text-blue-600 bg-white shadow-sm transition-all">
                            <UserPlus size={14} className="mr-2" />
                            指派投标经理
                            <ChevronDown size={12} className="ml-auto" />
                          </div>
                          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-2xl z-50 hidden group-hover/manager:block overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 bg-slate-50 border-b border-slate-100">可选经理</div>
                            {biddingManagers.map(m => (
                              <div 
                                key={m}
                                onClick={() => handleAssign(task.id, m)}
                                className="px-4 py-2.5 text-xs text-slate-600 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors flex items-center"
                              >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                                {m}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                        <button 
                          onClick={() => onRemoveTask(task.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="移出计划"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 底部团队负载监控 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold flex items-center">
              <Users size={20} className="mr-2 text-blue-600" />
              项目经理资源调度看板
            </h3>
            <p className="text-xs text-slate-500 mt-1">实时计算各经理名下进行中的投标任务总数及饱和度。</p>
          </div>
          <button className="text-blue-600 text-xs font-bold hover:underline">查看人员档案</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {biddingManagers.map((m) => {
            const assignedCount = tasks.filter(t => t.manager === m).length;
            const load = Math.min(100, (assignedCount / 3) * 100); // 假设3个项目为满负荷
            return (
              <div key={m} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all group/card">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs mr-2 group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors">
                      {m[0]}
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{m}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${load > 80 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {assignedCount} 标
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-red-500' : load > 50 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                    style={{ width: `${Math.max(5, load)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-slate-400">负荷饱和度</span>
                  <span className="text-[10px] font-bold text-slate-500">{Math.round(load)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BiddingPlanView;
