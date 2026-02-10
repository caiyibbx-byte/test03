
import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  UserPlus, 
  Plus, 
  Search, 
  X, 
  Check, 
  Users, 
  Building2, 
  Lock, 
  BadgeCheck, 
  MoreVertical, 
  Trash2, 
  Fingerprint,
  Cpu,
  Zap,
  ShieldAlert,
  ArrowRightLeft,
  Settings2
} from 'lucide-react';
import { StaffUser, UserRole, PermissionType } from '../types';

// 1. 定义最新的业务权限元数据
const PERMISSION_METADATA: Record<PermissionType, { label: string; desc: string; color: string }> = {
  'BID_EXP_SELECT': { label: '标书业绩遴选', desc: '允许进入编撰大厅，执行企业历史业绩的筛选与关联', color: 'text-blue-600' },
  'BID_MEMBER_DRAFT': { label: '成员拟定', desc: '允许在编撰大厅拟定并锁定项目实施团队成员名单', color: 'text-emerald-600' },
  'BID_TECH_DRAFT': { label: '技术方案编撰', desc: '允许调用 AI 引擎生成并修正技术响应章节内容', color: 'text-indigo-600' },
  'BID_SUBMISSION': { label: '投标', desc: '允许进行最终的标书上传确认与投标完成状态标记', color: 'text-amber-600' },
  'BID_PLAN_MANAGE': { label: '投标计划管理', desc: '允许在计划视图中分配项目各环节负责人及调整进度', color: 'text-red-600' },
  'DATA_VIEW': { label: '数据查看', desc: '允许查看全网招标库及人员/业绩库的基础信息', color: 'text-slate-600' },
  'SYSTEM_LOG': { label: '系统日志', desc: '审计系统运行足迹与 AI 计算日志', color: 'text-slate-400' },
};

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. 更新模拟角色数据以匹配新权限
  const [roles, setRoles] = useState<UserRole[]>([
    { 
        id: 'r1', 
        name: '数字化指挥官', 
        description: '拥有系统所有模块的绝对管理权与监管权', 
        permissions: ['BID_EXP_SELECT', 'BID_MEMBER_DRAFT', 'BID_TECH_DRAFT', 'BID_SUBMISSION', 'BID_PLAN_MANAGE', 'DATA_VIEW', 'SYSTEM_LOG'] 
    },
    { 
        id: 'r2', 
        name: '商务经理', 
        description: '主要负责业绩匹配、人员拟定及最终投标上传', 
        permissions: ['BID_EXP_SELECT', 'BID_MEMBER_DRAFT', 'BID_SUBMISSION', 'DATA_VIEW'] 
    },
    { 
        id: 'r3', 
        name: '技术专家', 
        description: '核心负责技术部分的文书编撰与响应生成', 
        permissions: ['BID_TECH_DRAFT', 'DATA_VIEW'] 
    },
  ]);

  // 3. 模拟员工数据
  const [users, setUsers] = useState<StaffUser[]>([
    { id: 'ADMIN-001', name: '系统管理员', dept: '数字化中心', roleId: 'r1', status: 'active', lastLogin: '2024-10-25 10:20' },
    { id: 'gt4', name: '孙经理', dept: '商务部', roleId: 'r2', status: 'active', lastLogin: '2024-10-25 09:45' },
    { id: 'm2', name: '李专家', dept: '技术中心', roleId: 'r3', status: 'active', lastLogin: '2024-10-24 16:40' },
  ]);

  // 表单状态
  const [newUser, setNewUser] = useState({ id: '', name: '', dept: '', roleId: 'r2' });
  const [newRole, setNewRole] = useState<{name: string, description: string, permissions: PermissionType[]}>({ 
    name: '', description: '', permissions: [] 
  });

  const roleUsage = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => counts[u.roleId] = (counts[u.roleId] || 0) + 1);
    return counts;
  }, [users]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.id || !newUser.name) return;
    setUsers([{ ...newUser, status: 'active', lastLogin: '--' } as StaffUser, ...users]);
    setNewUser({ id: '', name: '', dept: '', roleId: 'r2' });
    setShowAddUser(false);
  };

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.name || newRole.permissions.length === 0) return;
    setRoles([...roles, { ...newRole, id: `r-${Date.now()}` }]);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowAddRole(false);
  };

  const togglePermission = (perm: PermissionType) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm) 
        ? prev.permissions.filter(p => p !== perm) 
        : [...prev.permissions, perm]
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.includes(searchQuery) || u.id.includes(searchQuery) || u.dept.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 顶部标题与切换 */}
      <div className="flex justify-between items-end">
        <div className="text-left">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
            <Shield size={28} className="mr-3 text-blue-600" /> 企业权限治理中心 (IAM)
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">基于工号体系的角色访问控制，保障电网业务环节权责对等。</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Users size={14} className="mr-2" /> 员工实名管理
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`flex items-center px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'roles' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Lock size={14} className="mr-2" /> 角色策略定义
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索员工姓名、工号或部门..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none transition-all text-sm font-bold shadow-inner"
              />
            </div>
            <button 
              onClick={() => setShowAddUser(true)}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center"
            >
              <UserPlus size={18} className="mr-3" /> 录入新员工
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">员工身份 (工号)</th>
                  <th className="px-8 py-4">所属部门</th>
                  <th className="px-8 py-4">系统权限角色</th>
                  <th className="px-8 py-4">状态</th>
                  <th className="px-8 py-4 text-right">管理操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-left">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm mr-4 shadow-lg">{user.name[0]}</div>
                        <div>
                          <p className="font-bold text-slate-900">{user.name}</p>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="flex items-center text-xs font-bold text-slate-600">
                        <Building2 size={14} className="mr-2 text-slate-300" /> {user.dept}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl">
                        <BadgeCheck size={14} className="text-blue-500 mr-2" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-tighter italic">
                          {roles.find(r => r.id === user.roleId)?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                        在线活跃
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-300 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-slate-100" title="调整角色">
                           <ArrowRightLeft size={16} />
                        </button>
                        <button className="p-2 text-slate-300 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-slate-100">
                           <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {roles.map(role => (
            <div key={role.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col hover:border-blue-500 hover:shadow-2xl transition-all group relative">
              <div className="absolute top-8 right-8 text-slate-100 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                <Lock size={80} strokeWidth={1.5} />
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic flex items-center">
                  {role.name}
                  <span className="ml-3 text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-black">{roleUsage[role.id] || 0} 人使用</span>
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed italic line-clamp-2">{role.description}</p>
              </div>
              
              <div className="flex-1 space-y-3 mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">授予的业务权限 (Grants)</p>
                <div className="space-y-2.5">
                  {role.permissions.map(p => (
                    <div key={p} className="flex items-center text-[11px] font-black text-slate-700 uppercase tracking-tight italic">
                       <Check size={14} className="mr-2 text-emerald-500" strokeWidth={4} /> {PERMISSION_METADATA[p].label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex space-x-3">
                 <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">
                   管理权限组合
                 </button>
                 <button className="p-4 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-slate-100">
                   <Trash2 size={18} />
                 </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setShowAddRole(true)}
            className="rounded-[40px] border-4 border-dashed border-slate-100 p-8 flex flex-col items-center justify-center text-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all group min-h-[420px]"
          >
            <div className="w-20 h-20 rounded-[28px] border-4 border-dashed border-current flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-500">
              <Plus size={40} />
            </div>
            <p className="text-sm font-black uppercase tracking-widest italic">编排新业务角色</p>
          </button>
        </div>
      )}

      {/* 员工录入模态框 (保持基本不变，但展示权限一致性) */}
      {showAddUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 text-left">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddUser(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">员工实名录入</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest italic">Employee Registration Factory</p>
               </div>
               <button onClick={() => setShowAddUser(false)} className="p-3 hover:bg-slate-50 rounded-full text-slate-400"><X size={24}/></button>
             </div>
             <form onSubmit={handleAddUser} className="p-10 space-y-8">
                <div className="space-y-6">
                   <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">企业工号 (Staff ID)</label>
                      <input required value={newUser.id} onChange={e => setNewUser({...newUser, id: e.target.value})} placeholder="例如: S-1234" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all font-mono font-bold" />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">员工姓名</label>
                        <input required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="姓名" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">所属部门</label>
                        <input value={newUser.dept} onChange={e => setNewUser({...newUser, dept: e.target.value})} placeholder="部门" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">初始角色</label>
                      <select value={newUser.roleId} onChange={e => setNewUser({...newUser, roleId: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none font-bold appearance-none cursor-pointer">
                         {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                   </div>
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center">确认录入系统 <Plus size={18} className="ml-2" /></button>
             </form>
          </div>
        </div>
      )}

      {/* 角色自定义模态框 */}
      {showAddRole && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 text-left">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddRole(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between shrink-0">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">自定义角色权限编排</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest italic">Role Composition Factory</p>
               </div>
               <button onClick={() => setShowAddRole(false)} className="p-3 hover:bg-slate-50 rounded-full text-slate-400"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleAddRole} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-main">
                <div className="grid grid-cols-5 gap-10">
                   <div className="col-span-2 space-y-6">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">角色名称 (Role Label)</label>
                        <input required value={newRole.name} onChange={e => setNewRole({...newRole, name: e.target.value})} placeholder="例如: 商务审计员" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all font-black text-lg" />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">角色职责描述</label>
                        <textarea rows={4} value={newRole.description} onChange={e => setNewRole({...newRole, description: e.target.value})} placeholder="描述该角色的业务应用场景..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold shadow-inner resize-none italic" />
                      </div>
                   </div>
                   
                   <div className="col-span-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">自由勾选业务原子权限 (Core Permissions)</label>
                      <div className="grid grid-cols-1 gap-3">
                         {(Object.keys(PERMISSION_METADATA) as PermissionType[]).map(key => {
                           const isSelected = newRole.permissions.includes(key);
                           return (
                             <div key={key} onClick={() => togglePermission(key)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${isSelected ? 'border-blue-600 bg-blue-50/50 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'}`}>
                                <div className="flex items-center">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>{isSelected ? <Check size={20} strokeWidth={4} /> : <Zap size={18} />}</div>
                                   <div className="text-left">
                                     <p className={`text-xs font-black uppercase tracking-tight italic ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>{PERMISSION_METADATA[key].label}</p>
                                     <p className="text-[10px] text-slate-400 mt-0.5 font-bold italic">{PERMISSION_METADATA[key].desc}</p>
                                   </div>
                                </div>
                             </div>
                           );
                         })}
                      </div>
                   </div>
                </div>
                <div className="pt-10 border-t border-slate-100 shrink-0">
                  <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center justify-center">发布并生效新业务角色 <Settings2 size={18} className="ml-3" /></button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
