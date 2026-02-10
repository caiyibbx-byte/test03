
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
  Plus,
  Send,
  DatabaseZap,
  BadgeCheck,
  ClipboardCheck
} from 'lucide-react';
import { BiddingTask, StaffMember } from '../types';

interface BiddingPlanViewProps {
  tasks: BiddingTask[];
  onUpdateTask: (task: BiddingTask) => void;
  onRemoveTask: (id: string) => void;
  onEnterWorkspace: (taskId: string) => void;
}

// 模拟全量人才库，明确“商务”和“技术”分类
const globalTalentPool: StaffMember[] = [
  { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['商务', '总控', '高压资质'] },
  { id: 'm2', name: '李经理', role: '技术中心主管', score: 94, years: 10, majorProject: '客服中心云平台二期', tags: ['技术', '架构'] },
  { id: 'm3', name: '王工', role: '高级工程师', score: 89, years: 12, majorProject: '变电站二次回路改造', tags: ['技术', '二次系统'] },
  { id: 'gt1', name: '周博', role: '系统架构师', years: 12, majorProject: '省级科研院数字孪生', tags: ['技术', '高级职称'], dept: '科研院' },
  { id: 'gt2', name: '吴工', role: '通信专家', years: 8, majorProject: '信通分公司网络升级', tags: ['技术', '咨询师'], dept: '信通部' },
  { id: 'gt3', name: '郑工', role: '安全主管', years: 18, majorProject: '安监部标准化建设', tags: ['商务', '法务'], dept: '安监部' },
  { id: 'gt4', name: '孙经理', role: '商务总监', years: 14, majorProject: '华东电网物资集采', tags: ['商务', '招采'], dept: '商务中心' },
  { id: 'gt5', name: '刘工', role: '概预算专家', years: 9, majorProject: '青海绿电交易', tags: ['商务', '预决算'], dept: '造价部' },
  { id: 'gt6', name: '陈工', role: '商务助理', years: 5, majorProject: '物资部协议库存', tags: ['商务', '上传'], dept: '商务中心' },
];

type RoleType = 'leader' | 'exp' | 'member' | 'tech' | 'submission';

