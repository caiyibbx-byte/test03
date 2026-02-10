
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
  Users2,
  Cpu,
  Coins,
  Plus,
  Send,
  DatabaseZap,
  BadgeCheck,
  ClipboardCheck,
  Lock,
  Filter,
  ShieldCheck,
  Eye,
  LockKeyhole
} from 'lucide-react';
import { BiddingTask, StaffMember, StaffUser } from '../types';

interface BiddingPlanViewProps {
  tasks: BiddingTask[];
  currentUser: StaffUser | null;
  onUpdateTask: (task: BiddingTask) => void;
  onRemoveTask: (id: string) => void;
  onEnterWorkspace: (taskId: string) => void;
}

// 模拟人才库
const globalTalentPool: StaffMember[] = [
  { id: 'm1', name: '张经理', role: '资深项目总监', score: 98, years: 15, majorProject: '国网浙江500kV站改', tags: ['商务', '总控', '高压资质'] },
  { id: 'm2', name: '李经理', role: '技术中心主管', score: 94, years: 10, majorProject: '客服中心云平台二期', tags: ['技术', '架构'] },
  { id: 'm3', name: '王工', role: '高级工程师', score: 89, years: 12, majorProject: '变电站二次回路改造', tags: ['技术', '二次系统'] },
  { id: 'gt4', name: '孙经理', role: '商务总监', years: 14, majorProject: '物资集采', tags: ['商务'] },
  { id: 'gt5', name: '刘工', role: '概预算专家', years: 9, majorProject: '造价控制', tags: ['商务'] },
  { id: 'gt6', name: '陈工', role: '商务助理', years: 5, majorProject: '投标上传', tags: ['商务'] },
];

type RoleType = 'leader' | 'exp' | 'member' | 'tech' | 'submission';

