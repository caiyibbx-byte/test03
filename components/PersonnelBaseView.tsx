
import React, { useState, useRef } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  X, 
  Save, 
  Edit3, 
  Trash2, 
  Upload, 
  Download,
  ImagePlus, 
  BadgeCheck, 
  GraduationCap, 
  Award, 
  Briefcase,
  History,
  FileText,
  Calendar,
  Contact,
  CheckCircle2,
  Building,
  UserCheck
} from 'lucide-react';
import { Personnel, PersonnelCert, PersonnelProject } from '../types';

const initialPersonnel: Personnel[] = [
  {
    id: 's1',
    name: '张三',
    age: 38,
    education: '本科',
    title: '高级工程师',
    proposedPosition: '项目经理',
    years: 15,
    similarYears: 10,
    school: '华中科技大学',
    major: '电气工程及其自动化',
    gradDate: '2008-06',
    currentLoad: 0.4,
    certs: [
      { name: '一级建造师', level: '一级', authority: '住建部', number: '国1442008200901', validity: '2026-12' },
      { name: '高级工程师', level: '高级', authority: '人社厅', number: '2019-GC-001', validity: '永久' }
    ],
    projects: [
      { time: '2021-2022', projectName: '海口供电局营商环境宣传项目', serviceType: '营销服务', role: '项目负责人', client: '海口供电局', contact: '李四', phone: '13800000000' }
    ]
  }
];

