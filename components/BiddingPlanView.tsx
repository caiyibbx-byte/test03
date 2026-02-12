
import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Trash2, 
  Download, 
  Search,
  Zap,
  X,
  ChevronRight,
  FileText,
  Plus,
  ClipboardCheck,
  Lock,
  Filter,
  Eye,
  LockKeyhole,
  CheckCircle2,
  Timer,
  Target,
  Archive,
  AlertCircle,
  Users
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
  
  // active (正在进行中计划) vs submitted (完成投标活跃项目)
  const [activeTab, setActiveTab] = useState<'active' | 'submitted'>('active');

  // 1. 基于角色授权的任务过滤
  const userAuthorizedTasks = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.id === 'ADMIN-001') return tasks;
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

  // 2. 根据 Tab 进行严格的状态隔离过滤
  const tabFilteredTasks = useMemo(() => {
    return userAuthorizedTasks.filter(task => {
      const isSubmitted = task.currentStage === 'submitted';
      if (activeTab === 'active') return !isSubmitted;
      return isSubmitted;
    });
  }, [userAuthorizedTasks, activeTab]);

  // 3. 关键字搜索过滤
  const filteredTasks = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return tabFilteredTasks.filter(task => {
      return task.title.toLowerCase().includes(q) || (task.lotName && task.lotName.toLowerCase().includes(q));
    });
  }, [tabFilteredTasks, searchTerm]);

  const handleSelectStaff = (staff: StaffMember) => {
    const task = tasks.find(t => t.id === activeTaskId);
    if (!task || !modalType) return;

    const updatedTask = { ...task };
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
    const isDocReady = !!(task.isExpDone && task.isTeamDone && task.isContentDone);
    
    if (!isDocReady) {
      alert("提交失败：请确保“业绩遴选”、“成员拟定”及“技术方案”三个核心环节均已在编撰大厅锁定归档。");
      return;
    }

    // 更新任务状态
    onUpdateTask({ 
      ...task, 
      status: '已结束', 
      progress: 100, 
      currentStage: 'submitted',
      isContentDone: true,
      isExpDone: true,
      isTeamDone: true 
    });
    
    // 立即执行 Tab 切换，强制刷新视图到已提交列表
    setActiveTab('submitted');
    console.log(`Task ${task.id} flow triggered to submitted pool.`);
  };

  const PersonnelSlot = ({ label, staff, type, taskId, readOnly = false }: { label: string, staff?: StaffMember, type: RoleType, taskId: string, readOnly?: boolean }) => (
    <div 
      onClick={() => { 
        if (readOnly) return;
        const targetTask = tasks.find(t => t.id === taskId);
        const isProjectLeader = targetTask?.projectLeader?.id === currentUser?.id;
        const isAdmin = currentUser?.id === 'ADMIN-001';
        if (!isAdmin && !isProjectLeader) {
           alert("抱歉，只有项目总负责人或系统管理员可以调整岗位分配。");
           return;
        }
        setActiveTaskId(taskId); setModalType(type); 
      }}
      className={`group flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all w-20 h-20 text-left ${
        readOnly ? 'bg-white border-slate-50 cursor-default' : 
        staff ? 'bg-white border-blue-100 hover:border-blue-400 shadow-sm cursor-pointer' : 
        'bg-slate-50 border-dashed border-slate-200 hover:border-blue-300 cursor-pointer'
      }`}
    >
      {staff ? (
        <>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm mb-1 transition-colors ${readOnly ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white group-hover:bg-blue-600'}`}>
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
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-left">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100"><Users size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">指派环节岗位负责人</h3>
              </div>
              <button onClick={() => setModalType(null)} className="p-3 hover:bg-white rounded-full transition-colors"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar-main">
              <div className="grid grid-cols-2 gap-4">
                {globalTalentPool.map(staff => (
                  <div key={staff.id} onClick={() => handleSelectStaff(staff)} className="p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-between group cursor-pointer shadow-sm text-left">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-black text-lg mr-4 transition-all">{staff.name[0]}</div>
                      <div className="text-left">
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

      <div className="flex justify-between items-center text-left">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center uppercase italic leading-none">
            投标计划与执行监控
            {currentUser?.id !== 'ADMIN-001' && (
              <span className="ml-4 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100 flex items-center italic">
                <LockKeyhole size={12} className="mr-1.5"/> 数据受控模式
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-xs mt-2 italic font-bold uppercase tracking-widest">
            Bidding Pipeline & Execution Tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border-2 border-slate-100 text-slate-600 px-5 py-2.5 rounded-xl flex items-center shadow-sm hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest">
            <Filter size={18} className="mr-2" /> 深度过滤
          </button>
          <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg hover:bg-emerald-700 transition-all font-black text-[10px] uppercase tracking-widest italic">
            <FileSpreadsheet size={18} className="mr-2" /> 导出本月计划
          </button>
        </div>
      </div>

      {/* 列表 Tab 控制板 */}
      <div className="flex items-center space-x-4 mb-2">
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-8 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center ${
            activeTab === 'active' 
              ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' 
              : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Zap size={14} className={`mr-2 ${activeTab === 'active' ? 'text-blue-400' : ''}`} />
          正在进行中计划 ({userAuthorizedTasks.filter(t => t.currentStage !== 'submitted').length})
        </button>
        <button 
          onClick={() => setActiveTab('submitted')}
          className={`px-8 py-3.5 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center ${
            activeTab === 'submitted' 
              ? 'bg-emerald-600 text-white shadow-xl translate-y-[-2px]' 
              : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 size={14} className={`mr-2 ${activeTab === 'submitted' ? 'text-white' : ''}`} />
          完成投标活跃项目 ({userAuthorizedTasks.filter(t => t.currentStage === 'submitted').length})
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px] text-left">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={`在 ${activeTab === 'active' ? '正在进行中计划' : '完成投标活跃项目'} 中搜索...`} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-100 rounded-[20px] focus:outline-none focus:border-blue-600 transition-all text-sm font-bold shadow-inner" 
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1 text-left">
          <table className="w-full text-left">
            <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 w-[320px]">项目标包概览 Entity</th>
                <th className="px-6 py-6 text-center">总负责</th>
                <th className="px-6 py-6 text-center">业绩遴选</th>
                <th className="px-6 py-6 text-center">成员拟定</th>
                <th className="px-6 py-6 text-center">方案编撰</th>
                <th className="px-6 py-6 text-center">最终上传</th>
                <th className="px-8 py-6 text-right">
                  {activeTab === 'active' ? '业务操作' : '开标倒计时 / 存证'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => {
                const isDocReady = !!(task.isExpDone && task.isTeamDone && task.isContentDone);
                const isSubmitted = task.currentStage === 'submitted';
                
                return (
                  <tr key={task.id} className={`transition-all group ${isSubmitted ? 'hover:bg-emerald-50/30' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-8 py-8">
                      <div className="max-w-[280px] text-left">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase italic border ${
                            isSubmitted ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                          }`}>
                            {isSubmitted ? 'COMPLETED' : task.status}
                          </span>
                          <span className="text-[9px] font-mono font-black text-slate-300 uppercase tracking-tighter">{task.projectId}</span>
                        </div>
                        <p className="text-base font-black text-slate-900 leading-tight truncate italic">{task.lotName || '整包项目'}</p>
                        <p className="text-[11px] text-slate-400 truncate mt-1.5 font-bold italic">{task.title}</p>
                      </div>
                    </td>
                    
                    <td className="px-4 py-8"><div className="flex justify-center"><PersonnelSlot taskId={task.id} label="总负责" staff={task.projectLeader} type="leader" readOnly={isSubmitted} /></div></td>
                    <td className="px-4 py-8"><div className="flex justify-center"><PersonnelSlot taskId={task.id} label="业绩" staff={task.expSelectionLeader} type="exp" readOnly={isSubmitted} /></div></td>
                    <td className="px-4 py-8"><div className="flex justify-center"><PersonnelSlot taskId={task.id} label="成员" staff={task.memberDraftingLeader} type="member" readOnly={isSubmitted} /></div></td>
                    <td className="px-4 py-8"><div className="flex justify-center"><PersonnelSlot taskId={task.id} label="方案" staff={task.techProposalLeader} type="tech" readOnly={isSubmitted} /></div></td>
                    <td className="px-4 py-8"><div className="flex justify-center"><PersonnelSlot taskId={task.id} label="上传" staff={task.submissionLeader} type="submission" readOnly={isSubmitted} /></div></td>

                    <td className="px-8 py-8 text-right">
                      {activeTab === 'active' ? (
                        <div className="flex flex-col space-y-2 items-end">
                          <button 
                            onClick={(e) => { e.stopPropagation(); onEnterWorkspace(task.id); }}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-lg transition-all flex items-center w-fit italic group-hover:translate-x-[-4px]"
                          >
                            <FileText size={14} className="mr-2" /> 编撰大厅
                          </button>
                          
                          <div className="group/btn relative">
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleCompleteBidding(task); }}
                               className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center w-fit shadow-lg ${
                                 isDocReady 
                                   ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95' 
                                   : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                               }`}
                             >
                               {isDocReady ? <ClipboardCheck size={14} className="mr-2" /> : <Lock size={12} className="mr-2 opacity-50" />}
                               确认提交
                             </button>
                             {!isDocReady && (
                               <div className="absolute bottom-full mb-3 right-0 w-48 bg-slate-900 text-white p-5 rounded-2xl text-[9px] font-bold opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-all z-20 shadow-2xl border border-white/10 text-left">
                                 <p className="mb-2 text-blue-400 uppercase tracking-widest border-b border-white/10 pb-1 italic">前置环节锁定后解锁提交</p>
                                 <ul className="space-y-1.5 font-medium italic">
                                   <li className={task.isExpDone ? 'text-emerald-400' : 'text-slate-500'}>● 业绩遴选 {task.isExpDone ? '已完成' : '未锁定'}</li>
                                   <li className={task.isTeamDone ? 'text-emerald-400' : 'text-slate-500'}>● 成员拟定 {task.isTeamDone ? '已完成' : '未锁定'}</li>
                                   <li className={task.isContentDone ? 'text-emerald-400' : 'text-slate-500'}>● 技术方案 {task.isContentDone ? '已完成' : '未锁定'}</li>
                                 </ul>
                               </div>
                             )}
                          </div>
                          {currentUser?.id === 'ADMIN-001' && (
                           <button onClick={(e) => { e.stopPropagation(); onRemoveTask(task.id); }} className="p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                             <Trash2 size={16} />
                           </button>
                         )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-end space-y-2">
                           <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest italic">
                              <Timer size={14} className="animate-pulse" /> 倒计时: 14h 22m
                           </div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">开标时间: {task.openingTime}</p>
                           <div className="flex space-x-2 mt-2">
                              <button onClick={() => onEnterWorkspace(task.id)} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-white border border-slate-200 shadow-sm transition-all" title="查看文书存证"><Eye size={16}/></button>
                              <button className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all" title="下载存档"><Download size={16}/></button>
                           </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredTasks.length === 0 && (
            <div className="py-40 flex flex-col items-center justify-center text-slate-300 italic">
               {activeTab === 'active' ? <Target size={64} className="opacity-10 mb-6" strokeWidth={1}/> : <Archive size={64} className="opacity-10 mb-6" strokeWidth={1}/>}
               <p className="text-sm font-black uppercase tracking-[0.4em]">当前视图暂无项目</p>
               <p className="text-[10px] mt-4 font-bold uppercase tracking-tighter opacity-50 italic">
                 {activeTab === 'active' ? '所有计划均已提交或暂无新计划' : '尚未有项目完成正式投标提交'}
               </p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-main::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-main::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BiddingPlanView;
