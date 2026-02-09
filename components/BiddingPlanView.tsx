
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
  Bot,
  Zap,
  Calendar,
  MoreHorizontal,
  Briefcase,
  Layers,
  RefreshCw,
  X,
  UserCheck,
  History,
  Check,
  UserSearch,
  ChevronRight,
  FileText,
  UserGroup,
  Users2,
  Cpu,
  Coins,
  Plus
} from 'lucide-react';
import { BiddingTask, StaffMember } from '../types';

interface BiddingPlanViewProps {
  tasks: BiddingTask[];
  onUpdateTask: (task: BiddingTask) => void;
  onRemoveTask: (id: string) => void;
  onEnterWorkspace: (taskId: string) => void;
}

// 模拟全量人才库，增加“商务”和“技术”标签
const globalTalentPool: StaffMember[] = [
  { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['商务', '评标', '高压资质'] },
  { id: 'm2', name: '李经理', role: '技术中心主管', score: 94, years: 10, majorProject: '客服中心云平台二期', tags: ['技术', '信通', '架构'] },
  { id: 'm3', name: '王工', role: '高级工程师', score: 89, years: 12, majorProject: '变电站二次回路改造', tags: ['技术', '二次系统'] },
  { id: 'gt1', name: '周博', role: '系统架构师', years: 12, majorProject: '省级科研院数字孪生', tags: ['技术', '高级职称'], dept: '科研院' },
  { id: 'gt2', name: '吴工', role: '通信专家', years: 8, majorProject: '信通分公司网络升级', tags: ['技术', '注册咨询师'], dept: '信通部' },
  { id: 'gt3', name: '郑工', role: '安全主管', years: 18, majorProject: '安监部标准化建设', tags: ['商务', '法务', '注册安全师'], dept: '安监部' },
  { id: 'gt4', name: '孙经理', role: '商务总监', years: 14, majorProject: '华东电网物资集采', tags: ['商务', '招采'], dept: '商务中心' },
  { id: 'gt5', name: '刘工', role: '概预算专家', years: 9, majorProject: '青海绿电交易', tags: ['商务', '预决算'], dept: '造价部' },
];