const PersonnelBaseView: React.FC = () => {
  const [personnelList, setPersonnelList] = useState<Personnel[]>(initialPersonnel);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Personnel>>({});
  const importRef = useRef<HTMLInputElement>(null);

  const handleEdit = (p: Personnel) => {
    setFormData({ ...p });
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: `s-${Date.now()}`,
      name: '',
      age: 30,
      education: '本科',
      title: '工程师',
      proposedPosition: '',
      years: 5,
      similarYears: 3,
      school: '',
      major: '',
      gradDate: '',
      certs: [],
      projects: [],
      currentLoad: 0
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return alert("请输入姓名");
    const person = formData as Personnel;
    setPersonnelList(prev => {
      const exists = prev.find(p => p.id === person.id);
      if (exists) return prev.map(p => p.id === person.id ? person : p);
      return [person, ...prev];
    });
    setIsEditModalOpen(false);
  };

  const addCert = () => {
    setFormData(prev => ({
      ...prev,
      certs: [...(prev.certs || []), { name: '', level: '', authority: '', number: '', validity: '' }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), { time: '', projectName: '', serviceType: '', role: '', client: '', contact: '', phone: '' }]
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      {/* 编辑模态框 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[1600] flex items-center justify-center p-6 text-left">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative w-full max-w-7xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[94vh] border border-white/20">
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl"><UserCheck size={24} /></div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">人员资质档案编辑</h3>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="p-3 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
             </div>

             <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-main bg-white">
                {/* 1. 基础信息 */}
                <section>
                  <div className="flex items-center space-x-3 border-b border-slate-100 pb-3 mb-6">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Contact size={18} /></div>
                    <h4 className="text-sm font-black text-slate-900 uppercase">基础自然人属性</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">姓名</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">年龄</label><input type="number" className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.age || ''} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">文化程度</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.education || ''} onChange={e => setFormData({...formData, education: e.target.value})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">技术职称</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  </div>
                </section>

                {/* 2. 教育背景 */}
                <section>
                  <div className="flex items-center space-x-3 border-b border-slate-100 pb-3 mb-6">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><GraduationCap size={18} /></div>
                    <h4 className="text-sm font-black text-slate-900 uppercase">教育及资历背景</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-2 space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">毕业学校</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.school || ''} onChange={e => setFormData({...formData, school: e.target.value})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">所学专业</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.major || ''} onChange={e => setFormData({...formData, major: e.target.value})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">毕业时间</label><input className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.gradDate || ''} onChange={e => setFormData({...formData, gradDate: e.target.value})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">总从业年限</label><input type="number" className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.years || ''} onChange={e => setFormData({...formData, years: parseInt(e.target.value)})} /></div>
                    <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase">类似业绩年限</label><input type="number" className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-sm" value={formData.similarYears || ''} onChange={e => setFormData({...formData, similarYears: parseInt(e.target.value)})} /></div>
                  </div>
                </section>

                {/* 3. 证书管理 */}
                <section>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Award size={18} /></div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">证书资产</h4>
                    </div>
                    <button onClick={addCert} className="text-[10px] font-black text-indigo-600 uppercase border border-indigo-100 px-3 py-1 rounded-lg hover:bg-indigo-50">添加证书</button>
                  </div>
                  <div className="space-y-4">
                    {formData.certs?.map((cert, idx) => (
                      <div key={idx} className="grid grid-cols-5 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                        <input placeholder="证书名称" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={cert.name} onChange={e => { const n = [...formData.certs!]; n[idx].name = e.target.value; setFormData({...formData, certs: n}) }} />
                        <input placeholder="等级" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={cert.level} onChange={e => { const n = [...formData.certs!]; n[idx].level = e.target.value; setFormData({...formData, certs: n}) }} />
                        <input placeholder="颁发机构" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={cert.authority} onChange={e => { const n = [...formData.certs!]; n[idx].authority = e.target.value; setFormData({...formData, certs: n}) }} />
                        <input placeholder="证书编号" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={cert.number} onChange={e => { const n = [...formData.certs!]; n[idx].number = e.target.value; setFormData({...formData, certs: n}) }} />
                        <input placeholder="有效期" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={cert.validity} onChange={e => { const n = [...formData.certs!]; n[idx].validity = e.target.value; setFormData({...formData, certs: n}) }} />
                        <button onClick={() => setFormData({...formData, certs: formData.certs?.filter((_, i) => i !== idx)})} className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. 项目经验 */}
                <section>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Briefcase size={18} /></div>
                      <h4 className="text-sm font-black text-slate-900 uppercase">参与项目历史</h4>
                    </div>
                    <button onClick={addProject} className="text-[10px] font-black text-indigo-600 uppercase border border-indigo-100 px-3 py-1 rounded-lg hover:bg-indigo-50">添加经验</button>
                  </div>
                  <div className="space-y-4">
                    {formData.projects?.map((proj, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 relative group">
                        <div className="grid grid-cols-4 gap-4">
                          <input placeholder="起止时间" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.time} onChange={e => { const n = [...formData.projects!]; n[idx].time = e.target.value; setFormData({...formData, projects: n}) }} />
                          <input placeholder="项目名称" className="col-span-2 bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.projectName} onChange={e => { const n = [...formData.projects!]; n[idx].projectName = e.target.value; setFormData({...formData, projects: n}) }} />
                          <input placeholder="服务类别" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.serviceType} onChange={e => { const n = [...formData.projects!]; n[idx].serviceType = e.target.value; setFormData({...formData, projects: n}) }} />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <input placeholder="担任职务" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.role} onChange={e => { const n = [...formData.projects!]; n[idx].role = e.target.value; setFormData({...formData, projects: n}) }} />
                          <input placeholder="发包人名称" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.client} onChange={e => { const n = [...formData.projects!]; n[idx].client = e.target.value; setFormData({...formData, projects: n}) }} />
                          <input placeholder="联系人" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.contact} onChange={e => { const n = [...formData.projects!]; n[idx].contact = e.target.value; setFormData({...formData, projects: n}) }} />
                          <input placeholder="联系电话" className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-slate-200" value={proj.phone} onChange={e => { const n = [...formData.projects!]; n[idx].phone = e.target.value; setFormData({...formData, projects: n}) }} />
                        </div>
                        <button onClick={() => setFormData({...formData, projects: formData.projects?.filter((_, i) => i !== idx)})} className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                      </div>
                    ))}
                  </div>
                </section>
             </div>

             <div className="p-8 border-t border-slate-100 bg-white flex justify-end space-x-4 shrink-0">
                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">取消</button>
                <button onClick={handleSave} className="px-12 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center">
                  <Save size={18} className="mr-3" /> 保存档案
                </button>
             </div>
          </div>
        </div>
      )}

      {/* 头部 */}
      <div className="flex justify-between items-center text-left">
        <div className="flex items-center space-x-4">
           <div className={`p-3 text-white rounded-2xl shadow-xl bg-indigo-600`}>
             <Users size={24} />
           </div>
           <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">人员资质库</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic italic">Electric Grid Professionals & Credentials Registry</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <input type="file" ref={importRef} className="hidden" accept=".xlsx,.xls,.json" onChange={(e) => alert('正在解析人员数据...')} />
          <button onClick={() => importRef.current?.click()} className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center shadow-sm">
            <Upload size={16} className="mr-2 text-indigo-600" /> 批量导入
          </button>
          <button onClick={openAddModal} className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center">
            <Plus size={16} className="mr-2" /> 新增人员档案
          </button>
        </div>
      </div>

      {/* 列表 */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px] text-left">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
          <div className="max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input type="text" placeholder="搜索姓名、专业、证书或职称..." className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-slate-100 bg-white outline-none font-bold text-sm shadow-inner" />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar-main">
          <table className="w-full text-left table-fixed border-collapse" style={{ width: '3000px' }}>
            <thead className="text-[11px] font-black text-white uppercase tracking-[0.15em] bg-slate-900 sticky top-0 z-20">
              <tr className="divide-x divide-white/5">
                <th className="px-6 py-8 w-[140px] sticky left-0 bg-slate-900 shadow-xl text-indigo-400">姓名</th>
                <th className="px-6 py-8 w-[100px]">年龄</th>
                <th className="px-6 py-8 w-[120px]">学历</th>
                <th className="px-6 py-8 w-[180px]">职称</th>
                <th className="px-6 py-8 w-[240px]">所学专业</th>
                <th className="px-6 py-8 w-[240px]">毕业院校</th>
                <th className="px-6 py-8 w-[120px]">毕业年份</th>
                <th className="px-6 py-8 w-[120px]">从业年限</th>
                <th className="px-6 py-8 w-[140px]">类似业绩年</th>
                <th className="px-6 py-8 w-[600px]">核心证书信息</th>
                <th className="px-6 py-8 w-[600px]">最近项目参与</th>
                <th className="px-6 py-8 w-[140px] text-right sticky right-0 bg-slate-900 shadow-xl">业务操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {personnelList.map(p => (
                <tr key={p.id} className="hover:bg-indigo-50/50 transition-all group cursor-pointer text-[12px]" onClick={() => handleEdit(p)}>
                  <td className="px-6 py-6 font-black text-slate-800 sticky left-0 bg-white group-hover:bg-indigo-50/50 border-r border-slate-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">{p.name[0]}</div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-600">{p.age}</td>
                  <td className="px-6 py-6 font-black text-indigo-600">{p.education}</td>
                  <td className="px-6 py-6 font-bold text-slate-700">{p.title}</td>
                  <td className="px-6 py-6 text-slate-600">{p.major}</td>
                  <td className="px-6 py-6 text-slate-600 italic">{p.school}</td>
                  <td className="px-6 py-6 font-mono font-bold text-slate-400">{p.gradDate}</td>
                  <td className="px-6 py-6 font-black text-slate-900">{p.years}年</td>
                  <td className="px-6 py-6 font-black text-indigo-500">{p.similarYears}年</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-2">
                       {p.certs.map((c, i) => (
                         <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black border border-emerald-100 truncate max-w-[200px]" title={`${c.name} (${c.number})`}>
                           {c.name}·{c.level}
                         </span>
                       ))}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-slate-400 italic truncate max-w-[500px]">
                      {p.projects[0]?.projectName || '暂无参与记录'}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right sticky right-0 bg-white group-hover:bg-indigo-50/50 border-l border-slate-50">
                    <div className="flex items-center justify-end space-x-2">
                       <button onClick={(e) => { e.stopPropagation(); handleEdit(p); }} className="p-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"><Edit3 size={16}/></button>
                       <button onClick={(e) => { e.stopPropagation(); if(confirm('确认删除？')) setPersonnelList(prev => prev.filter(i => i.id !== p.id)); }} className="p-2.5 bg-slate-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonnelBaseView;