const BiddingPlanView: React.FC<BiddingPlanViewProps> = ({ tasks, currentUser, onUpdateTask, onRemoveTask, onEnterWorkspace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalType, setModalType] = useState<RoleType | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // 核心：基于角色的数据隔离逻辑
  const visibleTasks = useMemo(() => {
    if (!currentUser) return [];
    
    // 如果是系统管理员，查看全量
    if (currentUser.id === 'ADMIN-001') return tasks;

    // 普通用户：仅筛选自己参与（在任意环节担任负责人）的项目
    return tasks.filter(task => {
      return (
        task.projectLeader?.id === currentUser.id ||
        task.expSelectionLeader?.id === currentUser.id ||
        task.memberDraftingLeader?.id === currentUser.id ||
        task.techProposalLeader?.id === currentUser.id ||
        task.submissionLeader?.id === currentUser.id
      );
    });
  }, [tasks, currentUser]);

  // 在隔离后的数据上应用关键字搜索
  const filteredTasks = useMemo(() => {
    return visibleTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (task.lotName && task.lotName.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [visibleTasks, searchTerm]);

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
    
    onUpdateTask(updatedTask);
    setModalType(null);
    setActiveTaskId(null);
  };

  const handleCompleteBidding = (task: BiddingTask) => {
    if (confirm(`确认项目 [${task.lotName || '整包'}] 已在外部招投标平台完成上传，并正式标记本系统任务为“已提交”？`)) {
      onUpdateTask({ ...task, status: '已结束', progress: 100, currentStage: 'submitted' });
    }
  };

  const PersonnelSlot = ({ label, staff, type, taskId }: { label: string, staff?: StaffMember, type: RoleType, taskId: string }) => (
    <div 
      onClick={() => { 
        // 只有系统管理员或该项目的总负责人能调整环节负责人
        const isProjectLeader = tasks.find(t => t.id === taskId)?.projectLeader?.id === currentUser?.id;
        const isAdmin = currentUser?.id === 'ADMIN-001';
        if (!isAdmin && !isProjectLeader) {
           alert("抱歉，只有项目总负责人或管理员可以重新指派环节岗位。");
           return;
        }
        setActiveTaskId(taskId); setModalType(type); 
      }}
      className={`group flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer w-20 h-20 text-left ${
        staff ? 'bg-white border-blue-100 hover:border-blue-400 shadow-sm' : 'bg-slate-50 border-dashed border-slate-200 hover:border-blue-300'
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
      {/* 角色指派模态框 */}
      {modalType && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setModalType(null)} />
          <div className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100"><UserSearch size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">指派岗位负责人</h3>
              </div>
              <button onClick={() => setModalType(null)} className="p-3 hover:bg-white rounded-full transition-colors"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-main">
              <div className="grid grid-cols-2 gap-4">
                {globalTalentPool.map(staff => (
                  <div key={staff.id} onClick={() => handleSelectStaff(staff)} className="p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-between group cursor-pointer shadow-sm">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-black text-lg mr-4 transition-all">{staff.name[0]}</div>
                      <div>
                        <span className="text-sm font-black text-slate-800 block">{staff.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase italic">{staff.role}</span>
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
          <h2 className="text-2xl font-bold flex items-center">
            投标计划管理
            {currentUser?.id !== 'ADMIN-001' && (
              <span className="ml-4 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center italic">
                <LockKeyhole size={12} className="mr-1.5"/> 数据受控模式
              </span>
            )}
          </h2>
          <p className="text-slate-500 text-sm italic font-medium">
            {currentUser?.id === 'ADMIN-001' 
              ? "当前为管理员全局视图，监控所有投标任务的岗位分配与进度。" 
              : "仅列出您担任负责人的投标项目。若需查看其他项目，请联系数字化中心。"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border-2 border-slate-100 text-slate-600 px-5 py-2.5 rounded-xl flex items-center shadow-sm hover:bg-slate-50 transition-all font-bold text-sm">
            <Filter size={18} className="mr-2" /> 漏斗筛选
          </button>
          <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg hover:bg-emerald-700 transition-all font-bold text-sm">
            <FileSpreadsheet size={18} className="mr-2" /> 导出同步计划
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="在授权范围内搜索标包..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-all text-sm font-bold" />
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
             显示 {filteredTasks.length} / {tasks.length} 个标包
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-6 w-[280px]">投标标包详情</th>
                <th className="px-6 py-6 text-center">总负责人</th>
                <th className="px-6 py-6 text-center">业绩负责人</th>
                <th className="px-6 py-6 text-center">成员拟定</th>
                <th className="px-6 py-6 text-center">方案编写</th>
                <th className="px-6 py-6 text-center">投标上传</th>
                <th className="px-6 py-6 text-right">控制中心</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => {
                const isDocReady = !!(task.isExpDone && task.isTeamDone && task.isContentDone);
                return (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-6 py-6">
                      <div className="max-w-[240px]">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase italic ${task.status === '已结束' ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                            {task.status}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{task.projectId}</span>
                        </div>
                        <p className="text-sm font-black text-slate-900 leading-tight truncate">{task.lotName || '整包投标'}</p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 italic">{task.title}</p>
                      </div>
                    </td>
                    
                    <td className="px-4 py-6"><div className="flex justify-center"><PersonnelSlot label="总负责" staff={task.projectLeader} type="leader" taskId={task.id} /></div></td>
                    <td className="px-4 py-6"><div className="flex justify-center"><PersonnelSlot label="业绩" staff={task.expSelectionLeader} type="exp" taskId={task.id} /></div></td>
                    <td className="px-4 py-6"><div className="flex justify-center"><PersonnelSlot label="成员" staff={task.memberDraftingLeader} type="member" taskId={task.id} /></div></td>
                    <td className="px-4 py-6"><div className="flex justify-center"><PersonnelSlot label="方案" staff={task.techProposalLeader} type="tech" taskId={task.id} /></div></td>
                    <td className="px-4 py-6"><div className="flex justify-center"><PersonnelSlot label="上传" staff={task.submissionLeader} type="submission" taskId={task.id} /></div></td>

                    <td className="px-6 py-6 text-right">
                      <div className="flex flex-col space-y-2 items-end">
                         <button 
                           onClick={() => onEnterWorkspace(task.id)}
                           className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-lg transition-all flex items-center w-fit"
                         >
                           <FileText size={14} className="mr-2" /> 编撰大厅
                         </button>
                         
                         {task.status !== '已结束' && (
                           <div className="group/btn relative">
                             <button 
                               onClick={() => isDocReady && handleCompleteBidding(task)}
                               disabled={!isDocReady}
                               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center w-fit shadow-lg ${
                                 isDocReady 
                                   ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95' 
                                   : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                               }`}
                             >
                               {isDocReady ? <ClipboardCheck size={14} className="mr-2 animate-in fade-in" /> : <Lock size={12} className="mr-2 opacity-50" />}
                               确认提交
                             </button>
                             {!isDocReady && (
                               <div className="absolute bottom-full mb-3 right-0 w-48 bg-slate-900 text-white p-4 rounded-2xl text-[9px] font-bold opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all z-20 shadow-2xl border border-white/10 text-left">
                                 <p className="mb-2 text-blue-400 uppercase tracking-widest border-b border-white/10 pb-1">前置环节点亮后解锁：</p>
                                 <ul className="space-y-1.5 font-medium italic">
                                   <li className={`flex items-center ${task.isExpDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                                      <div className={`w-1 h-1 rounded-full mr-2 ${task.isExpDone ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
                                      业绩遴选 {task.isExpDone ? '● 已完成' : '○ 未锁定'}
                                   </li>
                                   <li className={`flex items-center ${task.isTeamDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                                      <div className={`w-1 h-1 rounded-full mr-2 ${task.isTeamDone ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
                                      成员拟定 {task.isTeamDone ? '● 已完成' : '○ 未锁定'}
                                   </li>
                                   <li className={`flex items-center ${task.isContentDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                                      <div className={`w-1 h-1 rounded-full mr-2 ${task.isContentDone ? 'bg-emerald-400' : 'bg-slate-700'}`}></div>
                                      技术方案 {task.isContentDone ? '● 已完成' : '○ 未锁定'}
                                   </li>
                                 </ul>
                               </div>
                             )}
                           </div>
                         )}
                         {currentUser?.id === 'ADMIN-001' && (
                           <button onClick={() => onRemoveTask(task.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-all" title="删除计划 (仅管理员)">
                             <Trash2 size={16} />
                           </button>
                         )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredTasks.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-slate-300 italic">
               <ShieldCheck size={48} className="opacity-20 mb-4" strokeWidth={1} />
               <p className="text-sm font-black uppercase tracking-widest">当前视图无授权匹配项目</p>
               <p className="text-[10px] mt-2 font-bold uppercase tracking-tighter">No lots associated with staff ID: {currentUser?.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingPlanView;