const BiddingPlanView: React.FC<BiddingPlanViewProps> = ({ tasks, onUpdateTask, onRemoveTask, onEnterWorkspace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // modalType: null | 'leader' | 'commercial' | 'technical'
  const [modalType, setModalType] = useState<'leader' | 'commercial' | 'technical' | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [talentSearchQuery, setTalentSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (task.lotName && task.lotName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [tasks, searchTerm]);

  // 根据当前指派类型（商务或技术）过滤人员
  const filteredTalent = useMemo(() => {
    let pool = globalTalentPool;
    if (modalType === 'commercial') {
      pool = pool.filter(t => t.tags.includes('商务'));
    } else if (modalType === 'technical') {
      pool = pool.filter(t => t.tags.includes('技术'));
    }
    
    const q = talentSearchQuery.toLowerCase();
    return pool.filter(t => t.name.toLowerCase().includes(q) || (t.dept && t.dept.toLowerCase().includes(q)));
  }, [talentSearchQuery, modalType]);

  const handleToggleStaff = (staff: StaffMember) => {
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task) return;

    let updatedTask = { ...task };

    if (modalType === 'leader') {
      updatedTask.projectLeader = staff;
      updatedTask.assignDate = new Date().toLocaleDateString('zh-CN');
      setModalType(null);
    } else if (modalType === 'commercial') {
      const current = task.commercialTeam || [];
      const exists = current.find(s => s.id === staff.id);
      updatedTask.commercialTeam = exists 
        ? current.filter(s => s.id !== staff.id) 
        : [...current, staff];
    } else if (modalType === 'technical') {
      const current = task.technicalTeam || [];
      const exists = current.find(s => s.id === staff.id);
      updatedTask.technicalTeam = exists 
        ? current.filter(s => s.id !== staff.id) 
        : [...current, staff];
    }

    onUpdateTask(updatedTask);
  };

  const isStaffSelected = (staffId: string) => {
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task) return false;
    if (modalType === 'leader') return task.projectLeader?.id === staffId;
    if (modalType === 'commercial') return !!task.commercialTeam?.find(s => s.id === staffId);
    if (modalType === 'technical') return !!task.technicalTeam?.find(s => s.id === staffId);
    return false;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left relative">
      {/* 增强版人员指派模态框 */}
      {modalType && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setModalType(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${
                  modalType === 'leader' ? 'bg-blue-600 text-white' : 
                  modalType === 'commercial' ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white'
                }`}>
                   {modalType === 'leader' ? <UserCheck size={24} /> : 
                    modalType === 'commercial' ? <Coins size={24} /> : <Cpu size={24} />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                    {modalType === 'leader' ? '指派项目负责人' : 
                     modalType === 'commercial' ? '指派商务组成员' : '指派技术组成员'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest italic">
                    {modalType === 'leader' ? '负责项目整体把控与签章' : '负责商务应答、报价及业绩梳理'}
                  </p>
                </div>
              </div>
              <button onClick={() => setModalType(null)} className="p-3 hover:bg-white rounded-full transition-colors"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-main">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={talentSearchQuery}
                  onChange={(e) => setTalentSearchQuery(e.target.value)}
                  placeholder={`在${modalType === 'commercial' ? '商务' : modalType === 'technical' ? '技术' : '全量'}人才库中检索...`} 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold shadow-inner" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {filteredTalent.map(staff => (
                  <div 
                    key={staff.id} 
                    onClick={() => handleToggleStaff(staff)} 
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer shadow-sm ${
                      isStaffSelected(staff.id) ? 'border-blue-600 bg-blue-50/30' : 'bg-white border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mr-4 transition-all shadow-md ${
                        isStaffSelected(staff.id) ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {staff.name[0]}
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-black text-slate-800 block">{staff.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase italic">{staff.dept || '技术中心'} · {staff.role}</span>
                      </div>
                    </div>
                    {isStaffSelected(staff.id) ? (
                      <div className="bg-blue-600 text-white rounded-full p-1 shadow-lg animate-in zoom-in duration-300">
                        <Check size={18} strokeWidth={4} />
                      </div>
                    ) : (
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {(modalType === 'commercial' || modalType === 'technical') && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setModalType(null)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                >
                  确认选定并返回
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">投标计划管理</h2>
          <p className="text-slate-500 text-sm italic">多维团队编撰：指派不同维度的负责人，AI 将基于人员特征自动分配任务区块。</p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg hover:bg-emerald-700 transition-all font-bold text-sm">
          <FileSpreadsheet size={18} className="mr-2" /> 导出 Excel 投标计划
        </button>
      </div>

      {/* 统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '待补全团队', value: tasks.filter(t => !t.commercialTeam || !t.technicalTeam).length, icon: AlertCircle, color: 'text-amber-500' },
          { label: '商务就绪率', value: `${Math.round((tasks.filter(t => (t.commercialTeam?.length || 0) > 0).length / (tasks.length || 1)) * 100)}%`, icon: Coins, color: 'text-blue-600' },
          { label: '技术就绪率', value: `${Math.round((tasks.filter(t => (t.technicalTeam?.length || 0) > 0).length / (tasks.length || 1)) * 100)}%`, icon: Cpu, color: 'text-purple-600' },
          { label: '总计划任务', value: tasks.length, icon: Briefcase, color: 'text-slate-900' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">
              <stat.icon size={14} className={`mr-1.5 ${stat.color}`} /> {stat.label}
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索项目、标包或负责人..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">投标任务 / 分包详情</th>
                <th className="px-6 py-4">项目总负责人</th>
                <th className="px-6 py-4">商务工作组</th>
                <th className="px-6 py-4">技术工作组</th>
                <th className="px-6 py-4 text-right">管理控制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="max-w-[300px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase italic truncate">{task.title}</p>
                      <p className="text-sm font-black text-slate-900 mt-1">{task.lotName || '整包投标'}</p>
                    </div>
                  </td>
                  
                  {/* 负责人列 */}
                  <td className="px-6 py-4">
                    {task.projectLeader ? (
                      <div className="flex items-center group/lead cursor-pointer" onClick={() => { setActiveTaskId(task.id); setModalType('leader'); }}>
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-black mr-3 shadow-lg">{task.projectLeader.name[0]}</div>
                        <div className="text-left">
                          <p className="text-xs font-black text-slate-700">{task.projectLeader.name}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase italic tracking-tighter">Leader</p>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setActiveTaskId(task.id); setModalType('leader'); }}
                        className="p-2 bg-slate-100 text-slate-400 hover:text-blue-600 rounded-lg transition-all animate-pulse"
                      >
                        <UserPlus size={18} />
                      </button>
                    )}
                  </td>

                  {/* 商务组人员列 */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-[-10px]">
                      {(task.commercialTeam || []).map((s, idx) => (
                        <div key={s.id} className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm z-[20]" style={{ zIndex: 20 - idx }} title={`${s.name} (${s.role})`}>
                          {s.name[0]}
                        </div>
                      ))}
                      <button 
                        onClick={() => { setActiveTaskId(task.id); setModalType('commercial'); }}
                        className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center transition-all z-0 ${
                          (task.commercialTeam?.length || 0) > 0 ? 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-white hover:text-blue-500' : 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-500 hover:text-white'
                        }`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>

                  {/* 技术组人员列 */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-[-10px]">
                      {(task.technicalTeam || []).map((s, idx) => (
                        <div key={s.id} className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm z-[20]" style={{ zIndex: 20 - idx }} title={`${s.name} (${s.role})`}>
                          {s.name[0]}
                        </div>
                      ))}
                      <button 
                        onClick={() => { setActiveTaskId(task.id); setModalType('technical'); }}
                        className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center transition-all z-0 ${
                          (task.technicalTeam?.length || 0) > 0 ? 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-white hover:text-purple-500' : 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-500 hover:text-white'
                        }`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                         onClick={() => onEnterWorkspace(task.id)}
                         className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-lg shadow-slate-200 active:scale-95 transition-all flex items-center"
                       >
                         <FileText size={14} className="mr-2" /> 编撰大厅
                       </button>
                       <button onClick={() => onRemoveTask(task.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center opacity-20">
                       <Briefcase size={64} strokeWidth={1} />
                       <p className="text-sm font-black uppercase tracking-[0.4em] mt-4 italic">No Bidding Plan Assigned</p>
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

export default BiddingPlanView;