const BiddingPlanView: React.FC<BiddingPlanViewProps> = ({ tasks, onUpdateTask, onRemoveTask, onEnterWorkspace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState<RoleType | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [talentSearchQuery, setTalentSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (task.lotName && task.lotName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [tasks, searchTerm]);

  const filteredTalent = useMemo(() => {
    let pool = globalTalentPool;
    // 根据角色要求过滤人才库
    if (['exp', 'member', 'submission'].includes(modalType || '')) {
      pool = pool.filter(t => t.tags.includes('商务'));
    } else if (modalType === 'tech') {
      pool = pool.filter(t => t.tags.includes('技术'));
    }
    
    const q = talentSearchQuery.toLowerCase();
    return pool.filter(t => t.name.toLowerCase().includes(q) || (t.dept && t.dept.toLowerCase().includes(q)));
  }, [talentSearchQuery, modalType]);

  const handleSelectStaff = (staff: StaffMember) => {
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task || !modalType) return;

    let updatedTask = { ...task };
    switch (modalType) {
      case 'leader': updatedTask.projectLeader = staff; break;
      case 'exp': updatedTask.expSelectionLeader = staff; break;
      case 'member': updatedTask.memberDraftingLeader = staff; break;
      case 'tech': updatedTask.techProposalLeader = staff; break;
      case 'submission': updatedTask.submissionLeader = staff; break;
    }
    
    if (modalType === 'leader') updatedTask.assignDate = new Date().toLocaleDateString('zh-CN');
    
    onUpdateTask(updatedTask);
    setModalType(null);
    setActiveTaskId(null);
  };

  const handleCompleteBidding = (task: BiddingTask) => {
    if (!task.submissionLeader) return;
    if (confirm(`确认项目 [${task.lotName || '整包'}] 已在电网系统完成上传，并标记本系统任务为已完成？`)) {
      onUpdateTask({ ...task, status: '已结束', progress: 100, currentStage: 'submitted' });
    }
  };

  const PersonnelSlot = ({ label, staff, type, taskId }: { label: string, staff?: StaffMember, type: RoleType, taskId: string }) => (
    <div 
      onClick={() => { setActiveTaskId(taskId); setModalType(type); }}
      className={`group flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer w-20 h-20 ${
        staff ? 'bg-white border-blue-100 hover:border-blue-400' : 'bg-slate-50 border-dashed border-slate-200 hover:border-blue-300'
      }`}
    >
      {staff ? (
        <>
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shadow-sm mb-1 group-hover:bg-blue-600 transition-colors">
            {staff.name[0]}
          </div>
          <span className="text-[9px] font-black text-slate-700 truncate w-full text-center">{staff.name}</span>
        </>
      ) : (
        <>
          <Plus size={14} className="text-slate-300 group-hover:text-blue-500 mb-1" />
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter text-center leading-tight">{label}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left relative">
      {/* 人员指派模态框 */}
      {modalType && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setModalType(null)} />
          <div className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl">
                  {modalType === 'leader' ? <UserCheck size={24} /> : 
                   modalType === 'exp' ? <DatabaseZap size={24} /> : 
                   modalType === 'member' ? <Users2 size={24} /> : 
                   modalType === 'tech' ? <FileText size={24} /> : <Send size={24} />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                    {modalType === 'leader' ? '指定项目负责人' : 
                     modalType === 'exp' ? '指定业绩遴选负责人' : 
                     modalType === 'member' ? '指定成员拟定负责人' : 
                     modalType === 'tech' ? '指定技术方案负责人' : '指定负责投标人员'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest italic">
                    {['exp', 'member', 'submission'].includes(modalType) ? '请从 [商务组] 人才库中选择' : modalType === 'tech' ? '请从 [技术组] 人才库中选择' : '全库可选'}
                  </p>
                </div>
              </div>
              <button onClick={() => setModalType(null)} className="p-3 hover:bg-white rounded-full transition-colors"><X size={24}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-main">
              <div className="relative mb-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  autoFocus
                  value={talentSearchQuery}
                  onChange={(e) => setTalentSearchQuery(e.target.value)}
                  placeholder="搜索人才姓名或部门..." 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold shadow-inner" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {filteredTalent.map(staff => (
                  <div 
                    key={staff.id} 
                    onClick={() => handleSelectStaff(staff)} 
                    className="p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-black text-lg mr-4 transition-all shadow-md">
                        {staff.name[0]}
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-black text-slate-800 block">{staff.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase italic">{staff.dept || '中心'} · {staff.role}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">投标计划管理</h2>
          <p className="text-slate-500 text-sm italic">多角色职责分配：通过精细化指派负责人，确保投标各环节权责清晰且可追溯。</p>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg hover:bg-emerald-700 transition-all font-bold text-sm">
          <FileSpreadsheet size={18} className="mr-2" /> 导出 Excel 计划
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="快速搜索标包或项目..." 
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
                <th className="px-6 py-6 w-[280px]">投标项目 / 标包详情</th>
                <th className="px-6 py-6 text-center">项目总负责</th>
                <th className="px-6 py-6 text-center">业绩遴选(商)</th>
                <th className="px-6 py-6 text-center">成员拟定(商)</th>
                <th className="px-6 py-6 text-center">技术方案(技)</th>
                <th className="px-6 py-6 text-center">投标上传(商)</th>
                <th className="px-6 py-6 text-right">管理控制</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-6 py-6">
                    <div className="max-w-[240px]">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase italic ${task.status === '已结束' ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                          {task.status}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 truncate">{task.projectId}</span>
                      </div>
                      <p className="text-sm font-black text-slate-900 leading-tight truncate">{task.lotName || '整包项目'}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5 italic">{task.title}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <PersonnelSlot label="负责人" staff={task.projectLeader} type="leader" taskId={task.id} />
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <PersonnelSlot label="业绩遴选" staff={task.expSelectionLeader} type="exp" taskId={task.id} />
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <PersonnelSlot label="成员拟定" staff={task.memberDraftingLeader} type="member" taskId={task.id} />
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <PersonnelSlot label="方案编写" staff={task.techProposalLeader} type="tech" taskId={task.id} />
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <PersonnelSlot label="投标上传" staff={task.submissionLeader} type="submission" taskId={task.id} />
                    </div>
                  </td>

                  <td className="px-6 py-6 text-right">
                    <div className="flex flex-col space-y-2 items-end">
                       <button 
                         onClick={() => onEnterWorkspace(task.id)}
                         className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-lg transition-all flex items-center w-fit"
                       >
                         <FileText size={14} className="mr-2" /> 编撰空间
                       </button>
                       {task.submissionLeader && task.status !== '已结束' && (
                         <button 
                           onClick={() => handleCompleteBidding(task)}
                           className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg transition-all flex items-center w-fit animate-in fade-in"
                         >
                           <ClipboardCheck size={14} className="mr-2" /> 完成投标
                         </button>
                       )}
                       <button onClick={() => onRemoveTask(task.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-all">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-20">
                       <History size={64} strokeWidth={1} />
                       <p className="text-sm font-black uppercase tracking-[0.4em] mt-4 italic">No Planned Tasks Found</p>
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
