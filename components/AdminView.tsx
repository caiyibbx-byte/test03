
import React from 'react';
import { Shield, Key, UserCheck, Activity } from 'lucide-react';

const AdminView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">权限与角色管理</h2>
          <p className="text-slate-500">配置不同角色对抓取数据、人员库、投标文书的访问权限。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            name: '超级管理员', 
            count: 2, 
            permissions: ['全量数据访问', '系统配置', '角色指派'], 
            icon: Shield,
            color: 'bg-red-50 text-red-600'
          },
          { 
            name: '项目经理', 
            count: 8, 
            permissions: ['投标文书编撰', '人员匹配', '导出PDF'], 
            icon: UserCheck,
            color: 'bg-blue-50 text-blue-600'
          },
          { 
            name: '数据分析员', 
            count: 5, 
            permissions: ['抓取规则设置', '数据导出', '看板查看'], 
            icon: Activity,
            color: 'bg-emerald-50 text-emerald-600'
          },
        ].map((role, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-lg ${role.color}`}>
                <role.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{role.count} 位成员</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{role.name}</h3>
            <div className="flex-1 space-y-2 mb-6">
              {role.permissions.map(p => (
                <div key={p} className="flex items-center text-sm text-slate-600">
                  <Key size={14} className="mr-2 text-slate-400" />
                  {p}
                </div>
              ))}
            </div>
            <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              管理角色权限
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminView;
