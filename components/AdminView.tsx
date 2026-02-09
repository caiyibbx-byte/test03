
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

// 1. 预定义原子权限元数据
const PERMISSION_METADATA: Record<PermissionType, { label: string; desc: string; color: string }> = {
  'DATA_VIEW': { label: '招标数据查看', desc: '允许查看全网抓取的招标公告及分包详情', color: 'text-blue-600' },
  'BID_DRAFT': { label: '投标文书编撰', desc: '允许进入编撰大厅，使用 AI 协作生成文档', color: 'text-emerald-600' },
  'CRAWLER_CTRL': { label: '爬虫策略控制', desc: '允许修改采集频率、添加新的电力招标源', color: 'text-amber-600' },
  'ASSET_MANAGE': { label: '企业资产维护', desc: '允许更新业绩库、人员资质及项目案例', color: 'text-purple-600' },
  'SYSTEM_LOG': { label: '审计日志查看', desc: '允许查看系统运行日志与 AI 逻辑轨迹', color: 'text-slate-600' },
  'USER_ADMIN': { label: '超级管理权限', desc: '拥有管理员工账号、角色及系统配置的权限', color: 'text-red-600' },
  'AI_TUNING': { label: '智能体调优', desc: '允许修改 GridGPT 核心推理深度与行业参数', color: 'text-indigo-600' },
};

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. 模拟角色数据
  const [roles, setRoles] = useState<UserRole[]>([
    { id: 'r1', name: '系统指挥官', description: '拥有电网智能系统所有模块的绝对控制权', permissions: ['DATA_VIEW', 'BID_DRAFT', 'CRAWLER_CTRL', 'ASSET_MANAGE', 'SYSTEM_LOG', 'USER_ADMIN', 'AI_TUNING'] },
    { id: 'r2', name: '项目负责人', description: '主导投标项目，管理团队资质与业绩匹配', permissions: ['DATA_VIEW', 'BID_DRAFT', 'ASSET_MANAGE'] },
    { id: 'r3', name: '数智维护员', description: '负责爬虫脚本维护与 AI 智能体运行调优', permissions: ['CRAWLER_CTRL', 'SYSTEM_LOG', 'AI_TUNING'] },
  ]);

  // 3. 模拟员工数据
  const [users, setUsers] = useState<StaffUser[]>([
    { id: 'S-202401', name: '张工', dept: '数字化部', roleId: 'r1', status: 'active', lastLogin: '2024-10-25 10:20' },
    { id: 'S-202412', name: '李经理', dept: '市场拓展部', roleId: 'r2', status: 'active', lastLogin: '2024-10-25 09:45' },
    { id: 'S-202433', name: '王专员', dept: '运维保障中心', roleId: 'r3', status: 'active', lastLogin: '2024-10-24 16:40' },
  ]);

  // 表单状态
  const [newUser, setNewUser] = useState({ id: '', name: '', dept: '', roleId: 'r2' });
  const [newRole, setNewRole] = useState<{name: string, description: string, permissions: PermissionType[]}>({ 
    name: '', description: '', permissions: [] 
  });

  // 统计每个角色的员工人数
  const roleUsage = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => counts[u.roleId] = (counts[u.roleId] || 0) + 1);
    return counts;
  }, [users]);

  // 处理添加逻辑
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
          <p className="text-slate-500 text-sm mt-1 font-medium">基于工号体系的角色访问控制，保障电网业务数据资产安全。</p>
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
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold shadow-inner"
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
                      <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-500">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                        在线活跃
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100" title="调整角色">
                           <ArrowRightLeft size={16} />
                        </button>
                        <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map(role => (
            <div key={role.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col hover:border-blue-500 hover:shadow-2xl transition-all group relative text-left">
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
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">包含的业务权限 (Permissions)</p>
                <div className="space-y-2">
                  {role.permissions.map(p => (
                    <div key={p} className="flex items-center text-[11px] font-black text-slate-700 uppercase tracking-tight italic">
                       <Check size={14} className="mr-2 text-emerald-500" strokeWidth={4} /> {PERMISSION_METADATA[p].label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex space-x-3">
                 <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200">
                   修改权限组合
                 </button>
                 <button className="p-4 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-slate-100">
                   <Trash2 size={18} />
                 </button>
              </div>
            </div>
          ))}

          {/* 创建角色卡片 */}
          <button 
            onClick={() => setShowAddRole(true)}
            className="rounded-[40px] border-4 border-dashed border-slate-100 p-8 flex flex-col items-center justify-center text-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all group min-h-[420px]"
          >
            <div className="w-20 h-20 rounded-[28px] border-4 border-dashed border-current flex items-center justify-center mb-6 group-hover:rotate-90 transition-transform duration-500">
              <Plus size={40} />
            </div>
            <p className="text-sm font-black uppercase tracking-widest italic">定义新业务角色</p>
            <p className="text-[10px] mt-2 opacity-60 font-bold uppercase tracking-widest">Orchestrate new permission set</p>
          </button>
        </div>
      )}

      {/* 1. 员工录入模态框 */}
      {showAddUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddUser(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between text-left">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">员工实名录入</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest italic">Employee Registration Process</p>
               </div>
               <button onClick={() => setShowAddUser(false)} className="p-3 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><X size={24}/></button>
             </div>
             <form onSubmit={handleAddUser} className="p-10 space-y-8 text-left">
                <div className="space-y-6">
                   <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">企业唯一工号 (Staff ID)</label>
                      <div className="relative">
                        <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input 
                          required
                          value={newUser.id}
                          onChange={e => setNewUser({...newUser, id: e.target.value})}
                          placeholder="例如: S-2024XX" 
                          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-mono font-bold text-lg shadow-inner"
                        />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">员工姓名</label>
                        <input 
                          required
                          value={newUser.name}
                          onChange={e => setNewUser({...newUser, name: e.target.value})}
                          placeholder="姓名" 
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold shadow-inner"
                        />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">所属部门</label>
                        <input 
                          value={newUser.dept}
                          onChange={e => setNewUser({...newUser, dept: e.target.value})}
                          placeholder="如：信通部" 
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold shadow-inner"
                        />
                      </div>
                   </div>
                   <div className="group">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">指派初始权限角色</label>
                      <select 
                        value={newUser.roleId}
                        onChange={e => setNewUser({...newUser, roleId: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-bold appearance-none cursor-pointer shadow-inner"
                      >
                         {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                   </div>
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center">
                   确认录入系统并指派权限 <Plus size={18} className="ml-2" />
                </button>
             </form>
          </div>
        </div>
      )}

      {/* 2. 角色自定义模态框 */}
      {showAddRole && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddRole(false)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between text-left shrink-0">
               <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">自定义角色权限编排</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest italic">Role Composition Factory</p>
               </div>
               <button onClick={() => setShowAddRole(false)} className="p-3 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"><X size={24}/></button>
             </div>
             
             <form onSubmit={handleAddRole} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-main text-left">
                <div className="grid grid-cols-5 gap-10">
                   <div className="col-span-2 space-y-6">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">角色名称 (Role Label)</label>
                        <input 
                          required
                          value={newRole.name}
                          onChange={e => setNewRole({...newRole, name: e.target.value})}
                          placeholder="例如: 商务审计员"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all font-black text-lg shadow-inner"
                        />
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">角色职责描述</label>
                        <textarea 
                          rows={4}
                          value={newRole.description}
                          onChange={e => setNewRole({...newRole, description: e.target.value})}
                          placeholder="详细描述该角色的业务应用场景..."
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all text-sm font-bold shadow-inner resize-none italic"
                        />
                      </div>
                      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                         <div className="flex items-center text-amber-600 text-[10px] font-black uppercase tracking-widest mb-2">
                           <ShieldAlert size={14} className="mr-2" /> 安全准则
                         </div>
                         <p className="text-[11px] text-slate-600 leading-relaxed font-bold italic">
                           请遵循最小特权原则 (POLP)。每个自定义角色应仅包含其完成业务流程所必需的原子权限。
                         </p>
                      </div>
                   </div>
                   
                   <div className="col-span-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">自由勾选原子权限 (Multiple Select Permissions)</label>
                      <div className="grid grid-cols-1 gap-3">
                         {(Object.keys(PERMISSION_METADATA) as PermissionType[]).map(key => {
                           const isSelected = newRole.permissions.includes(key);
                           return (
                             <div 
                               key={key}
                               onClick={() => togglePermission(key)}
                               className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                                 isSelected ? 'border-blue-600 bg-blue-50/50 shadow-lg' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'
                               }`}
                             >
                                <div className="flex items-center">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all ${
                                     isSelected ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
                                   }`}>
                                     {isSelected ? <Check size={20} strokeWidth={4} /> : <Zap size={18} />}
                                   </div>
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
                  <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center">
                     发布并生效新业务角色 <Settings2 size={18} className="ml-3" />
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
