
import React, { useState } from 'react';
import { Briefcase, Users, Plus, Search, Tag, MoreVertical } from 'lucide-react';
import { ProjectExperience, Personnel } from '../types';

const mockProjects: ProjectExperience[] = [
  { id: 'p1', projectName: '220kV平潮变电站自动化改造', client: '国网江苏', completionDate: '2023-05', scale: '800万', description: '全站监控系统升级...', tags: ['变电', '自动化', '改造'] },
  { id: 'p2', projectName: '苏通大桥跨江线路500kV段运维', client: '国网浙江', completionDate: '2022-12', scale: '1200万', description: '线路全息巡检...', tags: ['线路', '运维', '特高压'] },
];

const mockPersonnel: Personnel[] = [
  { id: 'u1', name: '张工', role: '项目经理', experienceYears: 12, certifications: ['PMP', '高级职称'], skills: ['变电站设计', '项目管理'], currentLoad: 30 },
  { id: 'u2', name: '李工', role: '高级工程师', experienceYears: 8, certifications: ['注册电气工程师'], skills: ['电力通信', 'IEC61850'], currentLoad: 80 },
];

const KnowledgeBaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'personnel'>('projects');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">业绩与人员资产库</h2>
          <p className="text-slate-500">集中管理公司过往项目业绩成果与团队成员资质信息。</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-slate-50">
            <Plus size={16} className="mr-2" /> 导入数据
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-blue-700">
            <Plus size={16} className="mr-2" /> 新增记录
          </button>
        </div>
      </div>

      <div className="flex space-x-1 p-1 bg-slate-200 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex items-center px-4 py-2 rounded-md transition-all ${activeTab === 'projects' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Briefcase size={18} className="mr-2" /> 项目业绩库
        </button>
        <button 
          onClick={() => setActiveTab('personnel')}
          className={`flex items-center px-4 py-2 rounded-md transition-all ${activeTab === 'personnel' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Users size={18} className="mr-2" /> 人员资质库
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={`搜索${activeTab === 'projects' ? '项目、业主、标签' : '姓名、职称、技能'}...`} 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Tag size={18} />
          </button>
        </div>

        {activeTab === 'projects' ? (
          <table className="w-full text-left">
            <thead className="text-sm font-semibold text-slate-600 bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">项目名称</th>
                <th className="px-6 py-4">业主/规模</th>
                <th className="px-6 py-4">完成日期</th>
                <th className="px-6 py-4">标签关键词</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProjects.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{p.projectName}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{p.client}</p>
                    <p className="text-xs text-slate-500">金额: {p.scale}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{p.completionDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {p.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px]">{t}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-blue-600"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {mockPersonnel.map(m => (
              <div key={m.id} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                      {m.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{m.name}</h4>
                      <p className="text-sm text-slate-500">{m.role} · {m.experienceYears}年经验</p>
                    </div>
                  </div>
                  <button className="p-1 text-slate-300 hover:text-slate-600"><MoreVertical size={18} /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">关键资质</p>
                    <div className="flex flex-wrap gap-1">
                      {m.certifications.map(c => <span key={c} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">{c}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">当前负载</p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${m.currentLoad > 70 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${m.currentLoad}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
